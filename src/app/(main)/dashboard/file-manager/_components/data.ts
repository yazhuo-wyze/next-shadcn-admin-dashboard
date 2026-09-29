import { File, FileArchive, FileChartColumn, FileImage, FileText } from "lucide-react";

export type FileKind = "document" | "spreadsheet" | "design" | "pdf" | "archive";
export type FileManagerView = "grid" | "list";

export const fileIcons = {
  archive: FileArchive,
  design: FileImage,
  document: FileText,
  pdf: File,
  spreadsheet: FileChartColumn,
} satisfies Record<FileKind, typeof File>;

// 文件类型的显示文案走 `common.enums.fileKind.<英文值>` 词条，这里不再维护第二份字面量。

export interface FileManagerFolder {
  id: string;
  name: string;
  fileCount: number;
  size: string;
  updatedAt: string;
}

export interface FileManagerFile {
  id: string;
  name: string;
  kind: FileKind;
  size: string;
  owner: string;
  ownerInitials: string;
  modifiedAt: string;
  shared: boolean;
  starred: boolean;
}

// 演示数据：文件名、文件夹名、时间等「内容」直接写中文，不建词条、不参与语言切换。
export const folders: FileManagerFolder[] = [
  {
    id: "brand-assets",
    name: "品牌资源",
    fileCount: 24,
    size: "1.8 GB",
    updatedAt: "12 分钟前",
  },
  {
    id: "product-design",
    name: "产品设计",
    fileCount: 38,
    size: "4.6 GB",
    updatedAt: "昨天",
  },
  {
    id: "legal-documents",
    name: "法律文件",
    fileCount: 16,
    size: "840 MB",
    updatedAt: "7 月 29 日",
  },
  {
    id: "research",
    name: "研究资料",
    fileCount: 11,
    size: "620 MB",
    updatedAt: "7 月 27 日",
  },
  {
    id: "marketing",
    name: "市场营销",
    fileCount: 29,
    size: "2.3 GB",
    updatedAt: "7 月 25 日",
  },
  {
    id: "team-resources",
    name: "团队资源",
    fileCount: 18,
    size: "1.2 GB",
    updatedAt: "7 月 22 日",
  },
];

export const files: FileManagerFile[] = [
  {
    id: "product-roadmap",
    name: "产品路线图 2027.pdf",
    kind: "pdf",
    size: "8.4 MB",
    owner: "Arham Khan",
    ownerInitials: "AK",
    modifiedAt: "5 分钟前",
    shared: true,
    starred: true,
  },
  {
    id: "design-system",
    name: "设计系统基础规范.fig",
    kind: "design",
    size: "24.1 MB",
    owner: "Aiy",
    ownerInitials: "AY",
    modifiedAt: "2 小时前",
    shared: true,
    starred: false,
  },
  {
    id: "campaign-performance",
    name: "活动效果数据.xlsx",
    kind: "spreadsheet",
    size: "2.7 MB",
    owner: "Ammar Khan",
    ownerInitials: "AM",
    modifiedAt: "昨天",
    shared: false,
    starred: false,
  },
  {
    id: "research-notes",
    name: "客户调研记录.docx",
    kind: "document",
    size: "1.2 MB",
    owner: "Aiy",
    ownerInitials: "AY",
    modifiedAt: "2026 年 7 月 29 日",
    shared: true,
    starred: true,
  },
  {
    id: "release-assets",
    name: "发布素材.zip",
    kind: "archive",
    size: "186 MB",
    owner: "Arham Khan",
    ownerInitials: "AK",
    modifiedAt: "2026 年 7 月 28 日",
    shared: false,
    starred: false,
  },
  {
    id: "handoff-checklist",
    name: "交接清单.pdf",
    kind: "pdf",
    size: "940 KB",
    owner: "Ammar Khan",
    ownerInitials: "AM",
    modifiedAt: "2026 年 7 月 26 日",
    shared: true,
    starred: false,
  },
  {
    id: "quarterly-budget",
    name: "季度预算预测.xlsx",
    kind: "spreadsheet",
    size: "3.8 MB",
    owner: "Arham Khan",
    ownerInitials: "AK",
    modifiedAt: "2026 年 7 月 24 日",
    shared: true,
    starred: false,
  },
  {
    id: "mobile-app-prototype",
    name: "移动端应用原型.fig",
    kind: "design",
    size: "18.6 MB",
    owner: "Ammar Khan",
    ownerInitials: "AM",
    modifiedAt: "2026 年 7 月 23 日",
    shared: true,
    starred: true,
  },
  {
    id: "partnership-agreement",
    name: "合作协议.docx",
    kind: "document",
    size: "620 KB",
    owner: "Ammar Khan",
    ownerInitials: "AM",
    modifiedAt: "2026 年 7 月 21 日",
    shared: false,
    starred: false,
  },
  {
    id: "product-launch-brief",
    name: "产品发布简报.pdf",
    kind: "pdf",
    size: "4.2 MB",
    owner: "Arham Khan",
    ownerInitials: "AK",
    modifiedAt: "2026 年 7 月 19 日",
    shared: true,
    starred: false,
  },
  {
    id: "brand-exports",
    name: "品牌导出文件.zip",
    kind: "archive",
    size: "72 MB",
    owner: "Arham Khan",
    ownerInitials: "AK",
    modifiedAt: "2026 年 7 月 17 日",
    shared: false,
    starred: false,
  },
];
