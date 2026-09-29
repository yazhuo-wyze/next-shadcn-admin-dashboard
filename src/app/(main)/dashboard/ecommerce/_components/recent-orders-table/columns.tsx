import type { ColumnDef } from "@tanstack/react-table";
import { Subscribe } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DataTableFeatures } from "@/lib/data-table-features";
import type { TFunction } from "@/lib/i18n/dictionary";

import type { OrderRow } from "./schema";

function formatOrderDate(date: string) {
  return format(parseISO(date), "h:mm a, d MMM yyyy");
}

/**
 * 徽章的 `status` 是数据值（枚举），判断仍用英文；
 * 展示文案走 `common.enums.<维度>.<英文原值>`，值本身一个字都不改。
 */
function PaymentBadge({ status, t }: { status: OrderRow["payment"]; t: TFunction }) {
  if (status === "Paid") {
    return (
      <Badge
        className="border-green-700/25 text-green-700 dark:border-green-300/25 dark:text-green-300"
        variant="outline"
      >
        <span className="size-1.5 rounded-full bg-current" />
        {t(`common.enums.payment.${status}`)}
      </Badge>
    );
  }

  if (status === "Refunded") {
    return (
      <Badge variant="destructive">
        <span className="size-1.5 rounded-full bg-current" />
        {t(`common.enums.payment.${status}`)}
      </Badge>
    );
  }

  return (
    <Badge
      className="border-yellow-700/25 text-yellow-700 dark:border-yellow-300/25 dark:text-yellow-300"
      variant="outline"
    >
      <span className="size-1.5 rounded-full bg-current" />
      {t(`common.enums.payment.${status}`)}
    </Badge>
  );
}

function FulfillmentBadge({ status, t }: { status: OrderRow["fulfillment"]; t: TFunction }) {
  if (status === "Fulfilled") {
    return (
      <Badge
        className="border-green-700/25 text-green-700 dark:border-green-300/25 dark:text-green-300"
        variant="outline"
      >
        <span className="size-1.5 rounded-full bg-current" />
        {t(`common.enums.fulfillment.${status}`)}
      </Badge>
    );
  }

  if (status === "Returned") {
    return (
      <Badge variant="destructive">
        <span className="size-1.5 rounded-full bg-current" />
        {t(`common.enums.fulfillment.${status}`)}
      </Badge>
    );
  }

  return (
    <Badge variant="destructive">
      <span className="size-1.5 rounded-full bg-current" />
      {t(`common.enums.fulfillment.${status}`)}
    </Badge>
  );
}

export function recentOrdersColumns(t: TFunction): ColumnDef<DataTableFeatures, OrderRow>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="w-10">
          <Subscribe
            source={table.atoms.rowSelection}
            selector={() =>
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected() && "indeterminate")
            }
          >
            {(checked) => (
              <Checkbox
                aria-label={t("dashboard.ecommerce.orders.selectAll")}
                checked={checked}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              />
            )}
          </Subscribe>
        </div>
      ),
      cell: ({ row }) => (
        <div className="w-10">
          <Subscribe source={row.table.atoms.rowSelection} selector={(selection) => Boolean(selection?.[row.id])}>
            {(checked) => (
              <Checkbox
                aria-label={t("dashboard.ecommerce.orders.selectRow", { id: row.original.id })}
                checked={checked}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
              />
            )}
          </Subscribe>
        </div>
      ),
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: "id",
      header: t("dashboard.ecommerce.orders.columnOrder"),
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <div className="font-medium leading-none">{row.original.id}</div>
          <div className="text-muted-foreground text-xs">{row.original.items}</div>
        </div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "customer",
      header: t("dashboard.ecommerce.orders.columnCustomer"),
    },
    {
      id: "statusSummary",
      header: t("dashboard.ecommerce.orders.columnStatus"),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <PaymentBadge status={row.original.payment} t={t} />
          <FulfillmentBadge status={row.original.fulfillment} t={t} />
        </div>
      ),
      filterFn: (row, _columnId, value) => {
        if (value === "Needs action") {
          return (
            row.original.payment === "Pending" ||
            row.original.payment === "Refunded" ||
            row.original.fulfillment === "Unfulfilled" ||
            row.original.fulfillment === "Returned"
          );
        }

        if (value === "Unfulfilled") {
          return row.original.fulfillment === "Unfulfilled";
        }

        if (value === "Unpaid") {
          return row.original.payment === "Pending";
        }

        if (value === "Returns") {
          return row.original.payment === "Refunded" || row.original.fulfillment === "Returned";
        }

        return true;
      },
    },
    {
      accessorKey: "total",
      header: () => <div className="w-28">{t("dashboard.ecommerce.orders.columnTotal")}</div>,
      cell: ({ row }) => <div className="w-28 tabular-nums">{row.original.total}</div>,
    },
    {
      accessorKey: "date",
      header: () => <div className="w-44">{t("dashboard.ecommerce.orders.columnDate")}</div>,
      cell: ({ row }) => <div className="w-44 text-muted-foreground">{formatOrderDate(row.original.date)}</div>,
    },
    {
      id: "actions",
      header: () => <div className="flex w-full justify-end">{t("dashboard.ecommerce.orders.columnActions")}</div>,
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex w-full justify-end">
              <Button aria-label={t("dashboard.ecommerce.orders.openActions")} size="icon-sm" variant="ghost">
                <MoreHorizontal />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>{t("dashboard.ecommerce.orders.actionsLabel")}</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>{t("dashboard.ecommerce.orders.viewOrder")}</DropdownMenuItem>
              <DropdownMenuItem>{t("dashboard.ecommerce.orders.contactCustomer")}</DropdownMenuItem>
              <DropdownMenuItem>{t("dashboard.ecommerce.orders.copyOrderId")}</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableHiding: false,
      enableSorting: false,
    },
  ];
}
