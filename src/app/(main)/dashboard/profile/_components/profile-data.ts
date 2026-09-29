interface PersonReference {
  name: string;
  role: string;
  initials: string;
}

export interface ProfileDocument {
  id: string;
  name: string;
  category: string;
  updatedAt: string;
  status: "Signed" | "Current";
  isRestricted: boolean;
}

export interface ProfileRecord {
  name: string;
  preferredName: string;
  legalName: string;
  pronouns: string;
  initials: string;
  avatar: string;
  engagementStatus: "Active";
  jobTitle: string;
  jobLevel: string;
  department: string;
  team: string;
  currentProject: string;
  workEmail: string;
  personalEmail: string;
  workPhone: string;
  workplace: string;
  timeZone: string;
  contractorId: string;
  startDate: string;
  engagementLength: string;
  employmentType: string;
  weeklyHours: string;
  schedule: string;
  contractingEntity: string;
  noticePeriod: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  manager: PersonReference;
  bio: string;
  leavePolicy: string;
  annualLeaveAllowance: string;
  remainingLeave: string;
  carriedOverLeave: string;
  usedLeave: string;
  scheduledLeave: string;
  pendingLeaveRequests: string;
  leaveYear: string;
  nextLeave: string;
  lastWorkingDay: string;
  updatedBy: string;
  updatedAt: string;
  documents: ProfileDocument[];
}

export const profile: ProfileRecord = {
  name: "Arham Khan",
  preferredName: "Arham",
  legalName: "Arham Khan",
  pronouns: "他 / 他的",
  initials: "AK",
  avatar: "https://avatars.githubusercontent.com/u/43849669",
  engagementStatus: "Active",
  jobTitle: "软件工程师",
  jobLevel: "资深",
  department: "产品部",
  team: "产品组",
  currentProject: "自主投标助手",
  workEmail: "hello@arhamkhnz.com",
  personalEmail: "arhamkhnz@gmail.com",
  workPhone: "+1 (415) 555-0148",
  workplace: "远程",
  timeZone: "UTC+5:30",
  contractorId: "WS-2301",
  startDate: "March 18, 2022",
  engagementLength: "4 年 4 个月",
  employmentType: "合同工",
  weeklyHours: "40 小时",
  schedule: "周一至周五 · 9:00–17:30",
  contractingEntity: "Studio Technologies Pte. Ltd.",
  noticePeriod: "30 天",
  dateOfBirth: "September 9, 1993",
  address: "1842 Valencia Street, San Francisco, CA 94110",
  emergencyContact: "Ammar K. · 兄弟",
  emergencyPhone: "+1 (510) 555-0177",
  manager: {
    name: "Pravi K.",
    role: "产品负责人",
    initials: "PK",
  },
  bio: "Arham 是产品团队的软件工程师，负责构建投标与招标管理软件，包括贯穿机会发现、需求分析、文档准备、合规检查、定价与提交的自主投标助手。他专注于把复杂的招标流程变成可靠、易用的产品，帮助团队更快协作、做出更好的投标决策。",
  leavePolicy: "合同休假额度",
  annualLeaveAllowance: "25 天",
  remainingLeave: "18 天",
  carriedOverLeave: "0 天",
  usedLeave: "7 天",
  scheduledLeave: "5 天",
  pendingLeaveRequests: "0",
  leaveYear: "January 1–December 31, 2026",
  nextLeave: "August 24–28, 2026",
  lastWorkingDay: "October 3, 2026",
  updatedBy: "Arham Khan",
  updatedAt: "August 8, 2026",
  documents: [
    {
      id: "doc-1",
      name: "合同工协议",
      category: "合同",
      updatedAt: "Mar 18, 2022",
      status: "Signed",
      isRestricted: false,
    },
    {
      id: "doc-2",
      name: "保密协议",
      category: "合规",
      updatedAt: "Mar 18, 2022",
      status: "Signed",
      isRestricted: true,
    },
    {
      id: "doc-4",
      name: "信息安全政策确认书",
      category: "政策",
      updatedAt: "Jan 8, 2026",
      status: "Current",
      isRestricted: false,
    },
  ],
};
