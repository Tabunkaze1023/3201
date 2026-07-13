<template>
  <view class="explanation-page">
    <scroll-view class="content" scroll-y>
      <view class="section">
        <text class="section-title">📋 导入说明</text>
        <view class="section-content">
          <text class="text">1. 在"我的"页面点击"下载模板"获取导入模板。</text>
          <text class="text">2. 按照模板格式填写商品信息。</text>
          <text class="text">3. 支持 .xlsx 和 .xls 格式的 Excel 文件导入。</text>
          <text class="text">4. 导入时会根据条码自动判断是新增还是更新。</text>
          <text class="text">5. 商品名称为必填项，其他为选填项。</text>
        </view>
      </view>
      <view class="section">
        <text class="section-title">📝 模板字段说明</text>
        <view class="table-wrap">
          <view class="table-row header">
            <text class="cell">列名</text>
            <text class="cell">说明</text>
            <text class="cell">是否必填</text>
          </view>
          <view class="table-row">
            <text class="cell">商品条码</text>
            <text class="cell">用于识别商品，相同条码会更新</text>
            <text class="cell">否</text>
          </view>
          <view class="table-row">
            <text class="cell">商品名称</text>
            <text class="cell">商品的名称</text>
            <text class="cell">是</text>
          </view>
          <view class="table-row">
            <text class="cell">售价</text>
            <text class="cell">商品售价，数字</text>
            <text class="cell">是</text>
          </view>
          <view class="table-row">
            <text class="cell">成本</text>
            <text class="cell">商品成本价，数字</text>
            <text class="cell">否</text>
          </view>
          <view class="table-row">
            <text class="cell">库存数量</text>
            <text class="cell">当前库存，整数</text>
            <text class="cell">否</text>
          </view>
          <view class="table-row">
            <text class="cell">缺货阈值</text>
            <text class="cell">低于此数量提醒，整数</text>
            <text class="cell">否</text>
          </view>
          <view class="table-row">
            <text class="cell">备注</text>
            <text class="cell">商品备注信息</text>
            <text class="cell">否</text>
          </view>
        </view>
      </view>
      <view class="section">
        <text class="section-title">⚠️ 注意事项</text>
        <view class="section-content">
          <text class="text">• 请确保 Excel 文件格式正确，不要修改表头。</text>
          <text class="text">• 价格必须为非负数字。</text>
          <text class="text">• 数量必须为非负整数。</text>
          <text class="text">• 成本价不能大于售价。</text>
          <text class="text">• 本地版数据保存在设备本地，卸载应用会丢失数据。</text>
        </view>
      </view>
      <view class="tip-box">
        <text class="tip-title">💡 小提示</text>
        <text class="tip-text">本地版支持在 H5 和微信小程序中导入导出 Excel 文件。在"我的"页面可以下载模板、导入商品和导出商品数据。</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data: function() {
    return {}
  }
}
</script>

<style scoped>
.explanation-page {
  height: 100vh;
  background: #f8f8f8;
}

.content {
  height: 100%;
  padding: 20rpx;
  padding-bottom: 40rpx;
  box-sizing: border-box;
}

.section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.table-wrap {
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  overflow: hidden;
}

.table-row {
  display: flex;
  border-bottom: 1rpx solid #eee;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row.header {
  background: #f5f5f5;
}

.table-row.header .cell {
  font-weight: 500;
  color: #333;
}

.cell {
  flex: 1;
  padding: 16rpx 12rpx;
  font-size: 24rpx;
  color: #666;
  text-align: center;
}

.cell:first-child {
  flex: 1.2;
  text-align: left;
  padding-left: 20rpx;
}

.tip-box {
  background: #fff8e6;
  border-radius: 12rpx;
  padding: 24rpx;
  border-left: 6rpx solid #ffb800;
}

.tip-title {
  display: block;
  font-size: 28rpx;
  font-weight: 500;
  color: #ffb800;
  margin-bottom: 10rpx;
}

.tip-text {
  font-size: 26rpx;
  color: #996600;
  line-height: 1.6;
}
</style>
