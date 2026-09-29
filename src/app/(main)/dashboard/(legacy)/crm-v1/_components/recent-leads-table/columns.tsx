"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Subscribe } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

import type { RecentLeadRow } from "./schema";

export function recentLeadsColumns(t: TFunction): ColumnDef<DataTableFeatures, RecentLeadRow>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Subscribe
            source={table.atoms.rowSelection}
            selector={() =>
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected() && "indeterminate")
            }
          >
            {(checked) => (
              <Checkbox
                checked={checked}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label={t("common.table.selectAll")}
              />
            )}
          </Subscribe>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Subscribe source={row.table.atoms.rowSelection} selector={(selection) => Boolean(selection?.[row.id])}>
            {(checked) => (
              <Checkbox
                checked={checked}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label={t("common.table.selectRow")}
              />
            )}
          </Subscribe>
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: t("dashboard.legacy.crm-v1.table.ref"),
      cell: ({ row }) => <span className="tabular-nums">{row.original.id}</span>,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: t("dashboard.legacy.crm-v1.table.name"),
      cell: ({ row }) => row.original.name,
      enableHiding: false,
    },
    {
      accessorKey: "company",
      header: t("dashboard.legacy.crm-v1.table.company"),
      cell: ({ row }) => row.original.company,
    },
    {
      accessorKey: "status",
      header: t("dashboard.legacy.crm-v1.table.status"),
      cell: ({ row }) => (
        <Badge variant="secondary">{t(`dashboard.legacy.crm-v1.status.${row.original.status}`)}</Badge>
      ),
    },
    {
      accessorKey: "source",
      header: t("dashboard.legacy.crm-v1.table.source"),
      cell: ({ row }) => (
        <Badge variant="outline">{t(`dashboard.legacy.crm-v1.sourceLabel.${row.original.source}`)}</Badge>
      ),
    },
    {
      accessorKey: "lastActivity",
      header: t("dashboard.legacy.crm-v1.table.lastActivity"),
      cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.lastActivity}</span>,
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="flex size-8 text-muted-foreground">
              <EllipsisVertical />
              <span className="sr-only">{t("shell.openMenu")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuGroup>
              <DropdownMenuItem>{t("common.actions.view")}</DropdownMenuItem>
              <DropdownMenuItem>{t("dashboard.legacy.crm-v1.table.assign")}</DropdownMenuItem>
              <DropdownMenuItem>{t("dashboard.legacy.crm-v1.table.archive")}</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">{t("common.actions.delete")}</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableHiding: false,
    },
  ];
}
