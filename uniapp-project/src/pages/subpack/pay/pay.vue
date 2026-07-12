<template>
  <view class="pay-page">
    <view class="header">
      <text class="title">支持作者</text>
      <text class="subtitle">您的支持是我持续更新的动力 ❤️</text>
    </view>
    <view class="donate-section">
      <view class="donate-card">
        <text class="card-title">请作者喝杯咖啡</text>
        <view class="amount-list">
          <view
            v-for="item in amountOptions"
            :key="item.value"
            class="amount-item"
            :class="{ active: selectedAmount === item.value }"
            @click="selectAmount(item.value)"
          >
            <text class="amount">¥{{ item.value }}</text>
            <text class="amount-label">{{ item.label }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="pay-methods">
      <text class="methods-title">支付方式</text>
      <view class="method-list">
        <view
          v-for="method in payMethods"
          :key="method.id"
          class="method-item"
          :class="{ active: selectedMethod === method.id }"
          @click="selectMethod(method.id)"
        >
          <text class="method-icon">{{ method.icon }}</text>
          <text class="method-name">{{ method.name }}</text>
          <view class="method-check">
            <text v-if="selectedMethod === method.id">✓</text>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom-bar">
      <view class="pay-info">
        <text class="pay-label">支付金额：</text>
        <text class="pay-amount">¥{{ selectedAmount }}</text>
      </view>
      <view class="pay-btn" @click="handlePay">
        <text>立即支持</text>
      </view>
    </view>
    <view class="thanks-box">
      <text class="thanks-title">💝 感谢有你</text>
      <text class="thanks-text">感谢每一位支持者，您的鼓励是我前进的动力！</text>
    </view>
  </view>
</template>

<script>
export default {
  data: function() {
    return {
      selectedAmount: 10,
      selectedMethod: 'wechat',
      amountOptions: [
        { value: 5, label: '意思一下' },
        { value: 10, label: '喝杯咖啡' },
        { value: 20, label: '非常感谢' },
        { value: 50, label: '大力支持' },
        { value: 100, label: '超级粉丝' },
        { value: 200, label: '至尊赞助' }
      ],
      payMethods: [
        { id: 'wechat', name: '微信支付', icon: '💚' },
        { id: 'alipay', name: '支付宝', icon: '💙' }
      ]
    }
  },
  methods: {
    selectAmount: function(val) {
      this.selectedAmount = val
    },
    selectMethod: function(id) {
      this.selectedMethod = id
    },
    handlePay: function() {
      uni.showModal({
        title: '提示',
        content: '本地演示版本，支付功能暂不可用。感谢您的心意！',
        showCancel: false,
        confirmText: '好的'
      })
    }
  }
}
</script>

<style scoped>
.pay-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 160rpx;
}

.header {
  background: linear-gradient(135deg, #ff9a56, #ff6b6b);
  padding: 80rpx 30rpx 60rpx;
  text-align: center;
}

.title {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 16rpx;
}

.subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
}

.donate-section {
  padding: 20rpx;
  margin-top: -30rpx;
}

.donate-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.card-title {
  display: block;
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 24rpx;
  text-align: center;
}

.amount-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.amount-item {
  width: calc(33.33% - 12rpx);
  background: #f5f5f5;
  border-radius: 12rpx;
  padding: 20rpx 10rpx;
  text-align: center;
  border: 2rpx solid transparent;
  transition: all 0.3s;
}

.amount-item.active {
  background: #fff8f0;
  border-color: #ff9a56;
}

.amount {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 6rpx;
}

.amount-item.active .amount {
  color: #ff6b6b;
}

.amount-label {
  font-size: 22rpx;
  color: #999;
}

.pay-methods {
  padding: 0 20rpx;
  margin-bottom: 30rpx;
}

.methods-title {
  display: block;
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 16rpx;
}

.method-list {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
}

.method-item {
  display: flex;
  align-items: center;
  padding: 24rpx 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.method-item:last-child {
  border-bottom: none;
}

.method-icon {
  font-size: 36rpx;
  margin-right: 20rpx;
}

.method-name {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.method-check {
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

.method-item.active .method-check {
  background: #28B389;
  border-color: #28B389;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 20rpx 30rpx;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.pay-info {
  flex: 1;
}

.pay-label {
  font-size: 26rpx;
  color: #666;
}

.pay-amount {
  font-size: 36rpx;
  font-weight: bold;
  color: #ff6b6b;
}

.pay-btn {
  background: linear-gradient(135deg, #ff9a56, #ff6b6b);
  color: #fff;
  padding: 20rpx 50rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: 500;
}

.thanks-box {
  margin: 30rpx 20rpx;
  background: #fff8e6;
  border-radius: 12rpx;
  padding: 30rpx;
  text-align: center;
}

.thanks-title {
  display: block;
  font-size: 30rpx;
  font-weight: 500;
  color: #ff9a56;
  margin-bottom: 12rpx;
}

.thanks-text {
  font-size: 26rpx;
  color: #996600;
  line-height: 1.6;
}
</style>
