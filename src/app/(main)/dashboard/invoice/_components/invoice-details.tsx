"use client";

import * as React from "react";

import { format, parseISO } from "date-fns";
import { CalendarIcon, Hash } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { TFunction } from "@/lib/i18n/dictionary";
import { useI18n } from "@/lib/i18n/i18n-provider";

import type { InvoiceFormValues } from "./data";

/** 标签是界面文案，需要跟随语言，所以改成接收 `t` 的函数。 */
const dateFields = (
  t: TFunction,
): Array<{
  id: string;
  label: string;
  name: "issuedDate" | "paymentDueDate";
}> => [
  {
    id: "issued-date",
    label: t("dashboard.invoice.fields.issuedDate"),
    name: "issuedDate",
  },
  {
    id: "payment-due-date",
    label: t("dashboard.invoice.fields.paymentDueDate"),
    name: "paymentDueDate",
  },
];

// 本组件被客户端组件 `Invoice` 引用，属于客户端渲染树，因此用 `useI18n()` 取词。
export function InvoiceDetails() {
  const { t } = useI18n();
  const { control, register } = useFormContext<InvoiceFormValues>();

  return (
    <section className="flex flex-col gap-3">
      <FieldGroup>
        <Field className="gap-1">
          <FieldLabel className="text-xs" htmlFor="reference-number">
            {t("dashboard.invoice.fields.referenceNumber")}
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id="reference-number" {...register("referenceNumber")} />
            <InputGroupAddon align="inline-end">
              <Hash />
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          {dateFields(t).map((dateField) => (
            <Controller
              key={dateField.name}
              control={control}
              name={dateField.name}
              render={({ field }) => (
                <Field className="gap-1">
                  <FieldLabel className="text-xs" htmlFor={dateField.id}>
                    {dateField.label}
                  </FieldLabel>
                  <DatePicker id={dateField.id} value={field.value} onChange={field.onChange} />
                </Field>
              )}
            />
          ))}
        </div>
      </FieldGroup>
    </section>
  );
}

function DatePicker({ id, value, onChange }: { id: string; value: string; onChange: (value: string) => void }) {
  const { t } = useI18n();
  const [open, setOpen] = React.useState(false);
  const date = parseDateValue(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          data-empty={!date}
          className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          {date ? format(date, "PPP") : <span>{t("dashboard.invoice.placeholders.pickDate")}</span>}
          <CalendarIcon className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <Calendar
          className="w-full"
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (!selectedDate) return;

            onChange(format(selectedDate, "yyyy-MM-dd"));
            setOpen(false);
          }}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
}

function parseDateValue(value: string) {
  const date = parseISO(value);

  return Number.isNaN(date.getTime()) ? undefined : date;
}
