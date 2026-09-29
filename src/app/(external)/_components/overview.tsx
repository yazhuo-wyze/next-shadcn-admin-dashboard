import Link from "next/link";

import { getT } from "@/lib/i18n/server";

// 功能页名称沿用导航里已有的译法，避免同一入口出现两种中文说法。
const includedScreens = [
  { id: "analytics", href: "/dashboard/analytics" },
  { id: "crm", href: "/dashboard/crm" },
  { id: "finance", href: "/dashboard/finance" },
  { id: "ecommerce", href: "/dashboard/ecommerce" },
  { id: "productivity", href: "/dashboard/productivity" },
  { id: "fileManager", href: "/dashboard/file-manager" },
  { id: "calendar", href: "/dashboard/calendar" },
];

const editions = [
  {
    name: "Radix UI",
    repository: "https://github.com/arhamkhnz/next-shadcn-admin-dashboard",
  },
  {
    name: "Base UI",
    repository: "https://github.com/arhamkhnz/next-shadcn-admin-dashboard-baseui",
  },
  {
    name: "React Aria",
    repository: "https://github.com/arhamkhnz/next-shadcn-admin-dashboard-aria",
  },
  {
    name: "TanStack Start",
    repository: "https://github.com/arhamkhnz/tanstack-shadcn-admin-dashboard",
  },
];

export async function Overview() {
  const t = await getT();

  return (
    <section aria-labelledby="overview-title">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:gap-16">
        <div className="flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col gap-4">
            <p className="font-medium text-muted-foreground text-xs">{t("landing.overview.about")}</p>
            <h2 className="text-pretty text-xl leading-7 tracking-tight" id="overview-title">
              {t("landing.overview.title")}
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-medium text-muted-foreground text-xs">{t("landing.overview.makeItYours")}</p>
            <p className="text-muted-foreground text-sm leading-6">{t("landing.overview.makeItYoursBody")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-muted-foreground text-xs">{t("landing.overview.featuredScreens")}</h3>
            <ul className="flex flex-col gap-1 text-sm">
              {includedScreens.map((screen) => (
                <li key={screen.id}>
                  <Link
                    className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                    href={screen.href}
                    prefetch={false}
                  >
                    {t(`nav.item.${screen.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4" id="variants">
            <h3 className="font-medium text-muted-foreground text-xs">{t("landing.overview.editions")}</h3>
            <ul className="flex flex-col gap-1 text-sm">
              {editions.map((edition) => (
                <li key={edition.name}>
                  <a
                    className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
                    href={edition.repository}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {edition.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
