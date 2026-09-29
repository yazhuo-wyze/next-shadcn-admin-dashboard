import { Clock, Folder, MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { getT } from "@/lib/i18n/server";

import type { FileManagerFolder } from "./data";

interface FoldersSectionProps {
  folders: FileManagerFolder[];
}

export async function FoldersSection({ folders }: FoldersSectionProps) {
  const t = await getT();

  return (
    <section className="flex flex-col gap-2" aria-labelledby="folders-heading">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-lg">{t("dashboard.fileManager.folders.title")}</h2>
        <span className="text-muted-foreground text-sm">
          {t("dashboard.fileManager.folders.count", { count: folders.length })}
        </span>
      </div>
      {folders.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {folders.map((folder) => (
            <Card key={folder.id} size="sm">
              <CardHeader>
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Folder className="size-4.5" />
                  </div>
                  <div className="flex min-w-0 flex-col gap-1">
                    <CardTitle className="truncate leading-none">{folder.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {t("dashboard.fileManager.folders.fileCount", { count: folder.fileCount })}
                    </CardDescription>
                  </div>
                </div>
                <CardAction>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={t("dashboard.fileManager.actions.forItem", { name: folder.name })}
                      >
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>{t("dashboard.fileManager.folders.open")}</DropdownMenuItem>
                        <DropdownMenuItem>{t("dashboard.fileManager.actions.copyShareLink")}</DropdownMenuItem>
                        <DropdownMenuItem>{t("dashboard.fileManager.folders.rename")}</DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardAction>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3 text-muted-foreground text-xs">
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span>{t("dashboard.fileManager.folders.updated", { updatedAt: folder.updatedAt })}</span>
                </div>
                <span>{folder.size}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Empty className="min-h-32">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Folder />
            </EmptyMedia>
            <EmptyTitle>{t("dashboard.fileManager.folders.emptyTitle")}</EmptyTitle>
            <EmptyDescription>{t("dashboard.fileManager.folders.emptyDescription")}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </section>
  );
}
