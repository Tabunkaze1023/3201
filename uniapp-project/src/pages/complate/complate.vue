<template>
  <view class="complate-page">
    <view class="scan-section">
      <view class="scan-btn" @click="handleScanClick">
        <text class="scan-icon">📷</text>
        <text class="scan-text">{{ scanning ? '扫描中...' : '点击扫码' }}</text>
      </view>
      <view class="search-btn" @click="showSearchPopup">
        <text class="search-icon">🔍</text>
        <text class="search-text">搜索添加</text>
      </view>
    </view>
    <view class="manual-input-mask" v-if="showManualInput" @click="closeManualInput">
      <view class="manual-input-content" @click.stop>
        <view class="popup-header">
          <text class="popup-title">手动输入条码</text>
          <text class="popup-close" @click="closeManualInput">×</text>
        </view>
        <view class="popup-body">
          <input
            class="form-input"
            type="text"
            v-model="manualInputSn"
            placeholder="请输入商品条码"
            @confirm="confirmManualInput"
            focus
          />
        </view>
        <view class="popup-footer">
          <button class="btn-cancel" @click="closeManualInput">取消</button>
          <button class="btn-confirm" @click="confirmManualInput">确认</button>
        </view>
      </view>
    </view>
    <view class="goods-section">
      <view class="section-header">
        <text class="section-title">商品清单（{{ totalNum }}件）</text>
        <text v-if="goodsList.length" class="clear-btn" @click="showClearConfirm">清空</text>
      </view>
      <view v-if="goodsList.length" class="goods-list">
        <view
          v-for="(item, index) in goodsList"
          :key="item._id"
          class="goods-card"
          :class="{ 'is-new': item.isNew }"
        >
          <view class="goods-info">
            <text class="goods-name">{{ item.goods_name }}</text>
            <text class="goods-sn">{{ item.goods_sn || '无条码' }}</text>
          </view>
          <view class="goods-price">¥{{ item.goods_price }}</view>
          <view class="goods-qty-control">
            <view class="qty-btn minus" @click="updateQuantity(index, -1)">-</view>
            <input
              class="qty-input"
              type="number"
              :value="item.quantity"
              @blur="onQtyBlur(index, $event)"
            />
            <view class="qty-btn plus" @click="updateQuantity(index, 1)">+</view>
          </view>
          <view class="goods-actions">
            <text class="price-edit" @click="openEditPrice(index)">改价</text>
            <text class="delete-btn" @click="removeItem(index)">删除</text>
          </view>
        </view>
      </view>
      <view v-else class="empty-cart">
        <image src="/static/empty-cart.png" class="empty-img"></image>
        <text class="empty-text">暂无商品，请扫码添加</text>
      </view>
    </view>
    <view class="bottom-bar" v-if="goodsList.length">
      <view class="total-info">
        <view class="total-row">
          <text class="total-label">合计：</text>
          <text class="total-price">¥{{ totalPrice }}</text>
        </view>
        <view class="total-row profit-row" @click="showProfit = !showProfit">
          <text class="profit-label">利润：{{ showProfit ? '¥' + totalProfit : '******' }}</text>
          <text class="profit-toggle">{{ showProfit ? '隐藏' : '查看' }}</text>
        </view>
      </view>
      <view class="checkout-btn" @click="showConfirmPopupAction">
        <text class="checkout-text">出库（{{ totalNum }}）</text>
      </view>
    </view>
    <view class="search-popup-mask" v-if="showSearchPopup" @click="hideSearchPopup">
      <view class="search-popup-content" @click.stop>
        <search-box
          :BoxHeight="'70vh'"
          :flag="1"
          @sendGoodsInfo="sendGoodsInfo"
        ></search-box>
      </view>
    </view>
    <cart-confirm
      :show.sync="showConfirmPopup"
      :goodsList="goodsList"
      @confirm="outPutConfirm"
    ></cart-confirm>
    <view class="price-popup-mask" v-if="pricePopupVisible" @click="closePriceEdit">
      <view class="price-popup-content" @click.stop>
        <view class="popup-header">
          <text class="popup-title">修改价格</text>
          <text class="popup-close" @click="closePriceEdit">×</text>
        </view>
        <view class="popup-body">
          <view class="form-item">
            <text class="form-label">新价格</text>
            <input
              class="form-input"
              type="digit"
              v-model="tempPrice"
              placeholder="请输入新价格"
            />
          </view>
        </view>
        <view class="popup-footer">
          <button class="btn-cancel" @click="closePriceEdit">取消</button>
          <button class="btn-confirm" @click="confirmPriceEdit">确认</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { goodsInfoObj, outputHistoryObj } from '@/utils/cloudObj.js'
