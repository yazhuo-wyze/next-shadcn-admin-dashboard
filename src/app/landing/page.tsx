import Link from "next/link";

import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { getT } from "@/lib/i18n/server";

import { Footer } from "./_components/footer";
import { Intro } from "./_components/intro";
import { LandingThemeSwitcher } from "./_components/landing-theme-switcher";
import { Overview } from "./_components/overview";
import { Showcase } from "./_components/showcase";
import styles from "./landing.module.css";

// 模块级的 `metadata` 常量拿不到 t，改成 generateMetadata 让标题跟随语言切换。
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("landing.metadataTitle"),
    description: t("landing.metadataDescription"),
    alternates: {
      canonical: "/",
    },
  };
}

export default async function Home() {
  const t = await getT();

  // Keeps landing-page colors independent from saved dashboard theme presets.
  return (
    <main className={`${styles.landing} min-h-screen bg-background text-foreground`} data-landing-page>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:gap-8 sm:p-6 md:p-8">
        <header className="flex items-start justify-between gap-4 sm:items-center sm:gap-6">
          <Link
            className="font-medium text-base tracking-tight"
            href="/"
            aria-label={t("landing.header.homeLabel")}
            prefetch={false}
          >
            Studio Admin
          </Link>
          <LandingThemeSwitcher />
        </header>
        <Intro />
        <Showcase />
        <Separator />
        <Overview />
        <Separator />
        <Footer />
      </div>
    </main>
  );
}
