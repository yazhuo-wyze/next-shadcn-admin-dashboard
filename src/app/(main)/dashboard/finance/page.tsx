import { format } from "date-fns";
import { Download, RotateCw, Settings2 } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getT } from "@/lib/i18n/server";

import { BalanceDistributionCard } from "./_components/balance-distribution-card";
import { FinanceNotification } from "./_components/finance-notification";
import { IncomeBreakdown } from "./_components/income-breakdown";
import { OverviewKpis } from "./_components/overview-kpis";
import { QuickActions } from "./_components/quick-actions";
import { TransactionsOverviewCard } from "./_components/transactions-overview-card";
import { UpcomingTransactions } from "./_components/upcoming-transactions";
import { Wallet } from "./_components/wallet";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("dashboard.finance.metadataTitle"),
    description: t("dashboard.finance.metadataDescription"),
    alternates: {
      canonical: "/dashboard/finance",
    },
  };
}

export default async function Page() {
  const t = await getT();
  // 注意：这里的日期格式化使用 date-fns 默认语言（en-US），语言环境本地化属于后续独立阶段，本轮不处理。
  const formattedDate = format(new Date(), "EEEE, do MMMM yyyy");

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl tracking-tight">{t("dashboard.finance.title")}</h1>
        <p className="text-muted-foreground text-sm">{formattedDate}</p>
      </div>

      <Tabs defaultValue="30-days" className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <TabsList variant="line">
            <TabsTrigger value="30-days">{t("dashboard.finance.tab.dashboard")}</TabsTrigger>
            <TabsTrigger value="12-months">{t("dashboard.finance.tab.accounts")}</TabsTrigger>
            <TabsTrigger value="custom">{t("dashboard.finance.tab.transactions")}</TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <RotateCw className="size-4" />
              <span>{t("dashboard.finance.updatedAgo", { minutes: 5 })}</span>
            </div>
            <Button size="sm" variant="outline">
              <Settings2 />
              {t("shell.settings")}
            </Button>
            <Button size="sm" variant="outline">
              <Download data-icon="inline-start" />
              {t("common.actions.export")}
            </Button>
          </div>
        </div>

        <TabsContent value="30-days" className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="xl:col-span-6">
              <OverviewKpis />
            </div>

            <div className="flex flex-col gap-4 xl:col-span-6">
              <IncomeBreakdown />
              <FinanceNotification />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <TransactionsOverviewCard />
            </div>
            <div className="xl:col-span-5">
              <BalanceDistributionCard />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="xl:col-span-4">
              <Wallet />
            </div>
            <div className="xl:col-span-4">
              <UpcomingTransactions />
            </div>
            <div className="xl:col-span-4">
              <QuickActions />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="12-months">
          <div className="flex h-64 items-center justify-center rounded-xl border border-border border-dashed text-muted-foreground">
            {t("dashboard.finance.comingSoon", { tab: t("dashboard.finance.tab.accounts") })}
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <div className="flex h-64 items-center justify-center rounded-xl border border-border border-dashed text-muted-foreground">
            {t("dashboard.finance.comingSoon", { tab: t("dashboard.finance.tab.transactions") })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
