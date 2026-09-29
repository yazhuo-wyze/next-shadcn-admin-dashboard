import type { BoardState, Column, TaskOwnerProfile, TaskTeam } from "./types";

export const columns = [
  { id: "ideas", title: "Ideas" },
  { id: "planned", title: "Planned" },
  { id: "building", title: "Building" },
  { id: "qa", title: "QA" },
  { id: "shipped", title: "Shipped" },
] as const satisfies readonly Column[];

export const columnIds = columns.map((column) => column.id);

export const tagTones: Record<TaskTeam, string> = {
  Backend: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  Data: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Design: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300",
  Docs: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  "Finance Ops": "bg-teal-500/10 text-teal-700 dark:text-teal-300",
  Platform: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  Product: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  QA: "bg-red-500/10 text-red-700 dark:text-red-300",
  Security: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
};

const taskOwners = {
  arham: {
    name: "Arham Khan",
    tone: "[&_[data-slot=avatar-fallback]]:bg-zinc-100 [&_[data-slot=avatar-fallback]]:text-zinc-700 after:border-zinc-200 dark:[&_[data-slot=avatar-fallback]]:bg-zinc-500/15 dark:[&_[data-slot=avatar-fallback]]:text-zinc-300 dark:after:border-zinc-500/20",
  },
  junaid: {
    name: "Ethan Brooks",
    tone: "[&_[data-slot=avatar-fallback]]:bg-lime-100 [&_[data-slot=avatar-fallback]]:text-lime-700 after:border-lime-200 dark:[&_[data-slot=avatar-fallback]]:bg-lime-500/15 dark:[&_[data-slot=avatar-fallback]]:text-lime-300 dark:after:border-lime-500/20",
  },
  maya: {
    name: "Hannah Reed",
    tone: "[&_[data-slot=avatar-fallback]]:bg-indigo-100 [&_[data-slot=avatar-fallback]]:text-indigo-700 after:border-indigo-200 dark:[&_[data-slot=avatar-fallback]]:bg-indigo-500/15 dark:[&_[data-slot=avatar-fallback]]:text-indigo-300 dark:after:border-indigo-500/20",
  },
  meera: {
    name: "Rohan Iyer",
    tone: "[&_[data-slot=avatar-fallback]]:bg-fuchsia-100 [&_[data-slot=avatar-fallback]]:text-fuchsia-700 after:border-fuchsia-200 dark:[&_[data-slot=avatar-fallback]]:bg-fuchsia-500/15 dark:[&_[data-slot=avatar-fallback]]:text-fuchsia-300 dark:after:border-fuchsia-500/20",
  },
  nisha: {
    name: "Nora Bennett",
    tone: "[&_[data-slot=avatar-fallback]]:bg-violet-100 [&_[data-slot=avatar-fallback]]:text-violet-700 after:border-violet-200 dark:[&_[data-slot=avatar-fallback]]:bg-violet-500/15 dark:[&_[data-slot=avatar-fallback]]:text-violet-300 dark:after:border-violet-500/20",
  },
  rahul: {
    name: "Vikram Menon",
    tone: "[&_[data-slot=avatar-fallback]]:bg-pink-100 [&_[data-slot=avatar-fallback]]:text-pink-700 after:border-pink-200 dark:[&_[data-slot=avatar-fallback]]:bg-pink-500/15 dark:[&_[data-slot=avatar-fallback]]:text-pink-300 dark:after:border-pink-500/20",
  },
  sara: {
    name: "Clara Hughes",
    tone: "[&_[data-slot=avatar-fallback]]:bg-sky-100 [&_[data-slot=avatar-fallback]]:text-sky-700 after:border-sky-200 dark:[&_[data-slot=avatar-fallback]]:bg-sky-500/15 dark:[&_[data-slot=avatar-fallback]]:text-sky-300 dark:after:border-sky-500/20",
  },
} satisfies Record<string, TaskOwnerProfile>;

