import type { Metadata } from "next";

import { getT } from "@/lib/i18n/server";

import { tasks } from "./_components/data";
import { Tasks } from "./_components/tasks";

// 模块级的 `metadata` 常量拿不到 t（服务端 i18n 需要在请求期读语言偏好），
// 所以改成 `generateMetadata`：页面保持服务端组件，文案跟随语言切换。
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("dashboard.tasks.metadataTitle"),
    description: t("dashboard.tasks.metadataDescription"),
    alternates: {
      canonical: "/dashboard/tasks",
    },
  };
}

export default async function Page() {
  const t = await getT();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-3xl tracking-tight">{t("dashboard.tasks.greeting")}</h2>
        <p className="text-muted-foreground">{t("dashboard.tasks.subtitle")}</p>
      </div>
      <Tasks data={tasks} />
    </div>
  );
}
