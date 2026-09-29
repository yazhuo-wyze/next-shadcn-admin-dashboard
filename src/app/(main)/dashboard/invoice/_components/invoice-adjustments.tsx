"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";

import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/lib/i18n/i18n-provider";

import { type InvoiceFormValues, invoiceTaxOptions } from "./data";

// 本组件被客户端组件 `Invoice` 引用，属于客户端渲染树，因此用 `useI18n()` 取词。
export function InvoiceAdjustments() {
  const { t } = useI18n();
  const { control, register } = useFormContext<InvoiceFormValues>();
  const discountType = useWatch({ control, name: "discountType" });

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-medium tracking-tight">{t("dashboard.invoice.sections.adjustments")}</h2>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <Controller
          control={control}
          name="taxId"
          render={({ field }) => (
            <Field className="gap-1">
              <FieldLabel className="text-xs">{t("dashboard.invoice.fields.tax")}</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-10 w-full">
                  <SelectValue placeholder={t("dashboard.invoice.placeholders.selectTax")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {invoiceTaxOptions.map((taxOption) => (
                      <SelectItem key={taxOption.id} value={taxOption.id}>
                        {t(`common.enums.tax.${taxOption.name}`)} ({taxOption.rate}%)
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <div className="grid grid-cols-[1fr_112px] gap-4">
          <Controller
            control={control}
            name="discountType"
            render={({ field }) => (
              <Field className="gap-1">
                <FieldLabel className="text-xs">{t("dashboard.invoice.fields.discount")}</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder={t("dashboard.invoice.placeholders.discountType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="fixed">{t("dashboard.invoice.discountTypes.fixedAmount")}</SelectItem>
                      <SelectItem value="percent">{t("dashboard.invoice.discountTypes.percent")}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <Field className="gap-1">
            <FieldLabel className="text-xs opacity-0">{t("dashboard.invoice.fields.value")}</FieldLabel>
            <InputGroup>
              <InputGroupInput
                type="number"
                step="0.01"
                aria-label={t("dashboard.invoice.fields.discountValue")}
                {...register("discountValue", { valueAsNumber: true })}
              />
              <InputGroupAddon align="inline-end">{discountType === "fixed" ? "$" : "%"}</InputGroupAddon>
            </InputGroup>
          </Field>
        </div>
      </div>
    </section>
  );
}
