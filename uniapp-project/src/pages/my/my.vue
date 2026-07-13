<template>
  <view class="my-page">
    <view class="user-card">
      <view class="user-info">
        <image class="avatar" :src="userInfo.avatar || '/static/default-avatar.png'" mode="aspectFill"></image>
        <view class="user-detail">
          <view class="nickname-row">
            <text class="nickname">{{ userInfo.nickname || '本地用户' }}</text>
            <text class="edit-icon" @click="showNicknameInput">✏️</text>
          </view>
          <text class="user-id">ID: {{ userInfo._id || 'local_user' }}</text>
        </view>
      </view>
    </view>
    <view class="menu-section">
      <view class="menu-item" @click="goToList">
        <text class="menu-icon">📋</text>
        <text class="menu-text">全部商品</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="goToAnalysis">
        <text class="menu-icon">📊</text>
        <text class="menu-text">数据分析</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="goToRecord">
        <text class="menu-icon">📝</text>
        <text class="menu-text">出库记录</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>
    <view class="menu-section">
      <view class="menu-item" @click="goToExplanation">
        <text class="menu-icon">📖</text>
        <text class="menu-text">导入说明</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="downloadTemplate">
        <text class="menu-icon">📥</text>
        <text class="menu-text">下载模板</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="checkTip">
        <text class="menu-icon">📥</text>
        <text class="menu-text">导入商品</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="handleExport">
        <text class="menu-icon">📤</text>
        <text class="menu-text">导出商品</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>
    <input type="file" accept=".xlsx,.xls" class="file-input" @change="onFileChange" />
    <view class="import-popup-mask" v-if="showImportPopup" @click="closeImportPopup">
      <view class="import-popup-content" @click.stop>
        <view class="popup-header">
          <text class="popup-title">导入商品</text>
          <text class="popup-close" @click="closeImportPopup">×</text>
        </view>
        <view class="popup-body">
          <view class="file-select-area" @click="selectFile">
            <text class="file-icon">📁</text>
            <text class="file-text">{{ selectedFileName || '点击选择 Excel 文件' }}</text>
            <text class="file-hint">支持 .xlsx 和 .xls 格式</text>
          </view>
        </view>
        <view class="popup-footer">
          <button class="btn-cancel" @click="closeImportPopup">取消</button>
          <button class="btn-confirm" :disabled="!selectedFileName" @click="confirmImport">开始导入</button>
        </view>
      </view>
    </view>
    <view class="menu-section">
      <view class="menu-item" @click="gotoUsemsg">
        <text class="menu-icon">💬</text>
        <text class="menu-text">我的消息</text>
        <view v-if="showMsgFlag" class="msg-badge">新</view>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="showFeedback">
        <text class="menu-icon">📮</text>
        <text class="menu-text">意见反馈</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item" @click="goToPay">
        <text class="menu-icon">❤️</text>
        <text class="menu-text">支持作者</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>
    <view class="menu-section">
      <view class="menu-item danger" @click="delall">
        <text class="menu-icon">🗑️</text>
        <text class="menu-text">清空所有商品</text>
        <text class="menu-arrow">›</text>
      </view>
      <view class="menu-item danger" @click="delAllOutput">
        <text class="menu-icon">🗑️</text>
        <text class="menu-text">清空出库记录</text>
        <text class="menu-arrow">›</text>
      </view>
    </view>
    <view class="nickname-popup-mask" v-if="showNicknamePopup" @click="closeNicknamePopup">
      <view class="nickname-popup-content" @click.stop>
        <view class="popup-header">
          <text class="popup-title">修改昵称</text>
          <text class="popup-close" @click="closeNicknamePopup">×</text>
        </view>
        <view class="popup-body">
          <input class="form-input" type="text" v-model="newNickname" placeholder="请输入新昵称" />
        </view>
        <view class="popup-footer">
          <button class="btn-cancel" @click="closeNicknamePopup">取消</button>
          <button class="btn-confirm" @click="updateNickname">确认</button>
        </view>
      </view>
    </view>
    <view class="feedback-popup-mask" v-if="showFeedbackPopup" @click="closeFeedback">
      <view class="feedback-popup-content" @click.stop>
        <view class="popup-header">
          <text class="popup-title">意见反馈</text>
          <text class="popup-close" @click="closeFeedback">×</text>
        </view>
        <view class="popup-body">
          <textarea class="feedback-textarea" v-model="feedbackContent" placeholder="请输入您的反馈意见..." maxlength="500"></textarea>
        </view>
        <view class="popup-footer">
          <button class="btn-cancel" @click="closeFeedback">取消</button>
          <button class="btn-confirm" @click="submitFeedback">提交</button>
        </view>
      </view>
    </view>
    <view class="confirm-popup-mask" v-if="showConfirmPopup" @click="closeConfirmPopup">
      <view class="confirm-popup-content" @click.stop>
        <view class="popup-header">
          <text class="popup-title">确认删除</text>
          <text class="popup-close" @click="closeConfirmPopup">×</text>
        </view>
        <view class="popup-body">
          <text class="confirm-tip">此操作不可恢复，请输入"DELETE"确认删除：</text>
          <input class="form-input" type="text" v-model="confirmInput" placeholder="请输入 DELETE" />
        </view>
        <view class="popup-footer">
          <button class="btn-cancel" @click="closeConfirmPopup">取消</button>
          <button class="btn-danger" @click="confirmDelete">确认删除</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { delUserGoodsInfo, goodsExportImport, sendMsg, uniIdCo } from '@/utils/cloudObj.js'
