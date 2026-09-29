import type React from "react";

import type { TFunction } from "@/lib/i18n/dictionary";

import type { OrderFilter } from "./schema";

/**
 * 数量文案要跟随语言，所以把 `t` 传进来。
 * `filter` 是筛选逻辑用的英文值（不能翻译），这里只按它挑对应的显示文案；
 * 单复数仍沿用原实现：`count === 1` 走 One 词条，否则走 Other 词条。
 */
export function formatOrderCount(filter: OrderFilter, count: number, t: TFunction) {
  const formattedCount = count.toLocaleString();
  const orderLabel = t(count === 1 ? "dashboard.ecommerce.orders.orderOne" : "dashboard.ecommerce.orders.orderOther");

  if (filter === "All") {
    return `${formattedCount} ${orderLabel}`;
  }

  if (filter === "Needs action") {
    return t(
      count === 1 ? "dashboard.ecommerce.orders.needsActionOne" : "dashboard.ecommerce.orders.needsActionOther",
      { count: formattedCount },
    );
  }

  if (filter === "Returns") {
    return t(count === 1 ? "dashboard.ecommerce.orders.returnOne" : "dashboard.ecommerce.orders.returnOther", {
      count: formattedCount,
    });
  }

  if (filter === "Unfulfilled") {
    return t(
      count === 1 ? "dashboard.ecommerce.orders.unfulfilledOne" : "dashboard.ecommerce.orders.unfulfilledOther",
      { count: formattedCount },
    );
  }

  if (filter === "Unpaid") {
    return t(count === 1 ? "dashboard.ecommerce.orders.unpaidOne" : "dashboard.ecommerce.orders.unpaidOther", {
      count: formattedCount,
    });
  }

  return `${formattedCount} ${orderLabel}`;
}

export function formatSelectedOrderCount(count: number, t: TFunction) {
  return t(count === 1 ? "dashboard.ecommerce.orders.selectedOne" : "dashboard.ecommerce.orders.selectedOther", {
    count: count.toLocaleString(),
  });
}

export function preventPaginationNavigation(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}
