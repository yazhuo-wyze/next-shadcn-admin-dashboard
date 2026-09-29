"use client";

import { ArrowUpRight, PackageCheck, PackageX, TriangleAlert } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import type { TFunction } from "@/lib/i18n/dictionary";
import { useI18n } from "@/lib/i18n/i18n-provider";

const chartData = [{ month: "current", "in-stock": 760, "low-stock": 320, "out-of-stock": 160 }];
const totalUnits = chartData[0]["in-stock"] + chartData[0]["low-stock"] + chartData[0]["out-of-stock"];
const availablePercent = Math.round((chartData[0]["in-stock"] / totalUnits) * 100);
const gaugeSegmentCount = 32;
const inStockSegments = Math.round((chartData[0]["in-stock"] / totalUnits) * gaugeSegmentCount);
const lowStockSegments = Math.round((chartData[0]["low-stock"] / totalUnits) * gaugeSegmentCount);

function getGaugeSegmentStatus(index: number) {
  if (index < inStockSegments) {
    return "in-stock";
  }

  if (index < inStockSegments + lowStockSegments) {
    return "low-stock";
  }

  return "out-of-stock";
}

const gaugeSegments = Array.from({ length: gaugeSegmentCount }, (_, index) => {
  const status = getGaugeSegmentStatus(index);
  return {
    fill: `var(--color-${status})`,
    id: `segment-${index + 1}`,
    status,
    value: 1,
  };
});
/** 显示的 label 需要跟随语言，所以改成接收 t 的函数。 */
const inventorySummary = (t: TFunction) =>
  [
    {
      icon: PackageCheck,
      label: t("dashboard.ecommerce.inventory.inStock"),
      value: chartData[0]["in-stock"],
    },
    {
      icon: TriangleAlert,
      label: t("dashboard.ecommerce.inventory.lowStock"),
      value: chartData[0]["low-stock"],
    },
    {
      icon: PackageX,
      label: t("dashboard.ecommerce.inventory.out"),
      value: chartData[0]["out-of-stock"],
    },
  ] as const;

export function Inventory() {
  const { t } = useI18n();

  // chartConfig 的 label 需要跟随语言，所以从模块级挪进组件内部。
  const chartConfig = {
    "in-stock": {
      label: t("dashboard.ecommerce.inventory.inStock"),
      color: "var(--chart-2)",
    },
    "low-stock": {
      label: t("dashboard.ecommerce.inventory.lowStock"),
      color: "var(--chart-1)",
    },
    "out-of-stock": {
      label: t("dashboard.ecommerce.inventory.outOfStock"),
      color: "var(--destructive)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground text-sm">
          {t("dashboard.ecommerce.inventory.title")}
        </CardTitle>
        <CardDescription className="text-foreground text-xl tabular-nums leading-none tracking-tight">
          {t("dashboard.ecommerce.inventory.available", { percent: availablePercent })}
        </CardDescription>
        <CardAction>
          <ArrowUpRight className="size-4" />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ChartContainer config={chartConfig} className="mx-auto h-30 w-full">
          <PieChart>
            <Pie
              cx="50%"
              cy="100%"
              cornerRadius={6}
              data={gaugeSegments}
              dataKey="value"
              endAngle={0}
              innerRadius={80}
              outerRadius={110}
              paddingAngle={2}
              startAngle={180}
              stroke="var(--card)"
              strokeWidth={1}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text textAnchor="middle" x={viewBox.cx} y={viewBox.cy}>
                        <tspan
                          className="fill-foreground font-medium text-2xl tabular-nums"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 22}
                        >
                          {availablePercent}%
                        </tspan>
                        <tspan className="fill-muted-foreground text-xs" x={viewBox.cx} y={(viewBox.cy || 0) + 38}>
                          {t("dashboard.ecommerce.inventory.availableLabel")}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <Separator />

        <div className="grid grid-cols-3 divide-x">
          {inventorySummary(t).map((item, _index) => (
            <div key={item.label} className="flex flex-col items-center gap-3 text-center">
              <div className="grid size-9 place-items-center rounded-full bg-muted">
                <item.icon className="size-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-muted-foreground text-xs leading-none">{item.label}</div>
                <div className="font-medium text-sm tabular-nums">{item.value.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
