import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getT } from "@/lib/i18n/server";

export async function WeeklySummaryCard() {
  const t = await getT();

  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle>{t("common.time.thisWeek")}</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            {t("dashboard.productivity.viewAll")}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-muted-foreground">{t("dashboard.productivity.weekly.motivation")}</p>
        <div className="flex flex-col gap-2">
          <div className="font-medium">{t("dashboard.productivity.weekly.goalsCompleted", { done: 4, total: 6 })}</div>
          <Progress value={66} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
