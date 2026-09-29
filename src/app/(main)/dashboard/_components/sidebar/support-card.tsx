"use client";

import Link from "next/link";

import { siX } from "simple-icons";

import { SimpleIcon } from "@/components/simple-icon";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/i18n-provider";

/**
 * 注意：本组件被客户端组件 app-sidebar 渲染，所以必须是客户端组件，
 * 用 useI18n() 而不是服务端的 getT()。
 */
export function SupportCard() {
  const { t } = useI18n();

  return (
    <Card size="sm" className="overflow-hidden shadow-none group-data-[collapsible=icon]:hidden">
      <CardHeader className="min-w-0 px-4">
        <CardTitle className="truncate text-sm">{t("support.title")}</CardTitle>
        <CardDescription className="line-clamp-3">
          {t("support.body")}
          {"\u00A0"}
          <Link
            href="https://x.com/arhamkhnz"
            target="_blank"
            rel="noreferrer"
            aria-label={t("support.ctaX")}
            className="inline-flex items-center text-foreground"
          >
            <SimpleIcon icon={siX} aria-hidden className="size-3 fill-foreground" />
          </Link>
          {"\u00A0"}
          {t("support.orBy")}{" "}
          <Link
            href="https://github.com/arhamkhnz#want-to-connect"
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:underline"
          >
            {t("support.emailLabel")}
          </Link>
          {t("support.suffix")}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
