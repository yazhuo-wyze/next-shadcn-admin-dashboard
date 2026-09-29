import { Separator } from "@/components/ui/separator";
import { getT } from "@/lib/i18n/server";

import type { ProfileRecord } from "./profile-data";

export async function TimeOffDetails({ profile }: { profile: ProfileRecord }) {
  const t = await getT();

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="font-heading font-medium text-base">{t("dashboard.profile.timeOff.leaveBalance")}</h2>
        <dl className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.policy")}</dt>
              <dd className="text-sm">{profile.leavePolicy}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.carriedOver")}</dt>
              <dd className="text-sm">{profile.carriedOverLeave}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.annualAllowance")}</dt>
              <dd className="text-sm">{profile.annualLeaveAllowance}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.usedThisYear")}</dt>
              <dd className="text-sm">{profile.usedLeave}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.remaining")}</dt>
              <dd className="text-sm">{profile.remainingLeave}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.scheduled")}</dt>
              <dd className="text-sm">{profile.scheduledLeave}</dd>
            </div>
          </div>
        </dl>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-2">
        <h2 className="font-heading font-medium text-base">{t("dashboard.profile.timeOff.upcomingAndApprovals")}</h2>
        <dl className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.nextLeave")}</dt>
              <dd className="text-sm">{profile.nextLeave}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.pendingRequests")}</dt>
              <dd className="text-sm">{profile.pendingLeaveRequests}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.leaveYear")}</dt>
              <dd className="text-sm">{profile.leaveYear}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.approver")}</dt>
              <dd className="text-sm">{profile.manager.name}</dd>
            </div>
          </div>
        </dl>
      </div>
    </>
  );
}
