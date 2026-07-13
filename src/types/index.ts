export interface Goods {
  id: string
  goodsName: string
  goodsType: string
  goodsCode: string
  goodsBarcode: string
  goodsSpec: string
  goodsUnit: string
  goodsPrice: number
  goodsCost: number
  goodsStock: number
  goodsImage: string
  goodsDesc: string
  createTime: string
  updateTime: string
}

export interface CartItem {
  goodsId: string
  goodsName: string
  goodsCode: string
  goodsBarcode: string
  goodsSpec: string
  goodsUnit: string
  goodsPrice: number
  goodsCost: number
  quantity: number
  goodsImage: string
}

export interface OutputRecord {
  id: string
  goodsId: string
  goodsName: string
  goodsCode: string
  goodsBarcode: string
  goodsSpec: string
  goodsUnit: string
  goodsPrice: number
  quantity: number
  totalPrice: number
  outputTime: string
  outputType: string
}

export interface AnalysisData {
  todayOutputCount: number
  todayOutputAmount: number
  totalStock: number
  totalGoodsCount: number
  outputTrend: { date: string; amount: number }[]
  categoryStats: { name: string; count: number; amount: number }[]
}

export interface UserInfo {
  nickName: string
  avatarUrl: string
  phone: string
  createTime: string
}
