"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { TFunction } from "@/lib/i18n/dictionary";
import { useI18n } from "@/lib/i18n/i18n-provider";

// 校验提示也是用户可见文案，schema 放在模块级拿不到 t，所以改成接收 t 的工厂函数。
const createFormSchema = (t: TFunction) =>
  z.object({
    email: z.email({ message: t("auth.form.error.invalidEmail") }),
    password: z.string().min(6, { message: t("auth.form.error.passwordMinLength") }),
    remember: z.boolean().optional(),
  });

type LoginValues = z.infer<ReturnType<typeof createFormSchema>>;

function onSubmit(data: LoginValues, t: TFunction) {
  toast(t("auth.form.submittedToast"), {
    description: (
      <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
}

export function LoginForm() {
  const { t } = useI18n();
  const form = useForm<LoginValues>({
    resolver: zodResolver(createFormSchema(t)),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
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
              <FieldLabel htmlFor="login-email">{t("auth.form.email")}</FieldLabel>
              <Input
                {...field}
                id="login-email"
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
              <FieldLabel htmlFor="login-password">{t("auth.form.password")}</FieldLabel>
              <Input
                {...field}
                id="login-password"
                type="password"
                placeholder={t("auth.form.passwordPlaceholder")}
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="remember"
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="login-remember"
                name={field.name}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                aria-invalid={fieldState.invalid}
              />
              <FieldContent>
                <FieldLabel htmlFor="login-remember" className="font-normal">
                  {t("auth.form.rememberMe")}
                </FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full" type="submit">
        {t("auth.login.submit")}
      </Button>
    </form>
  );
}
