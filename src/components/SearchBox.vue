<template>
  <view class="search-box" @click="handleClick">
    <view class="search-icon">
      <text class="iconfont">🔍</text>
    </view>
    <text class="search-placeholder">{{ placeholder }}</text>
    <view class="scan-btn" @click.stop="handleScan">
      <text class="iconfont">📷</text>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  placeholder?: string
}>()

defineEmits<{
  click: []
  scan: []
}>()

const emit = defineEmits<{
  click: []
  scan: []
}>()

function handleClick() {
  emit('click')
}

function handleScan() {
  emit('scan')
}
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  align-items: center;
  background-color: #F5F5F5;
  border-radius: 40rpx;
  padding: 16rpx 24rpx;
  margin: 0 20rpx;
}

.search-icon {
  margin-right: 16rpx;
}

.iconfont {
  font-size: 32rpx;
}

.search-placeholder {
  flex: 1;
  font-size: 28rpx;
  color: #999;
}

.scan-btn {
  padding: 8rpx;
}
</style>
