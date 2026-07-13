<template>
  <view class="page">
    <view class="header">
      <view class="header-top">
        <text class="title">码上识物铺</text>
        <view class="header-right">
          <view class="header-btn" @click="handleHistory">
            <text>📋</text>
          </view>
        </view>
      </view>
      <SearchBox placeholder="搜索商品名称、编码、条码" @click="handleSearch" @scan="handleScan" />
    </view>

    <view class="stats-section">
      <scroll-view scroll-x class="stats-scroll">
        <view class="stats-row">
          <StatCard icon="💰" :value="'¥' + formatNumber(analysisData.todayOutputAmount)" label="今日营业额" highlight />
          <StatCard icon="📦" :value="analysisData.todayOutputCount" label="今日出货数" />
          <StatCard icon="📊" :value="analysisData.totalGoodsCount" label="商品种类" />
          <StatCard icon="📱" :value="analysisData.totalStock" label="库存总量" />
        </view>
      </scroll-view>
    </view>

    <view class="quick-actions">
      <view class="action-grid">
        <view class="action-item" @click="navigateTo('/pages/subpack/list/list')">
          <view class="action-icon bg-green">📦</view>
          <text class="action-name">商品列表</text>
        </view>
        <view class="action-item" @click="navigateTo('/pages/subpack/analysis/analysis')">
          <view class="action-icon bg-blue">📈</view>
          <text class="action-name">数据分析</text>
        </view>
        <view class="action-item" @click="navigateTo('/pages/subpack/record/record')">
          <view class="action-icon bg-orange">📋</view>
          <text class="action-name">出库记录</text>
        </view>
        <view class="action-item" @click="navigateTo('/pages/subpack/explanation/explanation')">
          <view class="action-icon bg-purple">📥</view>
          <text class="action-name">导入说明</text>
        </view>
      </view>
    </view>

    <view class="hot-section">
      <view class="section-header">
        <text class="section-title">🔥 热门商品</text>
        <text class="section-more" @click="navigateTo('/pages/subpack/list/list')">查看更多 →</text>
      </view>
      <scroll-view scroll-x class="hot-scroll">
        <view class="hot-list">
          <view class="hot-item" v-for="goods in hotGoods" :key="goods.id" @click="handleGoodsClick(goods)">
            <image class="hot-image" :src="goods.goodsImage" mode="aspectFill" />
            <text class="hot-name">{{ goods.goodsName }}</text>
            <text class="hot-price">¥{{ goods.goodsPrice }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="recent-section">
      <view class="section-header">
        <text class="section-title">📝 最近出货</text>
        <text class="section-more" @click="navigateTo('/pages/subpack/record/record')">查看更多 →</text>
      </view>
      <view class="recent-list">
        <view class="recent-item" v-for="record in recentRecords" :key="record.id">
          <view class="recent-info">
            <text class="recent-name">{{ record.goodsName }}</text>
            <text class="recent-time">{{ record.outputTime }}</text>
          </view>
          <view class="recent-right">
            <text class="recent-quantity">-{{ record.quantity }}{{ record.goodsUnit }}</text>
            <text class="recent-amount">¥{{ record.totalPrice }}</text>
          </view>
        </view>
        <view class="empty-tip" v-if="recentRecords.length === 0">
          <text>暂无出货记录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchBox from '@/components/SearchBox.vue'
import StatCard from '@/components/StatCard.vue'
import { storage } from '@/utils/storage'
import { mockGoods, getMockAnalysisData } from '@/utils/mock'
import type { Goods, AnalysisData, OutputRecord } from '@/types'

const analysisData = ref<AnalysisData>(getMockAnalysisData())
const hotGoods = ref<Goods[]>([])
const recentRecords = ref<OutputRecord[]>([])

onMounted(() => {
  initData()
})

function initData() {
  let goods = storage.getGoods()
  if (goods.length === 0) {
    storage.setGoods(mockGoods)
    goods = mockGoods
  }
  hotGoods.value = goods.slice(0, 6)
  recentRecords.value = storage.getRecords().slice(0, 5)
}

function formatNumber(num: number): string {
  return num.toLocaleString()
}

function handleSearch() {
  navigateTo('/pages/home/search')
}

function handleScan() {
  uni.scanCode({
    success: (res) => {
      const barcode = res.result
      uni.showToast({ title: `扫描结果: ${barcode}`, icon: 'none' })
    },
    fail: () => {
      uni.showToast({ title: '扫描失败', icon: 'none' })
    }
  })
}

function handleHistory() {
  navigateTo('/pages/subpack/record/record')
}

function handleGoodsClick(goods: Goods) {
  uni.navigateTo({
    url: `/pages/subpack/list/list?id=${goods.id}`
  })
}

function navigateTo(url: string) {
  uni.navigateTo({ url })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #F5F5F5;
  padding-bottom: 120rpx;
}

.header {
  background: linear-gradient(135deg, #28B389 0%, #1E9E7B 100%);
  padding: 60rpx 20rpx 30rpx;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.title {
  font-size: 44rpx;
  font-weight: bold;
  color: #fff;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-btn {
  width: 64rpx;
  height: 64rpx;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16rpx;
  
  text {
    font-size: 32rpx;
  }
}

.stats-section {
  padding: 20rpx 0;
}

.stats-scroll {
  white-space: nowrap;
}

.stats-row {
  display: inline-flex;
  padding: 0 20rpx;
}

.quick-actions {
  background-color: #fff;
  margin: 0 20rpx;
  border-radius: 16rpx;
  padding: 24rpx;
}

.action-grid {
  display: flex;
  justify-content: space-around;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-icon {
  width: 100rpx;
  height: 100rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
  
  text {
    font-size: 48rpx;
  }
  
  &.bg-green {
    background-color: #F0FFF5;
  }
  
  &.bg-blue {
    background-color: #F0F8FF;
  }
  
  &.bg-orange {
    background-color: #FFF8F0;
  }
  
  &.bg-purple {
    background-color: #F5F0FF;
  }
}

.action-name {
  font-size: 26rpx;
  color: #666;
}

.hot-section {
  margin-top: 20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  margin-bottom: 16rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.section-more {
  font-size: 26rpx;
  color: #999;
}

.hot-scroll {
  white-space: nowrap;
}

.hot-list {
  display: inline-flex;
  padding: 0 20rpx;
}

.hot-item {
  width: 200rpx;
  background-color: #fff;
  border-radius: 12rpx;
  padding: 16rpx;
  margin-right: 16rpx;
  display: flex;
  flex-direction: column;
}

.hot-image {
  width: 168rpx;
  height: 168rpx;
  border-radius: 8rpx;
  margin-bottom: 12rpx;
}

.hot-name {
  font-size: 26rpx;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 8rpx;
}

.hot-price {
  font-size: 28rpx;
  font-weight: bold;
  color: #FF5722;
}

.recent-section {
  margin-top: 20rpx;
}

.recent-list {
  background-color: #fff;
  margin: 0 20rpx;
  border-radius: 16rpx;
  padding: 8rpx 20rpx;
}

.recent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #F5F5F5;
  
  &:last-child {
    border-bottom: none;
  }
}

.recent-info {
  display: flex;
  flex-direction: column;
}

.recent-name {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 4rpx;
}

.recent-time {
  font-size: 22rpx;
  color: #999;
}

.recent-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.recent-quantity {
  font-size: 24rpx;
  color: #FF5722;
  margin-bottom: 4rpx;
}

.recent-amount {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.empty-tip {
  padding: 40rpx;
  text-align: center;
  
  text {
    font-size: 28rpx;
    color: #999;
  }
}
</style>
