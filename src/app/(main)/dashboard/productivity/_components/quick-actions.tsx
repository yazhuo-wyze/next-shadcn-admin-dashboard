import { CheckSquare, FileText, Focus, Orbit, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { TFunction } from "@/lib/i18n/dictionary";
import { getT } from "@/lib/i18n/server";

/** 列表是模块级常量、拿不到 t，所以改成接收 t 的函数。 */
const quickActions = (t: TFunction) =>
  [
    { label: t("dashboard.productivity.quickActions.newNote"), icon: FileText },
    { label: t("dashboard.productivity.quickActions.newTask"), icon: CheckSquare },
    { label: t("dashboard.productivity.quickActions.newProject"), icon: Orbit },
    { label: t("dashboard.productivity.quickActions.newGoal"), icon: Focus },
    { label: t("dashboard.productivity.quickActions.upload"), icon: Upload },
  ] as const;

export async function QuickActions() {
  const t = await getT();

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xl tracking-tight">{t("dashboard.productivity.quickActions.title")}</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {quickActions(t).map((action) => (
          <Button key={action.label} variant="outline" className="justify-start">
            <action.icon data-icon="inline-start" />
            {action.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
