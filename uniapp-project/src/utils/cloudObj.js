const GOODS_KEY = 'local_goods_list'
const OUTPUT_HISTORY_KEY = 'local_output_history'
const USER_KEY = 'local_user_info'
const MSG_KEY = 'local_msg_list'

function getGoodsList() {
  return uni.getStorageSync(GOODS_KEY) || []
}

function setGoodsList(list) {
  uni.setStorageSync(GOODS_KEY, list)
}

function getOutputHistory() {
  return uni.getStorageSync(OUTPUT_HISTORY_KEY) || []
}

function setOutputHistory(list) {
  uni.setStorageSync(OUTPUT_HISTORY_KEY, list)
}

function genId() {
  return 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

export const goodsInfoObj = {
  async findGoods(sn) {
    const list = getGoodsList()
    const goods = list.find(item => item.goods_sn === sn)
    if (goods) {
      return { code: 0, data: goods }
    }
    return { code: 1, msg: '商品不存在' }
  },

  async addGoods(goods) {
    const list = getGoodsList()
    const newGoods = {
      ...goods,
      _id: genId(),
      user_id: 'local_user',
      last_modify_date: Date.now(),
      create_date: Date.now()
    }
    list.unshift(newGoods)
    setGoodsList(list)
    return { code: 0, data: { id: newGoods._id } }
  },

  async updateGoods(goods) {
    const list = getGoodsList()
    const index = list.findIndex(item => item._id === goods._id)
    if (index > -1) {
      list[index] = { ...list[index], ...goods, last_modify_date: Date.now() }
      setGoodsList(list)
      return { code: 0, data: { updated: 1 } }
    }
    return { code: 1, msg: '商品不存在' }
  },

  async removeGoods(params) {
    const list = getGoodsList()
    const newList = list.filter(item => item._id !== params.id)
    setGoodsList(newList)
    return { code: 0, data: { removed: 1 } }
  },

  async searchGoods(params) {
    const list = getGoodsList()
    const keyword = (params.keyword || '').toLowerCase()
    let result = list.filter(item =>
      (item.goods_name && item.goods_name.toLowerCase().includes(keyword)) ||
      (item.goods_sn && item.goods_sn.toLowerCase().includes(keyword)) ||
      (item.goods_notes && item.goods_notes.toLowerCase().includes(keyword))
    )
    if (params.page && params.pageSize) {
      const start = (params.page - 1) * params.pageSize
      result = result.slice(start, start + params.pageSize)
    }
    return { code: 0, data: result, total: result.length }
  },

  async getEnoughGoodsList(params) {
    const list = getGoodsList()
    const result = list.filter(item => {
      const num = Number(item.goods_num) || 0
      const threshold = Number(item.goods_threshold) || 0
      return threshold > 0 && num >= threshold
    })
    return { code: 0, data: result }
  },

  async getStockGoodsList(params) {
    const list = getGoodsList()
    const result = list.filter(item => {
      const num = Number(item.goods_num) || 0
      const threshold = Number(item.goods_threshold) || 0
      return threshold > 0 && num < threshold
    })
    return { code: 0, data: result }
  },

  async outGoods(goodsList) {
    const list = getGoodsList()
    let updated = 0
    goodsList.forEach(outItem => {
      const goods = list.find(item => item._id === outItem._id)
      if (goods) {
        const currentNum = Number(goods.goods_num) || 0
        const outQty = Number(outItem.goods_quantity) || 0
        goods.goods_num = Math.max(0, currentNum - outQty)
        goods.last_modify_date = Date.now()
        updated++
      }
    })
    setGoodsList(list)
    return { code: 0, data: { updated } }
  },

  async getGoodsList(params) {
    let list = getGoodsList()
    if (params && params.keyword) {
      const kw = params.keyword.toLowerCase()
      list = list.filter(item =>
        (item.goods_name && item.goods_name.toLowerCase().includes(kw)) ||
        (item.goods_sn && item.goods_sn.toLowerCase().includes(kw))
      )
    }
    if (params && params.page && params.pageSize) {
      const start = (params.page - 1) * params.pageSize
      list = list.slice(start, start + params.pageSize)
    }
    return { code: 0, data: list, total: getGoodsList().length }
  }
}

export const outputHistoryObj = {
  async createOutputRecord(params) {
    const list = getOutputHistory()
    const record = {
      _id: genId(),
      goods_list: params.goods_list || [],
      total_price: params.total_price || 0,
      total_num: params.total_num || 0,
      create_date: Date.now()
    }
    list.unshift(record)
    setOutputHistory(list)
    return { code: 0, data: { id: record._id } }
  },

  async getOutputHistory(params) {
    let list = getOutputHistory()
    if (params && params.page && params.pageSize) {
      const start = (params.page - 1) * params.pageSize
      list = list.slice(start, start + params.pageSize)
    }
    return { code: 0, data: list, total: getOutputHistory().length }
  }
}

export const outputHistoryObjCustom = outputHistoryObj

export const sendMsg = {
  async getMsgCount() {
    const msgs = uni.getStorageSync(MSG_KEY) || []
    return { code: 0, data: { count: msgs.length } }
  },

  async getMsgList(params) {
    const msgs = uni.getStorageSync(MSG_KEY) || []
    return { code: 0, data: msgs }
  }
}

export const delUserGoodsInfo = {
  async delAllInfo() {
    uni.removeStorageSync(GOODS_KEY)
    return { code: 0, data: { success: true } }
  },

  async delAllOutputHistory() {
    uni.removeStorageSync(OUTPUT_HISTORY_KEY)
    return { code: 0, data: { success: true } }
  }
}

export const goodsExportImport = {
  async importGoods(data) {
    const list = getGoodsList()
    let inserted = 0
    let updated = 0
    data.forEach((row, idx) => {
      const name = row[1] || ''
      const price = Number(row[2]) || 0
      const cost = row[3] !== '' && row[3] != null ? Number(row[3]) : ''
      const num = row[4] !== '' && row[4] != null ? Number(row[4]) : ''
      const threshold = row[5] !== '' && row[5] != null ? Number(row[5]) : ''
      const sn = row[0] || ''
      const notes = row[6] || ''
      const existing = list.find(item => item.goods_sn === sn && sn)
      if (existing) {
        existing.goods_name = name
        existing.goods_price = price
        existing.goods_cost = cost
        existing.goods_num = num
        existing.goods_threshold = threshold
        existing.goods_notes = notes
        existing.last_modify_date = Date.now()
        updated++
      } else {
        list.unshift({
          _id: genId(),
          user_id: 'local_user',
          goods_sn: sn,
          goods_name: name,
          goods_price: price,
          goods_cost: cost,
          goods_num: num,
          goods_threshold: threshold,
          goods_notes: notes,
          goods_pic: {},
          create_date: Date.now(),
          last_modify_date: Date.now()
        })
        inserted++
      }
    })
    setGoodsList(list)
    return { code: 200, inserted, updated }
  },

  async exportGoods() {
    const list = getGoodsList()
    const data = list.map(item => [
      item.goods_sn || '',
      item.goods_name || '',
      item.goods_price || 0,
      item.goods_cost || '',
      item.goods_num || '',
      item.goods_threshold || '',
      item.goods_notes || ''
    ])
    return { code: 200, data }
  }
}

export const delPic = {
  async delfile(fileIDs) {
    return { code: 0, data: { success: true } }
  }
}

export const uniIdCo = {
  async login(params) {
    const user = {
      _id: 'local_user',
      nickname: params.nickname || '本地用户',
      avatar: params.avatar || '/static/default-avatar.png',
      username: params.username || 'local'
    }
    uni.setStorageSync(USER_KEY, JSON.stringify(user))
    return { code: 0, data: { token: 'local_token', userInfo: user } }
  },

  async register(params) {
    const user = {
      _id: 'local_user',
      nickname: params.nickname || '本地用户',
      username: params.username || 'local',
      avatar: '/static/default-avatar.png'
    }
    uni.setStorageSync(USER_KEY, JSON.stringify(user))
    return { code: 0, data: { token: 'local_token' } }
  },

  async logout() {
    uni.removeStorageSync(USER_KEY)
    return { code: 0 }
  },

  async getUserInfo() {
    const userStr = uni.getStorageSync(USER_KEY)
    if (userStr) {
      return { code: 0, data: JSON.parse(userStr) }
    }
    return { code: -1, msg: '未登录' }
  },

  async updateUserInfo(params) {
    const userStr = uni.getStorageSync(USER_KEY)
    if (userStr) {
      const user = JSON.parse(userStr)
      Object.assign(user, params)
      uni.setStorageSync(USER_KEY, JSON.stringify(user))
      return { code: 0, data: { updated: 1 } }
    }
    return { code: -1, msg: '未登录' }
  },

  async closeAccount() {
    uni.removeStorageSync(USER_KEY)
    return { code: 0 }
  }
}
