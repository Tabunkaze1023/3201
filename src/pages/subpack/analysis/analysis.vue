<template>
  <view class="page">
    <view class="stats-section">
      <view class="stat-row">
        <view class="stat-card">
          <text class="stat-icon">💰</text>
          <view class="stat-info">
            <text class="stat-value">¥{{ formatNumber(analysisData.todayOutputAmount) }}</text>
            <text class="stat-label">今日营业额</text>
          </view>
        </view>
        <view class="stat-card">
          <text class="stat-icon">📦</text>
          <view class="stat-info">
            <text class="stat-value">{{ analysisData.todayOutputCount }}</text>
            <text class="stat-label">今日出货数</text>
          </view>
        </view>
      </view>
      <view class="stat-row">
        <view class="stat-card">
          <text class="stat-icon">📊</text>
          <view class="stat-info">
            <text class="stat-value">{{ analysisData.totalGoodsCount }}</text>
            <text class="stat-label">商品种类</text>
          </view>
        </view>
        <view class="stat-card">
          <text class="stat-icon">📱</text>
          <view class="stat-info">
            <text class="stat-value">{{ analysisData.totalStock }}</text>
            <text class="stat-label">库存总量</text>
          </view>
        </view>
      </view>
    </view>

    <view class="chart-section">
      <view class="section-header">
        <text class="section-title">📈 近7天出货趋势</text>
      </view>
      <view class="chart-container">
        <view class="chart-bars">
          <view class="bar-item" v-for="(item, index) in analysisData.outputTrend" :key="index">
            <view class="bar-wrapper">
              <view class="bar-fill" :style="{ height: getBarHeight(item.amount) + '%' }"></view>
            </view>
            <text class="bar-label">{{ item.date }}</text>
            <text class="bar-value">¥{{ formatNumber(item.amount) }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="category-section">
      <view class="section-header">
        <text class="section-title">📊 品类销售统计</text>
      </view>
      <view class="category-list">
        <view class="category-item" v-for="(item, index) in analysisData.categoryStats" :key="index">
          <view class="category-left">
            <view class="category-dot" :style="{ backgroundColor: getCategoryColor(index) }"></view>
            <text class="category-name">{{ item.name }}</text>
          </view>
          <view class="category-right">
            <text class="category-count">{{ item.count }}件</text>
            <text class="category-amount">¥{{ formatNumber(item.amount) }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storage } from '@/utils/storage'
import { mockGoods, getMockAnalysisData } from '@/utils/mock'
import type { AnalysisData } from '@/types'

const analysisData = ref<AnalysisData>(getMockAnalysisData())

const colors = ['#28B389', '#FF9800', '#E91E63', '#2196F3', '#9C27B0']

onMounted(() => {
  let goods = storage.getGoods()
  if (goods.length === 0) {
    storage.setGoods(mockGoods)
  }
})

function formatNumber(num: number): string {
  return num.toLocaleString()
}

function getBarHeight(amount: number): number {
  const maxAmount = Math.max(...analysisData.value.outputTrend.map(item => item.amount))
  return (amount / maxAmount) * 100
}

function getCategoryColor(index: number): string {
  return colors[index % colors.length]
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #F5F5F5;
  padding: 20rpx;
}

.stats-section {
  margin-bottom: 20rpx;
}

.stat-row {
  display: flex;
  margin-bottom: 16rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.stat-card {
  flex: 1;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  display: flex;
  align-items: center;
  margin-right: 16rpx;
  
  &:last-child {
    margin-right: 0;
  }
}

.stat-icon {
  font-size: 48rpx;
  margin-right: 16rpx;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 4rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #999;
}

.chart-section {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
}

.section-header {
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.chart-container {
  height: 400rpx;
}

.chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 300rpx;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12%;
}

.bar-wrapper {
  width: 40rpx;
  height: 250rpx;
  background-color: #F5F5F5;
  border-radius: 8rpx;
  display: flex;
  align-items: flex-end;
  margin-bottom: 12rpx;
}

.bar-fill {
  width: 100%;
  background: linear-gradient(180deg, #28B389 0%, #1E9E7B 100%);
  border-radius: 8rpx;
  transition: height 0.5s ease;
}

.bar-label {
  font-size: 20rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.bar-value {
  font-size: 20rpx;
  color: #666;
}

.category-section {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
}

.category-list {
  display: flex;
  flex-direction: column;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #F5F5F5;
  
  &:last-child {
    border-bottom: none;
  }
}

.category-left {
  display: flex;
  align-items: center;
}

.category-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}

.category-name {
  font-size: 28rpx;
  color: #333;
}

.category-right {
  display: flex;
  align-items: center;
}

.category-count {
  font-size: 26rpx;
  color: #999;
  margin-right: 20rpx;
}

.category-amount {
  font-size: 28rpx;
  font-weight: bold;
  color: #28B389;
}
</style>
