import type { ChartConfig } from "@/components/ui/chart";
import type { TFunction } from "@/lib/i18n/dictionary";

export const leadsChartData = [
  { date: "1-5", newLeads: 120, disqualified: 40 },
  { date: "6-10", newLeads: 95, disqualified: 30 },
  { date: "11-15", newLeads: 60, disqualified: 22 },
  { date: "16-20", newLeads: 100, disqualified: 35 },
  { date: "21-25", newLeads: 150, disqualified: 70 },
  { date: "26-30", newLeads: 110, disqualified: 60 },
];

export const leadsChartConfig = (t: TFunction) =>
  ({
    newLeads: {
      label: t("dashboard.legacy.crm-v1.chart.newLeads"),
      color: "var(--chart-1)",
    },
    disqualified: {
      label: t("dashboard.legacy.crm-v1.chart.disqualified"),
      color: "var(--chart-3)",
    },
    background: {
      color: "var(--primary)",
    },
  }) as ChartConfig;

export const proposalsChartData = [
  { date: "1-5", proposalsSent: 9 },
  { date: "6-10", proposalsSent: 16 },
  { date: "11-15", proposalsSent: 6 },
  { date: "16-20", proposalsSent: 18 },
  { date: "21-25", proposalsSent: 11 },
  { date: "26-30", proposalsSent: 14 },
];

export const proposalsChartConfig = (t: TFunction) =>
  ({
    proposalsSent: {
      label: t("dashboard.legacy.crm-v1.chart.proposalsSent"),
      color: "var(--chart-1)",
    },
  }) as ChartConfig;

export const revenueChartData = [
  { month: "Jul 2024", revenue: 6700 },
  { month: "Aug 2024", revenue: 7100 },
  { month: "Sep 2024", revenue: 6850 },
  { month: "Oct 2024", revenue: 7500 },
  { month: "Nov 2024", revenue: 8000 },
  { month: "Dec 2024", revenue: 8300 },
  { month: "Jan 2025", revenue: 7900 },
  { month: "Feb 2025", revenue: 8400 },
  { month: "Mar 2025", revenue: 8950 },
  { month: "Apr 2025", revenue: 9700 },
  { month: "May 2025", revenue: 11200 },
  { month: "Jun 2025", revenue: 9500 },
];

export const revenueChartConfig = (t: TFunction) =>
  ({
    revenue: {
      label: t("dashboard.legacy.crm-v1.chart.revenue"),
      color: "var(--chart-1)",
    },
  }) as ChartConfig;

export const leadsBySourceChartData = [
  { source: "website", leads: 170, fill: "var(--color-website)" },
  { source: "referral", leads: 105, fill: "var(--color-referral)" },
  { source: "social", leads: 90, fill: "var(--color-social)" },
  { source: "cold", leads: 62, fill: "var(--color-cold)" },
  { source: "other", leads: 48, fill: "var(--color-other)" },
];

export const leadsBySourceChartConfig = (t: TFunction) =>
  ({
    leads: {
      label: t("dashboard.legacy.crm-v1.chart.leads"),
    },
    website: {
      label: t("dashboard.legacy.crm-v1.source.website"),
      color: "var(--chart-1)",
    },
    referral: {
      label: t("dashboard.legacy.crm-v1.source.referral"),
      color: "var(--chart-2)",
    },
    social: {
      label: t("dashboard.legacy.crm-v1.source.social"),
      color: "var(--chart-3)",
    },
    cold: {
      label: t("dashboard.legacy.crm-v1.source.cold"),
      color: "var(--chart-4)",
    },
    other: {
      label: t("dashboard.legacy.crm-v1.source.other"),
      color: "var(--chart-5)",
    },
  }) as ChartConfig;

export const projectRevenueChartData = [
  { name: "MVP 开发", actual: 82000, target: 90000 },
  { name: "咨询服务", actual: 48000, target: 65000 },
  { name: "Framer 建站", actual: 34000, target: 45000 },
  { name: "DevOps 支持", actual: 77000, target: 90000 },
  { name: "大模型训练", actual: 68000, target: 80000 },
  { name: "产品发布", actual: 52000, target: 70000 },
].map((row) => ({
  ...row,
  remaining: Math.max(0, row.target - row.actual),
}));

export const projectRevenueChartConfig = (t: TFunction) =>
  ({
    actual: {
      label: t("dashboard.legacy.crm-v1.chart.actual"),
      color: "var(--chart-1)",
    },
    remaining: {
      label: t("dashboard.legacy.crm-v1.chart.remaining"),
      color: "var(--chart-2)",
    },
    label: {
      color: "var(--primary-foreground)",
    },
  }) as ChartConfig;

