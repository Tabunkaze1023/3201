<template>
  <view class="page">
    <view class="msg-list">
      <view class="msg-item">
        <view class="msg-icon">📢</view>
        <view class="msg-info">
          <text class="msg-title">系统通知</text>
          <text class="msg-desc">欢迎使用码上识物铺，本地版本已就绪</text>
          <text class="msg-time">刚刚</text>
        </view>
      </view>
      <view class="msg-item">
        <view class="msg-icon">💾</view>
        <view class="msg-info">
          <text class="msg-title">数据备份</text>
          <text class="msg-desc">建议定期备份数据，防止数据丢失</text>
          <text class="msg-time">今天</text>
        </view>
      </view>
      <view class="msg-item">
        <view class="msg-icon">✅</view>
        <view class="msg-info">
          <text class="msg-title">功能更新</text>
          <text class="msg-desc">已移除云端功能，转为本地运行</text>
          <text class="msg-time">昨天</text>
        </view>
      </view>
    </view>
    
    <view class="empty-tip" v-if="false">
      <text>暂无消息</text>
    </view>
  </view>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #F5F5F5;
  padding: 20rpx;
}

.msg-list {
  display: flex;
  flex-direction: column;
}

.msg-item {
  display: flex;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;
}

.msg-icon {
  font-size: 48rpx;
  margin-right: 20rpx;
}

.msg-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.msg-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}

.msg-desc {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 8rpx;
}

.msg-time {
  font-size: 22rpx;
  color: #BBB;
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
