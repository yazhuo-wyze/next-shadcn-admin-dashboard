"use client";

import * as React from "react";

import { type ColumnDef, type SortingState, useTable } from "@tanstack/react-table";
import { cn } from "cn";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type DataTableFeatures, dataTableFeatures } from "@/lib/data-table-features";
import type { TFunction } from "@/lib/i18n/dictionary";
import { useI18n } from "@/lib/i18n/i18n-provider";
import { formatCurrency } from "@/lib/utils";

type LedgerPriority = "Escalate" | "Coach" | "Reforecast" | null;

type LedgerRow = {
  id: number;
  account: string;
  dealId: string;
  stage: string;
  blocker: string;
  owner: string;
  idleDays: number;
  closeVariance: string;
  priority: LedgerPriority;
  nextAction: string;
  riskScore: number;
};

const LEDGER_ROWS: LedgerRow[] = [
  {
    id: 1,
    account: "Oscorp Labs",
    dealId: "OPP-489",
    stage: "Legal",
    blocker: "关闭日期已逾期 35 天",
    owner: "Leila Zhang",
    idleDays: 36,
    closeVariance: "逾期 35 天",
    priority: "Escalate",
    nextAction: "参加下一次客户电话会议并重设成交计划。",
    riskScore: 81,
  },
  {
    id: 2,
    account: "Hooli AI",
    dealId: "OPP-475",
    stage: "Qualification",
    blocker: "关闭日期已逾期 28 天",
    owner: "Omar Ali",
    idleDays: 33,
    closeVariance: "逾期 28 天",
    priority: "Coach",
    nextAction: "复盘商机策略并打通阶段出口。",
    riskScore: 76,
  },
  {
    id: 3,
    account: "Globex Systems",
    dealId: "OPP-447",
    stage: "Qualification",
    blocker: "关闭日期已逾期 37 天",
    owner: "Sofia Bautista",
    idleDays: 34,
    closeVariance: "逾期 37 天",
    priority: "Coach",
    nextAction: "复盘商机策略并打通阶段出口。",
    riskScore: 75,
  },
  {
    id: 4,
    account: "Umbrella Corp",
    dealId: "OPP-459",
    stage: "Legal",
    blocker: "关闭日期已逾期 24 天",
    owner: "Leila Zhang",
    idleDays: 29,
    closeVariance: "逾期 24 天",
    priority: "Coach",
    nextAction: "复盘商机策略并打通阶段出口。",
    riskScore: 72,
  },
  {
    id: 5,
    account: "Acme Industries",
    dealId: "OPP-421",
    stage: "Negotiation",
    blocker: "关闭日期已逾期 32 天",
    owner: "Leila Zhang",
    idleDays: 31,
    closeVariance: "逾期 32 天",
    priority: "Coach",
    nextAction: "复盘商机策略并打通阶段出口。",
    riskScore: 69,
  },
  {
    id: 6,
    account: "Wayne Devices",
    dealId: "OPP-471",
    stage: "Proposal",
    blocker: "关闭日期已逾期 22 天",
    owner: "Sofia Bautista",
    idleDays: 32,
    closeVariance: "逾期 22 天",
    priority: "Reforecast",
    nextAction: "调整预测分类与预计成交时间。",
    riskScore: 56,
  },
  {
    id: 7,
    account: "Aperture Health",
    dealId: "OPP-497",
    stage: "Proposal",
    blocker: "关闭日期已逾期 20 天",
    owner: "Omar Ali",
    idleDays: 30,
    closeVariance: "逾期 20 天",
    priority: "Reforecast",
    nextAction: "调整预测分类与预计成交时间。",
    riskScore: 50,
  },
  {
    id: 8,
    account: "Northwind Labs",
    dealId: "OPP-438",
    stage: "Proposal",
    blocker: "关闭日期已逾期 14 天",
    owner: "Julian Singh",
    idleDays: 23,
    closeVariance: "逾期 14 天",
    priority: null,
    nextAction: "无需立即干预。",
    riskScore: 42,
  },
  {
    id: 9,
    account: "Stark Logistics",
    dealId: "OPP-463",
    stage: "Negotiation",
    blocker: "关闭日期已逾期 10 天",
    owner: "Julian Singh",
    idleDays: 21,
    closeVariance: "逾期 10 天",
    priority: null,
    nextAction: "无需立即干预。",
    riskScore: 39,
  },
  {
    id: 10,
    account: "Soylent Foods",
    dealId: "OPP-482",
    stage: "Negotiation",
    blocker: "关闭日期已逾期 5 天",
    owner: "Julian Singh",
    idleDays: 24,
    closeVariance: "逾期 5 天",
    priority: null,
    nextAction: "无需立即干预。",
    riskScore: 31,
  },
];

const priorityTone: Record<Exclude<LedgerPriority, null>, string> = {
  Escalate: "border-destructive/35 bg-destructive/10 text-destructive",
  Coach: "border-primary/35 bg-primary/10 text-primary",
  Reforecast: "border-amber-500/35 bg-amber-500/10 text-amber-700",
};

