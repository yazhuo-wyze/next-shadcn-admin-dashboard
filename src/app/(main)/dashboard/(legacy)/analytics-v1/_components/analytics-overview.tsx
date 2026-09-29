"use client";

import * as React from "react";

import { cn } from "cn";
import { eachDayOfInterval, format, startOfDay, subDays } from "date-fns";
import { Check, ChevronsUpDown, Download } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Area, ComposedChart, XAxis, YAxis } from "recharts";

import { DateRangePicker } from "@/components/date-range-picker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { TFunction } from "@/lib/i18n/dictionary";
import { useI18n } from "@/lib/i18n/i18n-provider";

type RiskView = "risk-view" | "momentum" | "quality";
type FilterToggleKey = "enterpriseOnly" | "stalledOnly" | "overdueOnly" | "includeRenewals";

const FILTER_OPTIONS = (t: TFunction): Array<{ key: FilterToggleKey; label: string; summaryLabel: string }> => [
  {
    key: "enterpriseOnly",
    label: t("dashboard.legacy.analytics-v1.filter.enterpriseOnly"),
    summaryLabel: t("dashboard.legacy.analytics-v1.filter.enterprise"),
  },
  {
    key: "stalledOnly",
    label: t("dashboard.legacy.analytics-v1.filter.stalledOnly"),
    summaryLabel: t("dashboard.legacy.analytics-v1.filter.stalled"),
  },
  {
    key: "overdueOnly",
    label: t("dashboard.legacy.analytics-v1.filter.overdueOnly"),
    summaryLabel: t("dashboard.legacy.analytics-v1.filter.overdue"),
  },
  {
    key: "includeRenewals",
    label: t("dashboard.legacy.analytics-v1.filter.includeRenewals"),
    summaryLabel: t("dashboard.legacy.analytics-v1.filter.renewals"),
  },
];

const riskViews = (
  t: TFunction,
): Array<{
  value: RiskView;
  label: string;
  description: string;
}> => [
  {
    value: "risk-view",
    label: t("dashboard.legacy.analytics-v1.riskView.riskView"),
    description: t("dashboard.legacy.analytics-v1.riskView.earlyWarnings"),
  },
  {
    value: "momentum",
    label: t("dashboard.legacy.analytics-v1.riskView.momentum"),
    description: t("dashboard.legacy.analytics-v1.riskView.trendDirection"),
  },
  {
    value: "quality",
    label: t("dashboard.legacy.analytics-v1.riskView.quality"),
    description: t("dashboard.legacy.analytics-v1.riskView.pipelineHygiene"),
  },
];

const RISK_SUMMARY_METRICS = (t: TFunction) =>
  [
    {
      key: "stalled",
      label: t("dashboard.legacy.analytics-v1.summary.stalledDeals"),
      value: "8",
      comparatorLabel: t("dashboard.legacy.analytics-v1.summary.vsPreviousPeriod"),
    },
    {
      key: "risk",
      label: t("dashboard.legacy.analytics-v1.summary.revenueAtRisk"),
      value: "$1,151,000",
      comparatorLabel: t("dashboard.legacy.analytics-v1.summary.vsPreviousPeriod"),
    },
    {
      key: "win-rate",
      label: t("dashboard.legacy.analytics-v1.summary.winRateTrend"),
      value: "+8.3pp",
      comparatorLabel: t("dashboard.legacy.analytics-v1.summary.vsPreviousPeriod"),
    },
    {
      key: "cycle",
      label: t("dashboard.legacy.analytics-v1.summary.salesCycleDrift"),
      value: "+2.3 days",
      comparatorLabel: t("dashboard.legacy.analytics-v1.summary.vsPreviousPeriod"),
    },
  ] as const;

export function AnalyticsOverview() {
  const { t } = useI18n();
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>(() => {
    const to = startOfDay(new Date());
    return { from: subDays(to, 29), to };
  });
  const [selectedFilters, setSelectedFilters] = React.useState<FilterToggleKey[]>(["includeRenewals"]);
  const [revenueSeries, setRevenueSeries] = React.useState(() => buildRevenueChartData(dateRange.from, dateRange.to));

  const handleFilterToggle = (key: FilterToggleKey, checked: boolean) => {
    setSelectedFilters((prev) => {
      if (checked) {
        return prev.includes(key) ? prev : [...prev, key];
      }
      return prev.filter((item) => item !== key);
    });
  };

  const handleDateRangeChange = (value: DateRange | undefined) => {
    if (!value?.from || !value?.to) {
      return;
    }
    const nextDateRange = { from: value.from, to: value.to };
    setDateRange(nextDateRange);
    setRevenueSeries(buildRevenueChartData(nextDateRange.from, nextDateRange.to));
  };
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <RiskViewSelect t={t} />
          <FiltersPopover t={t} selectedFilters={selectedFilters} onToggle={handleFilterToggle} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />
          <Button variant="secondary">
            <Download />
            {t("common.actions.export")}
          </Button>
        </div>
      </div>

      <SummaryRow t={t} revenueSeries={revenueSeries} />
    </div>
  );
}

function buildRevenueChartData(from: Date, to: Date) {
  const days = eachDayOfInterval({ start: from, end: to });
  const minRevenue = 22_000;
  const maxRevenue = 32_000;
  let currentRevenue = 27_500;

  return days.map((day) => {
    const nextRevenue = currentRevenue + Math.round((Math.random() - 0.45) * 4_000);
    currentRevenue = Math.max(minRevenue, Math.min(maxRevenue, nextRevenue));

    return {
      day: format(day, "MMM d"),
      revenue: currentRevenue,
    };
  });
}

