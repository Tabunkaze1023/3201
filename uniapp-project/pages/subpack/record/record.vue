<template>
  <view class="record-page">
    <view v-if="recordList.length" class="record-list">
      <view
        v-for="(record, index) in recordList"
        :key="record._id"
        class="record-card"
      >
        <view class="record-header">
          <text class="record-date">{{ formatDate(record.create_date) }}</text>
          <text class="record-count">{{ record.total_num }} 件</text>
        </view>
        <view class="record-goods">
          <view
            v-for="(item, idx) in record.goods_list.slice(0, 3)"
            :key="idx"
            class="goods-row"
          >
            <text class="goods-name">{{ item.goods_name }}</text>
            <text class="goods-qty">×{{ item.quantity }}</text>
            <text class="goods-price">¥{{ item.goods_price }}</text>
          </view>
          <view v-if="record.goods_list.length > 3" class="more-goods">
            <text>...还有 {{ record.goods_list.length - 3 }} 件商品</text>
          </view>
        </view>
        <view class="record-footer">
          <text class="total-label">合计：</text>
          <text class="total-price">¥{{ record.total_price }}</text>
        </view>
      </view>
    </view>
    <view v-else class="empty-tip">
      <image src="/static/nothing.png" class="empty-img"></image>
      <text class="empty-text">暂无出库记录</text>
    </view>
  </view>
</template>

<script>
import { outputHistoryObj } from '@/utils/cloudObj.js'
import { formatDate } from '@/utils/tool.js'

export default {
  data: function() {
    return {
      recordList: []
    }
  },
  onShow: function() {
    this.loadRecords()
  },
  onPullDownRefresh: function() {
    this.loadRecords()
    uni.stopPullDownRefresh()
  },
  methods: {
    formatDate: formatDate,
    loadRecords: function() {
      var self = this
      outputHistoryObj.getOutputHistory({
        page: 1,
        pageSize: 50
      }).then(function(res) {
        if (res.code === 0) {
          self.recordList = res.data || []
        }
      })
    }
  }
}
</script>

<style scoped>
.record-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding: 20rpx;
  padding-bottom: 40rpx;
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.record-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.record-date {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.record-count {
  font-size: 26rpx;
  color: #28B389;
}

.record-goods {
  margin-bottom: 16rpx;
}

.goods-row {
  display: flex;
  align-items: center;
  padding: 10rpx 0;
}

.goods-name {
  flex: 1;
  font-size: 26rpx;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goods-qty {
  font-size: 24rpx;
  color: #999;
  margin: 0 16rpx;
}

.goods-price {
  font-size: 26rpx;
  color: #ff6b6b;
}

.more-goods {
  font-size: 24rpx;
  color: #999;
  padding: 10rpx 0;
}

.record-footer {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  padding-top: 16rpx;
  border-top: 1rpx solid #f5f5f5;
}

.total-label {
  font-size: 26rpx;
  color: #666;
}

.total-price {
  font-size: 32rpx;
  color: #ff6b6b;
  font-weight: bold;
}

.empty-tip {
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
</style>
