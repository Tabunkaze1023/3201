<template>
  <view class="update-image">
    <view v-if="NewImgObj.imgUrl" class="image-wrap">
      <image :src="NewImgObj.imgUrl" mode="aspectFill" class="goods-image" @click="previewImage"></image>
      <view v-if="delFlag" class="delete-btn" @click="deleteImage">
        <text class="delete-icon">×</text>
      </view>
    </view>
    <view v-else class="upload-btn" @click="chooseImage">
      <view v-if="uploading" class="uploading">
        <text class="loading-icon">⟳</text>
        <text class="uploading-text">上传中...</text>
      </view>
      <view v-else class="add-icon">
        <text class="plus">+</text>
        <text class="add-text">添加图片</text>
      </view>
    </view>
  </view>
</template>

<script>
import { delPic } from '@/utils/cloudObj.js'

export default {
  name: 'updateImage',
  props: {
    imageObj: {
      type: Object,
      default: function() {
        return {}
      }
    },
    delFlag: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      uploading: false,
      NewImgObj: {}
    }
  },
  watch: {
    imageObj: {
      handler: function(val) {
        this.NewImgObj = JSON.parse(JSON.stringify(val))
      },
      immediate: true
    }
  },
  methods: {
    resetImage: function() {
      this.NewImgObj = {
        imgUrl: '',
        fileID: ''
      }
    },
    chooseImage: function() {
      var self = this
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          var tempPath = res.tempFilePaths[0]
          self.compressImage(tempPath).then(function(compressedPath) {
            self.uploadImage(compressedPath)
          })
        },
        fail: function(err) {
          console.error('选择图片失败', err)
        }
      })
    },
    compressImage: function(filePath) {
      var self = this
      return new Promise(function(resolve) {
        uni.getFileInfo({
          filePath: filePath,
          success: function(res) {
            if (res.size <= 51200) {
              resolve(filePath)
              return
            }
            var quality = 80
            var resultPath = filePath
            function doCompress() {
              uni.compressImage({
                src: filePath,
                quality: quality,
                compressedWidth: 210,
                success: function(compressRes) {
                  resultPath = compressRes.tempFilePath
                  uni.getFileInfo({
                    filePath: resultPath,
                    success: function(infoRes) {
                      if (infoRes.size <= 51200 || quality === 10) {
                        resolve(resultPath)
                      } else {
                        quality = Math.max(quality - 10, 10)
                        doCompress()
                      }
                    },
                    fail: function() {
                      resolve(resultPath)
                    }
                  })
                },
                fail: function() {
                  resolve(filePath)
                }
              })
            }
            doCompress()
          },
          fail: function() {
            resolve(filePath)
          }
        })
      })
    },
    uploadImage: function(filePath) {
      var self = this
      this.uploading = true
      this.$emit('uploadStatusChange', true)
      var reader = new FileReader()
      uni.getFileSystemManager().readFile({
        filePath: filePath,
        encoding: 'base64',
        success: function(res) {
          var base64Data = 'data:image/jpeg;base64,' + res.data
          self.NewImgObj = {
            fileID: 'local_' + Date.now(),
            imgUrl: base64Data
          }
          self.$emit('uploadPic', self.NewImgObj)
          self.uploading = false
          self.$emit('uploadStatusChange', false)
        },
        fail: function() {
          self.NewImgObj = {
            fileID: 'local_' + Date.now(),
            imgUrl: filePath
          }
          self.$emit('uploadPic', self.NewImgObj)
          self.uploading = false
          self.$emit('uploadStatusChange', false)
        }
      })
    },
    deleteImage: function() {
      if (this.delFlag && this.NewImgObj.fileID) {
        delPic.delfile([this.NewImgObj.fileID])
      }
      this.NewImgObj = {
        imgUrl: '',
        fileID: ''
      }
      this.$emit('uploadPic', this.NewImgObj)
    },
    previewImage: function() {
      uni.previewImage({
        urls: [this.NewImgObj.imgUrl],
        current: 0
      })
    }
  }
}
</script>

<style scoped>
.update-image {
  display: inline-block;
}

.image-wrap {
  position: relative;
  display: inline-block;
}

.goods-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
  background: #f5f5f5;
}

.delete-btn {
  position: absolute;
  top: -16rpx;
  right: -16rpx;
  width: 40rpx;
  height: 40rpx;
  background: #ff6b6b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-icon {
  color: #fff;
  font-size: 28rpx;
  line-height: 1;
}

.upload-btn {
  width: 200rpx;
  height: 200rpx;
  border: 2rpx dashed #ddd;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
}

.uploading {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-icon {
  font-size: 40rpx;
  color: #28B389;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.uploading-text {
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
}

.add-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.plus {
  font-size: 60rpx;
  color: #ccc;
  line-height: 1;
}

.add-text {
  font-size: 24rpx;
  color: #999;
  margin-top: 8rpx;
}
</style>