function SummaryRow({ t, revenueSeries }: { t: TFunction; revenueSeries: Array<{ day: string; revenue: number }> }) {
  const revenueChartConfig = {
    revenue: {
      label: t("dashboard.legacy.analytics-v1.overview.revenue"),
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const revenueValues = revenueSeries.map((point) => point.revenue);
  const minRevenue = Math.min(...revenueValues);
  const maxRevenue = Math.max(...revenueValues);
  const midpoint = (minRevenue + maxRevenue) / 2;
  const halfRange = Math.max((maxRevenue - minRevenue) * 1.6, 4_500);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <div className="min-w-0 space-y-2">
        <div>
          <div className="font-medium text-muted-foreground text-sm">
            {t("dashboard.legacy.analytics-v1.overview.revenue")}
          </div>
          <div className="font-semibold text-3xl tabular-nums tracking-tight sm:text-4xl">$1,248,000</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">+9.4%</Badge>
          <Badge variant="secondary">+$107,000</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-sm">
          <span>{t("dashboard.legacy.analytics-v1.overview.previous", { value: "$1,141,000" })}</span>
          <Badge variant="outline" className="font-medium text-xs">
            {t("dashboard.legacy.analytics-v1.overview.riskLadder")}
          </Badge>
        </div>
        <div>
          <ChartContainer config={revenueChartConfig} className="h-10 w-full rounded-md border">
            <ComposedChart data={revenueSeries} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
              <XAxis dataKey="day" hide />
              <YAxis hide domain={[midpoint - halfRange, midpoint + halfRange]} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="revenue"
                type="natural"
                fill="var(--color-revenue)"
                fillOpacity={0.14}
                stroke="var(--color-revenue)"
              />
            </ComposedChart>
          </ChartContainer>
          <span className="text-muted-foreground text-xs">
            {t("dashboard.legacy.analytics-v1.overview.selectedRange")}
          </span>
        </div>
      </div>

      <Card className="min-w-0 py-4 shadow-xs xl:col-span-2">
        <CardHeader className="px-4">
          <CardTitle>{t("dashboard.legacy.analytics-v1.overview.riskSummary")}</CardTitle>
          <CardDescription>{t("dashboard.legacy.analytics-v1.overview.coreRiskSignals")}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0 xl:divide-x xl:[&>div:first-child]:pl-0 xl:[&>div:last-child]:pr-0 xl:[&>div]:px-5">
          {RISK_SUMMARY_METRICS(t).map((item) => (
            <div key={item.key} className="min-w-0 space-y-1">
              <div className="text-muted-foreground text-sm">{item.label}</div>
              <div className="font-semibold text-2xl tabular-nums leading-tight">{item.value}</div>
              <div className="text-muted-foreground text-xs">{item.comparatorLabel}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function RiskViewSelect({ t }: { t: TFunction }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("risk-view");
  const listId = React.useId();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-controls={listId}
          aria-expanded={open}
          className="w-54 justify-between"
        >
          <div className="flex items-center gap-2">
            <div
              className="size-2 rounded-full bg-primary"
              style={{
                boxShadow: "0 0 8px color-mix(in oklab, var(--primary) 50%, transparent)",
              }}
            />
            {riskViews(t).find((view) => view.value === value)?.label}
          </div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-54 p-0">
        <Command>
          <CommandList id={listId}>
            <CommandGroup>
              {riskViews(t).map((view) => (
                <CommandItem
                  key={view.value}
                  value={view.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-col">
                    <span>{view.label}</span>
                    <span className="text-muted-foreground text-xs">{view.description}</span>
                  </div>
                  <Check className={cn("ml-auto", value === view.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function FiltersPopover({
  t,
  selectedFilters,
  onToggle,
}: {
  t: TFunction;
  selectedFilters: FilterToggleKey[];
  onToggle: (key: FilterToggleKey, checked: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const activeCount = selectedFilters.length;

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" aria-expanded={open}>
            {t("dashboard.legacy.analytics-v1.overview.filters")}
            <Badge className="tabular-nums" variant="secondary">
              {activeCount}
            </Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">{t("dashboard.legacy.analytics-v1.overview.filters")}</h3>
              <Badge variant="outline" className="font-medium text-xs tabular-nums">
                {t("dashboard.legacy.analytics-v1.overview.riskLadder")}
              </Badge>
            </div>
            <div className="space-y-3">
              {FILTER_OPTIONS(t).map((item) => (
                <FilterToggle
                  key={item.key}
                  id={item.key}
                  label={item.label}
                  checked={selectedFilters.includes(item.key)}
                  onCheckedChange={(checked) => onToggle(item.key, checked)}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <span className="text-muted-foreground text-sm">
        {t("dashboard.legacy.analytics-v1.overview.showing")}{" "}
        <span className="font-medium">{summarizeFilterState(t, selectedFilters)}</span>
      </span>
    </div>
  );
}

function FilterToggle({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex cursor-pointer items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={(value) => onCheckedChange(Boolean(value))} />
      <Label htmlFor={id} className="cursor-pointer font-normal text-sm">
        {label}
      </Label>
    </div>
  );
}

function summarizeFilterState(t: TFunction, selectedFilters: FilterToggleKey[]) {
  if (selectedFilters.length === 0) {
    return t("dashboard.legacy.analytics-v1.overview.allDeals");
  }
  return FILTER_OPTIONS(t)
    .filter((item) => selectedFilters.includes(item.key))
    .map((item) => item.summaryLabel)
    .join(" · ");
}
