"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { formatCurrency } from "@/lib/utils";

/** 分类名是界面标签，交给词条；金额保持原样。 */
const expenses = [
  { key: "housing", amount: 1650 },
  { key: "utilities", amount: 420 },
  { key: "groceries", amount: 560 },
  { key: "transportation", amount: 740 },
  { key: "subscriptions", amount: 260 },
  { key: "healthcare", amount: 390 },
  { key: "other", amount: 980 },
];

export function SpendingBreakdown() {
  const { t } = useI18n();
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.legacy.finance-v1.spending.title")}</CardTitle>
        <CardDescription>{t("dashboard.legacy.finance-v1.spending.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="font-medium text-2xl">{formatCurrency(total, { noDecimals: true })}</div>
          <div className="flex h-6 w-full overflow-hidden rounded-md">
            {expenses.map((item, index) => {
              const width = (item.amount / total) * 100;
              const alpha = Math.max(0.35, 1 - index * 0.08);

              return (
                <div
                  key={item.key}
                  className="h-full shrink-0 border-background border-l first:border-l-0"
                  style={{
                    width: `${width}%`,
                    background: `color-mix(in oklch, var(--primary) ${alpha * 100}%, transparent)`,
                  }}
                  title={`${t(`dashboard.legacy.finance-v1.spending.category.${item.key}`)}: ${formatCurrency(item.amount)}`}
                />
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          {expenses.map((item, index) => {
            const pct = Math.round((item.amount / total) * 100);
            const alpha = Math.max(0.35, 1 - index * 0.08);

            return (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="size-3 rounded-sm"
                    style={{
                      background: `color-mix(in oklch, var(--primary) ${alpha * 100}%, transparent)`,
                    }}
                  />
                  <span className="text-muted-foreground text-sm">
                    {t(`dashboard.legacy.finance-v1.spending.category.${item.key}`)}
                  </span>
                </div>

                <span className="font-medium text-sm tabular-nums">{pct}%</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
