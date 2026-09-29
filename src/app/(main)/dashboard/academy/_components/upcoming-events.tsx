import { addDays, format } from "date-fns";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getT } from "@/lib/i18n/server";

const upcomingEvents = [
  {
    dayOffset: 6,
    title: "科学展",
    time: "08:30 AM - 12:30 PM",
    type: "校内",
  },
  {
    dayOffset: 9,
    title: "家长晚会",
    time: "02:00 PM - 05:00 PM",
    type: "会议",
  },
  {
    dayOffset: 12,
    title: "院际运动日",
    time: "09:00 AM - 04:00 PM",
    type: "体育",
  },
  {
    dayOffset: 15,
    title: "11 年级模拟考",
    time: "09:00 AM - 12:00 PM",
    type: "考试",
  },
  {
    dayOffset: 18,
    title: "学科组教研会议",
    time: "03:30 PM - 04:30 PM",
    type: "会议",
  },
];

export async function UpcomingEvents() {
  const t = await getT();
  const today = new Date();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{t("dashboard.academy.upcomingEvents.title")}</CardTitle>
        <CardAction className="flex items-center gap-1 text-muted-foreground text-xs">
          {t("dashboard.academy.upcomingEvents.viewCalendar")} <ArrowRight className="size-4" />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {upcomingEvents.map((event) => {
          const eventDate = addDays(today, event.dayOffset);

          return (
            <div key={event.title} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="size-11 shrink-0 overflow-hidden rounded-sm border">
                  <div className="grid h-1/3 place-items-center border-b bg-muted font-medium text-[10px] uppercase leading-none">
                    {format(eventDate, "MMM")}
                  </div>
                  <div className="grid h-2/3 place-items-center text-lg leading-none">{format(eventDate, "d")}</div>
                </div>

                <div className="flex min-w-0 flex-col gap-1">
                  <div className="truncate font-medium text-sm leading-none">{event.title}</div>
                  <div className="text-muted-foreground text-xs leading-none">{event.time}</div>
                </div>
              </div>
              <Badge variant="outline" className="shrink-0 rounded-md px-2.5 py-1 font-medium text-[10px]">
                {event.type}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
