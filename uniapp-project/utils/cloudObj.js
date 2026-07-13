const GOODS_KEY = 'local_goods_list'
const OUTPUT_HISTORY_KEY = 'local_output_history'
const USER_KEY = 'local_user_info'
const MSG_KEY = 'local_msg_list'

function isH5() {
  try {
    const sys = uni.getSystemInfoSync()
    return sys.platform === 'h5'
  } catch (e) {
    return typeof window !== 'undefined' && typeof document !== 'undefined'
  }
}

function isApp() {
  try {
    const sys = uni.getSystemInfoSync()
    return sys.platform === 'android' || sys.platform === 'ios'
  } catch (e) {
    return false
  }
}

function saveFileToApp(base64Data, fileName) {
  return new Promise(function(resolve) {
    if (typeof plus === 'undefined') {
      resolve(null)
      return
    }
    plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, function(fs) {
      fs.root.getFile(fileName, { create: true }, function(fileEntry) {
        fileEntry.createWriter(function(writer) {
          writer.onwrite = function() {
            resolve(fileEntry.fullPath)
          }
          writer.onerror = function() {
            resolve(null)
          }
          var blob = new Blob([base64ToArrayBuffer(base64Data)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          writer.write(blob)
        }, function() {
          resolve(null)
        })
      }, function() {
        resolve(null)
      })
    }, function() {
      resolve(null)
    })
  })
}

function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64)
  var len = binaryString.length
  var bytes = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

function readAppFile(filePath) {
  return new Promise(function(resolve) {
    if (typeof plus === 'undefined') {
      resolve(null)
      return
    }
    plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
      entry.file(function(file) {
        var reader = new plus.io.FileReader()
        reader.onloadend = function(e) {
          resolve(e.target.result)
        }
        reader.onerror = function() {
          resolve(null)
        }
        reader.readAsArrayBuffer(file)
      }, function() {
        resolve(null)
      })
    }, function() {
      resolve(null)
    })
  })
}

function chooseAppFile() {
  return new Promise(function(resolve) {
    if (typeof plus === 'undefined') {
      resolve(null)
      return
    }
    plus.io.chooseFile({ multiple: false, filter: 'xlsx,xls' }, function(path) {
      resolve(path)
    }, function() {
      resolve(null)
    })
  })
}

