"use client";

/**
 * 客户端 i18n 入口：从既有的偏好 store 里读语言，切换时调 store 的 setPreference
 * （于是自动写 cookie + 更新 data-locale 属性，与服务端保持一致）。
 *
 * 用法（客户端组件）：
 *   const { t, locale, setLocale } = useI18n();
 *
 * 注意：服务端渲染的那部分文案不会因为这里切语言而立刻变化，
 * 需要调用方在切换后 `router.refresh()`（语言切换器里已经这么做）。
 */

import { createContext, use, useCallback, useMemo } from "react";

import { useShallow } from "zustand/react/shallow";

import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

import { type TFunction, translate } from "./dictionary";
import type { Locale } from "./locales";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TFunction;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { locale, setPreference } = usePreferencesStore(
    useShallow((state) => ({
      locale: state.values.locale,
      setPreference: state.setPreference,
    })),
  );

  const setLocale = useCallback((next: Locale) => setPreference("locale", next), [setPreference]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key, params) => translate(locale, key, params),
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = use(I18nContext);
  if (!context) throw new Error("Missing I18nProvider");
  return context;
}
