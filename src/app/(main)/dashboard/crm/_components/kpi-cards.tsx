import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { getT } from "@/lib/i18n/server";

export async function KpiCards() {
  const t = await getT();

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-3xl tracking-tight">{t("dashboard.crm.kpi.title")}</h2>
        <p className="text-muted-foreground text-sm">{t("dashboard.crm.kpi.description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>{t("dashboard.crm.kpi.leadPipelineValue")}</CardDescription>
            <CardAction>
              <ArrowUpRight className="size-4" />
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none tracking-tight">$284,500</span>

              <Badge
                variant="outline"
                className="border-green-200 bg-green-500/10 text-green-700 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300"
              >
                <TrendingUp />
                +12%
              </Badge>
            </div>
            <p className="text-sm">
              <span className="font-medium text-foreground">$254,200</span>{" "}
              <span className="text-muted-foreground">{t("common.time.lastMonth")}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>{t("dashboard.crm.kpi.qualifiedLeadRate")}</CardDescription>
            <CardAction>
              <ArrowUpRight className="size-4" />
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none tracking-tight">28.4%</span>

              <Badge variant="outline" className="border-destructive/20 bg-destructive/10 text-destructive">
                <TrendingDown />
                -2.5%
              </Badge>
            </div>
            <p className="text-sm">
              <span className="font-medium text-foreground">30.9%</span>{" "}
              <span className="text-muted-foreground">{t("common.time.lastMonth")}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>{t("dashboard.crm.kpi.openOpportunities")}</CardDescription>
            <CardAction>
              <ArrowUpRight className="size-4" />
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none tracking-tight">42</span>

              <Badge
                variant="outline"
                className="border-green-200 bg-green-500/10 text-green-700 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300"
              >
                <TrendingUp />
                +7
              </Badge>
            </div>
            <p className="text-sm">
              <span className="font-medium text-foreground">35</span>{" "}
              <span className="text-muted-foreground">{t("common.time.lastMonth")}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>{t("dashboard.crm.kpi.leadToDealRate")}</CardDescription>
            <CardAction>
              <ArrowUpRight className="size-4" />
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl leading-none tracking-tight">18.1%</span>

              <Badge
                variant="outline"
                className="border-green-200 bg-green-500/10 text-green-700 dark:border-green-900/40 dark:bg-green-500/15 dark:text-green-300"
              >
                <TrendingUp />
                +1.6%
              </Badge>
            </div>
            <p className="text-sm">
              <span className="font-medium text-foreground">16.5%</span>{" "}
              <span className="text-muted-foreground">{t("common.time.lastMonth")}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
