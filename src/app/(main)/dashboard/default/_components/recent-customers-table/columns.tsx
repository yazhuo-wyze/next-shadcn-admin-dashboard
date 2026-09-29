"use client";
import type { ColumnDef } from "@tanstack/react-table";
import { Subscribe } from "@tanstack/react-table";
import { addMinutes, differenceInCalendarDays, endOfToday, format, parseISO } from "date-fns";
import { CircleAlertIcon, CircleCheckIcon, Clock3Icon, LoaderIcon, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import type { DataTableFeatures } from "@/lib/data-table-features";
import type { TFunction } from "@/lib/i18n/dictionary";

import type { RecentCustomerRow } from "./schema";

function billingIcon(billing: string) {
  switch (billing) {
    case "Paid":
      return <CircleCheckIcon className="fill-green-500 stroke-primary-foreground dark:fill-green-600" />;
    case "Pending":
      return <LoaderIcon />;
    case "Overdue":
      return <CircleAlertIcon className="text-amber-600 dark:text-amber-500" />;
    case "Trial":
      return <Clock3Icon className="text-muted-foreground" />;
    default:
      return null;
  }
}

export function recentCustomersColumns(t: TFunction): ColumnDef<DataTableFeatures, RecentCustomerRow>[] {
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
                aria-label={t("dashboard.default.table.selectAll")}
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
                aria-label={t("dashboard.default.table.selectRow", { name: row.original.name })}
              />
            )}
          </Subscribe>
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: t("dashboard.default.table.customer"),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md border bg-muted">
            <UserRound className="size-4 text-muted-foreground" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-end justify-between gap-3">
              <div className="grid min-w-0 gap-0.5">
                <span className="truncate font-medium text-sm leading-none">{row.original.name}</span>
                <span className="truncate text-muted-foreground text-xs leading-none">#{row.original.id}</span>
              </div>
            </div>
          </div>
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "search",
      accessorFn: (row) => `${row.id} ${row.name} ${row.email}`,
      filterFn: "includesString",
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: t("dashboard.default.table.status"),
      filterFn: "equalsString",
      cell: ({ row }) => (
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {t(`common.enums.status.${row.original.status}`)}
        </Badge>
      ),
    },
    {
      accessorKey: "billing",
      header: t("dashboard.default.table.billing"),
      filterFn: "equalsString",
      cell: ({ row }) => (
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {billingIcon(row.original.billing)}
          {t(`common.enums.billing.${row.original.billing}`)}
        </Badge>
      ),
    },
    {
      accessorKey: "plan",
      header: t("dashboard.default.table.plan"),
      cell: ({ row }) => <span className="text-sm">{t(`common.enums.plan.${row.original.plan}`)}</span>,
    },
    {
      id: "joinedWindow",
      accessorFn: (row) => {
        const daysSinceJoined = differenceInCalendarDays(endOfToday(), parseISO(row.joined));

        if (daysSinceJoined <= 30) return ["30", "90"];
        if (daysSinceJoined <= 90) return ["90"];
        return [];
      },
      filterFn: "arrIncludes",
      enableHiding: true,
    },
    {
      accessorKey: "joined",
      header: t("dashboard.default.table.joined"),
      cell: ({ row }) => {
        const baseDate = parseISO(row.original.joined);
        const joinedAt = addMinutes(baseDate, 9 * 60 + (Number(row.original.id) % 12) * 17);

        return (
          <div className="grid gap-0.5">
            <span className="text-sm">{format(joinedAt, "do MMMM yyyy")}</span>
            <span className="text-muted-foreground text-xs">at {format(joinedAt, "h:mm a")}</span>
          </div>
        );
      },
    },
  ];
}
