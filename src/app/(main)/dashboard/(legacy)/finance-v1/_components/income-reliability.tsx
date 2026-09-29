"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { formatCurrency } from "@/lib/utils";

export function IncomeReliability() {
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.legacy.finance-v1.income.title")}</CardTitle>
        <CardDescription>{t("dashboard.legacy.finance-v1.income.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="space-y-0.5">
          <p className="font-medium text-xl">{t("dashboard.legacy.finance-v1.income.highReliability")}</p>
          <p className="text-muted-foreground text-xs">{t("dashboard.legacy.finance-v1.income.basedOn6Months")}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <p className="font-medium text-lg">{t("dashboard.legacy.finance-v1.income.fixedIncome")}</p>
            <p className="text-muted-foreground text-xs">
              {t("dashboard.legacy.finance-v1.income.recurringPredictable")}
            </p>
          </div>
          <p className="font-medium text-lg">{formatCurrency(90000, { noDecimals: true })}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <p className="font-medium text-lg">{t("dashboard.legacy.finance-v1.income.variableIncome")}</p>
            <p className="text-muted-foreground text-xs">
              {t("dashboard.legacy.finance-v1.income.fluctuatingSources")}
            </p>
          </div>
          <p className="font-medium text-lg">{formatCurrency(46500, { noDecimals: true })}</p>
        </div>
        <Separator />
        <p className="text-muted-foreground text-xs">
          {t("dashboard.legacy.finance-v1.income.consistencyTrend")}{" "}
          <span className="font-medium text-primary">{t("dashboard.legacy.finance-v1.income.stable")}</span>
        </p>
      </CardContent>
    </Card>
  );
}
