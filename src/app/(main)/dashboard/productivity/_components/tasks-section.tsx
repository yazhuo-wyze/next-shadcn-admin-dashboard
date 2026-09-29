"use client";

import * as React from "react";

import { Calendar1, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/lib/i18n/i18n-provider";

type Task = {
  title: string;
  tag: string;
  time: string;
  checked: boolean;
};

const tasks: Task[] = [
  { title: "敲定 Q2 路线图", tag: "工作", time: "10:00 AM", checked: false },
  { title: "复查设计系统改动", tag: "设计", time: "11:30 AM", checked: true },
  { title: "回复重要邮件", tag: "行政", time: "2:00 PM", checked: false },
  { title: "规划本周内容选题", tag: "内容", time: "4:30 PM", checked: false },
  { title: "准备团队周会纪要", tag: "规划", time: "6:00 PM", checked: false },
];

export function TasksSection() {
  const { t } = useI18n();
  const [items, setItems] = React.useState(tasks);

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl tracking-tight">{t("dashboard.productivity.tasks.title")}</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-30">
              <SelectValue placeholder={t("common.time.today")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="today">{t("common.time.today")}</SelectItem>
                <SelectItem value="tomorrow">{t("dashboard.productivity.tasks.filter.tomorrow")}</SelectItem>
                <SelectItem value="this-week">{t("common.time.thisWeek")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button>
            <Plus data-icon="inline-start" />
            {t("dashboard.productivity.tasks.newTask")}
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-background shadow-xs">
        <div className="divide-y">
          {items.map((task) => (
            <div key={task.title} className="flex items-center gap-2 p-4">
              <Checkbox
                checked={task.checked}
                aria-label={task.title}
                onCheckedChange={(checked) => {
                  setItems((current) =>
                    current.map((item) => (item.title === task.title ? { ...item, checked: checked === true } : item)),
                  );
                }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
                    <span className="truncate text-sm">{task.title}</span>
                    <Badge variant="outline" className="px-3 py-1 font-normal">
                      {task.tag}
                    </Badge>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 text-muted-foreground text-sm">
                    <span>{task.time}</span>
                    <Calendar1 className="size-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
