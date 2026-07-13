<template>
  <view class="page">
    <view class="user-header">
      <view class="user-info">
        <view class="avatar">
          <text class="avatar-icon">👤</text>
        </view>
        <view class="user-detail">
          <text class="user-name">{{ userInfo.nickName }}</text>
          <text class="user-phone">{{ userInfo.phone }}</text>
        </view>
      </view>
      <view class="user-stats">
        <view class="user-stat">
          <text class="stat-num">{{ goodsCount }}</text>
          <text class="stat-text">商品数</text>
        </view>
        <view class="user-stat">
          <text class="stat-num">{{ recordCount }}</text>
          <text class="stat-text">出货记录</text>
        </view>
        <view class="user-stat">
          <text class="stat-num">{{ cartCount }}</text>
          <text class="stat-text">购物车</text>
        </view>
      </view>
    </view>

    <view class="menu-section">
      <view class="menu-group">
        <view class="menu-item" @click="navigateTo('/pages/subpack/list/list')">
          <text class="menu-icon">📦</text>
          <text class="menu-text">商品管理</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/subpack/analysis/analysis')">
          <text class="menu-icon">📈</text>
          <text class="menu-text">数据分析</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/subpack/record/record')">
          <text class="menu-icon">📋</text>
          <text class="menu-text">出库记录</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>

      <view class="menu-group">
        <view class="menu-item" @click="navigateTo('/pages/subpack/explanation/explanation')">
          <text class="menu-icon">📥</text>
          <text class="menu-text">导入说明</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/subpack/usermsg/usermsg')">
          <text class="menu-icon">💬</text>
          <text class="menu-text">我的消息</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/subpack/pay/pay')">
          <text class="menu-icon">❤️</text>
          <text class="menu-text">支持作者</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>

      <view class="menu-group">
        <view class="menu-item" @click="handleBackup">
          <text class="menu-icon">💾</text>
          <text class="menu-text">数据备份</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="handleRestore">
          <text class="menu-icon">🔄</text>
          <text class="menu-text">数据恢复</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="handleReset">
          <text class="menu-icon">⚠️</text>
          <text class="menu-text">重置数据</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>

    <view class="version-info">
      <text class="version-text">码上识物铺 v1.0.0</text>
      <text class="version-desc">本地运行 · 数据安全</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storage } from '@/utils/storage'
import { mockGoods, mockUser } from '@/utils/mock'
import type { UserInfo } from '@/types'

const userInfo = ref<UserInfo>(mockUser)
const goodsCount = ref(0)
const recordCount = ref(0)
const cartCount = ref(0)

onMounted(() => {
  loadData()
})

function loadData() {
  let goods = storage.getGoods()
  if (goods.length === 0) {
    storage.setGoods(mockGoods)
    goods = mockGoods
  }
  goodsCount.value = goods.length
  recordCount.value = storage.getRecords().length
  cartCount.value = storage.getCart().length
}

function navigateTo(url: string) {
  uni.navigateTo({ url })
}

function handleBackup() {
  const goods = storage.getGoods()
  const records = storage.getRecords()
  const backupData = {
    goods,
    records,
    backupTime: new Date().toLocaleString('zh-CN'),
    version: '1.0.0'
  }
  
  uni.setClipboardData({
    data: JSON.stringify(backupData),
    success: () => {
      uni.showToast({ title: '数据已复制到剪贴板', icon: 'success' })
    }
  })
}

function handleRestore() {
  uni.showModal({
    title: '数据恢复',
    content: '请将备份数据粘贴到输入框中',
    editable: true,
    success: (res) => {
      if (res.confirm && res.content) {
        try {
          const backupData = JSON.parse(res.content)
          if (backupData.goods) {
            storage.setGoods(backupData.goods)
          }
          if (backupData.records) {
            storage.setRecords(backupData.records)
          }
          loadData()
          uni.showToast({ title: '恢复成功', icon: 'success' })
        } catch {
          uni.showToast({ title: '数据格式错误', icon: 'none' })
        }
      }
    }
  })
}

function handleReset() {
  uni.showModal({
    title: '⚠️ 警告',
    content: '确定要重置所有数据吗？此操作不可撤销！',
    confirmColor: '#FF5722',
    success: (res) => {
      if (res.confirm) {
        storage.setGoods(mockGoods)
        storage.setRecords([])
        storage.clearCart()
        loadData()
        uni.showToast({ title: '重置成功', icon: 'success' })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #F5F5F5;
}

.user-header {
  background: linear-gradient(135deg, #28B389 0%, #1E9E7B 100%);
  padding: 80rpx 30rpx 40rpx;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
}

.avatar-icon {
  font-size: 64rpx;
}

.user-detail {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8rpx;
}

.user-phone {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

.user-stats {
  display: flex;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 16rpx;
  padding: 24rpx;
}

.user-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  font-size: 40rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 8rpx;
}

.stat-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.menu-section {
  padding: 20rpx;
}

.menu-group {
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 28rpx 24rpx;
  border-bottom: 1rpx solid #F5F5F5;
  
  &:last-child {
    border-bottom: none;
  }
}

.menu-icon {
  font-size: 40rpx;
  margin-right: 20rpx;
}

.menu-text {
  flex: 1;
  font-size: 30rpx;
  color: #333;
}

.menu-arrow {
  font-size: 36rpx;
  color: #CCC;
}

.version-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
}

.version-text {
  font-size: 26rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.version-desc {
  font-size: 22rpx;
  color: #BBB;
}
</style>
