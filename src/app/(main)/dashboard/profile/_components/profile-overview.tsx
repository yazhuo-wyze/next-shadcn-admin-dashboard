import { Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getT } from "@/lib/i18n/server";

import type { ProfileRecord } from "./profile-data";

interface ProfileOverviewProps {
  profile: ProfileRecord;
}

export async function ProfileOverview({ profile }: ProfileOverviewProps) {
  const t = await getT();

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="font-heading font-medium text-base">{t("dashboard.profile.overview.about")}</h2>
        <p className="text-muted-foreground text-sm">{profile.bio}</p>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-2">
        <h2 className="font-heading font-medium text-base">{t("dashboard.profile.overview.workDetails")}</h2>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs">{t("dashboard.profile.fields.contractorId")}</span>
              <span className="text-sm">{profile.contractorId}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs">{t("dashboard.profile.fields.engagementStatus")}</span>
              <span className="text-sm">{profile.engagementStatus}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs">{t("dashboard.profile.fields.jobLevel")}</span>
              <span className="text-sm">{profile.jobLevel}</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs">{t("dashboard.profile.fields.department")}</span>
              <span className="text-sm">{profile.department}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs">{t("dashboard.profile.fields.team")}</span>
              <span className="text-sm">{profile.team}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs">{t("dashboard.profile.fields.currentProject")}</span>
              <span className="text-sm">{profile.currentProject}</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs">{t("dashboard.profile.fields.startDate")}</span>
              <span className="text-sm">{profile.startDate}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs">{t("dashboard.profile.fields.engagementLength")}</span>
              <span className="text-sm">{profile.engagementLength}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-heading font-medium text-base leading-none">
              {t("dashboard.profile.overview.reportingLine")}
            </h2>
            <p className="text-muted-foreground text-sm">{t("dashboard.profile.overview.directManager")}</p>
          </div>
          <Button size="sm" variant="outline">
            <Users data-icon="inline-start" />
            {t("dashboard.profile.overview.orgChart")}
          </Button>
        </div>
        <div className="flex items-center gap-3 py-3">
          <Avatar size="lg">
            <AvatarFallback>{profile.manager.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{profile.manager.name}</p>
            <p className="text-muted-foreground text-xs">{profile.manager.role}</p>
          </div>
        </div>
      </div>
    </>
  );
}
