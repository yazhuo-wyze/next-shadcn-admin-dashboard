"use client";

import { Plus } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { getInitials } from "@/lib/utils";

import { type InvoiceFormValues, invoiceClients } from "./data";

// 本组件被客户端组件 `Invoice` 引用，属于客户端渲染树，因此用 `useI18n()` 取词。
export function ClientSelector() {
  const { t } = useI18n();
  const { control } = useFormContext<InvoiceFormValues>();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-medium tracking-tight">{t("dashboard.invoice.sections.billedTo")}</h2>
        <Button type="button" variant="ghost" size="sm">
          <Plus data-icon="inline-start" />
          {t("dashboard.invoice.actions.addNewClient")}
        </Button>
      </div>

      <Controller
        control={control}
        name="to"
        render={({ field }) => {
          const selectedClient = field.value;

          return (
            <Field className="gap-1">
              <FieldLabel className="text-xs">{t("dashboard.invoice.fields.client")}</FieldLabel>
              <Select
                value={selectedClient.id}
                onValueChange={(clientId) => {
                  const nextClient = invoiceClients.find((item) => item.id === clientId);

                  if (nextClient) {
                    field.onChange(nextClient);
                  }
                }}
              >
                <SelectTrigger className="w-full data-[size=default]:h-auto">
                  <SelectValue placeholder={t("dashboard.invoice.placeholders.selectClient")}>
                    <div className="flex items-center gap-1.5">
                      <Avatar className="after:rounded-md">
                        <AvatarFallback className="rounded-md bg-card text-foreground">
                          {getInitials(selectedClient.name).slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="text-left text-xs">
                        <div>{selectedClient.name}</div>
                        <div className="text-muted-foreground">{selectedClient.email}</div>
                      </div>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    {invoiceClients.map((clientOption) => (
                      <SelectItem key={clientOption.id} value={clientOption.id}>
                        {clientOption.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          );
        }}
      />
    </section>
  );
}