function parseExcelData(data) {
  try {
    const XLSX = require('xlsx')
    var uint8 = data instanceof Uint8Array ? data : new Uint8Array(data)
    const workbook = XLSX.read(uint8, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    if (jsonData.length <= 1) {
      return { code: 1, msg: 'Excel 文件为空或只有表头' }
    }
    const header = jsonData[0]
    const expectedHeader = ['商品条码', '商品名称', '售价', '成本', '库存数量', '缺货阈值', '备注']
    const isHeaderMatch = header && header.slice(0, 7).every(function(h, i) {
      return h && h.toString().trim() === expectedHeader[i]
    })
    const rows = isHeaderMatch ? jsonData.slice(1) : jsonData
    const filteredRows = rows.filter(function(row) {
      return row && row.length > 0 && (row[1] || row[0])
    })
    if (filteredRows.length === 0) {
      return { code: 1, msg: '没有有效数据' }
    }
    const list = getGoodsList()
    let inserted = 0
    let updated = 0
    filteredRows.forEach(function(row) {
      const name = row[1] || ''
      const price = Number(row[2]) || 0
      const cost = row[3] !== '' && row[3] != null ? Number(row[3]) : ''
      const num = row[4] !== '' && row[4] != null ? Number(row[4]) : ''
      const threshold = row[5] !== '' && row[5] != null ? Number(row[5]) : ''
      const sn = row[0] || ''
      const notes = row[6] || ''
      if (!name.trim()) return
      const existing = list.find(function(item) {
        return item.goods_sn === sn && sn
      })
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
    return { code: 200, inserted: inserted, updated: updated }
  } catch (err) {
    return { code: 1, msg: '解析 Excel 失败: ' + err.message }
  }
}

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
  },

  async exportToExcel() {
    const list = getGoodsList()
    if (list.length === 0) {
      return { code: 1, msg: '没有数据可导出' }
    }
    try {
      const XLSX = require('xlsx')
      const header = ['商品条码', '商品名称', '售价', '成本', '库存数量', '缺货阈值', '备注']
      const data = list.map(item => [
        item.goods_sn || '',
        item.goods_name || '',
        item.goods_price || 0,
        item.goods_cost || '',
        item.goods_num || '',
        item.goods_threshold || '',
        item.goods_notes || ''
      ])
      data.unshift(header)
      const ws = XLSX.utils.aoa_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, '商品数据')
      var fileName = '商品数据_' + new Date().toLocaleDateString().replace(/\//g, '-') + '.xlsx'
      if (isH5()) {
        XLSX.writeFile(wb, fileName)
        return { code: 200, data: { length: list.length } }
      } else if (isApp()) {
        var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' })
        var base64Data = wbout
        var savedPath = await saveFileToApp(base64Data, fileName)
        if (savedPath) {
          return { code: 200, data: { length: list.length, path: savedPath } }
        }
        return { code: 1, msg: '保存文件失败' }
      } else {
        var wbout2 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' })
        return { code: 200, data: { base64: wbout2, length: list.length } }
      }
    } catch (e) {
      return { code: 1, msg: '导出失败: ' + e.message }
    }
  },

  async importFromExcel(file) {
    if (isApp() && !file) {
      var appPath = await chooseAppFile()
      if (!appPath) {
        return { code: 1, msg: '未选择文件' }
      }
      var arrayBuffer = await readAppFile(appPath)
      if (!arrayBuffer) {
        return { code: 1, msg: '读取文件失败' }
      }
      return parseExcelData(arrayBuffer)
    }
    if (isApp() && file) {
      var ab = await readAppFile(file)
      if (!ab) {
        return { code: 1, msg: '读取文件失败' }
      }
      return parseExcelData(ab)
    }
    return new Promise(function(resolve) {
      try {
        var reader = new FileReader()
        reader.onload = function(e) {
          var data = new Uint8Array(e.target.result)
          resolve(parseExcelData(data))
        }
        reader.onerror = function() {
          resolve({ code: 1, msg: '读取文件失败' })
        }
        reader.readAsArrayBuffer(file)
      } catch (e) {
        resolve({ code: 1, msg: '导入失败: ' + e.message })
      }
    })
  },

  async importFromApp() {
    var appPath = await chooseAppFile()
    if (!appPath) {
      return { code: 1, msg: '未选择文件' }
    }
    var arrayBuffer = await readAppFile(appPath)
    if (!arrayBuffer) {
      return { code: 1, msg: '读取文件失败' }
    }
    return parseExcelData(arrayBuffer)
  },

  async downloadTemplate() {
    try {
      const XLSX = require('xlsx')
      const header = ['商品条码', '商品名称', '售价', '成本', '库存数量', '缺货阈值', '备注']
      const exampleRow = ['6901234567890', '示例商品', 9.9, 5, 100, 10, '这是一个示例商品']
      const data = [header, exampleRow]
      const ws = XLSX.utils.aoa_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, '导入模板')
      var fileName = '商品导入模板.xlsx'
      if (isH5()) {
        XLSX.writeFile(wb, fileName)
        return { code: 200 }
      } else if (isApp()) {
        var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' })
        var savedPath = await saveFileToApp(wbout, fileName)
        if (savedPath) {
          return { code: 200, data: { path: savedPath } }
        }
        return { code: 1, msg: '保存模板失败' }
      } else {
        var wbout2 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' })
        return { code: 200, data: { base64: wbout2 } }
      }
    } catch (e) {
      return { code: 1, msg: '下载模板失败: ' + e.message }
    }
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
