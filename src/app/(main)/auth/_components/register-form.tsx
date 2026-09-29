"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { TFunction } from "@/lib/i18n/dictionary";
import { useI18n } from "@/lib/i18n/i18n-provider";

// 校验提示也是用户可见文案，schema 放在模块级拿不到 t，所以改成接收 t 的工厂函数。
const createFormSchema = (t: TFunction) =>
  z
    .object({
      email: z.email({ message: t("auth.form.error.invalidEmail") }),
      password: z.string().min(6, { message: t("auth.form.error.passwordMinLength") }),
      confirmPassword: z.string().min(6, { message: t("auth.form.error.confirmPasswordMinLength") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.form.error.passwordMismatch"),
      path: ["confirmPassword"],
    });

type RegisterValues = z.infer<ReturnType<typeof createFormSchema>>;

function onSubmit(data: RegisterValues, t: TFunction) {
  toast(t("auth.form.submittedToast"), {
    description: (
      <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
}

export function RegisterForm() {
  const { t } = useI18n();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(createFormSchema(t)),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <form noValidate onSubmit={form.handleSubmit((values) => onSubmit(values, t))} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-email">{t("auth.form.email")}</FieldLabel>
              <Input
                {...field}
                id="register-email"
                type="email"
                placeholder={t("auth.form.emailPlaceholder")}
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-password">{t("auth.form.password")}</FieldLabel>
              <Input
                {...field}
                id="register-password"
                type="password"
                placeholder={t("auth.form.passwordPlaceholder")}
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-confirm-password">{t("auth.form.confirmPassword")}</FieldLabel>
              <Input
                {...field}
                id="register-confirm-password"
                type="password"
                placeholder={t("auth.form.passwordPlaceholder")}
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full" type="submit">
        {t("auth.register.submit")}
      </Button>
    </form>
  );
}
