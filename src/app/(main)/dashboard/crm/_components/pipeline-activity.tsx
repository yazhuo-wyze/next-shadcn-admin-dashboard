"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/lib/i18n/i18n-provider";

const pipelineChartValues = [34, 38, 31, 47, 42, 51, 44, 40, 58, 46, 43, 49] as const;

// 月份格式跟随当前语言，因此不能在模块级构造（模块级拿不到 locale）。
const formatAxisMonth = (value: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { month: "short" }).format(new Date(value));
const formatTooltipMonth = (value: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { month: "short", year: "2-digit" }).format(new Date(value));

function getRollingMonthData(values: readonly number[]) {
  return values.map((qualified, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (values.length - 1 - index));

    return {
      date: date.toISOString(),
      qualified,
    };
  });
}

export function PipelineActivity() {
  const { t, locale } = useI18n();

  // chartConfig 的 label 会显示在图例/提示里，必须跟随语言，所以从模块级挪进组件用 t 填充。
  const pipelineChartConfig = {
    qualified: {
      label: t("dashboard.crm.pipeline.qualified"),
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const pipelineChartData = getRollingMonthData(pipelineChartValues);
  const totalQualified = pipelineChartData.reduce((sum, item) => sum + item.qualified, 0);
  const discoveryCallsBooked = 184;
  const discoveryProgress = Math.round((discoveryCallsBooked / totalQualified) * 100);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
      <Card className="xl:col-span-12">
        <CardHeader>
          <CardTitle>{t("dashboard.crm.pipeline.title")}</CardTitle>
          <CardAction>
            <Select defaultValue="last-12-months">
              <SelectTrigger size="sm" className="min-w-40">
                <SelectValue placeholder={t("analytics.toolbar.selectRange")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="last-30-days">{t("common.time.last30Days")}</SelectItem>
                  <SelectItem value="last-quarter">{t("dashboard.crm.pipeline.lastQuarter")}</SelectItem>
                  <SelectItem value="last-12-months">{t("dashboard.crm.pipeline.last12Months")}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <ChartContainer config={pipelineChartConfig} className="h-72 w-full lg:col-span-8">
              <BarChart data={pipelineChartData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }} barSize={38}>
                <defs>
                  <pattern
                    id="crm-qualified-pattern"
                    width="4"
                    height="4"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                  >
                    <rect width="6" height="6" fill="var(--color-qualified)" fillOpacity="0.15" />
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="6"
                      stroke="var(--color-qualified)"
                      strokeWidth="1.25"
                      strokeOpacity="0.40"
                    />
                  </pattern>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="0" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => formatAxisMonth(String(value), locale)}
                />
                <YAxis hide />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      hideIndicator
                      labelFormatter={(value) => formatTooltipMonth(String(value), locale)}
                    />
                  }
                />
                <Bar
                  dataKey="qualified"
                  fill="url(#crm-qualified-pattern)"
                  radius={[8, 8, 0, 0]}
                  stroke="var(--color-qualified)"
                  strokeOpacity={0.5}
                  strokeWidth={0.5}
                />
              </BarChart>
            </ChartContainer>

            <div className="flex flex-col gap-5 rounded-lg p-4 lg:col-span-4">
              <div className="flex flex-col gap-1">
                <div className="font-medium text-4xl tabular-nums leading-none">
                  {totalQualified}{" "}
                  <span className="font-normal text-lg text-muted-foreground">{t("dashboard.crm.pipeline.leads")}</span>
                </div>
                <p className="text-muted-foreground text-sm">{t("dashboard.crm.pipeline.totalQualifiedDescription")}</p>
              </div>

              <div className="flex flex-col gap-3 rounded-lg border border-border/60 p-3">
                <div className="text-[11px] text-muted-foreground uppercase tracking-widest">
                  {t("dashboard.crm.pipeline.discoveryCallsBooked")}
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="font-medium text-2xl tabular-nums leading-none">
                    {discoveryCallsBooked}{" "}
                    <span className="font-normal text-muted-foreground text-sm">
                      {t("dashboard.crm.pipeline.meetings")}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {t("dashboard.crm.pipeline.discoveryProgress", { progress: discoveryProgress })}
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-0.5">
                  <Progress
                    value={discoveryProgress}
                    className="h-2.5 bg-chart-2/12 *:data-[slot='progress-indicator']:bg-chart-2"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <div className="font-medium tabular-nums">
                      {t("dashboard.crm.pipeline.booked", { count: discoveryCallsBooked })}
                    </div>
                    <div className="text-muted-foreground tabular-nums">
                      {t("dashboard.crm.pipeline.qualifiedCount", { count: totalQualified })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
