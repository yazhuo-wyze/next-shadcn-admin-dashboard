"use client";

import * as React from "react";

import { Label, Pie, PieChart } from "recharts";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TFunction } from "@/lib/i18n/dictionary";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { formatCurrency } from "@/lib/utils";

type BalanceKey = "investment" | "main" | "reserve" | "savings";

// 账户名属于演示数据，直接写中文，不参与语言切换。
const balanceData: {
  account: string;
  amount: number;
  key: BalanceKey;
  percentage: number;
}[] = [
  {
    account: "主钱包",
    amount: 122_540,
    key: "main",
    percentage: 52.2,
  },
  {
    account: "储蓄账户",
    amount: 48_320,
    key: "savings",
    percentage: 20.6,
  },
  {
    account: "投资账户",
    amount: 36_780,
    key: "investment",
    percentage: 15.7,
  },
  {
    account: "储备账户",
    amount: 27_256,
    key: "reserve",
    percentage: 11.5,
  },
];

/**
 * 注意：该 chartConfig 被模块级函数 `getAccountColor` 引用，无法移入组件，
 * 因此这些 label 用与演示数据一致的中文。实际渲染时 tooltip 的 nameKey="account"，
 * 取的是数据里的账户名，这里的 label 不参与展示。
 */
const chartConfig = {
  amount: {
    label: "余额",
  },
  investment: {
    color: "var(--chart-1)",
    label: "投资账户",
  },
  main: {
    color: "var(--chart-2)",
    label: "主钱包",
  },
  reserve: {
    color: "var(--chart-3)",
    label: "储备账户",
  },
  savings: {
    color: "var(--chart-4)",
    label: "储蓄账户",
  },
} satisfies ChartConfig;

/** 货币选项的 value（EUR/GBP/USD）参与类型与筛选，不能翻译，只本地化 label。 */
const currencies = (t: TFunction) =>
  ({
    EUR: {
      label: t("dashboard.finance.allocation.eurBalance"),
    },
    GBP: {
      label: t("dashboard.finance.allocation.gbpBalance"),
    },
    USD: {
      label: t("dashboard.finance.allocation.usdBalance"),
    },
  }) as const;

type Currency = keyof ReturnType<typeof currencies>;

const getAccountColor = (key: BalanceKey) => {
  const config = chartConfig[key];

  return "color" in config ? config.color : undefined;
};

const chartData = balanceData.map((item) => ({
  ...item,
  fill: getAccountColor(item.key),
}));
const totalBalance = balanceData.reduce((total, item) => total + item.amount, 0);

export function BalanceDistributionCard() {
  const { t } = useI18n();
  const [currency, setCurrency] = React.useState<Currency>("USD");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-normal">{t("dashboard.finance.allocation.title")}</CardTitle>
        <CardAction>
          <Select onValueChange={(value) => setCurrency(value as Currency)} value={currency}>
            <SelectTrigger className="w-36" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(currencies(t)).map(([value, item]) => (
                  <SelectItem key={value} value={value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="grid items-center gap-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-50">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="w-52" nameKey="account" />}
            />
            <Pie
              cornerRadius={6}
              data={chartData}
              dataKey="amount"
              innerRadius={65}
              nameKey="account"
              outerRadius={90}
              paddingAngle={2}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (!(viewBox && "cx" in viewBox && "cy" in viewBox)) {
                    return null;
                  }

                  return (
                    <text dominantBaseline="middle" textAnchor="middle" x={viewBox.cx} y={viewBox.cy}>
                      <tspan className="fill-muted-foreground text-xs" x={viewBox.cx} y={(viewBox.cy ?? 0) - 8}>
                        {t("dashboard.finance.allocation.total")}
                      </tspan>
                      <tspan
                        className="fill-foreground font-medium text-lg tabular-nums"
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 14}
                      >
                        {formatCurrency(totalBalance, { currency, noDecimals: true })}
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex min-w-0 flex-col gap-3">
          {chartData.map((item) => (
            <div className="grid grid-cols-[1fr_auto] items-end gap-3" key={item.key}>
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-1">
                  <span aria-hidden="true" className="h-2 w-1 rounded-full" style={{ backgroundColor: item.fill }} />
                  <p className="truncate text-muted-foreground text-xs">{item.account}</p>
                </div>
                <p className="font-medium tabular-nums">
                  {formatCurrency(item.amount, { currency, noDecimals: true })}
                </p>
              </div>
              <div className="font-medium tabular-nums">{item.percentage}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
