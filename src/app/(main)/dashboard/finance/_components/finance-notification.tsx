import { TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { getT } from "@/lib/i18n/server";

export async function FinanceNotification() {
  const t = await getT();

  return (
    <Item className="rounded-xl" variant="outline">
      <ItemMedia variant="icon">
        <TrendingUp />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{t("dashboard.finance.notification.title")}</ItemTitle>
        <ItemDescription>{t("dashboard.finance.notification.description", { points: 14, score: 782 })}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          {t("dashboard.finance.notification.viewDetails")}
        </Button>
      </ItemActions>
    </Item>
  );
}
