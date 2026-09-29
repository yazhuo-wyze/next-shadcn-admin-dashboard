import { addDays, format } from "date-fns";
import { ClipboardCheck, Globe, Orbit, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TFunction } from "@/lib/i18n/dictionary";
import { getT } from "@/lib/i18n/server";

const today = new Date();

/** 项目数据是模块级常量、拿不到 t，所以改成接收 t 的函数。 */
const projects = (t: TFunction) =>
  [
    {
      title: "Q2 路线图",
      status: t("dashboard.productivity.projects.status.inProgress"),
      description: "做得更好，交付更快。",
      progress: 68,
      due: t("dashboard.productivity.projects.due", { date: format(addDays(today, 9), "MMM d") }),
      icon: Orbit,
    },
    {
      title: "网站改版",
      status: t("dashboard.productivity.projects.status.planning"),
      description: "清爽、现代、够快。",
      progress: 42,
      due: t("dashboard.productivity.projects.due", { date: format(addDays(today, 21), "MMM d") }),
      icon: Globe,
    },
    {
      title: "新用户引导",
      status: t("dashboard.productivity.projects.status.planning"),
      description: "精简首次使用步骤。",
      progress: 31,
      due: t("dashboard.productivity.projects.due", { date: format(addDays(today, 18), "MMM d") }),
      icon: ClipboardCheck,
    },
  ] as const;

export async function ProjectsSection() {
  const t = await getT();
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl tracking-tight">{t("dashboard.productivity.projects.title")}</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="active">
            <SelectTrigger className="w-28">
              <SelectValue placeholder={t("dashboard.productivity.projects.filter.active")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="active">{t("dashboard.productivity.projects.filter.active")}</SelectItem>
                <SelectItem value="planning">{t("dashboard.productivity.projects.filter.planning")}</SelectItem>
                <SelectItem value="completed">{t("dashboard.productivity.projects.filter.completed")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Plus data-icon="inline-start" />
            {t("dashboard.productivity.projects.new")}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {projects(t).map((project) => (
          <Card key={project.title} className="shadow-xs">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <project.icon className="size-4 text-muted-foreground" />
                  <span>{project.title}</span>
                </div>
              </CardTitle>
              <CardAction>
                <Badge variant="outline">{project.status}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <div className="text-sm leading-none">{project.description}</div>
                <div className="flex items-center gap-3">
                  <Progress value={project.progress} className="h-2" />
                  <span className="shrink-0 text-sm">{project.progress}%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="py-2.5">
              <span className="text-muted-foreground">{project.due}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
