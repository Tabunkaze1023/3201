<template>
  <view class="goods-item" @click="handleClick">
    <image class="goods-image" :src="goods.goodsImage" mode="aspectFill" />
    <view class="goods-info">
      <text class="goods-name">{{ goods.goodsName }}</text>
      <text class="goods-spec">{{ goods.goodsSpec }}</text>
      <view class="goods-bottom">
        <text class="goods-price">¥{{ goods.goodsPrice }}</text>
        <text class="goods-stock">库存: {{ goods.goodsStock }}{{ goods.goodsUnit }}</text>
      </view>
    </view>
    <view class="goods-actions" v-if="showActions">
      <view class="action-btn minus" @click.stop="handleMinus" v-if="quantity > 0">
        <text>-</text>
      </view>
      <text class="quantity" v-if="quantity > 0">{{ quantity }}</text>
      <view class="action-btn plus" @click.stop="handlePlus">
        <text>+</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { Goods } from '@/types'

const props = defineProps<{
  goods: Goods
  showActions?: boolean
  quantity?: number
}>()

const emit = defineEmits<{
  click: [goods: Goods]
  plus: [goods: Goods]
  minus: [goods: Goods]
}>()

function handleClick() {
  emit('click', props.goods)
}

function handlePlus() {
  emit('plus', props.goods)
}

function handleMinus() {
  emit('minus', props.goods)
}
</script>

<style lang="scss" scoped>
.goods-item {
  display: flex;
  padding: 20rpx;
  background-color: #fff;
  margin-bottom: 10rpx;
  border-radius: 16rpx;
  align-items: center;
}

.goods-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
}

.goods-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.goods-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goods-spec {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 12rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goods-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goods-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #FF5722;
}

.goods-stock {
  font-size: 24rpx;
  color: #999;
}

.goods-actions {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.action-btn {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  background-color: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rpx 0;
  
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

.quantity {
  font-size: 28rpx;
  color: #333;
  margin: 4rpx 0;
}
</style>
