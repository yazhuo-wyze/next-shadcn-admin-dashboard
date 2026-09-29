"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Subscribe } from "@tanstack/react-table";
import { cn } from "cn";
import { Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { DataTableFeatures } from "@/lib/data-table-features";
import type { TFunction } from "@/lib/i18n/dictionary";

import type { OpportunityRow } from "./schema";

const healthStripSlots = Array.from({ length: 18 }, (_, index) => ({
  id: `strip-${index + 1}`,
  threshold: index + 1,
}));

function getHealthScore(health: OpportunityRow["health"]) {
  switch (health) {
    case "On Track":
      return 18;
    case "Needs Review":
      return 11;
    case "At Risk":
      return 7;
    case "On Hold":
      return 4;
    default:
      return 0;
  }
}

/**
 * 列定义改成接收 `t` 的函数：表头是界面标签需要跟随语言，
 * 而模块级常量拿不到 `t`（参考 default 页面的 `recentCustomersColumns(t)` 写法）。
 * 注意 stage / health 单元格展示的是数据原值（与筛选逻辑共用），保持英文不动。
 */
export function opportunitiesColumns(t: TFunction): ColumnDef<DataTableFeatures, OpportunityRow>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
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
              aria-label={t("dashboard.crm.table.selectAll")}
            />
          )}
        </Subscribe>
      ),
      cell: ({ row }) => (
        <Subscribe source={row.table.atoms.rowSelection} selector={(selection) => Boolean(selection?.[row.id])}>
          {(checked) => (
            <Checkbox
              checked={checked}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label={t("dashboard.crm.table.selectRow", { name: row.original.account })}
            />
          )}
        </Subscribe>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: t("dashboard.crm.table.id"),
      cell: ({ row }) => <div className="text-sm tracking-tight">{row.original.id}</div>,
      enableHiding: false,
    },
    {
      accessorKey: "account",
      header: t("dashboard.crm.table.account"),
      cell: ({ row }) => <div className="font-medium text-sm">{row.original.account}</div>,
    },
    {
      accessorKey: "stage",
      header: t("dashboard.crm.table.stage"),
      cell: ({ row }) => (
        <Badge variant="outline" className="rounded-full px-2.5">
          {/* 值保持英文原样（筛选用），只在渲染时查词条显示中文 */}
          {t(`common.enums.stage.${row.original.stage}`)}
        </Badge>
      ),
      filterFn: "equalsString",
    },
    {
      accessorKey: "priority",
      header: t("dashboard.crm.table.priority"),
      cell: ({ row }) => <div className="text-sm">{row.original.priority}</div>,
    },
    {
      accessorKey: "health",
      header: t("dashboard.crm.table.health"),
      cell: ({ row }) => (
        <div className="flex items-end gap-0.5" title={t(`common.enums.health.${row.original.health}`)}>
          {/* 值保持英文原样（筛选用），只在渲染时查词条显示中文 */}
          <span className="sr-only">{t(`common.enums.health.${row.original.health}`)}</span>
          {healthStripSlots.map((slot) => (
            <div
              key={`${row.original.id}-${slot.id}`}
              className={cn(
                "h-5 w-1 rounded-full",
                slot.threshold <= getHealthScore(row.original.health) ? "bg-green-500/85" : "bg-green-500/15",
              )}
            />
          ))}
        </div>
      ),
      filterFn: "equalsString",
    },
    {
      accessorKey: "value",
      header: t("dashboard.crm.table.value"),
      cell: ({ row }) => <div className="font-medium text-sm tabular-nums">{row.original.value}</div>,
    },
    {
      id: "actions",
      header: () => <div className="text-right">{t("common.actions.edit")}</div>,
      cell: () => (
        <div className="text-right">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full text-muted-foreground hover:bg-transparent focus-visible:bg-transparent"
          >
            <Pencil />
            <span className="sr-only">{t("dashboard.crm.table.editOpportunity")}</span>
          </Button>
        </div>
      ),
      enableHiding: false,
    },
  ];
}
