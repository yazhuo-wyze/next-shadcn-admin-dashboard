import type { Metadata } from "next";

import { getT } from "@/lib/i18n/server";

import { Chat } from "./_components/chat";
import { conversations } from "./_components/data";

// 模块级的 `metadata` 常量拿不到 t，改成 generateMetadata 让标题跟随语言切换。
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("chat.metadataTitle"),
    description: t("chat.metadataDescription"),
    alternates: {
      canonical: "/chat",
    },
  };
}

export default function Page() {
  return <Chat conversations={conversations} />;
}
