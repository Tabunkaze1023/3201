<template>
  <view class="home-page">
    <view class="search-bar" @click="goToSearch">
      <text class="search-icon">🔍</text>
      <text class="search-placeholder">搜索商品名称/条码</text>
    </view>
    <view class="action-buttons">
      <view class="action-btn scan-btn" @click="startScan">
        <text class="btn-icon">📷</text>
        <text class="btn-text">扫码添加</text>
      </view>
      <view class="action-btn add-btn" @click="popopen">
        <text class="btn-icon">➕</text>
        <text class="btn-text">手动添加</text>
      </view>
    </view>
    <view class="goods-section">
      <view class="section-header">
        <text class="section-title">快捷操作</text>
      </view>
      <view class="quick-actions">
        <view class="quick-item" @click="goToGoodsList">
          <text class="quick-icon">📋</text>
          <text class="quick-text">全部商品</text>
        </view>
        <view class="quick-item" @click="goToAnalysis">
          <text class="quick-icon">📊</text>
          <text class="quick-text">数据分析</text>
        </view>
        <view class="quick-item" @click="goToRecord">
          <text class="quick-icon">📝</text>
          <text class="quick-text">出库记录</text>
        </view>
      </view>
    </view>
    <goods-popup
      ref="goodsPopupRef"
      :show.sync="showGoodsPopup"
      :goods="currentGoods"
      :sacnFlag="flag"
      @refresh="refreshGoods"
    ></goods-popup>
    <view class="add-popup-mask" v-if="showAddPopup" @click="closeAddPopup">
      <view class="add-popup-content" @click.stop>
        <view class="popup-header">
          <text class="popup-title">添加商品</text>
          <text class="popup-close" @click="closeAddPopup">×</text>
        </view>
        <scroll-view class="popup-body" scroll-y>
          <view class="form-item">
            <text class="form-label">商品条码</text>
            <input class="form-input" type="text" v-model="newGoods.goods_sn" placeholder="请输入商品条码（选填）" />
          </view>
          <view class="form-item">
            <text class="form-label">商品名称 *</text>
            <input class="form-input" type="text" v-model="newGoods.goods_name" placeholder="请输入商品名称" />
          </view>
          <view class="form-item">
            <text class="form-label">售价 *</text>
            <input class="form-input" type="digit" v-model="newGoods.goods_price" placeholder="请输入售价" />
          </view>
          <view class="form-item">
            <text class="form-label">成本</text>
            <input class="form-input" type="digit" v-model="newGoods.goods_cost" placeholder="请输入成本（选填）" />
          </view>
          <view class="form-item">
            <text class="form-label">库存数量</text>
            <input class="form-input" type="number" v-model="newGoods.goods_num" placeholder="请输入库存数量（选填）" />
          </view>
          <view class="form-item">
            <text class="form-label">缺货提醒阈值</text>
            <input class="form-input" type="number" v-model="newGoods.goods_threshold" placeholder="低于此数量提醒（选填）" />
          </view>
          <view class="form-item">
            <text class="form-label">备注</text>
            <input class="form-input" type="text" v-model="newGoods.goods_notes" placeholder="请输入备注（选填）" />
          </view>
          <view class="form-item">
            <text class="form-label">商品图片</text>
            <update-image
              ref="updateImageRef"
              :imageObj="newGoods.goods_pic"
              :delFlag="true"
              @uploadPic="uploadPic"
              @uploadStatusChange="handleUploadStatusChange"
            ></update-image>
          </view>
        </scroll-view>
        <view class="popup-footer">
          <button class="btn-confirm" @click="confirmAdd">确认添加</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { goodsInfoObj } from '@/utils/cloudObj.js'
import goodsPopup from '@/components/goods-popup/goods-popup.vue'
import updateImage from '@/components/updateImage/updateImage.vue'

