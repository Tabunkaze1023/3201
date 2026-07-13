<template>
  <view class="page">
    <view class="cart-header">
      <text class="header-title">🛒 购物车</text>
      <text class="clear-cart" @click="handleClearCart" v-if="cartList.length > 0">清空</text>
    </view>

    <view class="cart-list" v-if="cartList.length > 0">
      <view class="cart-item" v-for="item in cartList" :key="item.goodsId">
        <image class="cart-image" :src="item.goodsImage" mode="aspectFill" />
        <view class="cart-info">
          <text class="cart-name">{{ item.goodsName }}</text>
          <text class="cart-spec">{{ item.goodsSpec }}</text>
          <view class="cart-bottom">
            <text class="cart-price">¥{{ item.goodsPrice }}</text>
            <view class="quantity-control">
              <view class="qty-btn" @click="handleMinus(item.goodsId)">
                <text>-</text>
              </view>
              <text class="qty-value">{{ item.quantity }}</text>
              <view class="qty-btn plus" @click="handlePlus(item.goodsId)">
                <text>+</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="empty-cart" v-else>
      <text class="empty-icon">🛒</text>
      <text class="empty-text">购物车是空的</text>
      <text class="empty-hint">去首页添加商品吧</text>
      <view class="go-shopping-btn" @click="goShopping">
        <text>去购物</text>
      </view>
    </view>

    <view class="checkout-bar" v-if="cartList.length > 0">
      <view class="bar-left">
        <text class="total-label">合计:</text>
        <text class="total-price">¥{{ totalAmount }}</text>
        <text class="total-count">共 {{ totalCount }} 件</text>
      </view>
      <view class="checkout-btn" @click="handleCheckout">
        <text>结算</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storage } from '@/utils/storage'
import { mockGoods } from '@/utils/mock'
import type { CartItem } from '@/types'

const cartList = ref<CartItem[]>([])

const totalCount = computed(() => {
  return cartList.value.reduce((sum, item) => sum + item.quantity, 0)
})

const totalAmount = computed(() => {
  return cartList.value.reduce((sum, item) => sum + item.goodsPrice * item.quantity, 0)
})

onMounted(() => {
  let goods = storage.getGoods()
  if (goods.length === 0) {
    storage.setGoods(mockGoods)
  }
  loadCart()
})

function loadCart() {
  cartList.value = storage.getCart()
}

function handlePlus(goodsId: string) {
  const item = cartList.value.find(c => c.goodsId === goodsId)
  if (item) {
    const goods = storage.getGoods().find(g => g.id === goodsId)
    if (goods && item.quantity < goods.goodsStock) {
      item.quantity++
      storage.setCart(cartList.value)
    } else if (!goods || item.quantity >= goods.goodsStock) {
      uni.showToast({ title: '库存不足', icon: 'none' })
    }
  }
}

function handleMinus(goodsId: string) {
  const item = cartList.value.find(c => c.goodsId === goodsId)
  if (item) {
    if (item.quantity > 1) {
      item.quantity--
      storage.setCart(cartList.value)
    } else {
      handleRemove(goodsId)
    }
  }
}

function handleRemove(goodsId: string) {
  storage.removeFromCart(goodsId)
  loadCart()
}

function handleClearCart() {
  uni.showModal({
    title: '确认清空',
    content: '确定要清空购物车吗？',
    success: (res) => {
      if (res.confirm) {
        storage.clearCart()
        loadCart()
      }
    }
  })
}

function goShopping() {
  uni.switchTab({
    url: '/pages/home/home'
  })
}

function handleCheckout() {
  if (cartList.value.length === 0) {
    uni.showToast({ title: '购物车为空', icon: 'none' })
    return
  }

  const records = cartList.value.map(item => ({
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    goodsId: item.goodsId,
    goodsName: item.goodsName,
    goodsCode: item.goodsCode,
    goodsBarcode: item.goodsBarcode,
    goodsSpec: item.goodsSpec,
    goodsUnit: item.goodsUnit,
    goodsPrice: item.goodsPrice,
    quantity: item.quantity,
    totalPrice: item.goodsPrice * item.quantity,
    outputTime: new Date().toLocaleString('zh-CN'),
    outputType: '销售'
  }))

  const goodsList = storage.getGoods()
  cartList.value.forEach(item => {
    const goods = goodsList.find(g => g.id === item.goodsId)
    if (goods) {
      goods.goodsStock -= item.quantity
    }
  })
  storage.setGoods(goodsList)

  records.forEach(record => {
    storage.addRecord(record)
  })

  storage.clearCart()
  loadCart()

  uni.showModal({
    title: '结算成功',
    content: `共出货 ${totalCount.value} 件，金额 ¥${totalAmount.value}`,
    showCancel: false,
    success: () => {
      uni.switchTab({
        url: '/pages/home/home'
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #F5F5F5;
  padding-bottom: 120rpx;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 20rpx;
  background-color: #fff;
}

.header-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.clear-cart {
  font-size: 28rpx;
  color: #999;
}

.cart-list {
  padding: 20rpx;
}

.cart-item {
  display: flex;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 16rpx;
}

.cart-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.cart-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cart-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}

.cart-spec {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 16rpx;
}

.cart-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #FF5722;
}

.quantity-control {
  display: flex;
  align-items: center;
}

.qty-btn {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  background-color: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  
  text {
    font-size: 36rpx;
    color: #333;
  }
  
  &.plus {
    background-color: #28B389;
    
    text {
      color: #fff;
    }
  }
}

.qty-value {
  font-size: 28rpx;
  color: #333;
  margin: 0 20rpx;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120rpx 40rpx;
}

.empty-icon {
  font-size: 120rpx;
  margin-bottom: 32rpx;
}

.empty-text {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 12rpx;
}

.empty-hint {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 48rpx;
}

.go-shopping-btn {
  background-color: #28B389;
  padding: 24rpx 80rpx;
  border-radius: 40rpx;
  
  text {
    font-size: 30rpx;
    color: #fff;
    font-weight: bold;
  }
}

.checkout-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  background-color: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.bar-left {
  display: flex;
  align-items: baseline;
}

.total-label {
  font-size: 28rpx;
  color: #666;
}

.total-price {
  font-size: 40rpx;
  font-weight: bold;
  color: #FF5722;
  margin-left: 8rpx;
}

.total-count {
  font-size: 24rpx;
  color: #999;
  margin-left: 16rpx;
}

.checkout-btn {
  background-color: #28B389;
  padding: 20rpx 60rpx;
  border-radius: 40rpx;
  
  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: bold;
  }
}
</style>