const ledgerColumns = (t: TFunction): ColumnDef<DataTableFeatures, LedgerRow>[] => [
  {
    accessorKey: "account",
    header: t("dashboard.legacy.analytics-v1.ledger.account"),
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <p className="font-medium text-sm">{row.original.account}</p>
        <p className="text-muted-foreground text-xs">
          {row.original.dealId} · {t(`dashboard.legacy.analytics-v1.stage.${row.original.stage}`)}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "blocker",
    header: t("dashboard.legacy.analytics-v1.ledger.blocker"),
    cell: ({ row }) => <div className="max-w-44 whitespace-normal text-xs">{row.original.blocker}</div>,
  },
  {
    accessorKey: "owner",
    header: t("dashboard.legacy.analytics-v1.ledger.owner"),
    cell: ({ row }) => <span className="text-xs">{row.original.owner}</span>,
  },
  {
    accessorKey: "idleDays",
    header: t("dashboard.legacy.analytics-v1.ledger.idleDays"),
    cell: ({ row }) => <span className="text-xs tabular-nums">{row.original.idleDays}d</span>,
  },
  {
    accessorKey: "closeVariance",
    header: t("dashboard.legacy.analytics-v1.ledger.closeVariance"),
    cell: ({ row }) => <span className="text-xs tabular-nums">{row.original.closeVariance}</span>,
  },
  {
    accessorKey: "nextAction",
    header: t("dashboard.legacy.analytics-v1.ledger.nextAction"),
    cell: ({ row }) => (
      <div className="flex max-w-64 flex-col gap-1 whitespace-normal">
        {row.original.priority ? (
          <Badge variant="outline" className={cn("text-[10px] uppercase", priorityTone[row.original.priority])}>
            {t(`dashboard.legacy.analytics-v1.priority.${row.original.priority}`)}
          </Badge>
        ) : null}
        <p className="text-xs">{row.original.nextAction}</p>
      </div>
    ),
  },
  {
    accessorKey: "riskScore",
    header: ({ column }) => (
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="-mr-2 h-8 px-2 text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("dashboard.legacy.analytics-v1.ledger.riskLadder")}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Badge
          variant="outline"
          className={cn(
            "min-w-12 justify-center font-medium tabular-nums",
            row.original.riskScore >= 80 && "border-destructive/35 bg-destructive/10 text-destructive",
            row.original.riskScore >= 65 &&
              row.original.riskScore < 80 &&
              "border-amber-500/35 bg-amber-500/10 text-amber-700",
          )}
        >
          {row.original.riskScore}
        </Badge>
      </div>
    ),
  },
];

export function ActionsRiskLedger() {
  const { t } = useI18n();
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "riskScore", desc: true }]);

  const table = useTable({
    features: dataTableFeatures,
    data: LEDGER_ROWS,
    columns: ledgerColumns(t),
    getRowId: (row) => String(row.id),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <Card className="min-w-0 shadow-xs">
      <CardHeader>
        <CardTitle>{t("dashboard.legacy.analytics-v1.ledger.title")}</CardTitle>
        <CardDescription>{t("dashboard.legacy.analytics-v1.ledger.description")}</CardDescription>
        <CardAction>
          <Badge variant="outline" className="font-medium tabular-nums">
            {t("dashboard.legacy.analytics-v1.ledger.accountsCount", { count: LEDGER_ROWS.length })}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 rounded-lg border bg-muted/20 p-3 text-sm sm:grid-cols-4 sm:divide-x sm:divide-border/60">
          <LedgerStat
            label={t("dashboard.legacy.analytics-v1.ledger.criticalAccounts")}
            value="1"
            detail={t("dashboard.legacy.analytics-v1.ledger.riskLadderWindow")}
          />
          <LedgerStat
            label={t("dashboard.legacy.analytics-v1.ledger.escalationsDue")}
            value="1"
            detail={t("dashboard.legacy.analytics-v1.ledger.next7Days")}
          />
          <LedgerStat
            label={t("dashboard.legacy.analytics-v1.ledger.medianInactivity")}
            value="31d"
            detail={t("dashboard.legacy.analytics-v1.ledger.currentFilterWindow")}
          />
          <LedgerStat
            label={t("dashboard.legacy.analytics-v1.ledger.overdueRevenue")}
            value={formatCurrency(1084000, { noDecimals: true })}
            detail={t("dashboard.legacy.analytics-v1.ledger.closeDateExceeded")}
          />
        </div>

        <div className="min-w-0 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/30">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function LedgerStat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="flex flex-col gap-1 px-0 sm:px-3 last:sm:pr-0 first:sm:pl-0">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="font-semibold text-base tabular-nums">{value}</p>
      <p className="text-muted-foreground text-xs">{detail}</p>
    </div>
  );
}