export default {
  components: {
    goodsPopup,
    updateImage
  },
  data: function() {
    return {
      showGoodsPopup: false,
      currentGoods: {},
      showAddPopup: false,
      newGoods: {
        goods_name: '',
        goods_price: '',
        goods_notes: '',
        goods_sn: '',
        goods_num: '',
        goods_cost: '',
        goods_threshold: '',
        goods_pic: {}
      },
      flag: true,
      isUploading: false
    }
  },
  onReady: function() {
    this.checkFirstLevelLimit()
  },
  onShow: function() {
  },
  methods: {
    checkFirstLevelLimit: function() {
      var hasSeen = uni.getStorageSync('has_seen_limit_notice')
      if (!hasSeen) {
        uni.showModal({
          title: '温馨提示',
          content: '欢迎使用本应用，全程免费！本地版无商品数量限制，祝您使用愉快～',
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#333333',
          success: function(res) {
            if (res.confirm) {
              uni.setStorageSync('has_seen_limit_notice', true)
            }
          }
        })
      }
    },
    uploadPic: function(imgObj) {
      this.newGoods.goods_pic = imgObj
    },
    handleUploadStatusChange: function(status) {
      this.isUploading = status
    },
    goToSearch: function() {
      uni.navigateTo({
        url: '/pages/home/search'
      })
    },
    goToGoodsList: function() {
      uni.navigateTo({
        url: '/pages/subpack/list/list'
      })
    },
    goToAnalysis: function() {
      uni.navigateTo({
        url: '/pages/subpack/analysis/analysis'
      })
    },
    goToRecord: function() {
      uni.navigateTo({
        url: '/pages/subpack/record/record'
      })
    },
    popopen: function() {
      this.showAddPopup = true
      this.newGoods = {
        goods_name: '',
        goods_price: '',
        goods_notes: '',
        goods_sn: '',
        goods_num: '',
        goods_cost: '',
        goods_threshold: '',
        goods_pic: {}
      }
      if (this.$refs.updateImageRef) {
        this.$refs.updateImageRef.resetImage()
      }
    },
    startScan: function() {
      var self = this
      uni.scanCode({
        scanType: ['barCode', 'qrCode'],
        success: function(res) {
          self.handleScanResult(res.result)
        },
        fail: function(err) {
          uni.showToast({
            title: '扫描失败',
            icon: 'error'
          })
        }
      })
    },
    handleScanResult: function(sn) {
      var self = this
      goodsInfoObj.findGoods(sn).then(function(res) {
        if (res.code === 0) {
          self.currentGoods = res.data
          self.showGoodsPopup = true
        } else {
          uni.showModal({
            title: '提示',
            content: '没有该商品信息，是否添加？',
            success: function(modalRes) {
              if (modalRes.confirm) {
                self.newGoods.goods_sn = sn
                self.popopen()
              }
            }
          })
        }
      }).catch(function(err) {
        uni.showToast({
          title: '获取商品信息失败',
          icon: 'error'
        })
      })
    },
    confirmAdd: function() {
      var self = this
      if (this.newGoods.goods_name === '') {
        uni.showToast({
          title: '名称必填',
          icon: 'none'
        })
        return
      }
      if (this.newGoods.goods_price === '' || this.newGoods.goods_price == null) {
        uni.showToast({
          title: '价格必填',
          icon: 'none'
        })
        return
      }
      var price = parseFloat(this.newGoods.goods_price)
      if (isNaN(price) || price < 0) {
        uni.showToast({
          title: '价格要求为数字且大于等于0',
          icon: 'none'
        })
        return
      }
      this.newGoods.goods_price = price
      if (this.newGoods.goods_cost !== '' && this.newGoods.goods_cost != null) {
        var cost = parseFloat(this.newGoods.goods_cost)
        if (isNaN(cost) || cost < 0) {
          uni.showToast({
            title: '成本要求为数字且大于等于0',
            icon: 'none'
          })
          return
        }
        this.newGoods.goods_cost = cost
        if (cost > price) {
          uni.showToast({
            title: '成本不可以大于售价',
            icon: 'none'
          })
          return
        }
      }
      if (this.newGoods.goods_num) {
        this.newGoods.goods_num = parseInt(this.newGoods.goods_num)
      }
      if (this.newGoods.goods_threshold) {
        this.newGoods.goods_threshold = parseInt(this.newGoods.goods_threshold)
      }
      uni.showLoading({
        title: '处理中...'
      })
      goodsInfoObj.addGoods(this.newGoods).then(function(res) {
        uni.hideLoading()
        if (res.code === 0) {
          uni.showToast({
            title: '添加成功',
            icon: 'success'
          })
          self.closeAddPopup()
        } else {
          uni.showToast({
            title: '添加失败',
            icon: 'error'
          })
        }
      }).catch(function(err) {
        uni.hideLoading()
        uni.showToast({
          title: '添加失败',
          icon: 'error'
        })
      })
    },
    closeAddPopup: function() {
      this.showAddPopup = false
      this.newGoods = {
        goods_name: '',
        goods_price: '',
        goods_notes: '',
        goods_sn: '',
        goods_num: '',
        goods_cost: '',
        goods_threshold: '',
        goods_pic: {}
      }
    },
    refreshGoods: function() {
      this.handleScanResult(this.currentGoods.goods_sn)
    }
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 40rpx;
}

.search-bar {
  margin: 20rpx;
  padding: 20rpx 30rpx;
  background: #fff;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.search-icon {
  font-size: 28rpx;
  margin-right: 16rpx;
}

.search-placeholder {
  font-size: 28rpx;
  color: #999;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
  padding: 0 20rpx 30rpx;
}

.action-btn {
  flex: 1;
  background: #fff;
  border-radius: 16rpx;
  padding: 40rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.scan-btn {
  background: linear-gradient(135deg, #28B389, #1fa87e);
}

.scan-btn .btn-text {
  color: #fff;
}

.add-btn {
  background: linear-gradient(135deg, #ff9a56, #ff7f33);
}

.add-btn .btn-text {
  color: #fff;
}

.btn-icon {
  font-size: 48rpx;
  margin-bottom: 12rpx;
}

.btn-text {
  font-size: 28rpx;
  font-weight: 500;
}

.goods-section {
  padding: 0 20rpx;
}

.section-header {
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.quick-actions {
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx 0;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.quick-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quick-icon {
  font-size: 44rpx;
  margin-bottom: 10rpx;
}

.quick-text {
  font-size: 26rpx;
  color: #666;
}

.add-popup-mask {
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

.add-popup-content {
  width: 650rpx;
  max-height: 85vh;
  background: #fff;
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
  flex-shrink: 0;
}

.popup-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.popup-close {
  font-size: 40rpx;
  color: #999;
  line-height: 1;
}

.popup-body {
  flex: 1;
  padding: 20rpx 30rpx;
  max-height: 60vh;
}

.form-item {
  margin-bottom: 30rpx;
}

.form-label {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 12rpx;
  font-weight: 500;
}

.form-input {
  width: 100%;
  height: 80rpx;
  padding: 0 20rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 8rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  background: #fafafa;
}

.popup-footer {
  padding: 20rpx 30rpx 30rpx;
  border-top: 1rpx solid #eee;
  flex-shrink: 0;
}

.btn-confirm {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: #28B389;
  color: #fff;
  border-radius: 44rpx;
  font-size: 30rpx;
}
</style>
