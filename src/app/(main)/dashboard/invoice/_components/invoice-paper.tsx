"use client";

import { useI18n } from "@/lib/i18n/i18n-provider";
import { formatCurrency } from "@/lib/utils";

import {
  getInvoiceDiscount,
  getInvoiceItems,
  getInvoiceSubtotal,
  getInvoiceTax,
  getInvoiceTaxOption,
  getInvoiceTotal,
  getLineAmount,
  INVOICE_PAPER_HEIGHT,
  INVOICE_PAPER_WIDTH,
  type InvoiceFormValues,
} from "./data";

// 本组件被客户端组件 `InvoicePreview` / `PrintInvoice` 引用，属于客户端渲染树，因此用 `useI18n()` 取词。
export function InvoicePaper({ invoice }: { invoice: InvoiceFormValues }) {
  const { t } = useI18n();
  const taxOption = getInvoiceTaxOption(invoice);
  const discountValue = Number.isFinite(invoice.discountValue) ? invoice.discountValue : 0;
  const discountLabel =
    invoice.discountType === "percent"
      ? t("dashboard.invoice.paper.discountPercent", { value: discountValue })
      : t("dashboard.invoice.paper.discount");

  return (
    <article
      style={{ width: INVOICE_PAPER_WIDTH, height: INVOICE_PAPER_HEIGHT }}
      data-print-paper
      className="relative flex flex-col gap-24 bg-neutral-50 px-12.25 py-11 font-mono text-neutral-950"
    >
      <header className="flex flex-col gap-10">
        <div className="grid grid-cols-2 items-start gap-14">
          <svg className="size-12" viewBox="0 0 48 48" aria-hidden="true">
            <rect width="20" height="20" rx="3" fill="currentColor" />
            <rect x="28" width="20" height="20" rx="3" fill="currentColor" />
            <rect y="28" width="20" height="20" rx="3" fill="currentColor" />
            <rect x="28" y="28" width="20" height="20" rx="3" fill="currentColor" />
          </svg>
          <h2 className="text-4xl uppercase tracking-widest">{t("nav.item.invoice")}</h2>
        </div>

        <section className="grid grid-cols-2 gap-14 text-sm leading-relaxed">
          <div>
            <p>{t("dashboard.invoice.paper.reference", { reference: invoice.referenceNumber })}</p>
            <p>{t("dashboard.invoice.paper.issued", { date: invoice.issuedDate })}</p>
            <p>{t("dashboard.invoice.paper.paymentDue", { date: invoice.paymentDueDate })}</p>
          </div>
          <div>
            <p>{t("dashboard.invoice.paper.paymentAccount")}</p>
            <p>{invoice.from.paymentAccountName}</p>
            <p>{t("dashboard.invoice.paper.routingNumber", { number: invoice.from.routingNumber })}</p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-14 text-sm leading-relaxed">
          <div>
            <p className="mb-4 font-semibold uppercase">{t("dashboard.invoice.paper.from")}</p>
            <p>{invoice.from.name}</p>
            {invoice.from.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>{t("dashboard.invoice.paper.taxId", { id: invoice.from.taxId })}</p>
          </div>
          <div>
            <p className="mb-4 font-semibold uppercase">{t("dashboard.invoice.paper.billTo")}</p>
            <p>{invoice.to.name}</p>
            {invoice.to.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>{t("dashboard.invoice.paper.taxId", { id: invoice.to.taxId })}</p>
          </div>
        </section>
      </header>

      <div className="flex flex-col gap-5">
        <section className="text-sm">
          <div className="grid grid-cols-[1fr_74px_116px_116px] bg-stone-200 px-3 py-3 font-semibold uppercase">
            <span>{t("dashboard.invoice.items.description")}</span>
            <span className="text-right">{t("dashboard.invoice.items.units")}</span>
            <span className="text-right">{t("dashboard.invoice.items.unitCost")}</span>
            <span className="text-right">{t("dashboard.invoice.items.lineTotal")}</span>
          </div>
          {getInvoiceItems(invoice).map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_74px_116px_116px] border-[oklch(0.86_0_0)] border-b px-3 py-4"
            >
              <span>{item.description}</span>
              <span className="text-right">{item.quantity}</span>
              <span className="text-right">{formatInvoiceCurrency(item.unitPrice)}</span>
              <span className="text-right">{formatInvoiceCurrency(getLineAmount(item))}</span>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-14 text-sm leading-relaxed">
          <section className="col-start-2 space-y-2">
            <div>
              <div className="flex justify-between gap-8">
                <span>{t("dashboard.invoice.paper.netAmount")}</span>
                <span>{formatInvoiceCurrency(getInvoiceSubtotal(invoice))}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>{discountLabel}</span>
                <span>{formatInvoiceCurrency(getInvoiceDiscount(invoice))}</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>
                  {t(`common.enums.tax.${taxOption.name}`)} {taxOption.rate}%
                </span>
                <span>{formatInvoiceCurrency(getInvoiceTax(invoice))}</span>
              </div>
            </div>
            <div className="border-current border-y-2 py-3">
              <div className="flex justify-between gap-8">
                <span className="font-semibold uppercase">{t("dashboard.invoice.paper.balanceDue")}</span>
                <span className="font-semibold">{formatInvoiceCurrency(getInvoiceTotal(invoice))}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="absolute right-12.25 bottom-11 left-12.25 grid grid-cols-2 gap-14 text-neutral-500 text-sm leading-relaxed">
        <div>
          <p>{invoice.from.email}</p>
          <p>{invoice.from.phone}</p>
          <p>{invoice.from.website}</p>
        </div>
        <div>
          <p>{t("dashboard.invoice.paper.footerNote")}</p>
          <p>{t("dashboard.invoice.paper.issuedBy", { name: invoice.from.issuerName })}</p>
        </div>
      </footer>
    </article>
  );
}

function formatInvoiceCurrency(value: number) {
  return formatCurrency(Number.isFinite(value) ? value : 0, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
