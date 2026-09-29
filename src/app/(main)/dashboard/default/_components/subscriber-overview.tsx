"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/i18n-provider";

import customersData from "./data.json";
import type { RecentCustomerRow } from "./recent-customers-table/schema";
import { RecentCustomersTable } from "./recent-customers-table/table";

const customers = customersData as RecentCustomerRow[];

export function SubscriberOverview() {
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="leading-none">
          {t("dashboard.default.subscriber.customers", { count: "18,426" })}
        </CardTitle>
        <CardDescription>{t("dashboard.default.subscriber.description")}</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            <Download />
            {t("common.actions.export")}
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="pt-0">
        <RecentCustomersTable data={customers} />
      </CardContent>
    </Card>
  );
}
