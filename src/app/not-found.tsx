"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/i18n-provider";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="flex h-dvh flex-col items-center justify-center space-y-2 text-center">
      <h1 className="font-semibold text-2xl">{t("app.notFound.title")}</h1>
      <p className="text-muted-foreground">{t("app.notFound.description")}</p>
      <Link prefetch={false} replace href="/dashboard/default">
        <Button variant="outline">{t("app.notFound.goBackHome")}</Button>
      </Link>
    </div>
  );
}
