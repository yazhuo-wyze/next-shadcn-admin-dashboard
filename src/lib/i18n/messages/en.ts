/**
 * 英文词条。这份是**结构基准**：`zh-CN.ts` 用 `satisfies Messages` 约束，
 * 所以少写/写错一个 key 会在 `tsc` 阶段就报错，不会等到运行时才发现漏翻。
 *
 * 命名约定：`页面/模块.子区域.字段`，例如 `settings.controls.themeMode`、`nav.item.finance`。
 */

export const en = {
  common: {
    actions: {
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      export: "Export",
      search: "Search",
      reset: "Reset",
      close: "Close",
      more: "More",
      moreActions: "More actions",
    },
    states: {
      loading: "Loading…",
      noResults: "No results.",
      error: "Something went wrong",
    },
    table: {
      rowsPerPage: "Rows per page",
      page: "Page {page}",
      selectAll: "Select all",
      selectRow: "Select row",
      toggleColumns: "Toggle columns",
      goToFirstPage: "Go to first page",
      goToLastPage: "Go to last page",
      goToNextPage: "Go to next page",
      goToPreviousPage: "Go to previous page",
    },
    time: {
      today: "Today",
      yesterday: "Yesterday",
      thisWeek: "This Week",
      lastWeek: "Last Week",
      thisMonth: "This Month",
      lastMonth: "Last Month",
      last7Days: "Last 7 days",
      last30Days: "Last 30 days",
      last3Months: "Last 3 months",
      last6Months: "Last 6 Months",
      vsLastWeek: "vs last week",
      vsLastMonth: "vs last month",
    },
  },

  nav: {
    group: {
      dashboards: "Dashboards",
      pages: "Pages",
      legacy: "Legacy",
      misc: "Misc",
    },
    item: {
      default: "Default",
      crm: "CRM",
      finance: "Finance",
      analytics: "Analytics",
      productivity: "Productivity",
      ecommerce: "E-commerce",
      academy: "Academy",
      logistics: "Logistics",
      infrastructure: "Infrastructure",
      email: "Email",
      chat: "Chat",
      calendar: "Calendar",
      kanban: "Kanban",
      tasks: "Tasks",
      invoice: "Invoice",
      users: "Users",
      roles: "Roles",
      authentication: "Authentication",
      loginV1: "Login v1",
      loginV2: "Login v2",
      registerV1: "Register v1",
      registerV2: "Register v2",
      dashboards: "Dashboards",
      defaultV1: "Default V1",
      crmV1: "CRM V1",
      financeV1: "Finance V1",
      analyticsV1: "Analytics V1",
      others: "Others",
    },
    badge: {
      new: "new",
      soon: "soon",
    },
  },

  shell: {
    toggleSidebar: "Toggle Sidebar",
    openMenu: "Open menu",
    notifications: "Notifications",
    logout: "Log out",
    account: "Account",
    billing: "Billing",
    settings: "Settings",
    commands: "Commands",
    quickCreate: "Quick Create",
    inbox: "Inbox",
  },

  support: {
    title: "Looking for something more?",
    body: "Open an issue or do reach out to me on",
    ctaX: "Reach out on X",
  },

  search: {
    trigger: "Search",
    placeholder: "Search dashboards, users, and more…",
    empty: "No results found.",
    other: "Other",
  },

  settings: {
    title: "Preferences",
    description: "Customize your dashboard layout preferences.",
    language: "Language",
    themePreset: "Theme Preset",
    fonts: "Fonts",
    themeMode: "Theme Mode",
    themeModeLight: "Light",
    themeModeDark: "Dark",
    themeModeSystem: "System",
    pageLayout: "Page Layout",
    pageLayoutCentered: "Centered",
    pageLayoutFullWidth: "Full Width",
    navbarBehavior: "Navbar Behavior",
    navbarSticky: "Sticky",
    navbarScroll: "Scroll",
    sidebarStyle: "Sidebar Style",
    sidebarInset: "Inset",
    sidebarSidebar: "Sidebar",
    sidebarFloating: "Floating",
    sidebarCollapseMode: "Sidebar Collapse Mode",
    sidebarCollapseIcon: "Icon",
    sidebarCollapseOffcanvas: "OffCanvas",
    restoreDefaults: "Restore Defaults",
  },
} as const;

/**
 * 词条结构基准：任何语言的词条表都必须满足这个形状。
 *
 * `en` 用了 `as const`（好让 key 在编辑器里有补全），但那会让值变成字面量类型
 * （`"Save"` 而不是 `string`），于是中文词条没法 `satisfies`。
 * 所以这里把**值统一放宽成 string、只保留结构**。
 */
type WidenStrings<T> = T extends string ? string : { readonly [K in keyof T]: WidenStrings<T[K]> };

export type Messages = WidenStrings<typeof en>;
