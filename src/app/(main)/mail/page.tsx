import type { Metadata } from "next";

import { getT } from "@/lib/i18n/server";
import { getValueFromCookie } from "@/server/server-actions";

import { mails } from "./_components/data";
import { MailComponent } from "./_components/mail";
import { DEFAULT_MAIL_LAYOUT, MAIL_LAYOUT_COOKIE } from "./_components/mail-layout-config";

// 模块级的 `metadata` 常量拿不到 t，改成 generateMetadata 让标题跟随语言切换。
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("mail.metadataTitle"),
    description: t("mail.metadataDescription"),
    alternates: {
      canonical: "/mail",
    },
  };
}

export default async function Page() {
  const layoutCookie = await getValueFromCookie(MAIL_LAYOUT_COOKIE);

  return (
    <div className="h-dvh min-h-0 overflow-hidden">
      <MailComponent mails={mails} defaultLayout={layoutCookie ? JSON.parse(layoutCookie) : [...DEFAULT_MAIL_LAYOUT]} />
    </div>
  );
}
