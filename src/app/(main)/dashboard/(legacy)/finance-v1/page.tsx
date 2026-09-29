import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getT } from "@/lib/i18n/server";

import { CardOverview } from "./_components/card-overview";
import { CashFlowOverview } from "./_components/cash-flow-overview";
import { IncomeReliability } from "./_components/income-reliability";
import { MonthlyCashFlow } from "./_components/kpis/monthly-cash-flow";
import { NetWorth } from "./_components/kpis/net-worth";
import { PrimaryAccount } from "./_components/kpis/primary-account";
import { SavingsRate } from "./_components/kpis/savings-rate";
import { SpendingBreakdown } from "./_components/spending-breakdown";

export default async function Page() {
  const t = await getT();

  return (
    <div>
      <Tabs className="gap-4" defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{t("dashboard.legacy.finance-v1.tab.overview")}</TabsTrigger>
          <TabsTrigger disabled value="activity">
            {t("dashboard.legacy.finance-v1.tab.activity")}
          </TabsTrigger>
          <TabsTrigger disabled value="insights">
            {t("dashboard.legacy.finance-v1.tab.insights")}
          </TabsTrigger>
          <TabsTrigger disabled value="utilities">
            {t("dashboard.legacy.finance-v1.tab.utilities")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="flex flex-col gap-4 **:data-[slot=card]:shadow-xs">
            <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:gap-2 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
              <PrimaryAccount />
              <NetWorth />
              <MonthlyCashFlow />
              <SavingsRate />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
              <div className="flex flex-col gap-4">
                <CashFlowOverview />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <SpendingBreakdown />
                  <IncomeReliability />
                </div>
              </div>

              <CardOverview />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