import searchBox from '@/components/searchBox/searchBox.vue'
import cartConfirm from '@/components/cart-confirm/cart-confirm.vue'

export default {
  components: {
    searchBox,
    cartConfirm
  },
  data: function() {
    return {
      goodsList: [],
      scanning: false,
      lastScanTime: 0,
      showConfirmPopup: false,
      showProfit: false,
      tempPrice: '',
      editingIndex: -1,
      pricePopupVisible: false,
      showSearchPopup: false,
      showManualInput: false,
      manualInputSn: ''
    }
  },
  computed: {
    totalPrice: function() {
      return (this.goodsList.reduce(function(total, item) {
        return total + 100 * Number(item.goods_price) * item.quantity
      }, 0) / 100).toFixed(2)
    },
    totalNum: function() {
      return this.goodsList.reduce(function(total, item) {
        return total + Number(item.quantity)
      }, 0)
    },
    totalProfit: function() {
      return (this.goodsList.reduce(function(total, item) {
        var profit = 0
        if (item.goods_cost > 0) {
          profit = (100 * Number(item.goods_price) - 100 * Number(item.goods_cost)) * item.quantity
        }
        return total + profit
      }, 0) / 100).toFixed(2)
    },
    totalCost: function() {
      return (this.goodsList.reduce(function(total, item) {
        var cost = 0
        if (item.goods_cost > 0) {
          cost = 100 * Number(item.goods_cost) * item.quantity
        }
        return total + cost
      }, 0) / 100).toFixed(2)
    }
  },
  methods: {
    handleScanClick: function() {
      if (this.scanning) return
      var now = Date.now()
      if (now - this.lastScanTime < 2000) return
      this.startScan()
    },
    startScan: function() {
      var self = this
      if (this.scanning) return
      this.scanning = true
      this.lastScanTime = Date.now()
      uni.scanCode({
        scanType: ['barCode', 'qrCode'],
        success: function(res) {
          self.handleScan(res.result)
        },
        fail: function() {
          uni.showModal({
            title: '提示',
            content: '无法调用相机，是否手动输入条码？',
            confirmText: '手动输入',
            cancelText: '取消',
            success: function(res) {
              if (res.confirm) {
                self.showManualInput = true
              }
            }
          })
          self.scanning = false
        },
        complete: function() {
          setTimeout(function() {
            self.scanning = false
          }, 500)
        }
      })
    },
    closeManualInput: function() {
      this.showManualInput = false
      this.manualInputSn = ''
    },
    confirmManualInput: function() {
      var sn = this.manualInputSn.trim()
      if (!sn) {
        uni.showToast({
          title: '请输入条码',
          icon: 'none'
        })
        return
      }
      this.handleScan(sn)
      this.closeManualInput()
    },
    handleScan: function(sn) {
      var self = this
      var audio = uni.createInnerAudioContext()
      audio.src = '/static/scanSound.mp3'
      audio.play()
      var existing = this.goodsList.find(function(item) {
        return item.goods_sn === sn
      })
      if (existing) {
        var idx = this.goodsList.indexOf(existing)
        this.updateQuantity(idx, 1)
        this.scanning = false
        return
      }
      goodsInfoObj.findGoods(sn).then(function(res) {
        if (res.code === 0) {
          var goods = res.data
          self.goodsList.unshift(Object.assign({}, goods, {
            quantity: 1,
            isNew: true
          }))
          setTimeout(function() {
            if (self.goodsList[0]) {
              self.goodsList[0].isNew = false
            }
          }, 500)
        } else {
          uni.showToast({
            title: '商品不存在',
            icon: 'error'
          })
        }
      }).catch(function() {
        uni.showToast({
          title: '扫描失败',
          icon: 'error'
        })
      }).finally(function() {
        self.scanning = false
      })
    },
    sendGoodsInfo: function(goods) {
      var existing = this.goodsList.find(function(item) {
        return item._id === goods._id
      })
      if (existing) {
        var idx = this.goodsList.indexOf(existing)
        this.updateQuantity(idx, 1)
      } else {
        var self = this
        this.goodsList.unshift(Object.assign({}, goods, {
          quantity: 1,
          isNew: true
        }))
        setTimeout(function() {
          if (self.goodsList[0]) {
            self.goodsList[0].isNew = false
          }
        }, 500)
      }
      this.hideSearchPopup()
    },
    showSearchPopup: function() {
      this.showSearchPopup = true
    },
    hideSearchPopup: function() {
      this.showSearchPopup = false
    },
    showConfirmPopupAction: function() {
      this.showConfirmPopup = true
    },
    updateQuantity: function(index, delta) {
      var newQty = this.goodsList[index].quantity + delta
      if (newQty >= 1) {
        this.goodsList[index].quantity = newQty
      }
    },
    onQtyBlur: function(index, event) {
      var val = parseInt(event.detail.value)
      if (isNaN(val) || val < 1) {
        val = 1
      }
      this.goodsList[index].quantity = val
    },
    removeItem: function(index) {
      var self = this
      uni.showModal({
        title: '提示',
        content: '确定要删除该商品吗？',
        success: function(res) {
          if (res.confirm) {
            self.goodsList.splice(index, 1)
          }
        }
      })
    },
    showClearConfirm: function() {
      var self = this
      uni.showModal({
        title: '提示',
        content: '确定要清空所有商品吗？',
        success: function(res) {
          if (res.confirm) {
            self.goodsList = []
          }
        }
      })
    },
    openEditPrice: function(index) {
      this.editingIndex = index
      this.tempPrice = this.goodsList[index].goods_price
      this.pricePopupVisible = true
    },
    closePriceEdit: function() {
      this.pricePopupVisible = false
      this.editingIndex = -1
      this.tempPrice = ''
    },
    confirmPriceEdit: function() {
      if (this.editingIndex > -1) {
        var price = parseFloat(this.tempPrice)
        if (isNaN(price) || price < 0) {
          uni.showToast({
            title: '请输入有效的价格',
            icon: 'none'
          })
          return
        }
        price = parseFloat(price.toFixed(2))
        this.goodsList[this.editingIndex].goods_price = price
        this.closePriceEdit()
      }
    },
    outPutConfirm: function() {
      var self = this
      var outList = this.goodsList.map(function(item) {
        return {
          _id: item._id,
          user_id: item.user_id,
          goods_num: item.goods_num >= 0 ? item.goods_num : '',
          goods_quantity: item.quantity
        }
      })
      uni.showLoading({
        title: '出库中...'
      })
      goodsInfoObj.outGoods(outList).then(function(res) {
        if (res.code === 0) {
          return outputHistoryObj.createOutputRecord({
            goods_list: self.goodsList,
            total_price: self.totalPrice,
            total_num: self.totalNum
          })
        }
        return Promise.reject(new Error('出库失败'))
      }).then(function() {
        uni.hideLoading()
        uni.showToast({
          title: '出库成功',
          icon: 'success'
        })
        self.showConfirmPopup = false
        self.goodsList = []
      }).catch(function(err) {
        uni.hideLoading()
        uni.showToast({
          title: '出库失败',
          icon: 'error'
        })
      })
    }
  }
}
</script>

