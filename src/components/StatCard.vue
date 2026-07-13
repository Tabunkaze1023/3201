<template>
  <view class="stat-card" :class="{ 'highlight': highlight }">
    <view class="stat-icon">{{ icon }}</view>
    <view class="stat-content">
      <text class="stat-value">{{ value }}</text>
      <text class="stat-label">{{ label }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  value: string | number
  label: string
  highlight?: boolean
}>()
</script>

<style lang="scss" scoped>
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
  
  &.highlight {
    background: linear-gradient(135deg, #28B389 0%, #1E9E7B 100%);
    
    .stat-value, .stat-label {
      color: #fff;
    }
    
    .stat-icon {
      background-color: rgba(255, 255, 255, 0.2);
      
      text {
        color: #fff;
      }
    }
  }
}

.stat-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  background-color: #F5F5F5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16rpx;
  
  text {
    font-size: 40rpx;
  }
}

.stat-content {
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
</style>
