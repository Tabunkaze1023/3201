<template>
  <view class="cart-confirm-mask" v-if="show" @click="cancel">
    <view class="cart-confirm-content" @click.stop>
      <view class="cart-confirm-header">
        <text class="cart-confirm-title">确认清单</text>
        <text class="cart-confirm-close" @click="cancel">×</text>
      </view>
      <scroll-view class="cart-confirm-list" scroll-y>
        <view class="cart-item" v-for="(item, index) in goodsList" :key="index">
          <text class="cart-item-name">{{ item.goods_name }}</text>
          <text class="cart-item-qty">×{{ item.quantity }}</text>
          <text class="cart-item-price">¥{{ item.goods_price }}</text>
        </view>
      </scroll-view>
      <view class="cart-confirm-footer">
        <view class="cart-confirm-total">
          <text>合计：</text>
          <text class="total-price">¥{{ totalPrice }}</text>
        </view>
        <view class="cart-confirm-btns">
          <button class="btn-cancel" @click="cancel">取消</button>
          <button class="btn-confirm" @click="confirm">确认</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'cart-confirm',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    goodsList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    totalPrice: function() {
      return this.goodsList.reduce(function(total, item) {
        return total + Number(item.goods_price) * item.quantity
      }, 0).toFixed(2)
    }
  },
  methods: {
    cancel: function() {
      this.$emit('update:show', false)
    },
    confirm: function() {
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped>
.cart-confirm-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.cart-confirm-content {
  width: 600rpx;
  max-height: 80vh;
  background: #fff;
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
}

.cart-confirm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
}

.cart-confirm-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.cart-confirm-close {
  font-size: 40rpx;
  color: #999;
  line-height: 1;
}

.cart-confirm-list {
  flex: 1;
  max-height: 400rpx;
  padding: 20rpx 30rpx;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.cart-item-name {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.cart-item-qty {
  font-size: 26rpx;
  color: #666;
  margin: 0 20rpx;
}

.cart-item-price {
  font-size: 28rpx;
  color: #ff6b6b;
}

.cart-confirm-footer {
  border-top: 1rpx solid #eee;
  padding: 20rpx 30rpx;
}

.cart-confirm-total {
  text-align: right;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  color: #333;
}

.total-price {
  color: #ff6b6b;
  font-size: 32rpx;
  font-weight: bold;
}

.cart-confirm-btns {
  display: flex;
  gap: 20rpx;
}

.btn-cancel,
.btn-confirm {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
}

.btn-cancel {
  background: #f5f5f5;
  color: #666;
}

.btn-confirm {
  background: #28B389;
  color: #fff;
}
</style>
