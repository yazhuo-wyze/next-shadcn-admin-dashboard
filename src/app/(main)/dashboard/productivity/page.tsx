import type { Metadata } from "next";

import { getT } from "@/lib/i18n/server";

import { CalendarPanel } from "./_components/calendar-panel";
import { FocusCard } from "./_components/focus-card";
import { ProjectsSection } from "./_components/projects-section";
import { QuickActions } from "./_components/quick-actions";
import { QuoteCard } from "./_components/quote-card";
import { RecentNotesCard } from "./_components/recent-notes-card";
import { SummaryCards } from "./_components/summary-cards";
import { TasksSection } from "./_components/tasks-section";
import { WeeklySummaryCard } from "./_components/weekly-summary-card";

/**
 * 页面标题/描述是模块级常量，拿不到 t，所以改成 generateMetadata 异步函数。
 * alternates 与语言无关，原样保留。
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("dashboard.productivity.metadataTitle"),
    description: t("dashboard.productivity.metadataDescription"),
    alternates: {
      canonical: "/dashboard/productivity",
    },
  };
}

export default async function Page() {
  const t = await getT();

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <section className="lg:col-span-9">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl text-foreground leading-none tracking-tight">
              {t("dashboard.productivity.greeting")}
            </h1>
            <p className="text-lg text-muted-foreground leading-none">{t("dashboard.productivity.subtitle")}</p>
          </div>
          <SummaryCards />
          <TasksSection />
          <ProjectsSection />
          <QuickActions />
          <QuoteCard />
        </div>
      </section>

      <section className="flex flex-col gap-6 lg:col-span-3">
        <CalendarPanel />
        <FocusCard />
        <RecentNotesCard />
        <WeeklySummaryCard />
      </section>
    </div>
  );
}
