import Link from "next/link";

import { Command } from "lucide-react";
import type { Metadata } from "next";

import { getT } from "@/lib/i18n/server";

import { LoginForm } from "../../_components/login-form";
import { GoogleButton } from "../../_components/social-auth/google-button";

// 模块级的 `metadata` 常量拿不到 t，改成 generateMetadata 让标题跟随语言切换。
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("auth.v1.login.metadataTitle"),
    description: t("auth.v1.login.metadataDescription"),
    alternates: {
      canonical: "/auth/v1/login",
    },
  };
}

export default async function LoginV1() {
  const t = await getT();

  return (
    <div className="flex h-dvh">
      <div className="hidden bg-primary lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <Command className="mx-auto size-12 text-primary-foreground" />
            <div className="space-y-2">
              <h1 className="font-light text-5xl text-primary-foreground">{t("auth.v1.login.heroTitle")}</h1>
              <p className="text-primary-foreground/80 text-xl">{t("auth.v1.login.heroSubtitle")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="font-medium tracking-tight">{t("auth.login.submit")}</div>
            <div className="mx-auto max-w-xl text-muted-foreground">{t("auth.v1.login.description")}</div>
          </div>
          <div className="space-y-4">
            <LoginForm />
            <GoogleButton className="w-full" variant="outline" />
            <p className="text-center text-muted-foreground text-xs">
              {t("auth.login.noAccount")}{" "}
              <Link prefetch={false} href="register" className="text-primary">
                {t("auth.register.submit")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
