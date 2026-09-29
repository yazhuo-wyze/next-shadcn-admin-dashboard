import { format, isToday, isYesterday, subDays } from "date-fns";
import { BookOpen, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TFunction } from "@/lib/i18n/dictionary";
import { getT } from "@/lib/i18n/server";

const today = new Date();

/** 相对日期的两档文案要跟随语言，所以改成接收 t。 */
function formatNoteDate(t: TFunction, date: Date) {
  if (isToday(date)) return t("common.time.today");
  if (isYesterday(date)) return t("common.time.yesterday");
  return format(date, "MMM d");
}

export async function RecentNotesCard() {
  const t = await getT();

  const recentNotes = [
    { title: "可复用的设计原则", date: formatNoteDate(t, today), icon: FileText },
    { title: `内容灵感 – ${format(today, "MMMM")}`, date: formatNoteDate(t, subDays(today, 1)), icon: FileText },
    { title: "本周复盘", date: formatNoteDate(t, subDays(today, 4)), icon: FileText },
    { title: "我正在读的书", date: formatNoteDate(t, subDays(today, 5)), icon: BookOpen },
  ] as const;

  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle>{t("dashboard.productivity.notes.title")}</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            {t("dashboard.productivity.viewAll")}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {recentNotes.map((note) => (
          <div key={note.title} className="flex items-start gap-4">
            <note.icon className="size-5 text-muted-foreground" />
            <div className="min-w-0">
              <div className="truncate font-medium text-sm leading-none">{note.title}</div>
              <div className="text-muted-foreground text-xs">{note.date}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
