<template>
  <view class="page">
    <view class="filter-bar">
      <view class="filter-item" :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">
        <text>全部</text>
      </view>
      <view class="filter-item" :class="{ active: activeFilter === 'today' }" @click="activeFilter = 'today'">
        <text>今天</text>
      </view>
      <view class="filter-item" :class="{ active: activeFilter === 'week' }" @click="activeFilter = 'week'">
        <text>本周</text>
      </view>
      <view class="filter-item" :class="{ active: activeFilter === 'month' }" @click="activeFilter = 'month'">
        <text>本月</text>
      </view>
    </view>

    <view class="record-stats">
      <view class="stat-item">
        <text class="stat-value">{{ filteredRecords.length }}</text>
        <text class="stat-label">记录数</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">¥{{ formatNumber(totalAmount) }}</text>
        <text class="stat-label">总金额</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ totalQuantity }}</text>
        <text class="stat-label">总件数</text>
      </view>
    </view>

    <view class="record-list">
      <view class="record-item" v-for="record in filteredRecords" :key="record.id">
        <view class="record-info">
          <text class="record-name">{{ record.goodsName }}</text>
          <text class="record-spec">{{ record.goodsSpec }}</text>
          <text class="record-time">{{ record.outputTime }}</text>
        </view>
        <view class="record-right">
          <text class="record-quantity">-{{ record.quantity }}{{ record.goodsUnit }}</text>
          <text class="record-price">¥{{ record.totalPrice }}</text>
        </view>
      </view>
      <view class="empty-tip" v-if="filteredRecords.length === 0">
        <text>暂无出货记录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storage } from '@/utils/storage'
import { mockGoods } from '@/utils/mock'
import type { OutputRecord } from '@/types'

const records = ref<OutputRecord[]>([])
const activeFilter = ref('all')

const filteredRecords = computed(() => {
  let result = records.value
  
  const now = new Date()
  const today = now.toDateString()
  
  switch (activeFilter.value) {
    case 'today':
      result = result.filter(r => new Date(r.outputTime).toDateString() === today)
      break
    case 'week':
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      result = result.filter(r => new Date(r.outputTime) >= weekAgo)
      break
    case 'month':
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      result = result.filter(r => new Date(r.outputTime) >= monthAgo)
      break
  }
  
  return result
})

const totalAmount = computed(() => {
  return filteredRecords.value.reduce((sum, r) => sum + r.totalPrice, 0)
})

const totalQuantity = computed(() => {
  return filteredRecords.value.reduce((sum, r) => sum + r.quantity, 0)
})

onMounted(() => {
  let goods = storage.getGoods()
  if (goods.length === 0) {
    storage.setGoods(mockGoods)
  }
  records.value = storage.getRecords()
})

function formatNumber(num: number): string {
  return num.toLocaleString()
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #F5F5F5;
}

.filter-bar {
  display: flex;
  background-color: #fff;
  padding: 20rpx;
}

.filter-item {
  flex: 1;
  text-align: center;
  padding: 16rpx;
  border-radius: 12rpx;
  transition: all 0.3s;
  
  text {
    font-size: 28rpx;
    color: #666;
  }
  
  &.active {
    background-color: #28B389;
    
    text {
      color: #fff;
      font-weight: bold;
    }
  }
}

.record-stats {
  display: flex;
  background-color: #fff;
  margin: 20rpx;
  border-radius: 16rpx;
  padding: 24rpx;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #999;
}

.record-list {
  padding: 0 20rpx;
}

.record-item {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;
}

.record-info {
  display: flex;
  flex-direction: column;
}

.record-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}

.record-spec {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.record-time {
  font-size: 22rpx;
  color: #BBB;
}

.record-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.record-quantity {
  font-size: 24rpx;
  color: #FF5722;
  margin-bottom: 8rpx;
}

.record-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.empty-tip {
  padding: 120rpx;
  text-align: center;
  
  text {
    font-size: 28rpx;
    color: #999;
  }
}
</style>
