<template>
  <view class="goods-popup-mask" v-if="show" @click="cancel">
    <view class="goods-popup-content" @click.stop>
      <view class="popup-header">
        <text class="popup-title">{{ isEditing ? '编辑商品' : '商品详情' }}</text>
        <text class="popup-close" @click="cancel">×</text>
      </view>
      <scroll-view class="popup-body" scroll-y>
        <view class="form-item">
          <text class="form-label">商品名称</text>
          <input v-if="isEditing" class="form-input" type="text" v-model="localGoods.goods_name" placeholder="请输入商品名称" />
          <text v-else class="form-text">{{ localGoods.goods_name }}</text>
        </view>
        <view class="form-item">
          <text class="form-label">商品条码</text>
          <input v-if="isEditing" class="form-input" type="text" v-model="localGoods.goods_sn" placeholder="请输入商品条码" />
          <text v-else class="form-text">{{ localGoods.goods_sn || '未添加' }}</text>
        </view>
        <view class="form-item">
          <text class="form-label">售价</text>
          <input v-if="isEditing" class="form-input" type="digit" v-model="localGoods.goods_price" placeholder="请输入售价" />
          <text v-else class="form-text">¥{{ localGoods.goods_price }}</text>
        </view>
        <view class="form-item">
          <text class="form-label">成本</text>
          <input v-if="isEditing" class="form-input" type="digit" v-model="localGoods.goods_cost" placeholder="请输入成本（选填）" />
          <text v-else class="form-text">{{ localGoods.goods_cost !== '' && localGoods.goods_cost != null ? '¥' + localGoods.goods_cost : '未设置' }}</text>
        </view>
        <view class="form-item">
          <text class="form-label">库存数量</text>
          <input v-if="isEditing" class="form-input" type="number" v-model="localGoods.goods_num" placeholder="请输入库存数量（选填）" />
          <text v-else class="form-text">{{ localGoods.goods_num === '' || localGoods.goods_num == null ? '未添加' : localGoods.goods_num }}</text>
        </view>
        <view class="form-item">
          <text class="form-label">缺货提醒阈值</text>
          <input v-if="isEditing" class="form-input" type="number" v-model="localGoods.goods_threshold" placeholder="低于此数量提醒（选填）" />
          <text v-else class="form-text">{{ localGoods.goods_threshold || '未设置' }}</text>
        </view>
        <view class="form-item">
          <text class="form-label">备注</text>
          <input v-if="isEditing" class="form-input" type="text" v-model="localGoods.goods_notes" placeholder="请输入备注（选填）" />
          <text v-else class="form-text">{{ localGoods.goods_notes || '无' }}</text>
        </view>
        <view class="form-item">
          <text class="form-label">商品图片</text>
          <update-image
            v-if="isEditing"
            ref="updateImageRef"
            :imageObj="localGoods.goods_pic"
            :delFlag="true"
            @uploadPic="uploadPic"
            @uploadStatusChange="handleUploadStatusChange"
          ></update-image>
          <view v-else class="image-preview">
            <image v-if="localGoods.goods_pic && localGoods.goods_pic.imgUrl" :src="localGoods.goods_pic.imgUrl" mode="aspectFill" class="preview-img" @click="previewImage(localGoods.goods_pic.imgUrl)"></image>
            <text v-else class="no-image">暂无图片</text>
          </view>
        </view>
      </scroll-view>
      <view class="popup-footer">
        <template v-if="!isEditing">
          <button class="btn-edit" @click="handleEdit">编辑</button>
          <button class="btn-delete" @click="handleDelete">删除</button>
        </template>
        <template v-else>
          <button class="btn-cancel" @click="handleCancel">取消</button>
          <button class="btn-confirm" @click="handleConfirm">保存</button>
        </template>
      </view>
    </view>
  </view>
</template>

<script>
import { goodsInfoObj } from '@/utils/cloudObj.js'
import updateImage from '@/components/updateImage/updateImage.vue'

