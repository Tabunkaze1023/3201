import type { Goods, UserInfo, AnalysisData } from '@/types'

export const mockGoods: Goods[] = [
  {
    id: '1',
    goodsName: 'iPhone 15 Pro Max',
    goodsType: '手机数码',
    goodsCode: 'IP15PM',
    goodsBarcode: '6901234567890',
    goodsSpec: '256GB 钛金属黑色',
    goodsUnit: '台',
    goodsPrice: 9999,
    goodsCost: 8999,
    goodsStock: 50,
    goodsImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=iPhone%2015%20Pro%20Max%20smartphone%20black%20titanium&image_size=square',
    goodsDesc: '苹果旗舰手机，搭载A17 Pro芯片',
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-01-15 10:30:00'
  },
  {
    id: '2',
    goodsName: 'MacBook Air M3',
    goodsType: '电脑办公',
    goodsCode: 'MBAIRM3',
    goodsBarcode: '6901234567891',
    goodsSpec: '13英寸 8GB+256GB',
    goodsUnit: '台',
    goodsPrice: 9499,
    goodsCost: 8499,
    goodsStock: 30,
    goodsImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=MacBook%20Air%20laptop%20silver%20thin&image_size=square',
    goodsDesc: '轻薄便携笔记本，M3芯片',
    createTime: '2024-01-10 14:20:00',
    updateTime: '2024-01-10 14:20:00'
  },
  {
    id: '3',
    goodsName: 'AirPods Pro 2',
    goodsType: '音频设备',
    goodsCode: 'APP2',
    goodsBarcode: '6901234567892',
    goodsSpec: '第二代 USB-C',
    goodsUnit: '副',
    goodsPrice: 1899,
    goodsCost: 1599,
    goodsStock: 100,
    goodsImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AirPods%20Pro%20wireless%20earbuds%20white&image_size=square',
    goodsDesc: '主动降噪真无线耳机',
    createTime: '2024-01-08 09:15:00',
    updateTime: '2024-01-08 09:15:00'
  },
  {
    id: '4',
    goodsName: '小米14 Ultra',
    goodsType: '手机数码',
    goodsCode: 'MI14U',
    goodsBarcode: '6901234567893',
    goodsSpec: '16GB+512GB 黑色',
    goodsUnit: '台',
    goodsPrice: 6499,
    goodsCost: 5499,
    goodsStock: 45,
    goodsImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Xiaomi%2014%20Ultra%20smartphone%20black%20camera&image_size=square',
    goodsDesc: '徕卡光学镜头，骁龙8 Gen3',
    createTime: '2024-01-12 16:45:00',
    updateTime: '2024-01-12 16:45:00'
  },
  {
    id: '5',
    goodsName: '华为MatePad Pro',
    goodsType: '平板设备',
    goodsCode: 'HWPADPRO',
    goodsBarcode: '6901234567894',
    goodsSpec: '12.2英寸 8GB+256GB',
    goodsUnit: '台',
    goodsPrice: 4999,
    goodsCost: 4299,
    goodsStock: 25,
    goodsImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Huawei%20MatePad%20Pro%20tablet%20gray&image_size=square',
    goodsDesc: '麒麟9000s芯片，鸿蒙系统',
    createTime: '2024-01-05 11:30:00',
    updateTime: '2024-01-05 11:30:00'
  },
  {
    id: '6',
    goodsName: '罗技MX Master 3S',
    goodsType: '电脑配件',
    goodsCode: 'LOGIMX3S',
    goodsBarcode: '6901234567895',
    goodsSpec: '无线蓝牙鼠标 石墨黑',
    goodsUnit: '个',
    goodsPrice: 599,
    goodsCost: 459,
    goodsStock: 80,
    goodsImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Logitech%20MX%20Master%20mouse%20black&image_size=square',
    goodsDesc: '办公旗舰鼠标，静音按键',
    createTime: '2024-01-03 13:00:00',
    updateTime: '2024-01-03 13:00:00'
  },
  {
    id: '7',
    goodsName: '索尼WH-1000XM5',
    goodsType: '音频设备',
    goodsCode: 'SONYWHXM5',
    goodsBarcode: '6901234567896',
    goodsSpec: '头戴式降噪耳机 黑色',
    goodsUnit: '副',
    goodsPrice: 2699,
    goodsCost: 2199,
    goodsStock: 35,
    goodsImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sony%20WH-1000XM5%20headphones%20black&image_size=square',
    goodsDesc: '业界顶级降噪，30小时续航',
    createTime: '2024-01-06 15:20:00',
    updateTime: '2024-01-06 15:20:00'
  },
  {
    id: '8',
    goodsName: 'iPad Pro 11',
    goodsType: '平板设备',
    goodsCode: 'IPADPRO11',
    goodsBarcode: '6901234567897',
    goodsSpec: 'M2芯片 128GB WiFi版',
    goodsUnit: '台',
    goodsPrice: 6299,
    goodsCost: 5499,
    goodsStock: 40,
    goodsImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=iPad%20Pro%2011%20inch%20tablet%20silver&image_size=square',
    goodsDesc: 'Liquid Retina XDR显示屏',
    createTime: '2024-01-09 10:00:00',
    updateTime: '2024-01-09 10:00:00'
  }
]

export const mockUser: UserInfo = {
  nickName: '码上识物铺',
  avatarUrl: '',
  phone: '13800138000',
  createTime: '2024-01-01 00:00:00'
}

export function getMockAnalysisData(): AnalysisData {
  const now = new Date()
  const trend = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    trend.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      amount: Math.floor(Math.random() * 50000) + 10000
    })
  }

  return {
    todayOutputCount: Math.floor(Math.random() * 50) + 10,
    todayOutputAmount: Math.floor(Math.random() * 100000) + 50000,
    totalStock: 395,
    totalGoodsCount: 8,
    outputTrend: trend,
    categoryStats: [
      { name: '手机数码', count: 95, amount: 150000 },
      { name: '电脑办公', count: 30, amount: 285000 },
      { name: '音频设备', count: 135, amount: 590000 },
      { name: '平板设备', count: 65, amount: 445000 },
      { name: '电脑配件', count: 80, amount: 48000 }
    ]
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')
  const second = String(d.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
