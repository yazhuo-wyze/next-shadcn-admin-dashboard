import type { SimpleIcon } from "simple-icons";
import { siNextdotjs, siNodedotjs, siReact, siRemix } from "simple-icons";

export interface InfrastructureEnvironment {
  domain: string;
  platform: {
    name: string;
    icon: SimpleIcon;
  };
  environment: "Expired" | "Production" | "Staging";
  status: "Online" | "Unhealthy";
  latency: string;
  uptime: string;
  server: string;
  countryCode: string;
  plan: string;
  resources: {
    cpu: number;
    ram: number;
    disk: number;
  };
}

export interface InfrastructureGroup {
  name: string;
  organization: string;
  rows: InfrastructureEnvironment[];
}

export const infrastructureGroups: InfrastructureGroup[] = [
  {
    name: "管理后台",
    organization: "Weblabs Studio",
    rows: [
      {
        domain: "next-shadcn-admin-dashboard.vercel.app/dashboard",
        platform: {
          name: "Next.js",
          icon: siNextdotjs,
        },
        environment: "Expired",
        status: "Unhealthy",
        latency: "86ms",
        uptime: "8d 23h",
        server: "Hetzner 云",
        countryCode: "DE",
        plan: "CX33，法尔肯施泰因",
        resources: { cpu: 60, ram: 73, disk: 41 },
      },
    ],
  },
  {
    name: "数据分析",
    organization: "Aiy Cap",
    rows: [
      {
        domain: "next-shadcn-admin-dashboard.vercel.app/analytics",
        platform: {
          name: "React",
          icon: siReact,
        },
        environment: "Production",
        status: "Online",
        latency: "246ms",
        uptime: "9d 23h",
        server: "AWS",
        countryCode: "NL",
        plan: "eu-west-1，阿姆斯特丹",
        resources: { cpu: 49, ram: 42, disk: 44 },
      },
      {
        domain: "next-shadcn-admin-dashboard.vercel.app/reports",
        platform: {
          name: "Remix",
          icon: siRemix,
        },
        environment: "Staging",
        status: "Online",
        latency: "110ms",
        uptime: "9d 23h",
        server: "Azure",
        countryCode: "EE",
        plan: "北欧，塔林",
        resources: { cpu: 37, ram: 46, disk: 64 },
      },
    ],
  },
  {
    name: "看板",
    organization: "Storeframe",
    rows: [
      {
        domain: "next-shadcn-admin-dashboard.vercel.app/kanban",
        platform: {
          name: "Node.js",
          icon: siNodedotjs,
        },
        environment: "Production",
        status: "Online",
        latency: "25ms",
        uptime: "10d 23h",
        server: "裸金属 / 定制",
        countryCode: "DE",
        plan: "EX101，法尔肯施泰因",
        resources: { cpu: 1, ram: 21, disk: 4 },
      },
    ],
  },
  {
    name: "收件箱",
    organization: "Acme Corp",
    rows: [],
  },
];
