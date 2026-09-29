import { LockKeyhole } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getT } from "@/lib/i18n/server";

import type { ProfileRecord } from "./profile-data";

export async function PersonalDetails({ profile }: { profile: ProfileRecord }) {
  const t = await getT();

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h2 className="font-heading font-medium text-base">{t("dashboard.profile.personal.title")}</h2>
          <Badge className="rounded-sm" variant="outline">
            <LockKeyhole data-icon="inline-start" />
            {t("dashboard.profile.personal.private")}
          </Badge>
        </div>
        <dl className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.preferredName")}</dt>
              <dd className="text-sm">{profile.preferredName}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.dateOfBirth")}</dt>
              <dd className="text-sm">{profile.dateOfBirth}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.legalName")}</dt>
              <dd className="text-sm">{profile.legalName}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.personalEmail")}</dt>
              <dd className="text-sm">{profile.personalEmail}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.pronouns")}</dt>
              <dd className="text-sm">{profile.pronouns}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.workPhone")}</dt>
              <dd className="text-sm">{profile.workPhone}</dd>
            </div>
          </div>
        </dl>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h2 className="font-heading font-medium text-base">{t("dashboard.profile.personal.addressTitle")}</h2>
          <Badge className="rounded-sm" variant="outline">
            <LockKeyhole data-icon="inline-start" />
            {t("dashboard.profile.personal.private")}
          </Badge>
        </div>
        <dl className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-12">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.homeAddress")}</dt>
              <dd className="text-sm">{profile.address}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.emergencyContact")}</dt>
              <dd className="text-sm">{profile.emergencyContact}</dd>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <dt className="text-muted-foreground text-xs">{t("dashboard.profile.fields.emergencyPhone")}</dt>
              <dd className="text-sm">{profile.emergencyPhone}</dd>
            </div>
          </div>
        </dl>
      </div>
    </>
  );
}
