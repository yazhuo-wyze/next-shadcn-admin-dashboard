import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Studio Admin",
  version: packageJson.version,
  copyright: `© ${currentYear}, Studio Admin.`,
  meta: {
    title: "Studio Admin - 现代化 Next.js 后台管理系统模板",
    description:
      "Studio Admin 是一个现代化、开源的仪表盘起步模板，基于 Next.js 16、Tailwind CSS v4 与 shadcn/ui 构建。适用于 SaaS 应用、管理后台与内部工具，可完全自定义，开箱即用。",
  },
};
