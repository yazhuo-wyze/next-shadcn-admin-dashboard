import { Ellipsis, FileDown, FileUp, RefreshCw, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getT } from "@/lib/i18n/server";

export async function AnalyticsToolbar() {
  const t = await getT();

  return (
    <div className="flex items-center gap-2">
      <Select defaultValue="last-4-weeks">
        <SelectTrigger className="w-34">
          <SelectValue placeholder={t("analytics.toolbar.selectRange")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="last-7-days">{t("common.time.last7Days")}</SelectItem>
            <SelectItem value="last-4-weeks">{t("common.time.last4Weeks")}</SelectItem>
            <SelectItem value="last-3-months">{t("common.time.last3Months")}</SelectItem>
            <SelectItem value="year-to-date">{t("analytics.toolbar.yearToDate")}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline" aria-label={t("analytics.toolbar.moreActions")}>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{t("analytics.toolbar.actions")}</DropdownMenuLabel>
            <DropdownMenuItem>
              <FileDown />
              {t("analytics.toolbar.exportReport")}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileUp />
              {t("analytics.toolbar.importData")}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 />
              {t("analytics.toolbar.shareDashboard")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <RefreshCw />
              {t("analytics.toolbar.refreshMetrics")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
