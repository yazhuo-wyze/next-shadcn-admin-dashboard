"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

const THEME_CYCLE = ["light", "dark", "system"] as const;

// 复用设置面板里已有的「浅色 / 深色 / 跟随系统」译法。
const THEME_MODE_KEYS = {
  light: "settings.themeModeLight",
  dark: "settings.themeModeDark",
  system: "settings.themeModeSystem",
} as const satisfies Record<(typeof THEME_CYCLE)[number], string>;

export function LandingThemeSwitcher() {
  const { t } = useI18n();
  const { themeMode, setPreference } = usePreferencesStore(
    useShallow((state) => ({
      themeMode: state.values.theme_mode,
      setPreference: state.setPreference,
    })),
  );

  const cycleTheme = () => {
    const currentIndex = THEME_CYCLE.indexOf(themeMode);
    const nextTheme = THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length];
    const updateTheme = () => setPreference("theme_mode", nextTheme);

    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      updateTheme();
      return;
    }

    document.startViewTransition(updateTheme);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={cycleTheme}
      aria-label={t("landing.themeSwitcher.label", { theme: t(THEME_MODE_KEYS[themeMode]) })}
    >
      <Monitor className="hidden [html[data-theme-mode=system]_&]:block" />
      <Sun className="hidden dark:block [html[data-theme-mode=system]_&]:hidden" />
      <Moon className="block dark:hidden [html[data-theme-mode=system]_&]:hidden" />
    </Button>
  );
}
