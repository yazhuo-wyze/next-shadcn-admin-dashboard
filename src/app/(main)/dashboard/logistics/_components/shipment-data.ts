import {
  AlertTriangleIcon,
  ArrowUp,
  Ban,
  CheckCircle2,
  Droplets,
  Flame,
  Forklift,
  type LucideIcon,
  PackageCheck,
  PenLine,
  ShieldCheck,
  Snowflake,
  Star,
  Thermometer,
  Truck,
} from "lucide-react";

export type ShipmentStatus =
  | "Scheduled"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered"
  | "Delayed"
  | "On Hold"
  | "Customs Hold";

export type TransportMode = "land" | "air" | "sea";
export type RouteType = "road" | "flight" | "ship";
export type CustomerTier = "Priority" | "Standard" | "Non-priority";

export type GeoCoordinate = [longitude: number, latitude: number];

export type ShipmentLocation = {
  coordinates: GeoCoordinate;
  display: string;
  country: string;
  countryCode: string;
};

export type ShipmentCustomer = {
  name: string;
  initials: string;
  id: string;
  tier: CustomerTier;
  tierLabel: string;
};

export type HandlingTag = {
  label: string;
  icon: LucideIcon;
};

export type ShipmentHandling = {
  label: string;
  note: string;
  tags: HandlingTag[];
};

export type Shipment = {
  id: string;
  customer: ShipmentCustomer;
  origin: ShipmentLocation;
  destination: ShipmentLocation;
  cargo: string;
  handling: ShipmentHandling;
  weight: string;
  eta: string;
  etaMeta: string;
  status: ShipmentStatus;
  progress: number;
  mode: TransportMode;
  routeType: RouteType;
  transportNumber: string;
};

// 客户名、货物品类、操作说明等都是演示内容，直接写中文；
// `status` / `mode` / `routeType` / `tier` 参与样式与判断，保持英文原值。
const customerAccounts = {
  techCorp: {
    name: "TechCorp",
    initials: "TC",
    id: "SDA-1001-2401-01",
    tier: "Priority",
    tierLabel: "发货量排名前 1%",
  },
  regionalRoadExpress: {
    name: "Regional Road Express",
    initials: "RR",
    id: "SDA-1002-2402-02",
    tier: "Priority",
    tierLabel: "发货量排名前 1%",
  },
  sendWell: {
    name: "SendWell B.V.",
    initials: "SW",
    id: "SDA-1003-2403-03",
    tier: "Priority",
    tierLabel: "发货量排名前 1%",
  },
  sourceDay: {
    name: "SourceDay",
    initials: "SD",
    id: "SDA-1004-2404-04",
    tier: "Standard",
    tierLabel: "长期重复发货账户",
  },
  shippingEasy: {
    name: "ShippingEasy",
    initials: "SE",
    id: "SDA-1005-2405-05",
    tier: "Standard",
    tierLabel: "长期重复发货账户",
  },
  freightView: {
    name: "FreightView",
    initials: "FV",
    id: "SDA-1006-2406-06",
    tier: "Priority",
    tierLabel: "发货量排名前 1%",
  },
  logisticsPlus: {
    name: "Logistics Plus",
    initials: "LP",
    id: "SDA-1007-2407-07",
    tier: "Standard",
    tierLabel: "托管货运账户",
  },
  transvirtual: {
    name: "Transvirtual",
    initials: "TV",
    id: "SDA-1008-2408-08",
    tier: "Standard",
    tierLabel: "托管货运账户",
  },
  skyTrack: {
    name: "SkyTrack",
    initials: "ST",
    id: "SDA-1009-2409-09",
    tier: "Non-priority",
    tierLabel: "偶发发货账户",
  },
  maersk: {
    name: "Maersk",
    initials: "MK",
    id: "SDA-1010-2410-10",
    tier: "Priority",
    tierLabel: "发货量排名前 1%",
  },
  flexport: {
    name: "Flexport",
    initials: "FX",
    id: "SDA-1011-2411-11",
    tier: "Priority",
    tierLabel: "发货量排名前 1%",
  },
  piedPiper: {
    name: "Pied Piper",
    initials: "PP",
    id: "SDA-1012-2412-12",
    tier: "Non-priority",
    tierLabel: "偶发发货账户",
  },
} satisfies Record<string, ShipmentCustomer>;

