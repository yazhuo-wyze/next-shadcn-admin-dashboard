import { Separator } from "@/components/ui/separator";
import { getT } from "@/lib/i18n/server";

import type { ProfileRecord } from "./profile-data";

export async function EmploymentDetails({ profile }: { profile: ProfileRecord }) {
  const t = await getT();

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="font-heading font-medium text-base">{t("dashboard.profile.employment.roleAndOrganization")}</h2>
        <dl className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.jobTitle")}</dt>
              <dd className="text-sm">{profile.jobTitle}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.team")}</dt>
              <dd className="text-sm">{profile.team}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.jobLevel")}</dt>
              <dd className="text-sm">{profile.jobLevel}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.manager")}</dt>
              <dd className="text-sm">{profile.manager.name}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.department")}</dt>
              <dd className="text-sm">{profile.department}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.currentProject")}</dt>
              <dd className="text-sm">{profile.currentProject}</dd>
            </div>
          </div>
        </dl>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-2">
        <h2 className="font-heading font-medium text-base">{t("dashboard.profile.employment.contractDetails")}</h2>
        <dl className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.contractorId")}</dt>
              <dd className="text-sm">{profile.contractorId}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.engagementStatus")}</dt>
              <dd className="text-sm">{profile.engagementStatus}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.employmentType")}</dt>
              <dd className="text-sm">{profile.employmentType}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.contractingEntity")}</dt>
              <dd className="text-sm">{profile.contractingEntity}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.startDate")}</dt>
              <dd className="text-sm">{profile.startDate}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.lastWorkingDay")}</dt>
              <dd className="text-sm">{profile.lastWorkingDay}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.noticePeriod")}</dt>
              <dd className="text-sm">{profile.noticePeriod}</dd>
            </div>
          </div>
        </dl>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-2">
        <h2 className="font-heading font-medium text-base">{t("dashboard.profile.employment.workArrangement")}</h2>
        <dl className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.workplace")}</dt>
              <dd className="text-sm">{profile.workplace}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.timeZone")}</dt>
              <dd className="text-sm">{profile.timeZone}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.weeklyHours")}</dt>
              <dd className="text-sm">{profile.weeklyHours}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.schedule")}</dt>
              <dd className="text-sm">{profile.schedule}</dd>
            </div>
          </div>
        </dl>
      </div>
    </>
  );
}
