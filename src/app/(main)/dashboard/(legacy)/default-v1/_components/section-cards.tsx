import { TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getT } from "@/lib/i18n/server";

export async function SectionCards() {
  const t = await getT();

  return (
    <div className="grid @5xl/main:grid-cols-4 @xl/main:grid-cols-2 grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("dashboard.legacy.default-v1.cards.totalRevenue")}</CardDescription>
          <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">$1,250.00</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {t("dashboard.legacy.default-v1.cards.trendingUpThisMonth")} <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">{t("dashboard.legacy.default-v1.cards.visitorsLast6Months")}</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("dashboard.legacy.default-v1.cards.newCustomers")}</CardDescription>
          <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">1,234</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {t("dashboard.legacy.default-v1.cards.down20ThisPeriod")} <TrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {t("dashboard.legacy.default-v1.cards.acquisitionNeedsAttention")}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("dashboard.legacy.default-v1.cards.activeAccounts")}</CardDescription>
          <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">45,678</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {t("dashboard.legacy.default-v1.cards.strongUserRetention")} <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">{t("dashboard.legacy.default-v1.cards.engagementExceedTargets")}</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("dashboard.legacy.default-v1.cards.growthRate")}</CardDescription>
          <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl tabular-nums">4.5%</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {t("dashboard.legacy.default-v1.cards.steadyPerformanceIncrease")} <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">{t("dashboard.legacy.default-v1.cards.meetsGrowthProjections")}</div>
        </CardFooter>
      </Card>
    </div>
  );
}
