"use client";

import * as React from "react";

import { arrayMove } from "@dnd-kit/helpers";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import {
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  PlusIcon,
  Settings2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dataTableFeatures } from "@/lib/data-table-features";
import type { TFunction } from "@/lib/i18n/dictionary";
import { useI18n } from "@/lib/i18n/i18n-provider";

import { DraggableProposalSectionsRow, proposalSectionsColumns } from "./columns";
import type { ProposalSectionsRow } from "./schema";

const VIEW_OPTIONS = (t: TFunction) =>
  [
    { value: "outline", label: t("dashboard.legacy.default-v1.table.viewOption.outline") },
    { value: "past-performance", label: t("dashboard.legacy.default-v1.table.viewOption.pastPerformance") },
    { value: "key-personnel", label: t("dashboard.legacy.default-v1.table.viewOption.keyPersonnel") },
    { value: "focus-documents", label: t("dashboard.legacy.default-v1.table.viewOption.focusDocuments") },
  ] as const;

type ViewOption = ReturnType<typeof VIEW_OPTIONS>[number]["value"];
export function ProposalSectionsTable({ data: initialData }: { data: ProposalSectionsRow[] }) {
  const { t } = useI18n();
  const [data, setData] = React.useState(() => initialData);
  const [activeView, setActiveView] = React.useState<ViewOption>("outline");
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useTable({
    features: dataTableFeatures,
    data,
    columns: proposalSectionsColumns(t),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  });
  const sortableRowIds = table.getRowModel().rows.map((row) => row.original.id);

  function handleDragEnd(event: DragEndEvent) {
    const { source } = event.operation;

    if (event.canceled || !isSortable(source) || source.initialIndex === source.index) {
      return;
    }

    const destinationId = sortableRowIds[source.index];

    if (destinationId === undefined) {
      return;
    }

    setData((currentData) => {
      const oldIndex = currentData.findIndex((row) => row.id === source.id);
      const newIndex = currentData.findIndex((row) => row.id === destinationId);

      if (oldIndex === -1 || newIndex === -1) {
        return currentData;
      }

      return arrayMove(currentData, oldIndex, newIndex);
    });
  }

  return (
    <Tabs
      value={activeView}
      onValueChange={(value) => setActiveView(value as ViewOption)}
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          {t("dashboard.legacy.default-v1.table.view")}
        </Label>
        <Select value={activeView} onValueChange={(value) => setActiveView(value as ViewOption)}>
          <SelectTrigger className="flex @4xl/main:hidden w-fit" size="sm" id="view-selector">
            <SelectValue placeholder={t("dashboard.legacy.default-v1.table.selectView")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {VIEW_OPTIONS(t).map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <TabsList className="@4xl/main:flex hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1">
          <TabsTrigger value="outline">{t("dashboard.legacy.default-v1.table.viewOption.outline")}</TabsTrigger>
          <TabsTrigger value="past-performance">
            {t("dashboard.legacy.default-v1.table.viewOption.pastPerformance")} <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            {t("dashboard.legacy.default-v1.table.viewOption.keyPersonnel")} <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">
            {t("dashboard.legacy.default-v1.table.viewOption.focusDocuments")}
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings2 data-icon="inline-start" />
                {t("dashboard.legacy.default-v1.table.view")}
                <ChevronDownIcon data-icon="inline-end" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-35">
              <DropdownMenuLabel>{t("common.table.toggleColumns")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <PlusIcon data-icon="inline-start" />
            <span className="hidden lg:inline">{t("dashboard.legacy.default-v1.table.addSection")}</span>
          </Button>
        </div>
      </div>
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DragDropProvider onDragEnd={handleDragEnd}>
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows.length ? (
                  table
                    .getRowModel()
                    .rows.map((row, index) => (
                      <DraggableProposalSectionsRow
                        key={row.id}
                        row={row}
                        index={index}
                        isSelected={Boolean(table.state.rowSelection[row.id])}
                      />
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
                      {t("common.states.noResults")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DragDropProvider>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-muted-foreground text-sm lg:flex">
            {t("dashboard.legacy.default-v1.table.rowsSelected", {
              selected: table.getFilteredSelectedRowModel().rows.length,
              total: table.getFilteredRowModel().rows.length,
            })}
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="font-medium text-sm">
                {t("common.table.rowsPerPage")}
              </Label>
              <Select
                value={`${table.state.pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.state.pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectGroup>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center font-medium text-sm">
              Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">{t("common.table.goToFirstPage")}</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">{t("common.table.goToPreviousPage")}</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">{t("common.table.goToNextPage")}</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">{t("common.table.goToLastPage")}</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="past-performance" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed" />
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed" />
      </TabsContent>
      <TabsContent value="focus-documents" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed" />
      </TabsContent>
    </Tabs>
  );
}
