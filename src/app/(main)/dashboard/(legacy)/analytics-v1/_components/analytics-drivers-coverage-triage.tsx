import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getT } from "@/lib/i18n/server";

export async function DriversCoverageTriage() {
  const t = await getT();
  const leverOptions = [
    {
      key: "deal",
      label: "+1 个企业客户",
      value: "+$72,133 加权",
      context: "缺口的 32%",
    },
    {
      key: "conversion",
      label: "+5pp 转化率",
      value: "+$49,182/月",
      context: "缺口的 22%",
    },
    {
      key: "cycle",
      label: "-4 天周期",
      value: "+$90,167/天",
      context: "缺口的 40%",
    },
  ] as const;

  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle>{t("dashboard.legacy.analytics-v1.coverage.title")}</CardTitle>
        <CardDescription>{t("dashboard.legacy.analytics-v1.coverage.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="destructive" className="rounded-md font-medium">
            {t("common.enums.health.At Risk")}
          </Badge>
          <Badge variant="outline" className="font-medium tabular-nums">
            1.9x / 3.0x
          </Badge>
          <Badge variant="outline" className="font-medium tabular-nums">
            {t("dashboard.legacy.analytics-v1.coverage.gap", { value: "$222,930" })}
          </Badge>
          <Badge variant="outline" className="font-medium tabular-nums">
            {t("dashboard.legacy.analytics-v1.coverage.dealsEta", { count: 4, days: 10 })}
          </Badge>
        </div>

        <p className="text-muted-foreground text-xs">{t("dashboard.legacy.analytics-v1.coverage.belowTarget")}</p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {leverOptions.map((lever) => (
            <div key={lever.key} className="space-y-1 rounded-md border bg-muted/20 px-2.5 py-2">
              <p className="text-muted-foreground text-xs">{lever.label}</p>
              <p className="font-semibold text-sm tabular-nums">{lever.value}</p>
              <p className="text-muted-foreground text-xs">{lever.context}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-muted/20 px-3 py-2">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-muted-foreground">
              {t("dashboard.legacy.analytics-v1.coverage.owner")}{" "}
              <span className="font-medium text-foreground">Leila Zhang</span>
            </span>
            <span className="text-muted-foreground">
              {t("dashboard.legacy.analytics-v1.coverage.focus")}{" "}
              <span className="text-foreground">优先填补缺口的商机</span>
            </span>
            <span className="text-muted-foreground">
              {t("dashboard.legacy.analytics-v1.coverage.due")}{" "}
              <span className="text-foreground">下次预测会议之前</span>
            </span>
          </div>
          <Button variant="secondary" size="sm" className="h-7 px-3 text-xs">
            {t("dashboard.legacy.analytics-v1.coverage.openTop5")}
          </Button>
        </div>

        <div className="space-y-1 rounded-md border border-dashed bg-muted/10 px-3 py-2.5">
          <p className="text-muted-foreground text-xs">
            {t("dashboard.legacy.analytics-v1.coverage.fastestPath")}{" "}
            <span className="font-medium text-foreground">-4 天周期</span>{" "}
            {t("dashboard.legacy.analytics-v1.coverage.recovers", { percent: 40 })}
          </p>
          <p className="text-muted-foreground text-xs">
            {t("dashboard.legacy.analytics-v1.coverage.prioritySequence")}{" "}
            <span className="text-foreground">{t("dashboard.legacy.analytics-v1.coverage.cycleTime")}</span>{" "}
            {t("dashboard.legacy.analytics-v1.coverage.beforeNetNew")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
