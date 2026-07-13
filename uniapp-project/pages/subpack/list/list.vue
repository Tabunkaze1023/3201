<template>
  <view class="list-page">
    <view class="tab-bar">
      <view
        class="tab-item"
        :class="{ active: current === 0 }"
        @click="switchTab(0)"
      >
        <text>库存充足</text>
      </view>
      <view
        class="tab-item"
        :class="{ active: current === 1 }"
        @click="switchTab(1)"
      >
        <text>库存不足</text>
      </view>
    </view>
    <view class="list-header">
      <text class="list-count">共 {{ current === 0 ? enoughGoodsList.length : stockGoodsList.length }} 件</text>
      <view class="header-actions">
        <text v-if="!isDeleteMode" class="action-btn" @click="enterDeleteMode">批量删除</text>
        <template v-else>
          <text class="action-btn" @click="cancelDelete">取消</text>
          <text class="action-btn danger" @click="confirmDelete">删除({{ selectedItems.length }})</text>
        </template>
      </view>
    </view>
    <scroll-view
      class="goods-scroll"
      scroll-y
      @scrolltolower="loadMore"
      @pullingdown="onPullDownRefresh"
    >
      <view v-if="currentList.length" class="goods-list">
        <goods-item
          v-for="item in currentList"
          :key="item._id"
          :item="item"
          :selected="selectedItems.indexOf(item._id) > -1"
          :deleteMode="isDeleteMode"
          @click="handleItemClick(item)"
          @longpress="handleLongPress"
        ></goods-item>
      </view>
      <view v-else class="empty-tip">
        <image src="/static/nothing.png" class="empty-img"></image>
        <text class="empty-text">暂无商品</text>
      </view>
      <view v-if="hasMore" class="load-more">
        <text>加载更多...</text>
      </view>
    </scroll-view>
    <goods-popup
      ref="goodsPopup"
      :show.sync="showPopup"
      :goods="currentGoods"
      @refresh="refreshList"
    ></goods-popup>
  </view>
</template>

<script>
import { goodsInfoObj } from '@/utils/cloudObj.js'
import goodsItem from '@/components/goods-item/goods-item.vue'
import goodsPopup from '@/components/goods-popup/goods-popup.vue'

