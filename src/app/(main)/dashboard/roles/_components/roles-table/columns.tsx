"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DataTableFeatures } from "@/lib/data-table-features";
import type { TFunction } from "@/lib/i18n/dictionary";

import type { Role } from "./data";

/**
 * 列定义改成接收 `t` 的函数：表头是界面标签需要跟随语言，而模块级常量拿不到 `t`。
 * role / group / accessLevel / status / permissionSets 单元格展示的是数据原值
 * （与分组、筛选逻辑共用），保持英文不动，只在渲染处用 `common.enums.<维度>.<英文值>` 词条。
 */
export const rolesColumns = (t: TFunction): ColumnDef<DataTableFeatures, Role>[] => [
  {
    id: "group",
    accessorKey: "group",
    filterFn: "equalsString",
    enableHiding: true,
  },
  {
    id: "search",
    accessorFn: (row) => [row.role, row.owner, ...row.permissionSets].join(" "),
    filterFn: "includesString",
    enableHiding: true,
  },
  {
    id: "role",
    accessorKey: "role",
    header: t("dashboard.roles.table.role"),
    size: 180,
    minSize: 180,
    cell: ({ row }) => <span className="font-medium text-sm">{t(`common.enums.role.${row.original.role}`)}</span>,
  },
  {
    id: "accessLevel",
    accessorKey: "accessLevel",
    header: t("dashboard.roles.table.accessLevel"),
    size: 120,
    cell: ({ row }) => (
      <Badge className="rounded-sm" variant="outline">
        {t(`common.enums.accessLevel.${row.original.accessLevel}`)}
      </Badge>
    ),
  },
  {
    id: "users",
    accessorKey: "users",
    header: t("dashboard.roles.table.users"),
    size: 70,
    cell: ({ row }) => <span className="text-sm">{row.original.users}</span>,
  },
  {
    id: "permissionSets",
    accessorFn: (row) => row.permissionSets.join(" "),
    header: t("dashboard.roles.table.permissionSets"),
    size: 310,
    cell: ({ row }) => (
      <div className="flex flex-wrap items-center justify-start gap-2">
        {row.original.permissionSets.slice(0, 3).map((set) => (
          <Badge className="rounded-sm" variant="outline" key={set}>
            {t(`common.enums.permissionSet.${set}`)}
          </Badge>
        ))}
        {row.original.permissionSets.length > 3 ? (
          <span className="text-sm tabular-nums">+{row.original.permissionSets.length - 3}</span>
        ) : null}
      </div>
    ),
  },
  {
    id: "lastReview",
    accessorKey: "lastReview",
    header: t("dashboard.roles.table.lastReview"),
    size: 120,
    cell: ({ row }) => <span className="text-sm">{row.original.lastReview}</span>,
  },
  {
    id: "owner",
    accessorKey: "owner",
    header: t("dashboard.roles.table.owner"),
    size: 110,
    filterFn: "equalsString",
    cell: ({ row }) => <span className="text-sm">{row.original.owner}</span>,
  },
  {
    id: "status",
    accessorKey: "status",
    header: t("dashboard.roles.table.status"),
    size: 130,
    filterFn: "equalsString",
    cell: ({ row }) => (
      <Badge className="rounded-sm" variant="outline">
        {t(`common.enums.roleStatus.${row.original.status}`)}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "",
    size: 70,
    cell: ({ row }) => {
      const isSystemRole = row.original.group === "System roles";
      const needsReview = row.original.status === "Needs review";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuGroup>
              {needsReview ? <DropdownMenuItem>{t("dashboard.roles.actions.reviewChanges")}</DropdownMenuItem> : null}
              <DropdownMenuItem>{t("dashboard.roles.actions.viewDetails")}</DropdownMenuItem>
              <DropdownMenuItem disabled={isSystemRole}>{t("dashboard.roles.actions.editRole")}</DropdownMenuItem>
              <DropdownMenuItem disabled={isSystemRole}>{t("dashboard.roles.actions.duplicateRole")}</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>{t("dashboard.roles.actions.reviewPermissions")}</DropdownMenuItem>
              <DropdownMenuItem>{t("dashboard.roles.actions.manageMembers")}</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled={isSystemRole} variant="destructive">
                {t("dashboard.roles.actions.archiveRole")}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableColumnFilter: false,
  },
];
