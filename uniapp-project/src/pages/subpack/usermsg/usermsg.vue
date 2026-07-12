<template>
  <view class="usermsg-page">
    <view v-if="msgList.length" class="msg-list">
      <view
        v-for="(msg, index) in msgList"
        :key="index"
        class="msg-card"
      >
        <view class="msg-header">
          <text class="msg-title">{{ msg.title }}</text>
          <text class="msg-time">{{ formatDate(msg.time) }}</text>
        </view>
        <view class="msg-content">
          <text>{{ msg.content }}</text>
        </view>
      </view>
    </view>
    <view v-else class="empty-tip">
      <image src="/static/nothing.png" class="empty-img"></image>
      <text class="empty-text">暂无消息</text>
    </view>
  </view>
</template>

<script>
import { sendMsg } from '@/utils/cloudObj.js'
import { formatDate } from '@/utils/tool.js'

export default {
  data: function() {
    return {
      msgList: []
    }
  },
  onLoad: function() {
    this.loadMessages()
  },
  methods: {
    formatDate: formatDate,
    loadMessages: function() {
      var self = this
      sendMsg.getMsgList().then(function(res) {
        if (res.code === 0) {
          self.msgList = res.data || []
        }
      })
    }
  }
}
</script>

<style scoped>
.usermsg-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding: 20rpx;
  padding-bottom: 40rpx;
}

.msg-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.msg-card {
  background: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.msg-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
}

.msg-time {
  font-size: 24rpx;
  color: #999;
}

.msg-content {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
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
