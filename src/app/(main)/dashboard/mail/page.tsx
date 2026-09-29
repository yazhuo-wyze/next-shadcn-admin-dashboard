import Link from "next/link";

import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { getT } from "@/lib/i18n/server";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default async function Page() {
  const t = await getT();

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-medium text-sm leading-none">{t("mail.preview.title")}</h1>
          <p className="text-muted-foreground text-sm">{t("mail.preview.description")}</p>
        </div>
        <Button asChild variant="ghost" size="icon-sm">
          <Link
            href="/mail"
            prefetch={false}
            target="_blank"
            rel="noreferrer"
            aria-label={t("mail.preview.openInNewTab")}
          >
            <ExternalLink />
          </Link>
        </Button>
      </div>

      <iframe src="/mail" title={t("mail.preview.title")} className="min-h-0 flex-1 rounded-lg border bg-background" />
    </div>
  );
}
