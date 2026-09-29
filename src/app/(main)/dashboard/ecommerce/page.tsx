import { format } from "date-fns";
import { Settings2 } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { getT } from "@/lib/i18n/server";

import { CustomerReviews } from "./_components/customer-reviews";
import { Inventory } from "./_components/inventory";
import { KpiStrip } from "./_components/kpi-strip";
import { RecentOrders } from "./_components/recent-orders";
import { StoreTraffic } from "./_components/store-traffic";
import { TopProducts } from "./_components/top-products";
import { TrafficSources } from "./_components/traffic-sources";

/**
 * 页面标题/描述是模块级常量，拿不到 t，所以改成 generateMetadata 异步函数。
 * alternates 与语言无关，原样保留。
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("dashboard.ecommerce.metadataTitle"),
    description: t("dashboard.ecommerce.metadataDescription"),
    alternates: {
      canonical: "/dashboard/ecommerce",
    },
  };
}

export default async function Page() {
  const t = await getT();
  const formattedDate = format(new Date(), "EEEE, do MMMM yyyy");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl leading-none tracking-tight">{t("dashboard.ecommerce.title")}</h1>
          <p className="text-muted-foreground text-sm">{formattedDate}</p>
        </div>

        <div className="flex flex-wrap items-end justify-end gap-2 lg:w-fit">
          <Select defaultValue="this-month">
            <SelectTrigger className="w-34" id="ecommerce-period" size="sm">
              <SelectValue placeholder={t("common.time.thisMonth")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="this-month">{t("common.time.thisMonth")}</SelectItem>
                <SelectItem value="last-month">{t("common.time.lastMonth")}</SelectItem>
                <SelectItem value="last-30-days">{t("common.time.last30Days")}</SelectItem>
                <SelectItem value="year-to-date">{t("common.time.yearToDate")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select defaultValue="all-channels">
            <SelectTrigger className="w-40" id="ecommerce-channel" size="sm">
              <SelectValue placeholder={t("dashboard.ecommerce.filters.allChannels")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all-channels">{t("dashboard.ecommerce.filters.allChannels")}</SelectItem>
                <SelectItem value="online-store">{t("dashboard.ecommerce.filters.onlineStore")}</SelectItem>
                <SelectItem value="marketplace">{t("dashboard.ecommerce.filters.marketplace")}</SelectItem>
                <SelectItem value="social">{t("dashboard.ecommerce.filters.social")}</SelectItem>
                <SelectItem value="retail">{t("dashboard.ecommerce.filters.retail")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" />

          <Button size="icon-sm" variant="outline">
            <Settings2 />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <KpiStrip />
        <div className="xl:col-span-5">
          <StoreTraffic />
        </div>
        <div className="xl:col-span-7">
          <TrafficSources />
        </div>
        <div className="xl:col-span-4">
          <TopProducts />
        </div>
        <div className="xl:col-span-4">
          <Inventory />
        </div>
        <div className="xl:col-span-4">
          <CustomerReviews />
        </div>
        <div className="xl:col-span-12">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
