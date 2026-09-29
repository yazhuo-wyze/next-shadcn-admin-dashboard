import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getT } from "@/lib/i18n/server";
import { formatCurrency } from "@/lib/utils";

const NEXT_INTERVENTIONS = [
  {
    dealId: "OPP-489",
    priority: "Escalate",
    owner: "Leila Zhang",
    risk: 81,
    recommendation: "参加下一次客户电话会议并重设成交计划。",
  },
  {
    dealId: "OPP-475",
    priority: "Coach",
    owner: "Omar Ali",
    risk: 76,
    recommendation: "复盘商机策略并打通阶段出口。",
  },
  {
    dealId: "OPP-447",
    priority: "Coach",
    owner: "Sofia Bautista",
    risk: 75,
    recommendation: "复盘商机策略并打通阶段出口。",
  },
] as const;

export async function ActionsManagerQueue() {
  const t = await getT();

  return (
    <Card className="h-full shadow-xs">
      <CardHeader>
        <CardTitle>{t("dashboard.legacy.analytics-v1.actions.title")}</CardTitle>
        <CardDescription>{t("dashboard.legacy.analytics-v1.actions.description")}</CardDescription>
      </CardHeader>

      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex h-full flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <StatCard label={t("dashboard.legacy.analytics-v1.actions.actionableDeals")} value="7" />
            <StatCard
              label={t("dashboard.legacy.analytics-v1.actions.revenueInPlay")}
              value={formatCurrency(811000, { noDecimals: true })}
              mono
            />
            <StatCard label={t("dashboard.legacy.analytics-v1.actions.ownersEngaged")} value="3" />
            <StatCard label={t("dashboard.legacy.analytics-v1.actions.medianRisk")} value="72" mono />
          </div>

          <div className="space-y-2 rounded-md border bg-muted/20 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-muted-foreground text-xs">
                {t("dashboard.legacy.analytics-v1.actions.interventionMix")}
              </p>
              <Badge variant="outline" className="h-5 px-2 text-[11px] tabular-nums">
                {t("dashboard.legacy.analytics-v1.priority.Escalate")} {formatCurrency(174000, { noDecimals: true })}
              </Badge>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between rounded-md border bg-background/70 px-2.5 py-1.5">
                <span className="text-xs">{t("dashboard.legacy.analytics-v1.priority.Escalate")}</span>
                <span className="text-muted-foreground text-xs tabular-nums">
                  1 个商机 · 14% · {formatCurrency(174000, { noDecimals: true })}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border bg-background/70 px-2.5 py-1.5">
                <span className="text-xs">{t("dashboard.legacy.analytics-v1.priority.Coach")}</span>
                <span className="text-muted-foreground text-xs tabular-nums">
                  4 个商机 · 57% · {formatCurrency(478000, { noDecimals: true })}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border bg-background/70 px-2.5 py-1.5">
                <span className="text-xs">{t("dashboard.legacy.analytics-v1.priority.Reforecast")}</span>
                <span className="text-muted-foreground text-xs tabular-nums">
                  2 个商机 · 29% · {formatCurrency(159000, { noDecimals: true })}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 rounded-md border bg-muted/20 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <p className="text-muted-foreground text-xs">{t("dashboard.legacy.analytics-v1.actions.managerFocus")}</p>
              <span className="text-muted-foreground text-xs tabular-nums">
                {t("dashboard.legacy.analytics-v1.actions.thisForecastCycle")}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-2 rounded-md border bg-background/70 px-2.5 py-1.5">
                <span>{t("dashboard.legacy.analytics-v1.actions.coachQueue")}</span>
                <span className="text-muted-foreground tabular-nums">
                  4 个商机 · {formatCurrency(478000, { noDecimals: true })}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 rounded-md border bg-background/70 px-2.5 py-1.5">
                <span>{t("dashboard.legacy.analytics-v1.actions.primaryOwner")}</span>
                <span className="text-muted-foreground tabular-nums">Leila Zhang · 3 个商机</span>
              </div>

              <div className="flex items-center justify-between gap-2 rounded-md border bg-background/70 px-2.5 py-1.5">
                <span>{t("dashboard.legacy.analytics-v1.actions.stalePipeline")}</span>
                <span className="text-muted-foreground tabular-nums">
                  8 个商机 · {formatCurrency(1151000, { noDecimals: true })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-muted-foreground text-xs">
              {t("dashboard.legacy.analytics-v1.actions.nextInterventions")}
            </p>

            {NEXT_INTERVENTIONS.map((item) => (
              <div key={`${item.priority}-${item.dealId}`} className="space-y-1 rounded-md border px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm">{item.dealId}</span>
                  <Badge variant="outline" className="h-5 px-2 text-[11px]">
                    {t(`dashboard.legacy.analytics-v1.priority.${item.priority}`)}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs">
                  {item.owner} · {item.risk} {t("dashboard.legacy.analytics-v1.actions.risk")}
                </p>
                <p className="text-xs">{item.recommendation}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 rounded-md border bg-muted/20 px-3 py-2">
            <span className="text-muted-foreground text-xs">
              {t("dashboard.legacy.analytics-v1.actions.noActionMonitor")}
            </span>
            <span className="font-medium text-xs tabular-nums">3 个商机</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatCard({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-md border bg-muted/20 px-2.5 py-2">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className={mono ? "font-semibold text-base tabular-nums" : "font-semibold text-base"}>{value}</p>
    </div>
  );
}
