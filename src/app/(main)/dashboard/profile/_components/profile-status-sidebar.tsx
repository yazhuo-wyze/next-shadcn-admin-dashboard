import { CalendarDays, CircleCheck, Clock3 } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { getT } from "@/lib/i18n/server";

import type { ProfileRecord } from "./profile-data";

export async function ProfileStatusSidebar({ profile }: { profile: ProfileRecord }) {
  const t = await getT();

  return (
    <aside>
      <div className="flex flex-col gap-4">
        <h2 className="font-heading font-medium text-sm">{t("dashboard.profile.status.recordStatus")}</h2>
        <div className="flex items-start gap-2">
          <CircleCheck aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">{t("dashboard.profile.status.activeContractor")}</p>
            <p className="text-muted-foreground text-xs">{t("dashboard.profile.status.contractAndAccessActive")}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-xs">
          {t("dashboard.profile.status.updatedBy", { date: profile.updatedAt, user: profile.updatedBy })}
        </p>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-3">
        <h2 className="font-heading font-medium text-sm">{t("dashboard.profile.status.upcomingEvents")}</h2>
        <div className="flex flex-col">
          <div className="flex gap-3 py-2.5">
            <CalendarDays aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
            <div>
              <p className="font-medium text-sm">{t("dashboard.profile.status.timeOff")}</p>
              <p className="text-muted-foreground text-xs">{profile.nextLeave}</p>
            </div>
          </div>
          <Separator />
          <div className="flex gap-3 py-2.5">
            <Clock3 aria-hidden="true" className="mt-0.5 size-4 text-muted-foreground" />
            <div>
              <p className="font-medium text-sm">{t("dashboard.profile.fields.lastWorkingDay")}</p>
              <p className="text-muted-foreground text-xs">{profile.lastWorkingDay}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
