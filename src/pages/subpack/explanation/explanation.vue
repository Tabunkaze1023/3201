<template>
  <view class="page">
    <view class="explain-section">
      <view class="section-title">📥 商品数据导入说明</view>
      <view class="explain-content">
        <view class="step-item">
          <view class="step-num">1</view>
          <view class="step-info">
            <text class="step-title">准备Excel文件</text>
            <text class="step-desc">创建一个Excel文件，包含以下列：商品名称、商品类型、商品编码、商品条码、商品规格、商品单位、销售价格、成本价格、库存数量</text>
          </view>
        </view>
        <view class="step-item">
          <view class="step-num">2</view>
          <view class="step-info">
            <text class="step-title">填写数据</text>
            <text class="step-desc">在Excel中填写商品数据，确保销售价格、成本价格和库存数量为数字格式</text>
          </view>
        </view>
        <view class="step-item">
          <view class="step-num">3</view>
          <view class="step-info">
            <text class="step-title">导入数据</text>
            <text class="step-desc">由于本地版本限制，目前请手动添加商品或使用数据备份功能导入</text>
          </view>
        </view>
      </view>
    </view>

    <view class="format-section">
      <view class="section-title">📋 数据格式示例</view>
      <view class="format-table">
        <view class="table-header">
          <text>商品名称</text>
          <text>商品类型</text>
          <text>销售价格</text>
          <text>库存</text>
        </view>
        <view class="table-row">
          <text>iPhone 15</text>
          <text>手机数码</text>
          <text>9999</text>
          <text>50</text>
        </view>
        <view class="table-row">
          <text>MacBook Pro</text>
          <text>电脑办公</text>
          <text>14999</text>
          <text>30</text>
        </view>
      </view>
    </view>

    <view class="tips-section">
      <view class="section-title">💡 注意事项</view>
      <view class="tips-list">
        <text class="tip-item">• 商品名称为必填项</text>
        <text class="tip-item">• 销售价格必须为数字</text>
        <text class="tip-item">• 库存数量必须为整数</text>
        <text class="tip-item">• 商品条码支持扫描识别</text>
        <text class="tip-item">• 建议定期备份数据以防丢失</text>
      </view>
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

.explain-section,
.format-section,
.tips-section {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.explain-content {
  display: flex;
  flex-direction: column;
}

.step-item {
  display: flex;
  margin-bottom: 24rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.step-num {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  background-color: #28B389;
  color: #fff;
  font-size: 28rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.step-info {
  flex: 1;
}

.step-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.step-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.6;
}

.format-table {
  border: 1rpx solid #EEE;
  border-radius: 12rpx;
  overflow: hidden;
}

.table-header {
  display: flex;
  background-color: #F5F5F5;
  padding: 20rpx 16rpx;
  
  text {
    flex: 1;
    font-size: 26rpx;
    font-weight: bold;
    color: #666;
    text-align: center;
  }
}

.table-row {
  display: flex;
  padding: 20rpx 16rpx;
  border-top: 1rpx solid #EEE;
  
  text {
    flex: 1;
    font-size: 26rpx;
    color: #333;
    text-align: center;
  }
}

.tips-list {
  display: flex;
  flex-direction: column;
}

.tip-item {
  font-size: 26rpx;
  color: #666;
  line-height: 2;
}
</style>
