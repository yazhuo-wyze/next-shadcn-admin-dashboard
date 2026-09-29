import { Box, Container, Filter, PlusCircle, RefreshCw, Search, Server, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { getT } from "@/lib/i18n/server";

export async function InfrastructureHeader() {
  const t = await getT();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="font-medium text-2xl leading-tight tracking-tight sm:text-3xl sm:leading-none">
              {t("dashboard.infrastructure.header.title")}
            </h1>
            <p className="text-muted-foreground text-sm">{t("dashboard.infrastructure.header.description")}</p>
          </div>

          <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
            <span className="whitespace-nowrap text-muted-foreground text-sm">
              {t("dashboard.infrastructure.header.lastUpdated")}
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon-sm">
                <RefreshCw />
              </Button>
              <Button variant="outline" size="icon-sm">
                <Settings data-icon="inline-start" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="h-auto gap-1 rounded-sm px-1.5 py-0.5">
            <Container />
            {t("dashboard.infrastructure.header.projects", { count: 6 })}
          </Badge>
          <Badge variant="outline" className="h-auto gap-1 rounded-sm px-1.5 py-0.5">
            <Box />
            {t("dashboard.infrastructure.header.environments", { count: 16 })}
          </Badge>
          <Badge variant="outline" className="h-auto gap-1 rounded-sm px-1.5 py-0.5">
            <Server />
            {t("dashboard.infrastructure.header.servers", { count: 36 })}
          </Badge>
          <Badge variant="outline" className="h-auto gap-1 rounded-sm px-1.5 py-0.5">
            <span className="size-2 rounded-full bg-green-600 dark:bg-green-500" />
            {t("dashboard.infrastructure.header.globalUptime", { uptime: "99.93%" })}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3 xl:flex-row">
        <InputGroup className="flex-1">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder={t("dashboard.infrastructure.header.searchPlaceholder")} />
          <InputGroupAddon align="inline-end">
            <Kbd>⌘ K</Kbd>
          </InputGroupAddon>
        </InputGroup>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <PlusCircle data-icon="inline-start" />
            {t("dashboard.infrastructure.header.organization")}
          </Button>
          <Button variant="outline">
            <PlusCircle data-icon="inline-start" />
            {t("dashboard.infrastructure.header.stack")}
          </Button>
          <Button variant="outline">
            <PlusCircle data-icon="inline-start" />
            {t("dashboard.infrastructure.header.cloudProvider")}
          </Button>
          <Button variant="outline">
            <PlusCircle data-icon="inline-start" />
            {t("dashboard.infrastructure.header.projectType")}
          </Button>
          <Button variant="outline">
            <PlusCircle data-icon="inline-start" />
            {t("dashboard.infrastructure.header.environment")}
          </Button>
          <Button variant="outline">
            <Filter data-icon="inline-start" />
            {t("dashboard.infrastructure.header.filters")}
          </Button>
        </div>
      </div>
    </div>
  );
}
