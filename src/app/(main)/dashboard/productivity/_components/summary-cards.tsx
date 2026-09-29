import { ArrowRight, Clock3, Focus, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TFunction } from "@/lib/i18n/dictionary";
import { getT } from "@/lib/i18n/server";

/** 卡片数据是模块级常量、拿不到 t，所以改成接收 t 的函数。 */
const summaryCards = (t: TFunction) =>
  [
    {
      title: t("common.time.today"),
      value: "4",
      description: t("dashboard.productivity.summary.tasksScheduled"),
      icon: Clock3,
    },
    {
      title: t("common.time.thisWeek"),
      value: "68%",
      description: t("dashboard.productivity.summary.progress"),
      icon: TrendingUp,
    },
    {
      title: t("dashboard.productivity.summary.focus"),
      value: t("dashboard.productivity.summary.focusValue"),
      description: t("dashboard.productivity.summary.focusRemaining", { hours: 2 }),
      icon: Focus,
    },
  ] as const;

export async function SummaryCards() {
  const t = await getT();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {summaryCards(t).map((item) => (
        <Card key={item.title} className="shadow-xs">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <div className="grid size-7 place-items-center rounded-lg border bg-muted">
                  <item.icon className="size-4" />
                </div>
                {item.title}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="text-2xl leading-none tracking-tight">{item.value}</div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground tabular-nums leading-none">{item.description}</p>
                <ArrowRight className="size-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
