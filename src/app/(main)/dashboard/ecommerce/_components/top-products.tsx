import { ArrowUpRight } from "lucide-react";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getT } from "@/lib/i18n/server";

/** 分类名属于演示数据（与下方 products.category 对应），直接写中文，不走词条。 */
const categories = [
  {
    name: "服饰",
    share: 44,
    color: "var(--chart-3)",
  },
  {
    name: "配饰",
    share: 32,
    color: "var(--chart-2)",
  },
  {
    name: "家居",
    share: 24,
    color: "var(--chart-1)",
  },
] as const;

/** 商品名同属演示数据，直接写中文。 */
const products = [
  {
    name: "亚麻衬衫",
    category: "服饰",
    share: "31%",
    sales: "$14,820",
  },
  {
    name: "日常托特包",
    category: "配饰",
    share: "24%",
    sales: "$11,460",
  },
  {
    name: "陶瓷花盆",
    category: "家居",
    share: "18%",
    sales: "$8,930",
  },
] as const;

export async function TopProducts() {
  const t = await getT();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-normal text-muted-foreground text-sm">
          {t("dashboard.ecommerce.topProducts.title")}
        </CardTitle>
        <CardDescription className="text-foreground text-xl tabular-nums leading-none tracking-tight">
          {t("dashboard.ecommerce.topProducts.shareOfSales", { percent: 73 })}
        </CardDescription>
        <CardAction>
          <ArrowUpRight className="size-4" />
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div
            aria-label={t("dashboard.ecommerce.topProducts.salesByCategory")}
            className="flex h-2 gap-1 overflow-hidden bg-muted"
            role="img"
          >
            {categories.map((category) => (
              <div
                aria-hidden="true"
                key={category.name}
                className="rounded-md"
                style={{
                  backgroundColor: category.color,
                  width: `${category.share}%`,
                }}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <div className="flex items-center gap-1" key={category.name}>
                <span aria-hidden="true" className="size-2 rounded-full" style={{ backgroundColor: category.color }} />
                <span className="text-muted-foreground text-xs">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-3">
          <div className="text-muted-foreground text-xs">{t("dashboard.ecommerce.topProducts.products")}</div>
          <div className="text-muted-foreground text-xs">{t("dashboard.ecommerce.topProducts.share")}</div>
          <div className="text-muted-foreground text-xs">{t("dashboard.ecommerce.topProducts.sales")}</div>

          {products.map((product) => (
            <div className="contents text-sm" key={product.name}>
              <div className="min-w-0">
                <div className="truncate font-medium">{product.name}</div>
                <div className="text-muted-foreground text-xs">{product.category}</div>
              </div>
              <div className="self-center text-muted-foreground tabular-nums">{product.share}</div>
              <div className="self-center font-medium tabular-nums">{product.sales}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
