/**
 * 服务端 i18n 入口。
 *
 * 语言偏好与其它偏好共用一套机制（`client-cookie` 持久化），
 * 所以服务端可以直接用既有的 `getPreference("locale")` 读出来 ——
 * 这样服务端组件渲染的文案也能跟随用户选择的语言，不必把页面改成客户端渲染。
 *
 * 用法（服务端组件）：
 *   const t = await getT();
 *   return <h1>{t("settings.title")}</h1>;
 */

import { getPreference } from "@/server/server-actions";

import { createT, type TFunction } from "./dictionary";
import type { Locale } from "./locales";

/** 读出当前语言；读不到（首次访问、cookie 被清）时返回默认语言。 */
export function getLocale(): Promise<Locale> {
  return getPreference("locale");
}

/** 服务端组件里最常用的形式：直接拿一个 `t`。 */
export async function getT(): Promise<TFunction> {
  return createT(await getLocale());
}
