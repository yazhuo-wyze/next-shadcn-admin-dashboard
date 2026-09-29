import type { Metadata } from "next";

import { getT } from "@/lib/i18n/server";

import { Logistics } from "./_components/logistics";

// Import this stylesheet in any page or component that renders country flag classes.
import "@/styles/flag-icons/flags.css";

// 模块级的 `metadata` 常量拿不到 t（服务端 i18n 需要在请求期读语言偏好），
// 所以改成 `generateMetadata`：页面保持服务端组件，文案跟随语言切换。
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("dashboard.logistics.metadataTitle"),
    description: t("dashboard.logistics.metadataDescription"),
    alternates: {
      canonical: "/dashboard/logistics",
    },
  };
}

export default function Page() {
  return <Logistics />;
}