export const shipments: Shipment[] = [
  {
    id: "SDA-01-2401",
    customer: customerAccounts.techCorp,
    origin: {
      display: "CGK 机场",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [106.6429036, -6.1238696],
    },
    destination: {
      display: "SIN 机场",
      country: "新加坡",
      countryCode: "SG",
      coordinates: [103.9949824, 1.3510921],
    },
    cargo: "消费电子",
    handling: {
      label: "易碎电子产品",
      note: "交接前保持包装密封。",
      tags: [
        { label: "禁止堆叠", icon: Ban },
        { label: "保持直立", icon: ArrowUp },
        { label: "需签收", icon: PenLine },
      ],
    },
    weight: "2,450 kg",
    eta: "08:45 AM",
    etaMeta: "今天",
    status: "In Transit",
    progress: 65,
    mode: "air",
    routeType: "flight",
    transportNumber: "GA-884",
  },
  {
    id: "SDA-02-2402",
    customer: customerAccounts.regionalRoadExpress,
    origin: {
      display: "泗水",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [112.7377674, -7.2462836],
    },
    destination: {
      display: "三宝垄",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [110.4229104, -6.9903988],
    },
    cargo: "工业机械",
    handling: {
      label: "重型机械",
      note: "公路发运前把机械固定到托盘底座上。",
      tags: [
        { label: "仅限叉车", icon: Forklift },
        { label: "固定货物", icon: ShieldCheck },
        { label: "禁止倾倒", icon: Ban },
      ],
    },
    weight: "8,120 kg",
    eta: "11:20 AM",
    etaMeta: "明天",
    status: "Delayed",
    progress: 42,
    mode: "land",
    routeType: "road",
    transportNumber: "B 9042 KX",
  },
  {
    id: "SDA-03-2403",
    customer: customerAccounts.sendWell,
    origin: {
      display: "丹绒不碌港",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [106.8805674, -6.1045642],
    },
    destination: {
      display: "新加坡港",
      country: "新加坡",
      countryCode: "SG",
      coordinates: [103.7566, 1.2788],
    },
    cargo: "冷冻海鲜",
    handling: {
      label: "温控货物",
      note: "在港口交接前保持冷链温度不高于 -18°C。",
      tags: [
        { label: "温度记录", icon: Thermometer },
        { label: "保持冷冻", icon: Snowflake },
        { label: "封条完好", icon: ShieldCheck },
      ],
    },
    weight: "19,800 kg",
    eta: "09:15 PM",
    etaMeta: "昨日已送达",
    status: "Delivered",
    progress: 100,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV SEA-318",
  },
  {
    id: "SDA-04-2404",
    customer: customerAccounts.maersk,
    origin: {
      display: "KUL 机场",
      country: "马来西亚",
      countryCode: "MY",
      coordinates: [101.7063995, 2.7431274],
    },
    destination: {
      display: "BKK 机场",
      country: "泰国",
      countryCode: "TH",
      coordinates: [100.7485803, 13.6818767],
    },
    cargo: "药品试剂盒",
    handling: {
      label: "温控货物",
      note: "保持规定温度，放行前确认暂扣已解除。",
      tags: [
        { label: "温度记录", icon: Thermometer },
        { label: "保持直立", icon: ArrowUp },
        { label: "需签收", icon: PenLine },
      ],
    },
    weight: "540 kg",
    eta: "06:10 PM",
    etaMeta: "今天",
    status: "On Hold",
    progress: 28,
    mode: "air",
    routeType: "flight",
    transportNumber: "MH-728",
  },
  {
    id: "SDA-05-2405",
    customer: customerAccounts.sourceDay,
    origin: {
      display: "万隆",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [107.6070833, -6.9218457],
    },
    destination: {
      display: "日惹",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [110.3672845, -7.7953473],
    },
    cargo: "纺织品",
    handling: {
      label: "标准货运",
      note: "保持纸箱干燥，避免阳光直射。",
      tags: [
        { label: "保持干燥", icon: Droplets },
        { label: "防止挤压", icon: Ban },
        { label: "标准交接", icon: PackageCheck },
      ],
    },
    weight: "1,380 kg",
    eta: "09:30 AM",
    etaMeta: "周五",
    status: "Scheduled",
    progress: 12,
    mode: "land",
    routeType: "road",
    transportNumber: "D 1284 YA",
  },
  {
    id: "SDA-06-2406",
    customer: customerAccounts.logisticsPlus,
    origin: {
      display: "巴生港",
      country: "马来西亚",
      countryCode: "MY",
      coordinates: [101.3913589, 2.9996963],
    },
    destination: {
      display: "林查班港",
      country: "泰国",
      countryCode: "TH",
      coordinates: [100.8994177, 13.0734119],
    },
    cargo: "建筑材料",
    handling: {
      label: "重型散货",
      note: "使用重型吊装设备装载，并固定防止移位。",
      tags: [
        { label: "重型吊装", icon: Forklift },
        { label: "固定货物", icon: ShieldCheck },
        { label: "禁止堆叠", icon: Ban },
      ],
    },
    weight: "27,400 kg",
    eta: "03:40 PM",
    etaMeta: "今日发运",
    status: "Scheduled",
    progress: 18,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV LC-204",
  },
  {
    id: "SDA-07-2407",
    customer: customerAccounts.flexport,
    origin: {
      display: "HKG 机场",
      country: "香港",
      countryCode: "HK",
      coordinates: [113.9172999, 22.3125986],
    },
    destination: {
      display: "MNL 机场",
      country: "菲律宾",
      countryCode: "PH",
      coordinates: [121.0219223, 14.5122467],
    },
    cargo: "医疗器械",
    handling: {
      label: "精密医疗器械",
      note: "海关查验完成前保持医疗器械密封。",
      tags: [
        { label: "封条完好", icon: ShieldCheck },
        { label: "保持直立", icon: ArrowUp },
        { label: "需签收", icon: PenLine },
      ],
    },
    weight: "860 kg",
    eta: "待定",
    etaMeta: "海关",
    status: "Customs Hold",
    progress: 33,
    mode: "air",
    routeType: "flight",
    transportNumber: "CX-901",
  },
  {
    id: "SDA-08-2408",
    customer: customerAccounts.shippingEasy,
    origin: {
      display: "雅加达",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [106.827168, -6.1754049],
    },
    destination: {
      display: "万隆",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [107.6070833, -6.9218457],
    },
    cargo: "零售服装",
    handling: {
      label: "标准货运",
      note: "保持纸箱干燥，最终派送前先联系收货人。",
      tags: [
        { label: "保持干燥", icon: Droplets },
        { label: "派送前电话联系", icon: Truck },
        { label: "标准交接", icon: PackageCheck },
      ],
    },
    weight: "620 kg",
    eta: "02:15 PM",
    etaMeta: "今天",
    status: "Out for Delivery",
    progress: 88,
    mode: "land",
    routeType: "road",
    transportNumber: "B 7712 JKT",
  },
  {
    id: "SDA-09-2409",
    customer: customerAccounts.freightView,
    origin: {
      display: "上海港",
      country: "中国",
      countryCode: "CN",
      coordinates: [121.4872194, 31.2219444],
    },
    destination: {
      display: "釜山港",
      country: "韩国",
      countryCode: "KR",
      coordinates: [129.0492086, 35.1177052],
    },
    cargo: "汽车配件",
    handling: {
      label: "工业零件",
      note: "固定托盘，保护加工表面不受潮。",
      tags: [
        { label: "固定货物", icon: ShieldCheck },
        { label: "保持干燥", icon: Droplets },
        { label: "仅限叉车", icon: Forklift },
      ],
    },
    weight: "12,200 kg",
    eta: "05:50 PM",
    etaMeta: "周三",
    status: "In Transit",
    progress: 54,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV BUSAN-54",
  },
  {
    id: "SDA-10-2410",
    customer: customerAccounts.techCorp,
    origin: {
      display: "NRT 机场",
      country: "日本",
      countryCode: "JP",
      coordinates: [140.3933101, 35.7758714],
    },
    destination: {
      display: "ICN 机场",
      country: "韩国",
      countryCode: "KR",
      coordinates: [126.4417093, 37.4634593],
    },
    cargo: "半导体晶圆",
    handling: {
      label: "高价值易碎货物",
      note: "签收交接前，晶圆须密封在防震包装内。",
      tags: [
        { label: "禁止堆叠", icon: Ban },
        { label: "保持直立", icon: ArrowUp },
        { label: "需签收", icon: PenLine },
      ],
    },
    weight: "320 kg",
    eta: "08:30 PM",
    etaMeta: "昨日已送达",
    status: "Delivered",
    progress: 100,
    mode: "air",
    routeType: "flight",
    transportNumber: "KE-704",
  },
  {
    id: "SDA-11-2411",
    customer: customerAccounts.sourceDay,
    origin: {
      display: "吉隆坡",
      country: "马来西亚",
      countryCode: "MY",
      coordinates: [101.6942371, 3.1516964],
    },
    destination: {
      display: "槟城",
      country: "马来西亚",
      countryCode: "MY",
      coordinates: [100.3287352, 5.4141619],
    },
    cargo: "食品原料",
    handling: {
      label: "食品级操作",
      note: "保持食品级封条完好，避免交叉污染。",
      tags: [
        { label: "食品级", icon: PackageCheck },
        { label: "封条完好", icon: ShieldCheck },
        { label: "保持干燥", icon: Droplets },
      ],
    },
    weight: "3,950 kg",
    eta: "01:05 PM",
    etaMeta: "今天",
    status: "In Transit",
    progress: 71,
    mode: "land",
    routeType: "road",
    transportNumber: "WQH 2184",
  },
  {
    id: "SDA-12-2412",
    customer: customerAccounts.transvirtual,
    origin: {
      display: "宿务港",
      country: "菲律宾",
      countryCode: "PH",
      coordinates: [123.9174564, 10.3054355],
    },
    destination: {
      display: "达沃港",
      country: "菲律宾",
      countryCode: "PH",
      coordinates: [125.6627111, 7.1265272],
    },
    cargo: "农产品",
    handling: {
      label: "易腐货物",
      note: "优先保证通风，并在港口交接时检查农产品状态。",
      tags: [
        { label: "易腐烂", icon: Thermometer },
        { label: "通风舱位", icon: PackageCheck },
        { label: "到货查验", icon: CheckCircle2 },
      ],
    },
    weight: "6,700 kg",
    eta: "09:40 AM",
    etaMeta: "周五",
    status: "Delayed",
    progress: 39,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV DAVAO-12",
  },
  {
    id: "SDA-13-2413",
    customer: customerAccounts.flexport,
    origin: {
      display: "SIN 机场",
      country: "新加坡",
      countryCode: "SG",
      coordinates: [103.9949824, 1.3510921],
    },
    destination: {
      display: "DPS 机场",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [115.1673704, -8.746515],
    },
    cargo: "奢侈品零售货品",
    handling: {
      label: "高价值货物",
      note: "保持纸箱密封；只交给授权的收货联系人。",
      tags: [
        { label: "高价值", icon: Star },
        { label: "禁止堆叠", icon: Ban },
        { label: "需签收", icon: PenLine },
      ],
    },
    weight: "210 kg",
    eta: "07:15 AM",
    etaMeta: "周一",
    status: "Scheduled",
    progress: 9,
    mode: "air",
    routeType: "flight",
    transportNumber: "SQ-938",
  },
  {
    id: "SDA-14-2414",
    customer: customerAccounts.sendWell,
    origin: {
      display: "马尼拉港",
      country: "菲律宾",
      countryCode: "PH",
      coordinates: [120.9522815, 14.6038906],
    },
    destination: {
      display: "丹绒不碌港",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [106.8805674, -6.1045642],
    },
    cargo: "纸卷",
    handling: {
      label: "防潮货物",
      note: "保持纸卷干燥，卸货时避免边部撞击。",
      tags: [
        { label: "保持干燥", icon: Droplets },
        { label: "禁止倾倒", icon: Ban },
        { label: "仅限叉车", icon: Forklift },
      ],
    },
    weight: "15,900 kg",
    eta: "等待放行",
    etaMeta: "仓库",
    status: "On Hold",
    progress: 25,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV PRI-77",
  },
  {
    id: "SDA-15-2415",
    customer: customerAccounts.skyTrack,
    origin: {
      display: "棉兰",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [98.6741623, 3.5894617],
    },
    destination: {
      display: "北干巴鲁",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [101.4515727, 0.5262455],
    },
    cargo: "饮料库存",
    handling: {
      label: "标准托盘货运",
      note: "保持托盘直立，公路转运时防止纸箱压坏。",
      tags: [
        { label: "保持直立", icon: ArrowUp },
        { label: "禁止堆叠", icon: Ban },
        { label: "标准交接", icon: PackageCheck },
      ],
    },
    weight: "4,500 kg",
    eta: "03:30 PM",
    etaMeta: "今天",
    status: "Scheduled",
    progress: 16,
    mode: "land",
    routeType: "road",
    transportNumber: "BK 4520 RA",
  },
  {
    id: "SDA-16-2416",
    customer: customerAccounts.regionalRoadExpress,
    origin: {
      display: "BOM 机场",
      country: "印度",
      countryCode: "IN",
      coordinates: [72.8638223, 19.0901376],
    },
    destination: {
      display: "DEL 机场",
      country: "印度",
      countryCode: "IN",
      coordinates: [77.0847985, 28.5553942],
    },
    cargo: "汽车零部件",
    handling: {
      label: "工业零件",
      note: "固定木箱，最终交接前检查托盘打包带。",
      tags: [
        { label: "固定货物", icon: ShieldCheck },
        { label: "仅限叉车", icon: Forklift },
        { label: "到货查验", icon: CheckCircle2 },
      ],
    },
    weight: "780 kg",
    eta: "04:10 PM",
    etaMeta: "今天",
    status: "Out for Delivery",
    progress: 84,
    mode: "air",
    routeType: "flight",
    transportNumber: "AI-864",
  },
  {
    id: "SDA-17-2417",
    customer: customerAccounts.logisticsPlus,
    origin: {
      display: "鹿特丹港",
      country: "荷兰",
      countryCode: "NL",
      coordinates: [4.4298268, 51.904333],
    },
    destination: {
      display: "汉堡港",
      country: "德国",
      countryCode: "DE",
      coordinates: [9.9118353, 53.5279971],
    },
    cargo: "包装材料",
    handling: {
      label: "标准货运",
      note: "保持托盘干燥，卸货时核对托盘数量。",
      tags: [
        { label: "保持干燥", icon: Droplets },
        { label: "到货清点", icon: CheckCircle2 },
        { label: "标准交接", icon: PackageCheck },
      ],
    },
    weight: "21,300 kg",
    eta: "下周",
    etaMeta: "周二",
    status: "In Transit",
    progress: 62,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV HAM-902",
  },
  {
    id: "SDA-18-2418",
    customer: customerAccounts.transvirtual,
    origin: {
      display: "胡志明市",
      country: "越南",
      countryCode: "VN",
      coordinates: [106.7166008, 10.7737261],
    },
    destination: {
      display: "岘港",
      country: "越南",
      countryCode: "VN",
      coordinates: [108.212, 16.068],
    },
    cargo: "家用电器",
    handling: {
      label: "易碎大件货物",
      note: "需两人搬运，派送前保持家电直立。",
      tags: [
        { label: "保持直立", icon: ArrowUp },
        { label: "禁止堆叠", icon: Ban },
        { label: "双人搬运", icon: Truck },
      ],
    },
    weight: "2,060 kg",
    eta: "11:40 AM",
    etaMeta: "今日已送达",
    status: "Delivered",
    progress: 100,
    mode: "land",
    routeType: "road",
    transportNumber: "51C-208.44",
  },
  {
    id: "SDA-19-2419",
    customer: customerAccounts.maersk,
    origin: {
      display: "DXB 机场",
      country: "阿联酋",
      countryCode: "AE",
      coordinates: [55.3666519, 25.2515424],
    },
    destination: {
      display: "JED 机场",
      country: "沙特阿拉伯",
      countryCode: "SA",
      coordinates: [39.1634852, 21.6839754],
    },
    cargo: "温控货物",
    handling: {
      label: "温控货物",
      note: "保持规定温度区间，出现延误异常立即上报。",
      tags: [
        { label: "温度记录", icon: Thermometer },
        { label: "保持直立", icon: ArrowUp },
        { label: "延误升级", icon: AlertTriangleIcon },
      ],
    },
    weight: "1,120 kg",
    eta: "10:50 PM",
    etaMeta: "今晚",
    status: "Delayed",
    progress: 47,
    mode: "air",
    routeType: "flight",
    transportNumber: "SV-591",
  },
  {
    id: "SDA-20-2420",
    customer: customerAccounts.freightView,
    origin: {
      display: "那瓦舍瓦港",
      country: "印度",
      countryCode: "IN",
      coordinates: [72.952661, 18.9470339],
    },
    destination: {
      display: "科伦坡港",
      country: "斯里兰卡",
      countryCode: "LK",
      coordinates: [79.8564409, 6.9646289],
    },
    cargo: "钢卷",
    handling: {
      label: "重型散货",
      note: "使用钢卷托架，放行前确认绑扎牢固。",
      tags: [
        { label: "重型吊装", icon: Forklift },
        { label: "固定货物", icon: ShieldCheck },
        { label: "禁止倾倒", icon: Ban },
      ],
    },
    weight: "31,800 kg",
    eta: "06:00 AM",
    etaMeta: "周四",
    status: "Scheduled",
    progress: 14,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV COL-620",
  },
  {
    id: "SDA-21-2421",
    customer: customerAccounts.piedPiper,
    origin: {
      display: "清迈",
      country: "泰国",
      countryCode: "TH",
      coordinates: [98.9858802, 18.7882778],
    },
    destination: {
      display: "曼谷",
      country: "泰国",
      countryCode: "TH",
      coordinates: [100.4935089, 13.7524938],
    },
    cargo: "家具",
    handling: {
      label: "易碎大件货物",
      note: "使用毛毯包裹，避免在成品表面堆叠。",
      tags: [
        { label: "禁止堆叠", icon: Ban },
        { label: "保持干燥", icon: Droplets },
        { label: "双人搬运", icon: Truck },
      ],
    },
    weight: "5,240 kg",
    eta: "08:20 AM",
    etaMeta: "明天",
    status: "In Transit",
    progress: 58,
    mode: "land",
    routeType: "road",
    transportNumber: "กท 8842",
  },
  {
    id: "SDA-22-2422",
    customer: customerAccounts.techCorp,
    origin: {
      display: "KIX 机场",
      country: "日本",
      countryCode: "JP",
      coordinates: [135.222523, 34.4342045],
    },
    destination: {
      display: "TPE 机场",
      country: "台湾",
      countryCode: "TW",
      coordinates: [121.2345977, 25.0793174],
    },
    cargo: "精密工具",
    handling: {
      label: "高价值精密货物",
      note: "安检放行前保持锁箱密封。",
      tags: [
        { label: "安全暂扣", icon: ShieldCheck },
        { label: "封条完好", icon: ShieldCheck },
        { label: "需签收", icon: PenLine },
      ],
    },
    weight: "430 kg",
    eta: "待定",
    etaMeta: "安检",
    status: "On Hold",
    progress: 29,
    mode: "air",
    routeType: "flight",
    transportNumber: "BR-129",
  },
  {
    id: "SDA-23-2423",
    customer: customerAccounts.maersk,
    origin: {
      display: "新加坡港",
      country: "新加坡",
      countryCode: "SG",
      coordinates: [103.7566, 1.2788],
    },
    destination: {
      display: "巴生港",
      country: "马来西亚",
      countryCode: "MY",
      coordinates: [101.3913589, 2.9996963],
    },
    cargo: "化工品",
    handling: {
      label: "危险品复核",
      note: "等待危险品复核与港口放行。",
      tags: [
        { label: "危险品复核", icon: Flame },
        { label: "保持直立", icon: ArrowUp },
        { label: "限制操作", icon: ShieldCheck },
      ],
    },
    weight: "18,600 kg",
    eta: "已发运",
    etaMeta: "02:50 PM",
    status: "Scheduled",
    progress: 19,
    mode: "sea",
    routeType: "ship",
    transportNumber: "MV PKG-315",
  },
  {
    id: "SDA-24-2424",
    customer: customerAccounts.shippingEasy,
    origin: {
      display: "班达楠榜",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [105.2643742, -5.4460713],
    },
    destination: {
      display: "雅加达",
      country: "印度尼西亚",
      countryCode: "ID",
      coordinates: [106.827168, -6.1754049],
    },
    cargo: "生鲜农产品",
    handling: {
      label: "易腐货物",
      note: "优先当日交接，并保持农产品通风。",
      tags: [
        { label: "易腐烂", icon: Thermometer },
        { label: "通风舱位", icon: PackageCheck },
        { label: "到货查验", icon: CheckCircle2 },
      ],
    },
    weight: "970 kg",
    eta: "06:20 PM",
    etaMeta: "今日已送达",
    status: "Delivered",
    progress: 100,
    mode: "land",
    routeType: "road",
    transportNumber: "BE 1745 YU",
  },
];
