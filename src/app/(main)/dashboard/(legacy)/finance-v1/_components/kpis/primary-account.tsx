"use client";

import { WalletMinimal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { formatCurrency } from "@/lib/utils";

export function PrimaryAccount() {
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-content-center rounded-sm bg-muted">
              <WalletMinimal className="size-5" />
            </span>
            {t("dashboard.legacy.finance-v1.kpi.primaryAccount")}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-0.5">
          <p className="font-medium text-xl tabular-nums">{formatCurrency(12450, { noDecimals: true })}</p>

          <p className="text-muted-foreground text-xs">{t("dashboard.legacy.finance-v1.kpi.availableBalance")}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button className="flex-1" size="sm">
            {t("dashboard.legacy.finance-v1.kpi.pay")}
          </Button>
          <Button className="flex-1" size="sm" variant="outline">
            {t("dashboard.legacy.finance-v1.kpi.request")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
