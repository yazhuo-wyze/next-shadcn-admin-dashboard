import type { Metadata } from "next";

import { getT } from "@/lib/i18n/server";

import { KpiCards } from "./_components/kpi-cards";
import { OpportunitiesSection } from "./_components/opportunities-section";
import { PipelineActivity } from "./_components/pipeline-activity";
import { TaskReminders } from "./_components/task-reminders";

// 模块级的 `metadata` 常量拿不到 t（服务端 i18n 需要在请求期读语言偏好），
// 所以改成 `generateMetadata`：页面保持服务端组件，文案跟随语言切换。
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("dashboard.crm.metadataTitle"),
    description: t("dashboard.crm.metadataDescription"),
    alternates: {
      canonical: "/dashboard/crm",
    },
  };
}

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <KpiCards />
      <PipelineActivity />
      <TaskReminders />
      <OpportunitiesSection />
    </div>
  );
}