// 任务标题/描述属于演示内容，直接写中文，不参与语言切换；
// `priority` / `team` / `insights[].label` 是参与配色与查找的取值，保持英文原值。
export const initialBoard: BoardState = {
  ideas: [
    {
      id: "tender-workflow-map",
      title: "招标流程梳理",
      description: "梳理招标、中标／L1、工单、人员分配、工资与单据之间的关系。",
      priority: "High",
      dueDate: "6月14日",
      progress: 10,
      owner: taskOwners.arham,
      team: "Product",
      insights: [
        { label: "Comments", count: 7 },
        { label: "Documents", count: 3 },
      ],
    },
    {
      id: "license-strategy-research",
      title: "授权策略调研",
      description: "对比闭源 MVP、开放核心、GPL、AGPL 与商业模块几种方案。",
      priority: "Medium",
      dueDate: "6月16日",
      progress: 20,
      owner: taskOwners.rahul,
      team: "Finance Ops",
      insights: [
        { label: "Attachments", count: 2 },
        { label: "Comments", count: 5 },
      ],
    },
    {
      id: "backup-restore-plan",
      title: "备份与恢复方案",
      description: "定义本地数据库备份、恢复以及导出单据的找回流程。",
      priority: "Medium",
      dueDate: "6月18日",
      progress: 15,
      owner: taskOwners.maya,
      team: "Platform",
      insights: [
        { label: "Attachments", count: 1 },
        { label: "Comments", count: 4 },
      ],
    },
    {
      id: "work-order-allocation-model",
      title: "工单分配模型",
      description: "勾勒中标工单如何关联到人员分配与工资月份。",
      priority: "Medium",
      dueDate: "6月19日",
      progress: 5,
      owner: taskOwners.meera,
      team: "Product",
      insights: [
        { label: "Comments", count: 3 },
        { label: "Documents", count: 1 },
      ],
    },
    {
      id: "future-sync-notes",
      title: "同步方案备忘",
      description: "在确定云端 PostgreSQL 与文件存储之前，先记录本地优先同步的前提假设。",
      priority: "Low",
      dueDate: "6月21日",
      progress: 0,
      owner: taskOwners.arham,
      team: "Platform",
      insights: [{ label: "Comments", count: 2 }],
    },
  ],
  planned: [
    {
      id: "electron-app-shell",
      title: "Electron 应用外壳",
      description: "用 React、Tailwind 与 shadcn/ui 搭建本地优先的桌面外壳。",
      priority: "High",
      dueDate: "6月20日",
      progress: 25,
      owner: taskOwners.arham,
      team: "Platform",
      insights: [
        { label: "Attachments", count: 4 },
        { label: "Comments", count: 9 },
        { label: "Documents", count: 2 },
      ],
    },
    {
      id: "secure-preload-api",
      title: "安全的 preload 接口",
      description: "为导入、记录、PDF 与备份暴露渲染进程安全的调用方法。",
      priority: "High",
      dueDate: "6月22日",
      progress: 20,
      owner: taskOwners.nisha,
      team: "Backend",
      insights: [
        { label: "Attachments", count: 2 },
        { label: "Comments", count: 6 },
        { label: "Documents", count: 1 },
      ],
    },
    {
      id: "party-employee-records",
      title: "合作方与员工档案",
      description: "建立客户、外包人员、员工及各类编号的本地档案。",
      priority: "Medium",
      dueDate: "6月24日",
      progress: 15,
      owner: taskOwners.meera,
      team: "Product",
      insights: [
        { label: "Comments", count: 5 },
        { label: "Documents", count: 2 },
      ],
    },
    {
      id: "generated-documents-index",
      title: "生成单据索引",
      description: "规划按合作方、工资月份、员工与导入批次筛选生成的 PDF。",
      priority: "Medium",
      dueDate: "6月25日",
      progress: 10,
      owner: taskOwners.maya,
      team: "Docs",
      insights: [
        { label: "Attachments", count: 2 },
        { label: "Comments", count: 4 },
      ],
    },
  ],
  building: [
    {
      id: "sqlite-drizzle-schema",
      title: "SQLite 与 Drizzle 数据模型",
      description: "建模合作方、员工、招标、工单、工资导入与单据。",
      priority: "High",
      dueDate: "6月26日",
      progress: 65,
      owner: taskOwners.arham,
      team: "Data",
      insights: [
        { label: "Attachments", count: 5 },
        { label: "Comments", count: 11 },
        { label: "Documents", count: 4 },
      ],
    },
    {
      id: "salary-excel-import",
      title: "工资 Excel 导入",
      description: "用 SheetJS 读取工资表，并在本地保存导入批次。",
      priority: "High",
      dueDate: "6月28日",
      progress: 45,
      owner: taskOwners.junaid,
      team: "Data",
      insights: [
        { label: "Attachments", count: 3 },
        { label: "Comments", count: 8 },
        { label: "Documents", count: 2 },
      ],
    },
    {
      id: "column-mapping-builder",
      title: "列映射配置器",
      description: "把 Excel 列映射到工资字段，并按合作方复用模板。",
      priority: "Medium",
      dueDate: "7月1日",
      progress: 30,
      owner: taskOwners.sara,
      team: "Design",
      insights: [
        { label: "Comments", count: 6 },
        { label: "Documents", count: 2 },
      ],
    },
  ],
  qa: [
    {
      id: "salary-row-validation",
      title: "工资行校验",
      description: "标记缺失的员工编号、非法金额、重复行与未映射字段。",
      priority: "High",
      dueDate: "7月4日",
      progress: 75,
      owner: taskOwners.nisha,
      team: "QA",
      insights: [
        { label: "Attachments", count: 4 },
        { label: "Comments", count: 10 },
      ],
    },
    {
      id: "payslip-preview",
      title: "工资单预览",
      description: "在批量导出 PDF 与写入单据历史之前预览生成的工资单。",
      priority: "Medium",
      dueDate: "7月6日",
      progress: 60,
      owner: taskOwners.junaid,
      team: "Finance Ops",
      insights: [
        { label: "Attachments", count: 3 },
        { label: "Comments", count: 7 },
        { label: "Documents", count: 3 },
      ],
    },
  ],
  shipped: [
    {
      id: "architecture-rule",
      title: "架构约束已锁定",
      description: "渲染进程只做 UI；preload、IPC、服务层与数据库保持分离。",
      priority: "High",
      dueDate: "6月8日",
      progress: 100,
      owner: taskOwners.arham,
      team: "Backend",
      insights: [
        { label: "Comments", count: 6 },
        { label: "Documents", count: 3 },
      ],
    },
    {
      id: "private-mvp-scope",
      title: "闭源 MVP 范围",
      description: "先做闭源版本，等流程验证之后再评估开放核心。",
      priority: "Medium",
      dueDate: "6月10日",
      progress: 100,
      owner: taskOwners.rahul,
      team: "Finance Ops",
      insights: [
        { label: "Attachments", count: 2 },
        { label: "Comments", count: 4 },
      ],
    },
    {
      id: "mvp-module-priorities",
      title: "MVP 模块优先级",
      description: "工资单生成排在第一位，但数据模型已支持更广的招标业务。",
      priority: "Medium",
      dueDate: "6月12日",
      progress: 100,
      owner: taskOwners.meera,
      team: "Finance Ops",
      insights: [
        { label: "Comments", count: 5 },
        { label: "Documents", count: 2 },
      ],
    },
  ],
};