export const salesPipelineChartData = [
  { stage: "线索", value: 680, fill: "var(--chart-1)" },
  { stage: "已合格", value: 480, fill: "var(--chart-2)" },
  { stage: "已提案", value: 210, fill: "var(--chart-3)" },
  { stage: "商务谈判", value: 120, fill: "var(--chart-4)" },
  { stage: "已赢单", value: 45, fill: "var(--chart-5)" },
];

export const salesPipelineChartConfig = (t: TFunction) =>
  ({
    value: {
      label: t("dashboard.legacy.crm-v1.chart.leads"),
      color: "var(--chart-1)",
    },
    stage: {
      label: t("dashboard.legacy.crm-v1.chart.stage"),
    },
  }) as ChartConfig;

export const regionSalesData = [
  {
    region: "北美",
    sales: 37800,
    percentage: 31,
    growth: "-3.2%",
    isPositive: false,
  },
  {
    region: "欧洲",
    sales: 40100,
    percentage: 34,
    growth: "+9.4%",
    isPositive: true,
  },
  {
    region: "亚太",
    sales: 30950,
    percentage: 26,
    growth: "+12.8%",
    isPositive: true,
  },
  {
    region: "拉丁美洲",
    sales: 12200,
    percentage: 7,
    growth: "-1.7%",
    isPositive: false,
  },
  {
    region: "中东与非洲",
    sales: 2450,
    percentage: 2,
    growth: "+6.0%",
    isPositive: true,
  },
];

export const actionItems = [
  {
    id: 1,
    title: "发送启动文档",
    desc: "发送入职资料与时间安排",
    due: "今天到期",
    priority: "High",
    priorityColor: "bg-red-100 text-red-700",
    checked: false,
  },
  {
    id: 2,
    title: "SaaS MVP 演示电话",
    desc: "与客户预约 Zoom 会议",
    due: "明天到期",
    priority: "Medium",
    priorityColor: "bg-yellow-100 text-yellow-700",
    checked: true,
  },
  {
    id: 3,
    title: "更新案例研究",
    desc: "补充最新的大模型项目",
    due: "本周到期",
    priority: "Low",
    priorityColor: "bg-green-100 text-green-700",
    checked: false,
  },
];

export const recentLeadsData = [
  {
    id: "L-1012",
    name: "Guillermo Rauch",
    company: "Vercel",
    status: "Qualified",
    source: "Website",
    lastActivity: "30 分钟前",
  },
  {
    id: "L-1018",
    name: "Nizzy",
    company: "Mail0",
    status: "Qualified",
    source: "Website",
    lastActivity: "35 分钟前",
  },
  {
    id: "L-1005",
    name: "Sahaj",
    company: "Tweakcn",
    status: "Negotiation",
    source: "Website",
    lastActivity: "1 小时前",
  },
  {
    id: "L-1001",
    name: "Shadcn",
    company: "Shadcn/ui",
    status: "Qualified",
    source: "Website",
    lastActivity: "2 小时前",
  },
  {
    id: "L-1003",
    name: "Sam Altman",
    company: "OpenAI",
    status: "Proposal Sent",
    source: "Social Media",
    lastActivity: "4 小时前",
  },
  {
    id: "L-1008",
    name: "Michael Andreuzza",
    company: "Lexington Themes",
    status: "Contacted",
    source: "Social Media",
    lastActivity: "5 小时前",
  },
  {
    id: "L-1016",
    name: "Skyleen",
    company: "Animate UI",
    status: "Proposal Sent",
    source: "Referral",
    lastActivity: "7 小时前",
  },
  {
    id: "L-1007",
    name: "Arham Khan",
    company: "Weblabs Studio",
    status: "Won",
    source: "Website",
    lastActivity: "6 小时前",
  },
  {
    id: "L-1011",
    name: "Sebastian Rindom",
    company: "Medusa",
    status: "Proposal Sent",
    source: "Referral",
    lastActivity: "10 小时前",
  },
  {
    id: "L-1014",
    name: "Fred K. Schott",
    company: "Astro",
    status: "Contacted",
    source: "Social Media",
    lastActivity: "12 小时前",
  },
  {
    id: "L-1010",
    name: "Peer Richelsen",
    company: "Cal.com",
    status: "New",
    source: "Other",
    lastActivity: "8 小时前",
  },
  {
    id: "L-1002",
    name: "Ammar Khnz",
    company: "BE",
    status: "Contacted",
    source: "Referral",
    lastActivity: "1 天前",
  },
  {
    id: "L-1015",
    name: "Toby",
    company: "Shadcn UI Kit ",
    status: "Negotiation",
    source: "Other",
    lastActivity: "2 天前",
  },
  {
    id: "L-1006",
    name: "David Haz",
    company: "React Bits",
    status: "Qualified",
    source: "Referral",
    lastActivity: "2 天前",
  },
  {
    id: "L-1004",
    name: "Erşad",
    company: "Align UI",
    status: "New",
    source: "Cold Outreach",
    lastActivity: "3 天前",
  },
];
