"use client";

import { createContext, useContext } from "react";

import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { useSortable } from "@dnd-kit/react/sortable";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { FlexRender, Subscribe } from "@tanstack/react-table";
import { CircleCheckIcon, EllipsisVerticalIcon, GripVerticalIcon, LoaderIcon, TrendingUpIcon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import type { DataTableFeatures } from "@/lib/data-table-features";
import type { TFunction } from "@/lib/i18n/dictionary";
import { useI18n } from "@/lib/i18n/i18n-provider";

import type { ProposalSectionsRow } from "./schema";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

type SortableRowContextValue = Pick<ReturnType<typeof useSortable>, "handleRef">;

const SortableRowContext = createContext<SortableRowContextValue | null>(null);

function DragHandle() {
  const { t } = useI18n();
  const sortableRow = useContext(SortableRowContext);

  if (!sortableRow) {
    return null;
  }

  const { handleRef } = sortableRow;

  return (
    <Button ref={handleRef} variant="ghost" size="icon" className="size-7 text-muted-foreground hover:bg-transparent">
      <GripVerticalIcon />
      <span className="sr-only">{t("dashboard.legacy.default-v1.table.dragToReorder")}</span>
    </Button>
  );
}

function ProposalSectionDetailViewer({ item }: { item: ProposalSectionsRow }) {
  const { t } = useI18n();
  const isMobile = useIsMobile();

  const chartConfig = {
    desktop: {
      label: t("dashboard.legacy.default-v1.chart.desktop"),
      color: "var(--primary)",
    },
    mobile: {
      label: t("dashboard.legacy.default-v1.chart.mobile"),
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          {item.header}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>{t("dashboard.legacy.default-v1.viewer.showingVisitors")}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 font-medium leading-none">
                  {t("dashboard.legacy.default-v1.viewer.trendingUp")} <TrendingUpIcon />
                </div>
                <div className="text-muted-foreground">{t("dashboard.legacy.default-v1.viewer.description")}</div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">{t("dashboard.legacy.default-v1.table.header")}</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">{t("dashboard.legacy.default-v1.table.type")}</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder={t("dashboard.legacy.default-v1.viewer.selectType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Table of Contents">
                        {t("dashboard.legacy.default-v1.type.Table of Contents")}
                      </SelectItem>
                      <SelectItem value="Executive Summary">
                        {t("dashboard.legacy.default-v1.type.Executive Summary")}
                      </SelectItem>
                      <SelectItem value="Technical Approach">
                        {t("dashboard.legacy.default-v1.type.Technical Approach")}
                      </SelectItem>
                      <SelectItem value="Design">{t("dashboard.legacy.default-v1.type.Design")}</SelectItem>
                      <SelectItem value="Capabilities">{t("dashboard.legacy.default-v1.type.Capabilities")}</SelectItem>
                      <SelectItem value="Focus Documents">
                        {t("dashboard.legacy.default-v1.type.Focus Documents")}
                      </SelectItem>
                      <SelectItem value="Narrative">{t("dashboard.legacy.default-v1.type.Narrative")}</SelectItem>
                      <SelectItem value="Cover Page">{t("dashboard.legacy.default-v1.type.Cover Page")}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">{t("dashboard.legacy.default-v1.table.status")}</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder={t("dashboard.legacy.default-v1.viewer.selectStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Done">{t("dashboard.legacy.default-v1.status.Done")}</SelectItem>
                      <SelectItem value="In Progress">{t("dashboard.legacy.default-v1.status.In Progress")}</SelectItem>
                      <SelectItem value="Not Started">{t("dashboard.legacy.default-v1.status.Not Started")}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">{t("dashboard.legacy.default-v1.table.target")}</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">{t("dashboard.legacy.default-v1.table.limit")}</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">{t("dashboard.legacy.default-v1.table.reviewer")}</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder={t("dashboard.legacy.default-v1.viewer.selectReviewer")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                    <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
                    <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>{t("dashboard.legacy.default-v1.viewer.submit")}</Button>
          <DrawerClose asChild>
            <Button variant="outline">{t("dashboard.legacy.default-v1.viewer.done")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function createInlineSaveHandler(header: string, t: TFunction) {
  return (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      loading: t("dashboard.legacy.default-v1.table.saving", { header }),
      success: t("dashboard.legacy.default-v1.table.saveSuccess"),
      error: t("dashboard.legacy.default-v1.table.saveError"),
    });
  };
}

export function proposalSectionsColumns(t: TFunction): ColumnDef<DataTableFeatures, ProposalSectionsRow>[] {
  return [
    {
      id: "drag",
      header: () => null,
      cell: () => <DragHandle />,
      enableSorting: false,
      enableHiding: false,
    },
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
          <Subscribe source={row.table.atoms.rowSelection} selector={(rowSelection) => Boolean(rowSelection?.[row.id])}>
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
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "header",
      header: t("dashboard.legacy.default-v1.table.header"),
      cell: ({ row }) => <ProposalSectionDetailViewer item={row.original} />,
      enableHiding: false,
    },
    {
      accessorKey: "type",
      header: t("dashboard.legacy.default-v1.table.sectionType"),
      cell: ({ row }) => (
        <div className="w-32">
          <Badge variant="outline" className="px-1.5 text-muted-foreground">
            {t(`dashboard.legacy.default-v1.type.${row.original.type}`)}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: t("dashboard.legacy.default-v1.table.status"),
      cell: ({ row }) => (
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {row.original.status === "Done" ? (
            <CircleCheckIcon className="fill-green-500 stroke-primary-foreground dark:fill-green-600" />
          ) : (
            <LoaderIcon />
          )}
          {t(`dashboard.legacy.default-v1.status.${row.original.status}`)}
        </Badge>
      ),
    },
    {
      accessorKey: "target",
      header: () => <div className="w-full text-right">{t("dashboard.legacy.default-v1.table.target")}</div>,
      cell: ({ row }) => (
        <form onSubmit={createInlineSaveHandler(row.original.header, t)}>
          <Label htmlFor={`${row.original.id}-target`} className="sr-only">
            {t("dashboard.legacy.default-v1.table.target")}
          </Label>
          <Input
            id={`${row.original.id}-target`}
            defaultValue={row.original.target}
            className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:focus-visible:bg-input/30 dark:hover:bg-input/30"
          />
        </form>
      ),
    },
    {
      accessorKey: "limit",
      header: () => <div className="w-full text-right">{t("dashboard.legacy.default-v1.table.limit")}</div>,
      cell: ({ row }) => (
        <form onSubmit={createInlineSaveHandler(row.original.header, t)}>
          <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
            {t("dashboard.legacy.default-v1.table.limit")}
          </Label>
          <Input
            id={`${row.original.id}-limit`}
            defaultValue={row.original.limit}
            className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background dark:bg-transparent dark:focus-visible:bg-input/30 dark:hover:bg-input/30"
          />
        </form>
      ),
    },
    {
      accessorKey: "reviewer",
      header: t("dashboard.legacy.default-v1.table.reviewer"),
      cell: ({ row }) => {
        const isAssigned = row.original.reviewer !== "Assign reviewer";

        if (isAssigned) {
          return row.original.reviewer;
        }

        return (
          <>
            <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
              {t("dashboard.legacy.default-v1.table.reviewer")}
            </Label>
            <Select>
              <SelectTrigger
                id={`${row.original.id}-reviewer`}
                className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
                size="sm"
              >
                <SelectValue placeholder={t("dashboard.legacy.default-v1.table.assignReviewer")} />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectGroup>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        );
      },
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
              size="icon"
            >
              <EllipsisVerticalIcon />
              <span className="sr-only">{t("shell.openMenu")}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>{t("common.actions.edit")}</DropdownMenuItem>
            <DropdownMenuItem>{t("dashboard.legacy.default-v1.table.makeCopy")}</DropdownMenuItem>
            <DropdownMenuItem>{t("dashboard.legacy.default-v1.table.favorite")}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">{t("common.actions.delete")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
    },
  ];
}

export function DraggableProposalSectionsRow({
  row,
  index,
  isSelected,
}: {
  row: Row<DataTableFeatures, ProposalSectionsRow>;
  index: number;
  isSelected: boolean;
}) {
  const { handleRef, isDragging, ref } = useSortable({
    id: row.original.id,
    index,
    type: "proposal-section",
    accept: "proposal-section",
    group: "proposal-sections",
    modifiers: [RestrictToVerticalAxis],
  });

  return (
    <SortableRowContext.Provider value={{ handleRef }}>
      <TableRow
        ref={ref}
        data-state={isSelected && "selected"}
        data-dragging={isDragging}
        className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            <FlexRender cell={cell} />
          </TableCell>
        ))}
      </TableRow>
    </SortableRowContext.Provider>
  );
}
