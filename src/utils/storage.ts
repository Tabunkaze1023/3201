import type { Goods, CartItem, OutputRecord, UserInfo } from '@/types'

const GOODS_KEY = 'store_goods'
const CART_KEY = 'store_cart'
const RECORD_KEY = 'store_record'
const USER_KEY = 'store_user'

export const storage = {
  getGoods(): Goods[] {
    try {
      const data = uni.getStorageSync(GOODS_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  setGoods(goods: Goods[]): void {
    uni.setStorageSync(GOODS_KEY, JSON.stringify(goods))
  },

  addGoods(goods: Goods): void {
    const list = this.getGoods()
    list.push(goods)
    this.setGoods(list)
  },

  updateGoods(goods: Goods): void {
    const list = this.getGoods()
    const index = list.findIndex(g => g.id === goods.id)
    if (index !== -1) {
      list[index] = goods
      this.setGoods(list)
    }
  },

  deleteGoods(id: string): void {
    const list = this.getGoods()
    const filtered = list.filter(g => g.id !== id)
    this.setGoods(filtered)
  },

  getCart(): CartItem[] {
    try {
      const data = uni.getStorageSync(CART_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  setCart(cart: CartItem[]): void {
    uni.setStorageSync(CART_KEY, JSON.stringify(cart))
  },

  addToCart(item: CartItem): void {
    const cart = this.getCart()
    const existing = cart.find(c => c.goodsId === item.goodsId)
    if (existing) {
      existing.quantity += item.quantity
    } else {
      cart.push(item)
    }
    this.setCart(cart)
  },

  updateCartItem(goodsId: string, quantity: number): void {
    const cart = this.getCart()
    const item = cart.find(c => c.goodsId === goodsId)
    if (item) {
      if (quantity <= 0) {
        const filtered = cart.filter(c => c.goodsId !== goodsId)
        this.setCart(filtered)
      } else {
        item.quantity = quantity
        this.setCart(cart)
      }
    }
  },

  removeFromCart(goodsId: string): void {
    const cart = this.getCart()
    const filtered = cart.filter(c => c.goodsId !== goodsId)
    this.setCart(filtered)
  },

  clearCart(): void {
    uni.removeStorageSync(CART_KEY)
  },

  getRecords(): OutputRecord[] {
    try {
      const data = uni.getStorageSync(RECORD_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  setRecords(records: OutputRecord[]): void {
    uni.setStorageSync(RECORD_KEY, JSON.stringify(records))
  },

  addRecord(record: OutputRecord): void {
    const records = this.getRecords()
    records.unshift(record)
    this.setRecords(records)
  },

  getUser(): UserInfo | null {
    try {
      const data = uni.getStorageSync(USER_KEY)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  },

  setUser(user: UserInfo): void {
    uni.setStorageSync(USER_KEY, JSON.stringify(user))
  },

  removeUser(): void {
    uni.removeStorageSync(USER_KEY)
  }
}
