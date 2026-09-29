import type { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getT } from "@/lib/i18n/server";

import { AnalyticsKpiStrip } from "./_components/analytics-kpi-strip";
import { AnalyticsToolbar } from "./_components/analytics-toolbar";
import { RealtimeVisitors } from "./_components/realtime-visitors";
import { TopPages } from "./_components/top-pages";
import { TopTrafficSources } from "./_components/top-traffic-sources";
import { TrafficQuality } from "./_components/traffic-quality";

// Import this stylesheet in any page or component that renders country flag classes.
import "@/styles/flag-icons/flags.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("analytics.metadataTitle"),
    description: t("analytics.metadataDescription"),
    alternates: {
      canonical: "/dashboard/analytics",
    },
  };
}

export default async function Page() {
  const t = await getT();

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl tracking-tight">{t("analytics.greeting", { name: "Aiy" })}</h1>
        <p className="text-muted-foreground text-sm">{t("analytics.subtitle")}</p>
      </div>

      <Tabs defaultValue="overview" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList className="gap-1">
            <TabsTrigger value="overview">{t("analytics.tabs.overview")}</TabsTrigger>
            <TabsTrigger value="audience">{t("analytics.tabs.audience")}</TabsTrigger>
            <TabsTrigger value="acquisition">{t("analytics.tabs.acquisition")}</TabsTrigger>
            <TabsTrigger value="engagement">{t("analytics.tabs.engagement")}</TabsTrigger>
            <TabsTrigger value="conversions">{t("analytics.tabs.conversions")}</TabsTrigger>
          </TabsList>

          <AnalyticsToolbar />
        </div>

        <TabsContent value="overview" className="flex flex-col gap-4">
          <AnalyticsKpiStrip />

          <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <TrafficQuality />
            </div>
            <div className="xl:col-span-5">
              <RealtimeVisitors />
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-12">
            <div className="xl:col-span-7">
              <TopPages />
            </div>
            <div className="xl:col-span-5 xl:col-start-8">
              <TopTrafficSources />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audience">
          <div className="flex h-64 items-center justify-center rounded-xl border border-border border-dashed text-muted-foreground">
            {t("analytics.comingSoon", { tab: t("analytics.tabs.audience") })}
          </div>
        </TabsContent>

        <TabsContent value="acquisition">
          <div className="flex h-64 items-center justify-center rounded-xl border border-border border-dashed text-muted-foreground">
            {t("analytics.comingSoon", { tab: t("analytics.tabs.acquisition") })}
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="flex h-64 items-center justify-center rounded-xl border border-border border-dashed text-muted-foreground">
            {t("analytics.comingSoon", { tab: t("analytics.tabs.engagement") })}
          </div>
        </TabsContent>

        <TabsContent value="conversions">
          <div className="flex h-64 items-center justify-center rounded-xl border border-border border-dashed text-muted-foreground">
            {t("analytics.comingSoon", { tab: t("analytics.tabs.conversions") })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
