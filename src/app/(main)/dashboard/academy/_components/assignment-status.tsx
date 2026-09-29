"use client";

import { ArrowRight } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useI18n } from "@/lib/i18n/i18n-provider";

const chartData = [
  { className: "G11A", submitted: 14, pending: 18, overdue: 2 },
  { className: "G11B", submitted: 22, pending: 7, overdue: 3 },
  { className: "G11C", submitted: 10, pending: 19, overdue: 5 },
  { className: "G11D", submitted: 17, pending: 15, overdue: 6 },
  { className: "G11E", submitted: 24, pending: 4, overdue: 2 },
];

function SubmittedLegendIcon() {
  return <span className="block size-2 rounded-[2px] bg-chart-3" />;
}

function PendingLegendIcon() {
  return <span className="block size-2 rounded-[2px] bg-chart-2" />;
}

function OverdueLegendIcon() {
  return <span className="block size-2 rounded-[2px] bg-destructive" />;
}

function AssignmentDotPattern({ color, id }: { color: string; id: string }) {
  return (
    <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse">
      <rect width="6" height="6" fill={color} fillOpacity="0.7" />
      <circle cx="1.5" cy="1.5" r="0.8" fill={color} fillOpacity="0.25" />
      <circle cx="4.5" cy="4.5" r="0.8" fill={color} fillOpacity="0.25" />
    </pattern>
  );
}

export function AssignmentStatus() {
  const { t } = useI18n();

  // chartConfig 的 label 要跟随语言，所以放进组件内部用 t() 填充。
  const chartConfig = {
    submitted: {
      label: t("dashboard.academy.assignmentStatus.chart.submitted"),
      color: "var(--chart-3)",
      icon: SubmittedLegendIcon,
    },
    pending: {
      label: t("dashboard.academy.assignmentStatus.chart.pending"),
      color: "var(--chart-2)",
      icon: PendingLegendIcon,
    },
    overdue: {
      label: t("dashboard.academy.assignmentStatus.chart.overdue"),
      color: "var(--destructive)",
      icon: OverdueLegendIcon,
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-sm">{t("dashboard.academy.assignmentStatus.title")}</CardTitle>
        <CardAction className="flex items-center gap-1 text-muted-foreground text-xs">
          {t("dashboard.academy.assignmentStatus.viewReport")} <ArrowRight className="size-4" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-70 w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
            <defs>
              <AssignmentDotPattern color="var(--color-submitted)" id="assignment-submitted-pattern" />
              <AssignmentDotPattern color="var(--color-pending)" id="assignment-pending-pattern" />
              <AssignmentDotPattern color="var(--color-overdue)" id="assignment-overdue-pattern" />
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis axisLine={false} dataKey="className" tickLine={false} tickMargin={10} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideIndicator />} />
            <ChartLegend content={<ChartLegendContent className="justify-start" />} verticalAlign="top" />
            <Bar
              dataKey="submitted"
              fill="url(#assignment-submitted-pattern)"
              radius={4}
              stroke="var(--color-submitted)"
              strokeOpacity={0.45}
              strokeWidth={0.5}
            />
            <Bar
              dataKey="pending"
              fill="url(#assignment-pending-pattern)"
              radius={4}
              stroke="var(--color-pending)"
              strokeOpacity={0.5}
              strokeWidth={0.5}
            />
            <Bar
              dataKey="overdue"
              fill="url(#assignment-overdue-pattern)"
              radius={4}
              stroke="var(--color-overdue)"
              strokeOpacity={0.5}
              strokeWidth={0.5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
