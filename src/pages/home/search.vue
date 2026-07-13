<template>
  <view class="page">
    <view class="search-header">
      <view class="search-input-wrap">
        <text class="search-icon">🔍</text>
        <input 
          class="search-input" 
          v-model="searchText" 
          placeholder="搜索商品名称、编码、条码"
          confirm-type="search"
          @confirm="handleSearch"
          focus
        />
        <text class="clear-btn" v-if="searchText" @click="clearSearch">✕</text>
      </view>
      <text class="cancel-btn" @click="handleCancel">取消</text>
    </view>

    <view class="search-history" v-if="!searchText && historyList.length > 0">
      <view class="history-header">
        <text class="history-title">搜索历史</text>
        <text class="clear-history" @click="clearHistory">清空</text>
      </view>
      <view class="history-tags">
        <text class="history-tag" v-for="item in historyList" :key="item" @click="searchText = item; handleSearch()">
          {{ item }}
        </text>
      </view>
    </view>

    <view class="search-result" v-if="searchText">
      <view class="result-header">
        <text class="result-count">找到 {{ filteredGoods.length }} 个结果</text>
      </view>
      <view class="goods-list">
        <view class="goods-item" v-for="goods in filteredGoods" :key="goods.id" @click="handleGoodsClick(goods)">
          <image class="goods-image" :src="goods.goodsImage" mode="aspectFill" />
          <view class="goods-info">
            <text class="goods-name">{{ goods.goodsName }}</text>
            <text class="goods-spec">{{ goods.goodsSpec }}</text>
            <view class="goods-bottom">
              <text class="goods-price">¥{{ goods.goodsPrice }}</text>
              <text class="goods-stock">库存: {{ goods.goodsStock }}{{ goods.goodsUnit }}</text>
            </view>
          </view>
        </view>
        <view class="empty-tip" v-if="filteredGoods.length === 0">
          <text>暂无匹配结果</text>
        </view>
      </view>
    </view>

    <view class="hot-search" v-if="!searchText && historyList.length === 0">
      <view class="hot-header">
        <text class="hot-title">热门搜索</text>
      </view>
      <view class="hot-tags">
        <text class="hot-tag" v-for="item in hotTags" :key="item" @click="searchText = item; handleSearch()">
          {{ item }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storage } from '@/utils/storage'
import { mockGoods } from '@/utils/mock'
import type { Goods } from '@/types'

const searchText = ref('')
const goodsList = ref<Goods[]>([])
const historyList = ref<string[]>([])

const hotTags = ['iPhone', 'MacBook', 'AirPods', '小米', '华为', 'iPad']

const filteredGoods = computed(() => {
  if (!searchText.value) return []
  const keyword = searchText.value.toLowerCase()
  return goodsList.value.filter(g => 
    g.goodsName.toLowerCase().includes(keyword) ||
    g.goodsCode.toLowerCase().includes(keyword) ||
    g.goodsBarcode.includes(keyword)
  )
})

onMounted(() => {
  let goods = storage.getGoods()
  if (goods.length === 0) {
    storage.setGoods(mockGoods)
    goods = mockGoods
  }
  goodsList.value = goods
  
  const history = uni.getStorageSync('search_history')
  if (history) {
    historyList.value = JSON.parse(history)
  }
})

function handleSearch() {
  if (!searchText.value.trim()) return
  
  if (!historyList.value.includes(searchText.value)) {
    historyList.value.unshift(searchText.value)
    if (historyList.value.length > 10) {
      historyList.value = historyList.value.slice(0, 10)
    }
    uni.setStorageSync('search_history', JSON.stringify(historyList.value))
  }
}

function clearSearch() {
  searchText.value = ''
}

function clearHistory() {
  historyList.value = []
  uni.removeStorageSync('search_history')
}

function handleCancel() {
  uni.navigateBack()
}

function handleGoodsClick(goods: Goods) {
  uni.navigateTo({
    url: `/pages/subpack/list/list?id=${goods.id}`
  })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #F5F5F5;
}

.search-header {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
}

.search-input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #F5F5F5;
  border-radius: 40rpx;
  padding: 16rpx 24rpx;
}

.search-icon {
  font-size: 32rpx;
  margin-right: 12rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
}

.clear-btn {
  font-size: 28rpx;
  color: #999;
  margin-left: 12rpx;
}

.cancel-btn {
  font-size: 30rpx;
  color: #28B389;
  margin-left: 20rpx;
}

.search-history {
  padding: 20rpx;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.history-title {
  font-size: 28rpx;
  color: #666;
}

.clear-history {
  font-size: 26rpx;
  color: #999;
}

.history-tags {
  display: flex;
  flex-wrap: wrap;
}

.history-tag {
  background-color: #fff;
  padding: 12rpx 24rpx;
  border-radius: 24rpx;
  font-size: 26rpx;
  color: #666;
  margin-right: 16rpx;
  margin-bottom: 12rpx;
}

.search-result {
  padding: 20rpx;
}

.result-header {
  margin-bottom: 16rpx;
}

.result-count {
  font-size: 26rpx;
  color: #999;
}

.goods-list {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.goods-item {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #F5F5F5;
  
  &:last-child {
    border-bottom: none;
  }
}

.goods-image {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.goods-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.goods-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}

.goods-spec {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 12rpx;
}

.goods-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goods-price {
  font-size: 30rpx;
  font-weight: bold;
  color: #FF5722;
}

.goods-stock {
  font-size: 24rpx;
  color: #999;
}

.empty-tip {
  padding: 80rpx;
  text-align: center;
  
  text {
    font-size: 28rpx;
    color: #999;
  }
}

.hot-search {
  padding: 20rpx;
}

.hot-header {
  margin-bottom: 16rpx;
}

.hot-title {
  font-size: 28rpx;
  color: #666;
}

.hot-tags {
  display: flex;
  flex-wrap: wrap;
}

.hot-tag {
  background-color: #fff;
  padding: 12rpx 24rpx;
  border-radius: 24rpx;
  font-size: 26rpx;
  color: #666;
  margin-right: 16rpx;
  margin-bottom: 12rpx;
}
</style>