export default {
  components: {
    goodsItem,
    goodsPopup
  },
  data: function() {
    return {
      isDeleteMode: false,
      selectedItems: [],
      enoughGoodsList: [],
      stockGoodsList: [],
      enoughPage: 1,
      enoughPageSize: 20,
      stockPage: 1,
      stockPageSize: 20,
      isEnoughNoMore: false,
      isStockNoMore: false,
      showPopup: false,
      currentGoods: {},
      current: 0,
      hasShownDeleteTip: false
    }
  },
  computed: {
    currentList: function() {
      return this.current === 0 ? this.enoughGoodsList : this.stockGoodsList
    },
    hasMore: function() {
      return this.current === 0 ? !this.isEnoughNoMore : !this.isStockNoMore
    }
  },
  onLoad: function() {
    this.checkTip()
  },
  onShow: function() {
    this.onEnoughRefresh()
    this.onStockRefresh()
  },
  onPullDownRefresh: function() {
    if (this.current === 0) {
      this.onEnoughRefresh()
    } else {
      this.onStockRefresh()
    }
    uni.stopPullDownRefresh()
  },
  methods: {
    checkTip: function() {
      var self = this
      this.hasShownDeleteTip = uni.getStorageSync('hasShownDeleteTip') || false
      if (!this.hasShownDeleteTip) {
        uni.showModal({
          title: '提示',
          content: '长按商品可进入批量删除模式，可同时删除多个商品',
          showCancel: false,
          confirmText: '知道了',
          success: function() {
            self.hasShownDeleteTip = true
            uni.setStorageSync('hasShownDeleteTip', true)
          }
        })
      }
    },
    switchTab: function(index) {
      this.current = index
      this.isDeleteMode = false
      this.selectedItems = []
    },
    enterDeleteMode: function() {
      this.isDeleteMode = true
    },
    handleLongPress: function() {
      if (!this.isDeleteMode) {
        this.isDeleteMode = true
      }
    },
    handleItemClick: function(item) {
      if (this.isDeleteMode) {
        var idx = this.selectedItems.indexOf(item._id)
        if (idx === -1) {
          this.selectedItems.push(item._id)
        } else {
          this.selectedItems.splice(idx, 1)
        }
      } else {
        this.showGoodsDetail(item)
      }
    },
    cancelDelete: function() {
      this.isDeleteMode = false
      this.selectedItems = []
    },
    confirmDelete: function() {
      var self = this
      if (this.selectedItems.length === 0) {
        uni.showToast({
          title: '请选择要删除的商品',
          icon: 'none'
        })
        return
      }
      uni.showModal({
        title: '确认删除',
        content: '确定要删除选中的 ' + this.selectedItems.length + ' 件商品吗？',
        success: function(res) {
          if (res.confirm) {
            var promises = self.selectedItems.map(function(id) {
              return goodsInfoObj.removeGoods({ id: id })
            })
            Promise.all(promises).then(function() {
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              })
              self.isDeleteMode = false
              self.selectedItems = []
              self.onEnoughRefresh()
              self.onStockRefresh()
            }).catch(function() {
              uni.showToast({
                title: '删除失败',
                icon: 'error'
              })
            })
          }
        }
      })
    },
    showGoodsDetail: function(goods) {
      this.currentGoods = goods
      this.showPopup = true
    },
    onEnoughRefresh: function() {
      var self = this
      this.enoughPage = 1
      this.isEnoughNoMore = false
      goodsInfoObj.getEnoughGoodsList({
        page: this.enoughPage,
        pageSize: this.enoughPageSize
      }).then(function(res) {
        if (res.code === 0) {
          self.enoughGoodsList = res.data || []
          if (res.data.length < self.enoughPageSize) {
            self.isEnoughNoMore = true
          }
        }
      })
    },
    onStockRefresh: function() {
      var self = this
      this.stockPage = 1
      this.isStockNoMore = false
      goodsInfoObj.getStockGoodsList({
        page: this.stockPage,
        pageSize: this.stockPageSize
      }).then(function(res) {
        if (res.code === 0) {
          self.stockGoodsList = res.data || []
          if (res.data.length < self.stockPageSize) {
            self.isStockNoMore = true
          }
        }
      })
    },
    loadMore: function() {
      var self = this
      if (this.current === 0) {
        if (this.isEnoughNoMore) return
        this.enoughPage++
        goodsInfoObj.getEnoughGoodsList({
          page: this.enoughPage,
          pageSize: this.enoughPageSize
        }).then(function(res) {
          if (res.code === 0) {
            self.enoughGoodsList = self.enoughGoodsList.concat(res.data || [])
            if (res.data.length < self.enoughPageSize) {
              self.isEnoughNoMore = true
            }
          }
        })
      } else {
        if (this.isStockNoMore) return
        this.stockPage++
        goodsInfoObj.getStockGoodsList({
          page: this.stockPage,
          pageSize: this.stockPageSize
        }).then(function(res) {
          if (res.code === 0) {
            self.stockGoodsList = self.stockGoodsList.concat(res.data || [])
            if (res.data.length < self.stockPageSize) {
              self.isStockNoMore = true
            }
          }
        })
      }
    },
    refreshList: function() {
      this.showPopup = false
      this.onEnoughRefresh()
      this.onStockRefresh()
    }
  }
}
</script>

<style scoped>
.list-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
}

.tab-bar {
  display: flex;
  background: #fff;
  border-bottom: 1rpx solid #eee;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 24rpx 0;
  font-size: 28rpx;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #28B389;
  font-weight: 500;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60rpx;
  height: 4rpx;
  background: #28B389;
  border-radius: 2rpx;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  background: #fff;
  border-bottom: 1rpx solid #f5f5f5;
}

.list-count {
  font-size: 26rpx;
  color: #999;
}

.header-actions {
  display: flex;
  gap: 30rpx;
}

.action-btn {
  font-size: 26rpx;
  color: #28B389;
}

.action-btn.danger {
  color: #ff6b6b;
}

.goods-scroll {
  flex: 1;
  padding: 20rpx;
}

.goods-list {
  padding-bottom: 20rpx;
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

.load-more {
  text-align: center;
  padding: 30rpx;
  font-size: 26rpx;
  color: #999;
}
</style>
