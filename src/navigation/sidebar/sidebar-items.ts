import {
  Banknote,
  Calendar,
  ChartBar,
  CheckSquare,
  Fingerprint,
  FolderOpen,
  Forklift,
  Gauge,
  GraduationCap,
  HeartPulse,
  Kanban,
  LayoutDashboard,
  ListTodo,
  Lock,
  type LucideIcon,
  Mail,
  MessageSquare,
  ReceiptText,
  Server,
  ShoppingBag,
  SquareArrowUpRight,
  UserRound,
  Users,
} from "lucide-react";

import type { TFunction } from "@/lib/i18n/dictionary";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export function getSidebarItems(t: TFunction): NavGroup[] {
  return [
    {
      id: 1,
      label: t("nav.group.dashboards"),
      items: [
        {
          id: "default",
          title: t("nav.item.default"),
          url: "/dashboard/default",
          icon: LayoutDashboard,
        },
        {
          id: "crm",
          title: t("nav.item.crm"),
          url: "/dashboard/crm",
          icon: ChartBar,
        },
        {
          id: "finance",
          title: t("nav.item.finance"),
          url: "/dashboard/finance",
          icon: Banknote,
        },
        {
          id: "analytics",
          title: t("nav.item.analytics"),
          url: "/dashboard/analytics",
          icon: Gauge,
        },
        {
          id: "productivity",
          title: t("nav.item.productivity"),
          url: "/dashboard/productivity",
          icon: ListTodo,
        },
        {
          id: "ecommerce",
          title: t("nav.item.ecommerce"),
          url: "/dashboard/ecommerce",
          icon: ShoppingBag,
        },
        {
          id: "academy",
          title: t("nav.item.academy"),
          url: "/dashboard/academy",
          icon: GraduationCap,
        },
        {
          id: "logistics",
          title: t("nav.item.logistics"),
          url: "/dashboard/logistics",
          icon: Forklift,
        },
        {
          id: "infrastructure",
          title: t("nav.item.infrastructure"),
          url: "/dashboard/infrastructure",
          icon: Server,
        },
        {
          id: "file-manager",
          title: t("nav.item.fileManager"),
          url: "/dashboard/file-manager",
          icon: FolderOpen,
        },
        {
          id: "patient-monitoring",
          title: t("nav.item.patientMonitoring"),
          url: "/dashboard/patient-monitoring",
          icon: HeartPulse,
        },
      ],
    },
    {
      id: 2,
      label: t("nav.group.pages"),
      items: [
        {
          id: "email",
          title: t("nav.item.email"),
          url: "/dashboard/mail",
          icon: Mail,
        },
        {
          id: "chat",
          title: t("nav.item.chat"),
          url: "/dashboard/chat",
          icon: MessageSquare,
        },
        {
          id: "calendar",
          title: t("nav.item.calendar"),
          url: "/dashboard/calendar",
          icon: Calendar,
        },
        {
          id: "kanban",
          title: t("nav.item.kanban"),
          url: "/dashboard/kanban",
          icon: Kanban,
        },
        {
          id: "tasks",
          title: t("nav.item.tasks"),
          url: "/dashboard/tasks",
          icon: CheckSquare,
        },
        {
          id: "invoice",
          title: t("nav.item.invoice"),
          url: "/dashboard/invoice",
          icon: ReceiptText,
        },
        {
          id: "profile",
          title: t("nav.item.profile"),
          url: "/dashboard/profile",
          icon: UserRound,
        },
        {
          id: "users",
          title: t("nav.item.users"),
          url: "/dashboard/users",
          icon: Users,
        },
        {
          id: "roles",
          title: t("nav.item.roles"),
          url: "/dashboard/roles",
          icon: Lock,
        },
        {
          id: "authentication",
          title: t("nav.item.authentication"),
          icon: Fingerprint,
          subItems: [
            { id: "auth-login-v1", title: t("nav.item.loginV1"), url: "/auth/v1/login", newTab: true },
            { id: "auth-login-v2", title: t("nav.item.loginV2"), url: "/auth/v2/login", newTab: true },
            { id: "auth-register-v1", title: t("nav.item.registerV1"), url: "/auth/v1/register", newTab: true },
            { id: "auth-register-v2", title: t("nav.item.registerV2"), url: "/auth/v2/register", newTab: true },
          ],
        },
      ],
    },
    {
      id: 3,
      label: t("nav.group.legacy"),
      items: [
        {
          id: "legacy-dashboards",
          title: t("nav.item.dashboards"),
          subItems: [
            { id: "legacy-default", title: t("nav.item.defaultV1"), url: "/dashboard/default-v1" },
            { id: "legacy-crm", title: t("nav.item.crmV1"), url: "/dashboard/crm-v1" },
            { id: "legacy-finance", title: t("nav.item.financeV1"), url: "/dashboard/finance-v1" },
            { id: "legacy-analytics", title: t("nav.item.analyticsV1"), url: "/dashboard/analytics-v1" },
          ],
        },
      ],
    },
    {
      id: 4,
      label: t("nav.group.misc"),
      items: [
        {
          id: "others",
          title: t("nav.item.others"),
          url: "/dashboard/coming-soon",
          icon: SquareArrowUpRight,
          badge: "soon",
          disabled: true,
        },
      ],
    },
  ];
}
