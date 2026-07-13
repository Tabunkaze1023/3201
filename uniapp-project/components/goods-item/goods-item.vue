<template>
  <view class="goods-item" @click="handleClick">
    <view class="goods-left">
      <image v-if="item.goods_pic && item.goods_pic.imgUrl" class="goods-img" :src="item.goods_pic.imgUrl" mode="aspectFill"></image>
      <view v-else class="goods-img-placeholder">
        <text class="placeholder-icon">📦</text>
      </view>
    </view>
    <view class="goods-info">
      <view class="goods-name">{{ item.goods_name }}</view>
      <view class="goods-price">¥{{ item.goods_price }}</view>
      <view class="goods-meta">
        <text class="meta-item">库存：{{ item.goods_num === '' || item.goods_num === null ? '未添加' : item.goods_num }}</text>
        <text class="meta-item">条码：{{ item.goods_sn || '未添加' }}</text>
      </view>
      <view class="goods-date">{{ formatMillisecondsToDate(item.last_modify_date) }}</view>
    </view>
    <view v-if="deleteMode" class="goods-select">
      <view class="select-checkbox" :class="{ active: selected }">
        <text v-if="selected">✓</text>
      </view>
    </view>
  </view>
</template>

<script>
import { formatMillisecondsToDate } from '@/utils/tool.js'

export default {
  name: 'goods-item',
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      }
    },
    selected: {
      type: Boolean,
      default: false
    },
    deleteMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatMillisecondsToDate: formatMillisecondsToDate,
    handleClick: function() {
      this.$emit('click', this.item)
    }
  }
}
</script>

<style scoped>
.goods-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  margin-bottom: 20rpx;
  border-radius: 12rpx;
}

.goods-left {
  margin-right: 20rpx;
}

.goods-img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
  background: #f5f5f5;
}

.goods-img-placeholder {
  width: 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  font-size: 48rpx;
}

.goods-info {
  flex: 1;
  min-width: 0;
}

.goods-name {
  font-size: 30rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 10rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goods-price {
  font-size: 32rpx;
  color: #ff6b6b;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.goods-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-bottom: 8rpx;
}

.meta-item {
  font-size: 24rpx;
  color: #999;
}

.goods-date {
  font-size: 22rpx;
  color: #ccc;
}

.goods-select {
  margin-left: 20rpx;
}

.select-checkbox {
  width: 40rpx;
  height: 40rpx;
  border: 2rpx solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #fff;
}

.select-checkbox.active {
  background: #28B389;
  border-color: #28B389;
}
</style>
