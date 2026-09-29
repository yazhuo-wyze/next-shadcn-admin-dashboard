"use client";

import { Download, MoreVertical, Share2, Star, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/lib/i18n/i18n-provider";

import type { FileManagerFile } from "./data";

interface FileActionsProps {
  file: FileManagerFile;
  onToggleStar: () => void;
}

export function FileActions({ file, onToggleStar }: FileActionsProps) {
  const { t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={t("dashboard.fileManager.actions.forItem", { name: file.name })}
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={onToggleStar}>
            <Star />
            {file.starred
              ? t("dashboard.fileManager.actions.removeFromStarred")
              : t("dashboard.fileManager.actions.addToStarred")}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download />
            {t("dashboard.fileManager.actions.download")}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share2 />
            {t("dashboard.fileManager.actions.copyShareLink")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <Trash2 />
            {t("dashboard.fileManager.actions.moveToTrash")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
