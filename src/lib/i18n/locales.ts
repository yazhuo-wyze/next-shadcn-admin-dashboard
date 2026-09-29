/**
 * 支持的语言。新增语言时只需在这里加值，并在 `./messages/` 下补一份同构词条。
 */

export const LOCALE_VALUES = ["zh-CN", "en"] as const;

export type Locale = (typeof LOCALE_VALUES)[number];

/** 默认语言：中文。整站的兜底词条也以中文为准。 */
export const DEFAULT_LOCALE: Locale = "zh-CN";

/** 语言切换器里显示的选项：用各自语言自身的写法（中文写「简体中文」、英文写 English），这是通行惯例。 */
export const LOCALE_OPTIONS: { value: Locale; label: string }[] = [
  { value: "zh-CN", label: "简体中文" },
  { value: "en", label: "English" },
];

/** `<html lang>` 用的值，与偏好值一致。 */
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALE_VALUES as readonly string[]).includes(value);
}