<style scoped>
.complate-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 180rpx;
}

.scan-section {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
}

.scan-btn,
.search-btn {
  flex: 1;
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.scan-btn {
  background: linear-gradient(135deg, #28B389, #1fa87e);
}

.scan-btn .scan-text {
  color: #fff;
}

.scan-icon,
.search-icon {
  font-size: 48rpx;
  margin-bottom: 12rpx;
}

.scan-text,
.search-text {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}

.goods-section {
  padding: 0 20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.clear-btn {
  font-size: 26rpx;
  color: #999;
}

.goods-list {
  padding-bottom: 20rpx;
}

.goods-card {
  background: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.goods-card.is-new {
  animation: newItem 0.5s ease;
}

@keyframes newItem {
  0% { transform: scale(0.95); background: #e8f8f2; }
  100% { transform: scale(1); background: #fff; }
}

.goods-info {
  margin-bottom: 12rpx;
}

.goods-name {
  display: block;
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 6rpx;
}

.goods-sn {
  font-size: 24rpx;
  color: #999;
}

.goods-price {
  font-size: 32rpx;
  color: #ff6b6b;
  font-weight: bold;
  margin-bottom: 16rpx;
}

.goods-qty-control {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.qty-btn {
  width: 56rpx;
  height: 56rpx;
  line-height: 52rpx;
  text-align: center;
  background: #f5f5f5;
  border-radius: 50%;
  font-size: 32rpx;
  color: #666;
}

.qty-btn.plus {
  background: #28B389;
  color: #fff;
}

.qty-input {
  width: 100rpx;
  height: 56rpx;
  text-align: center;
  font-size: 28rpx;
  margin: 0 16rpx;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
}

.goods-actions {
  display: flex;
  gap: 30rpx;
  border-top: 1rpx solid #f5f5f5;
  padding-top: 16rpx;
}

.price-edit,
.delete-btn {
  font-size: 26rpx;
}

.price-edit {
  color: #28B389;
}

.delete-btn {
  color: #ff6b6b;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200rpx;
}

.empty-img {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 20rpx;
  opacity: 0.5;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 20rpx 30rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.total-info {
  flex: 1;
}

.total-row {
  display: flex;
  align-items: baseline;
}

.total-label {
  font-size: 26rpx;
  color: #666;
}

.total-price {
  font-size: 36rpx;
  color: #ff6b6b;
  font-weight: bold;
}

.profit-row {
  margin-top: 6rpx;
}

.profit-label {
  font-size: 24rpx;
  color: #999;
}

.profit-toggle {
  font-size: 22rpx;
  color: #28B389;
  margin-left: 10rpx;
}

.checkout-btn {
  background: #28B389;
  padding: 20rpx 40rpx;
  border-radius: 40rpx;
}

.checkout-text {
  color: #fff;
  font-size: 28rpx;
  font-weight: 500;
}

.search-popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: flex;
  align-items: flex-end;
}

.search-popup-content {
  width: 100%;
  height: 70vh;
  background: #fff;
  border-radius: 20rpx 20rpx 0 0;
  overflow: hidden;
}

.price-popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.price-popup-content {
  width: 600rpx;
  background: #fff;
  border-radius: 16rpx;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
}

.popup-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.popup-close {
  font-size: 40rpx;
  color: #999;
  line-height: 1;
}

.popup-body {
  padding: 30rpx;
}

.form-item {
  margin-bottom: 0;
}

.form-label {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 12rpx;
  font-weight: 500;
}

.form-input {
  width: 100%;
  height: 80rpx;
  padding: 0 20rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 8rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  background: #fafafa;
}

.popup-footer {
  display: flex;
  gap: 20rpx;
  padding: 20rpx 30rpx 30rpx;
  border-top: 1rpx solid #eee;
}

.btn-cancel,
.btn-confirm {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
}

.btn-cancel {
  background: #f5f5f5;
  color: #666;
}

.btn-confirm {
  background: #28B389;
  color: #fff;
}

.manual-input-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.manual-input-content {
  width: 600rpx;
  background: #fff;
  border-radius: 16rpx;
}
</style>
