import { Download, FileText, LockKeyhole } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getT } from "@/lib/i18n/server";

import type { ProfileDocument } from "./profile-data";

export async function ProfileDocuments({ documents }: { documents: ProfileDocument[] }) {
  const t = await getT();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-heading font-medium text-base">{t("dashboard.profile.documents.title")}</h2>
        <Button size="sm">
          <FileText data-icon="inline-start" />
          {t("dashboard.profile.documents.addDocument")}
        </Button>
      </div>

      <Table className="border-y">
        <TableCaption className="sr-only">{t("dashboard.profile.documents.caption")}</TableCaption>
        <TableHeader className="[&_th]:h-8">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-2/5">
              <span className="sr-only">{t("dashboard.profile.documents.document")}</span>
            </TableHead>
            <TableHead>{t("dashboard.profile.documents.category")}</TableHead>
            <TableHead>{t("dashboard.profile.documents.updated")}</TableHead>
            <TableHead>{t("dashboard.profile.documents.status")}</TableHead>
            <TableHead className="text-right">{t("dashboard.profile.documents.access")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell className="font-medium">{document.name}</TableCell>
              <TableCell className="text-muted-foreground">{document.category}</TableCell>
              <TableCell className="text-muted-foreground">{document.updatedAt}</TableCell>
              <TableCell>
                <Badge className="rounded-sm" variant="outline">
                  {document.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {document.isRestricted ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-muted-foreground text-xs"
                    title={t("dashboard.profile.documents.restricted")}
                  >
                    <LockKeyhole aria-hidden="true" className="size-3.5" />
                    {t("dashboard.profile.documents.restricted")}
                  </span>
                ) : (
                  <Button
                    aria-label={t("dashboard.profile.documents.download", { name: document.name })}
                    size="icon-sm"
                    variant="ghost"
                  >
                    <Download />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
