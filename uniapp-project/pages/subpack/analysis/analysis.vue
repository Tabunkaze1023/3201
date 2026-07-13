<template>
  <view class="analysis-page">
    <view class="stat-cards">
      <view class="stat-card">
        <text class="stat-label">商品总数</text>
        <text class="stat-value">{{ totalGoods }}</text>
      </view>
      <view class="stat-card">
        <text class="stat-label">出库次数</text>
        <text class="stat-value">{{ totalOutputCount }}</text>
      </view>
      <view class="stat-card">
        <text class="stat-label">库存不足</text>
        <text class="stat-value danger">{{ lowStockCount }}</text>
      </view>
    </view>
    <view class="chart-section">
      <view class="section-header">
        <text class="section-title">出库趋势（近7天）</text>
      </view>
      <view class="chart-container">
        <view class="chart-placeholder">
          <text class="placeholder-icon">📈</text>
          <text class="placeholder-text">图表功能需要 qiun-data-charts 组件</text>
          <text class="placeholder-desc">数据已准备好，可自行接入图表组件</text>
        </view>
      </view>
    </view>
    <view class="data-section">
      <view class="section-header">
        <text class="section-title">库存概览</text>
      </view>
      <view class="data-list">
        <view class="data-item">
          <text class="data-label">总库存价值</text>
          <text class="data-value">¥{{ totalValue }}</text>
        </view>
        <view class="data-item">
          <text class="data-label">总成本价值</text>
          <text class="data-value">¥{{ totalCostValue }}</text>
        </view>
        <view class="data-item">
          <text class="data-label">预估总利润</text>
          <text class="data-value success">¥{{ totalProfit }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { goodsInfoObj, outputHistoryObj } from '@/utils/cloudObj.js'

export default {
  data: function() {
    return {
      totalGoods: 0,
      totalOutputCount: 0,
      lowStockCount: 0,
      totalValue: '0.00',
      totalCostValue: '0.00',
      totalProfit: '0.00'
    }
  },
  onShow: function() {
    this.loadData()
  },
  methods: {
    loadData: function() {
      var self = this
      Promise.all([
        goodsInfoObj.getGoodsList({}),
        outputHistoryObj.getOutputHistory({}),
        goodsInfoObj.getStockGoodsList({})
      ]).then(function(results) {
        var goodsRes = results[0]
        var outputRes = results[1]
        var stockRes = results[2]
        var goodsList = goodsRes.data || []
        var outputList = outputRes.data || []
        var stockList = stockRes.data || []
        self.totalGoods = goodsList.length
        self.totalOutputCount = outputList.length
        self.lowStockCount = stockList.length
        var totalValue = 0
        var totalCostValue = 0
        goodsList.forEach(function(item) {
          var num = Number(item.goods_num) || 0
          var price = Number(item.goods_price) || 0
          var cost = Number(item.goods_cost) || 0
          totalValue += num * price
          totalCostValue += num * cost
        })
        self.totalValue = totalValue.toFixed(2)
        self.totalCostValue = totalCostValue.toFixed(2)
        self.totalProfit = (totalValue - totalCostValue).toFixed(2)
      })
    }
  }
}
</script>

<style scoped>
.analysis-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding: 20rpx;
  padding-bottom: 40rpx;
}

.stat-cards {
  display: flex;
  gap: 16rpx;
  margin-bottom: 30rpx;
}

.stat-card {
  flex: 1;
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx 20rpx;
  text-align: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.stat-label {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-bottom: 10rpx;
}

.stat-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #28B389;
}

.stat-value.danger {
  color: #ff6b6b;
}

.chart-section,
.data-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-header {
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.chart-container {
  background: #fafafa;
  border-radius: 12rpx;
  padding: 40rpx 20rpx;
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.placeholder-icon {
  font-size: 64rpx;
  margin-bottom: 16rpx;
}

.placeholder-text {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 8rpx;
}

.placeholder-desc {
  font-size: 24rpx;
  color: #999;
}

.data-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background: #fafafa;
  border-radius: 8rpx;
}

.data-label {
  font-size: 28rpx;
  color: #666;
}

.data-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.data-value.success {
  color: #28B389;
}
</style>
