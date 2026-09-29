/**
 * 极简词条查表：不做复数、性别等复杂规则，够用即可。
 *
 * 取词顺序：目标语言 → 默认语言（中文）→ 直接返回 key 本身。
 * 最后这层兜底是为了「漏翻时不崩、且一眼能看出漏了哪个 key」，
 * 所以不要在 UI 上把 key 当成正常文案。
 *
 * 用法：
 *   translate("zh-CN", "common.actions.save")            // → "保存"
 *   translate("en", "common.greeting", { name: "Ann" })  // → "Hi, Ann"
 */

import { DEFAULT_LOCALE, type Locale } from "./locales";
import { en, type Messages } from "./messages/en";
import { zhCN } from "./messages/zh-cn";

export type { Messages };

type Dict = { [key: string]: string | Dict };

const CATALOGS: Record<Locale, Dict> = {
  "zh-CN": zhCN as Dict,
  en: en as Dict,
};

export type TranslateParams = Record<string, string | number>;

function lookup(dict: Dict, key: string): string | undefined {
  let cursor: string | Dict | undefined = dict;

  for (const part of key.split(".")) {
    if (typeof cursor === "string" || cursor === undefined) return undefined;
    cursor = cursor[part];
  }

  return typeof cursor === "string" ? cursor : undefined;
}

function interpolate(text: string, params?: TranslateParams): string {
  if (!params) return text;

  return text.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = params[name];
    return value === undefined ? match : String(value);
  });
}

export function translate(locale: Locale, key: string, params?: TranslateParams): string {
  const text = lookup(CATALOGS[locale], key) ?? lookup(CATALOGS[DEFAULT_LOCALE], key) ?? key;

  return interpolate(text, params);
}

/** 给需要一次性取多条的场景用（如生成导航列表）。 */
export type TFunction = (key: string, params?: TranslateParams) => string;

export function createT(locale: Locale): TFunction {
  return (key, params) => translate(locale, key, params);
}
