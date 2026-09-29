import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Studio Admin",
  version: packageJson.version,
  copyright: `© ${currentYear}, Studio Admin.`,
  meta: {
    // 上游（main）更新了这段英文文案，这里跟着翻成中文，内容与上游保持一致
    title: "Studio Admin：基于 shadcn/ui 的开源后台管理系统",
    description:
      "一个精雕细琢的开源 shadcn/ui 后台管理系统，包含 25+ 个界面，并提供 Radix UI、Base UI、React Aria 与 TanStack Start 版本。",
  },
};
