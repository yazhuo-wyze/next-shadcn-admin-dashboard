"use client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/lib/i18n/i18n-provider";

import { ClientSelector } from "./client-selector";
import { InvoiceAdjustments } from "./invoice-adjustments";
import { InvoiceDetails } from "./invoice-details";
import { InvoiceItems } from "./invoice-items";

// 本组件被客户端组件 `Invoice` 引用，属于客户端渲染树，因此用 `useI18n()` 取词。
export function InvoiceForm() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4">
      <Tabs defaultValue="invoice">
        <TabsList className="w-full">
          <TabsTrigger value="invoice">{t("nav.item.invoice")}</TabsTrigger>
          <TabsTrigger value="payment">{t("dashboard.invoice.tabs.payment")}</TabsTrigger>
          <TabsTrigger value="business">{t("dashboard.invoice.tabs.business")}</TabsTrigger>
        </TabsList>
      </Tabs>

      <InvoiceDetails />

      <Separator />

      <ClientSelector />

      <Separator />

      <InvoiceItems />

      <Separator />

      <InvoiceAdjustments />
    </div>
  );
}
