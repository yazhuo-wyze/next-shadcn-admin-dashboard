"use client";

import { useState } from "react";

import { cn } from "cn";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/i18n-provider";

import { type FileManagerFile, fileIcons } from "./data";
import { FileActions } from "./file-actions";

interface FileGridViewProps {
  files: FileManagerFile[];
}

export function FileGridView({ files }: FileGridViewProps) {
  const { t } = useI18n();
  const [gridFiles, setGridFiles] = useState(files);

  function toggleStar(fileId: string) {
    setGridFiles((current) => current.map((file) => (file.id === fileId ? { ...file, starred: !file.starred } : file)));
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {gridFiles.map((file) => {
        const FileIcon = fileIcons[file.kind];

        return (
          <Card key={file.id} size="sm" className="group/file">
            <CardContent>
              <div className="relative flex h-36 items-center justify-center rounded-lg bg-muted/50">
                <FileIcon className="size-12 text-muted-foreground" aria-hidden="true" />
                <Button
                  variant="secondary"
                  size="icon-sm"
                  className={cn(
                    "absolute top-2 right-2 opacity-0 focus-visible:opacity-100 group-hover/file:opacity-100",
                    file.starred && "opacity-100",
                  )}
                  aria-label={
                    file.starred
                      ? t("dashboard.fileManager.card.unstar", { name: file.name })
                      : t("dashboard.fileManager.card.star", { name: file.name })
                  }
                  onClick={() => toggleStar(file.id)}
                >
                  <Star className={cn(file.starred && "fill-current")} />
                </Button>
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 text-muted-foreground text-xs">
                  {/* kind 是数据里的英文枚举值，只把显示文案本地化 */}
                  <span>{t(`common.enums.fileKind.${file.kind}`)}</span>
                  <span>{file.size}</span>
                </div>
              </div>
            </CardContent>
            <CardHeader>
              <CardTitle className="truncate">{file.name}</CardTitle>
              <CardDescription className="truncate">
                {t("dashboard.fileManager.card.modifiedBy", { modifiedAt: file.modifiedAt, owner: file.owner })}
              </CardDescription>
              <CardAction>
                <FileActions file={file} onToggleStar={() => toggleStar(file.id)} />
              </CardAction>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