import { user } from '@/utils/user.js'

export default {
  data: function() {
    return {
      newNickname: '',
      feedbackContent: '',
      hasShownImportTip: false,
      msgCount: 0,
      showMsgFlag: false,
      nowMsgCount: 0,
      confirmInput: '',
      deleteType: 'goods',
      showNicknamePopup: false,
      showFeedbackPopup: false,
      showConfirmPopup: false,
      showImportPopup: false,
      selectedFileName: '',
      selectedFile: null,
      localUserInfo: {}
    }
  },
  computed: {
    userInfo: function() {
      return this.localUserInfo || user.getInfo() || {}
    },
    hasLogin: function() {
      return user.isLoggedIn()
    }
  },
  onLoad: function() {
    this.initUser()
    this.checkMsg()
    this.hasShownImportTip = uni.getStorageSync('hasShownImportTip') || false
  },
  onShow: function() {
    this.checkMsg()
  },
  methods: {
    initUser: function() {
      if (!user.isLoggedIn()) {
        user.login({
          nickname: '本地用户',
          _id: 'local_user'
        })
      }
      this.localUserInfo = user.getInfo()
    },
    gotoUsemsg: function() {
      uni.setStorageSync('msgCount', this.nowMsgCount)
      this.showMsgFlag = false
      uni.navigateTo({
        url: '/pages/subpack/usermsg/usermsg'
      })
    },
    showNicknameInput: function() {
      this.newNickname = this.userInfo.nickname || '未知'
      this.showNicknamePopup = true
    },
    closeNicknamePopup: function() {
      this.showNicknamePopup = false
    },
    updateNickname: function() {
      var self = this
      if (!this.newNickname.trim()) {
        uni.showToast({
          title: '昵称不能为空',
          icon: 'none'
        })
        return
      }
      var updated = user.updateInfo({ nickname: this.newNickname })
      if (updated) {
        this.localUserInfo = updated
        uni.showToast({
          title: '昵称更新成功',
          icon: 'success'
        })
        this.closeNicknamePopup()
      } else {
        uni.showToast({
          title: '更新失败',
          icon: 'error'
        })
      }
    },
    goToList: function() {
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
    goToExplanation: function() {
      uni.navigateTo({
        url: '/pages/subpack/explanation/explanation'
      })
    },
    goToPay: function() {
      uni.navigateTo({
        url: '/pages/subpack/pay/pay'
      })
    },
    checkTip: function() {
      var self = this
      if (this.hasShownImportTip) {
        this.showImportPopup = true
      } else {
        this.hasShownImportTip = true
        uni.setStorageSync('hasShownImportTip', true)
        uni.showModal({
          title: '温馨提示',
          content: '首次导入请先查看"导入说明"',
          confirmText: '去查看',
          cancelText: '继续导入',
          success: function(res) {
            if (res.confirm) {
              self.goToExplanation()
            } else {
              self.showImportPopup = true
            }
          }
        })
      }
    },
    downloadTemplate: function() {
      var self = this
      uni.showLoading({
        title: '下载中...'
      })
      goodsExportImport.downloadTemplate().then(function(res) {
        uni.hideLoading()
        if (res.code === 200) {
          uni.showToast({
            title: '模板下载成功',
            icon: 'success'
          })
        } else {
          uni.showToast({
            title: res.msg || '下载失败',
            icon: 'none'
          })
        }
      }).catch(function() {
        uni.hideLoading()
        uni.showToast({
          title: '下载失败',
          icon: 'error'
        })
      })
    },
    selectFile: function() {
      document.querySelector('.file-input').click()
    },
    onFileChange: function(event) {
      var file = event.target.files[0]
      if (!file) return
      var ext = file.name.split('.').pop().toLowerCase()
      if (ext !== 'xlsx' && ext !== 'xls') {
        uni.showToast({
          title: '请选择 Excel 文件',
          icon: 'none'
        })
        return
      }
      this.selectedFile = file
      this.selectedFileName = file.name
    },
    closeImportPopup: function() {
      this.showImportPopup = false
      this.selectedFile = null
      this.selectedFileName = ''
      var input = document.querySelector('.file-input')
      if (input) input.value = ''
    },
    confirmImport: function() {
      var self = this
      if (!this.selectedFile) return
      uni.showLoading({
        title: '导入中...'
      })
      goodsExportImport.importFromExcel(this.selectedFile).then(function(res) {
        uni.hideLoading()
        if (res.code === 200) {
          uni.showModal({
            title: '导入成功',
            content: '新增 ' + res.inserted + ' 条，更新 ' + res.updated + ' 条',
            showCancel: false,
            confirmText: '好的',
            success: function() {
              self.closeImportPopup()
            }
          })
        } else {
          uni.showToast({
            title: res.msg || '导入失败',
            icon: 'none'
          })
        }
      }).catch(function() {
        uni.hideLoading()
        uni.showToast({
          title: '导入失败',
          icon: 'error'
        })
      })
    },
    handleExport: function() {
      var self = this
      uni.showLoading({
        title: '导出中...'
      })
      goodsExportImport.exportToExcel().then(function(res) {
        uni.hideLoading()
        if (res.code === 200) {
          uni.showModal({
            title: '导出成功',
            content: '共导出 ' + res.data.length + ' 条商品数据',
            showCancel: false,
            confirmText: '好的'
          })
        } else {
          uni.showToast({
            title: res.msg || '导出失败',
            icon: 'none'
          })
        }
      }).catch(function() {
        uni.hideLoading()
        uni.showToast({
          title: '导出失败',
          icon: 'error'
        })
      })
    },
    showFeedback: function() {
      this.feedbackContent = ''
      this.showFeedbackPopup = true
    },
    closeFeedback: function() {
      this.showFeedbackPopup = false
    },
    submitFeedback: function() {
      if (!this.feedbackContent.trim()) {
        uni.showToast({
          title: '请输入反馈内容',
          icon: 'none'
        })
        return
      }
      uni.showToast({
        title: '反馈已提交，感谢您的建议！',
        icon: 'success'
      })
      this.closeFeedback()
    },
    checkMsg: function() {
      var self = this
      sendMsg.getMsgCount().then(function(res) {
        if (res.code === 0) {
          self.nowMsgCount = res.data.count
          var lastCount = uni.getStorageSync('msgCount') || 0
          if (lastCount < self.nowMsgCount) {
            self.showMsgFlag = true
          } else if (lastCount > self.nowMsgCount) {
            uni.setStorageSync('msgCount', self.nowMsgCount)
          }
        }
      })
    },
    delall: function() {
      this.deleteType = 'goods'
      this.confirmInput = ''
      this.showConfirmPopup = true
    },
    delAllOutput: function() {
      this.deleteType = 'output'
      this.confirmInput = ''
      this.showConfirmPopup = true
    },
    closeConfirmPopup: function() {
      this.showConfirmPopup = false
      this.confirmInput = ''
    },
    confirmDelete: function() {
      var self = this
      if (!this.confirmInput) {
        uni.showToast({
          title: '请输入验证信息',
          icon: 'none'
        })
        return
      }
      if (this.confirmInput !== 'DELETE') {
        uni.showToast({
          title: '验证失败，请输入 DELETE',
          icon: 'none'
        })
        return
      }
      var action = null
      if (this.deleteType === 'goods') {
        action = delUserGoodsInfo.delAllInfo()
      } else {
        action = delUserGoodsInfo.delAllOutputHistory()
      }
      action.then(function(res) {
        if (res.code === 0) {
          self.closeConfirmPopup()
          uni.showToast({
            title: '删除成功',
            icon: 'success'
          })
        } else {
          uni.showToast({
            title: '删除失败',
            icon: 'none'
          })
        }
      }).catch(function() {
        uni.showToast({
          title: '删除失败',
          icon: 'none'
        })
      })
    }
  }
}
</script>

<style scoped>
.my-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 40rpx;
}

