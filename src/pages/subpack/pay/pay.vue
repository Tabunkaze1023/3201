<template>
  <view class="page">
    <view class="pay-header">
      <text class="pay-icon">❤️</text>
      <text class="pay-title">支持作者</text>
      <text class="pay-desc">如果这款应用对你有帮助，欢迎支持一下</text>
    </view>

    <view class="pay-methods">
      <view class="method-item">
        <view class="method-icon">💸</view>
        <view class="method-info">
          <text class="method-name">微信赞赏</text>
          <text class="method-desc">扫码支持，金额随意</text>
        </view>
      </view>
      <view class="method-item">
        <view class="method-icon">⭐</view>
        <view class="method-info">
          <text class="method-name">好评支持</text>
          <text class="method-desc">给个好评就是最大的支持</text>
        </view>
      </view>
      <view class="method-item">
        <view class="method-icon">📧</view>
        <view class="method-info">
          <text class="method-name">反馈建议</text>
          <text class="method-desc">提出你的想法帮助改进</text>
        </view>
      </view>
    </view>

    <view class="about-section">
      <view class="section-title">关于应用</view>
      <view class="about-info">
        <text class="about-item">名称：码上识物铺</text>
        <text class="about-item">版本：v1.0.0</text>
        <text class="about-item">类型：本地版</text>
        <text class="about-item">功能：商品管理、库存管理、销售结算、数据分析</text>
      </view>
    </view>

    <view class="thanks-section">
      <text class="thanks-text">感谢你的使用！🎉</text>
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

.pay-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 40rpx;
}

.pay-icon {
  font-size: 100rpx;
  margin-bottom: 20rpx;
}

.pay-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 12rpx;
}

.pay-desc {
  font-size: 26rpx;
  color: #999;
}

.pay-methods {
  display: flex;
  flex-direction: column;
}

.method-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 28rpx;
  margin-bottom: 16rpx;
}

.method-icon {
  font-size: 48rpx;
  margin-right: 20rpx;
}

.method-info {
  flex: 1;
}

.method-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.method-desc {
  font-size: 26rpx;
  color: #999;
}

.about-section {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-top: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.about-info {
  display: flex;
  flex-direction: column;
}

.about-item {
  font-size: 26rpx;
  color: #666;
  line-height: 2;
}

.thanks-section {
  display: flex;
  justify-content: center;
  padding: 60rpx 40rpx;
}

.thanks-text {
  font-size: 32rpx;
  color: #28B389;
  font-weight: bold;
}
</style>
