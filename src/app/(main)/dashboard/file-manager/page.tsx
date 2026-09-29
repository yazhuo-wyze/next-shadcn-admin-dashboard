import Link from "next/link";

import { FolderPlus, Grid2X2, List, Upload } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getT } from "@/lib/i18n/server";

import { type FileManagerView, files, folders } from "./_components/data";
import { FileGridView } from "./_components/file-grid-view";
import { FileListView } from "./_components/file-list-view";
import { FileManagerToolbar } from "./_components/file-manager-toolbar";
import { FoldersSection } from "./_components/folders-section";

// 模块级 `metadata` 拿不到 t（服务端 i18n 要在请求期读语言偏好），改用 `generateMetadata`。
export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();

  return {
    title: t("dashboard.fileManager.metadataTitle"),
    description: t("dashboard.fileManager.metadataDescription"),
    alternates: {
      canonical: "/dashboard/file-manager",
    },
  };
}

interface PageProps {
  searchParams: Promise<{ view?: string | string[] }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { view } = await searchParams;
  const activeView: FileManagerView = view === "list" ? "list" : "grid";
  const t = await getT();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl leading-none tracking-tight">{t("dashboard.fileManager.title")}</h1>
          <p className="text-muted-foreground text-sm">{t("dashboard.fileManager.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FolderPlus data-icon="inline-start" />
            {t("dashboard.fileManager.newFolder")}
          </Button>
          <Button>
            <Upload data-icon="inline-start" />
            {t("dashboard.fileManager.upload")}
          </Button>
        </div>
      </div>
      <FileManagerToolbar />
      <FoldersSection folders={folders} />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-medium text-lg">{t("dashboard.fileManager.allFiles")}</h2>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            spacing={0}
            value={activeView}
            aria-label={t("dashboard.fileManager.fileView")}
          >
            <ToggleGroupItem value="grid" asChild>
              <Link href="?view=grid" prefetch={false} replace scroll={false}>
                <Grid2X2 />
                {t("dashboard.fileManager.gridView")}
              </Link>
            </ToggleGroupItem>
            <ToggleGroupItem value="list" asChild>
              <Link href="?view=list" prefetch={false} replace scroll={false}>
                <List />
                {t("dashboard.fileManager.listView")}
              </Link>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        {activeView === "list" ? <FileListView files={files} /> : <FileGridView files={files} />}
      </div>
    </div>
  );
}
