import type { Metadata } from "next";

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
    <div className="flex h-full flex-col items-center justify-center space-y-2 text-center">
      <h1 className="font-semibold text-2xl">{t("dashboard.comingSoon.title")}</h1>
      <p className="text-muted-foreground">{t("dashboard.comingSoon.description")}</p>
    </div>
  );
}
