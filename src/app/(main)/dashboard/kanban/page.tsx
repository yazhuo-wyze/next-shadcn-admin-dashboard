import type { Metadata } from "next";

import { getT } from "@/lib/i18n/server";

import { initialBoard } from "./_components/data";
import { Kanban } from "./_components/kanban";

// 模块级的 `metadata` 常量拿不到 t（服务端 i18n 需要在请求期读语言偏好），
// 所以改成 `generateMetadata`：页面保持服务端组件，文案跟随语言切换。
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("dashboard.kanban.metadataTitle"),
    description: t("dashboard.kanban.metadataDescription"),
    alternates: {
      canonical: "/dashboard/kanban",
    },
  };
}

export default function Page() {
  return (
    <div data-content-padding="false">
      <Kanban initialBoard={initialBoard} />
    </div>
  );
}