.file-input {
  display: none;
}

.user-card {
  background: linear-gradient(135deg, #28B389, #1fa87e);
  padding: 60rpx 30rpx 40rpx;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
  background: #fff;
}

.user-detail {
  flex: 1;
  margin-left: 24rpx;
}

.nickname-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 10rpx;
}

.nickname {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
}

.edit-icon {
  font-size: 28rpx;
}

.user-id {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
}

.menu-section {
  background: #fff;
  margin: 20rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 28rpx 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-icon {
  font-size: 36rpx;
  margin-right: 20rpx;
}

.menu-text {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.menu-arrow {
  font-size: 32rpx;
  color: #ccc;
}

.menu-item.danger .menu-text {
  color: #ff6b6b;
}

.msg-badge {
  background: #ff6b6b;
  color: #fff;
  font-size: 20rpx;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  margin-right: 10rpx;
}

.nickname-popup-mask,
.feedback-popup-mask,
.confirm-popup-mask {
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

.nickname-popup-content,
.feedback-popup-content,
.confirm-popup-content {
  width: 600rpx;
  background: #fff;
  border-radius: 16rpx;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
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
  padding: 30rpx;
}

.confirm-tip {
  display: block;
  font-size: 26rpx;
  color: #666;
  margin-bottom: 20rpx;
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

.feedback-textarea {
  width: 100%;
  height: 200rpx;
  padding: 20rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 8rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  background: #fafafa;
}

.popup-footer {
  display: flex;
  gap: 20rpx;
  padding: 20rpx 30rpx 30rpx;
  border-top: 1rpx solid #eee;
}

.btn-cancel,
.btn-confirm,
.btn-danger {
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

.btn-danger {
  background: #ff6b6b;
  color: #fff;
}

.import-popup-mask {
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

.import-popup-content {
  width: 600rpx;
  background: #fff;
  border-radius: 16rpx;
}

.file-select-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 30rpx;
  border: 2rpx dashed #ddd;
  border-radius: 12rpx;
  background: #fafafa;
}

.file-icon {
  font-size: 64rpx;
  margin-bottom: 20rpx;
}

.file-text {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.file-hint {
  font-size: 24rpx;
  color: #999;
}
</style>