export default {
  name: 'goods-popup',
  components: {
    updateImage
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    goods: {
      type: Object,
      default: function() {
        return {}
      }
    },
    sacnFlag: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      isEditing: false,
      localGoods: {},
      isUploading: false
    }
  },
  watch: {
    goods: {
      handler: function(val) {
        this.localGoods = JSON.parse(JSON.stringify(val))
      },
      immediate: true
    },
    show: function(val) {
      if (!val) {
        this.isEditing = false
      }
    }
  },
  methods: {
    uploadPic: function(imgObj) {
      this.localGoods.goods_pic = imgObj
    },
    handleUploadStatusChange: function(status) {
      this.isUploading = status
    },
    previewImage: function(url) {
      uni.previewImage({
        urls: [url],
        current: 0
      })
    },
    cancel: function() {
      this.isEditing = false
      this.$emit('update:show', false)
    },
    handleEdit: function() {
      this.isEditing = true
    },
    handleCancel: function() {
      this.isEditing = false
      this.localGoods = JSON.parse(JSON.stringify(this.goods))
    },
    handleConfirm: function() {
      var self = this
      if (this.isUploading) {
        uni.showToast({
          title: '等待图片上传完成',
          icon: 'none'
        })
        return
      }
      if (this.localGoods.goods_name === '') {
        uni.showToast({
          title: '名称必填',
          icon: 'none'
        })
        return
      }
      var price = parseFloat(this.localGoods.goods_price)
      if (isNaN(price) || price < 0) {
        uni.showToast({
          title: '价格要求为数字且大于等于0',
          icon: 'none'
        })
        return
      }
      this.localGoods.goods_price = price
      if (this.localGoods.goods_cost !== '') {
        var cost = parseFloat(this.localGoods.goods_cost)
        if (isNaN(cost) || cost < 0) {
          uni.showToast({
            title: '成本要求为数字且大于等于0',
            icon: 'none'
          })
          return
        }
        this.localGoods.goods_cost = cost
        if (cost > price) {
          uni.showToast({
            title: '成本不可以大于售价',
            icon: 'none'
          })
          return
        }
      }
      if (this.localGoods.goods_num !== '') {
        this.localGoods.goods_num = parseInt(this.localGoods.goods_num)
      }
      if (this.localGoods.goods_threshold !== '') {
        this.localGoods.goods_threshold = parseInt(this.localGoods.goods_threshold)
      }
      goodsInfoObj.updateGoods(this.localGoods).then(function(res) {
        if (res.code === 0) {
          self.isEditing = false
          self.$emit('refresh')
          uni.showToast({
            title: '保存成功',
            icon: 'success'
          })
        } else {
          uni.showToast({
            title: '更新失败',
            icon: 'error'
          })
        }
      }).catch(function(err) {
        console.log(err)
        uni.showToast({
          title: '更新失败',
          icon: 'error'
        })
      })
    },
    handleDelete: function() {
      var self = this
      uni.showModal({
        title: '提示',
        content: '确定要删除该商品吗？',
        success: function(res) {
          if (res.confirm) {
            goodsInfoObj.removeGoods({
              id: self.goods._id
            }).then(function(result) {
              if (result.code === 0) {
                uni.showToast({
                  title: '删除成功',
                  icon: 'success'
                })
                self.cancel()
                if (!self.sacnFlag) {
                  self.$emit('refresh')
                }
              } else {
                uni.showToast({
                  title: '删除失败',
                  icon: 'error'
                })
              }
            }).catch(function(err) {
              uni.showToast({
                title: '删除失败',
                icon: 'error'
              })
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.goods-popup-mask {
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

.goods-popup-content {
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

.form-text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.image-preview {
  display: flex;
  align-items: center;
}

.preview-img {
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
  background: #f5f5f5;
}

.no-image {
  font-size: 26rpx;
  color: #999;
}

.popup-footer {
  display: flex;
  gap: 20rpx;
  padding: 20rpx 30rpx 30rpx;
  border-top: 1rpx solid #eee;
  flex-shrink: 0;
}

.btn-edit,
.btn-delete,
.btn-cancel,
.btn-confirm {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
}

.btn-edit {
  background: #28B389;
  color: #fff;
}

.btn-delete {
  background: #ff6b6b;
  color: #fff;
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
