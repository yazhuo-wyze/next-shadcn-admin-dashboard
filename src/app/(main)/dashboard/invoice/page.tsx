import { Save, Send } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { getT } from "@/lib/i18n/server";

import { Invoice } from "./_components/invoice";

// 模块级的 `metadata` 常量拿不到 t（服务端 i18n 需要在请求期读语言偏好），
// 所以改成 `generateMetadata`：页面保持服务端组件，文案跟随语言切换。
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("dashboard.invoice.metadataTitle"),
    description: t("dashboard.invoice.metadataDescription"),
    alternates: {
      canonical: "/dashboard/invoice",
    },
  };
}

export default async function Page() {
  const t = await getT();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-medium text-3xl leading-none tracking-tight">{t("dashboard.invoice.title")}</h1>
          <p className="text-muted-foreground text-sm">{t("dashboard.invoice.description")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline">
            <Save data-icon="inline-start" />
            {t("dashboard.invoice.actions.saveAsDraft")}
          </Button>
          <Button type="button">
            <Send data-icon="inline-start" />
            {t("dashboard.invoice.actions.sendInvoice")}
          </Button>
        </div>
      </div>

      <Invoice />
    </div>
  );
}
