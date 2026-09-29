import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { getT } from "@/lib/i18n/server";

export async function FileManagerToolbar() {
  const t = await getT();

  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
      <InputGroup className="md:max-w-lg">
        <InputGroupInput
          placeholder={t("dashboard.fileManager.toolbar.searchPlaceholder")}
          aria-label={t("dashboard.fileManager.toolbar.searchAriaLabel")}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <div className="flex flex-1 flex-wrap items-center gap-2 xl:justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <SlidersHorizontal data-icon="inline-start" />
              {t("dashboard.fileManager.toolbar.filterSort")}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{t("dashboard.fileManager.toolbar.show")}</DropdownMenuLabel>
              <DropdownMenuRadioGroup value="all">
                <DropdownMenuRadioItem value="all">{t("dashboard.fileManager.allFiles")}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="starred">
                  {t("dashboard.fileManager.toolbar.starred")}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="shared">{t("dashboard.fileManager.shared")}</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <SlidersHorizontal />
                  {t("dashboard.fileManager.toolbar.fileType")}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent sideOffset={8}>
                  <DropdownMenuGroup>
                    {/* 选项 value 是筛选依赖的英文枚举值，显示文案走 common.enums.fileKind.* */}
                    <DropdownMenuRadioGroup value="all">
                      <DropdownMenuRadioItem value="all">
                        {t("dashboard.fileManager.toolbar.allTypes")}
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="archive">
                        {t("common.enums.fileKind.archive")}
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="design">{t("common.enums.fileKind.design")}</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="document">
                        {t("common.enums.fileKind.document")}
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="pdf">{t("common.enums.fileKind.pdf")}</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="spreadsheet">
                        {t("common.enums.fileKind.spreadsheet")}
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <ArrowUpDown />
                  {t("dashboard.fileManager.toolbar.sortBy")}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent sideOffset={8}>
                  <DropdownMenuGroup>
                    <DropdownMenuRadioGroup value="modified">
                      <DropdownMenuRadioItem value="modified">
                        {t("dashboard.fileManager.toolbar.lastModified")}
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="name">
                        {t("dashboard.fileManager.field.name")}
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="size">
                        {t("dashboard.fileManager.field.size")}
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
