import { ArrowUp, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getT } from "@/lib/i18n/server";

export async function KpiCards() {
  const t = await getT();

  return (
    <section className="space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t("dashboard.academy.kpi.studentsTaught")}</CardTitle>
            <CardAction>
              <Info className="size-3 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-3xl text-foreground leading-none tracking-tight">128</span>
              <Badge className="rounded-sm border-green-600/50 bg-green-500/10 px-1 font-normal text-green-700 text-xs dark:border-green-800/50 dark:bg-green-500/15 dark:text-green-300">
                <ArrowUp />
                2.8%
              </Badge>
            </div>
            <div className="text-right text-muted-foreground text-xs">
              {t("dashboard.academy.kpi.studentsTaughtHint", { count: 5 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t("dashboard.academy.kpi.avgAttendance")}</CardTitle>
            <CardAction>
              <Info className="size-3 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-3xl text-foreground leading-none tracking-tight">94.2%</span>
              <Badge className="rounded-sm border-green-600/50 bg-green-500/10 px-1 font-normal text-green-700 text-xs dark:border-green-800/50 dark:bg-green-500/15 dark:text-green-300">
                <ArrowUp />
                1.1%
              </Badge>
            </div>
            <div className="text-right text-muted-foreground text-xs">{t("common.time.vsLastMonth")}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t("dashboard.academy.kpi.assignments")}</CardTitle>
            <CardAction>
              <Info className="size-3 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="text-3xl text-foreground leading-none tracking-tight">81</div>

            <div className="text-right text-muted-foreground text-xs">
              {t("dashboard.academy.kpi.assignmentsHint", { pending: 63, overdue: 18 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">{t("dashboard.academy.kpi.classesToday")}</CardTitle>
            <CardAction>
              <Info className="size-3 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="text-3xl text-foreground leading-none tracking-tight">5</div>

            <div className="text-right text-muted-foreground text-xs">
              {t("dashboard.academy.kpi.classesTodayHint", { inProgress: 1, upcoming: 3, cancelled: 1 })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
