<template>
  <view class="search-box" :style="{ height: BoxHeight }">
    <view class="search-header">
      <view v-if="flag === 0" class="back-btn" @click="goBack">
        <text class="back-icon">←</text>
      </view>
      <view class="search-input-wrap">
        <input
          class="search-input"
          type="text"
          v-model="searchKeyword"
          placeholder="搜索商品名称/条码"
          confirm-type="search"
          @confirm="handleSearch"
        />
        <text v-if="searchKeyword" class="clear-btn" @click="clearSearch">×</text>
      </view>
      <view class="search-btn" @click="handleSearch">搜索</view>
    </view>
    <view class="search-body">
      <view v-if="!goodsList.length && !searched" class="search-history">
        <view v-if="searchHistory.length" class="history-header">
          <text class="history-title">搜索历史</text>
          <text class="clear-history" @click="clearHistory">清空</text>
        </view>
        <view v-if="searchHistory.length" class="history-list">
          <view class="history-item" v-for="(item, index) in searchHistory" :key="index">
            <text class="history-text" @click="useHistory(item)">{{ item }}</text>
            <text class="history-delete" @click="deleteHistory(index)">×</text>
          </view>
        </view>
      </view>
      <scroll-view
        v-else
        class="goods-list-scroll"
        scroll-y
        @scrolltolower="loadMore"
      >
        <view v-if="goodsList.length" class="goods-list">
          <goods-item
            v-for="(item, index) in goodsList"
            :key="item._id"
            :item="item"
            @click="handleGoodsDetail(item)"
          ></goods-item>
        </view>
        <view v-else class="empty-tip">
          <image src="/static/nothing.png" class="empty-img"></image>
          <text class="empty-text">没有找到相关商品</text>
        </view>
        <view v-if="hasMore" class="load-more">
          <text>加载更多...</text>
        </view>
      </scroll-view>
    </view>
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
  name: 'searchBox',
  components: {
    goodsItem,
    goodsPopup
  },
  props: {
    BoxHeight: {
      type: String,
      default: '100vh'
    },
    flag: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      searchKeyword: '',
      goodsList: [],
      pageSize: 10,
      page: 1,
      hasMore: true,
      searched: false,
      showPopup: false,
      currentGoods: {},
      searchHistory: []
    }
  },
  created: function() {
    if (this.flag === 0) {
      this.searchHistory = uni.getStorageSync('searchHistory') || []
    } else {
      this.searchHistory = uni.getStorageSync('addHistory') || []
    }
  },
  methods: {
    addHistory: function(keyword) {
      if (!keyword.trim()) return
      var index = this.searchHistory.indexOf(keyword)
      if (index > -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(keyword)
      if (this.searchHistory.length > 9) {
        this.searchHistory.pop()
      }
      if (this.flag === 0) {
        uni.setStorageSync('searchHistory', this.searchHistory)
      } else {
        uni.setStorageSync('addHistory', this.searchHistory)
      }
    },
    useHistory: function(keyword) {
      this.searchKeyword = keyword
      this.handleSearch()
    },
    deleteHistory: function(index) {
      this.searchHistory.splice(index, 1)
      if (this.flag === 0) {
        uni.setStorageSync('searchHistory', this.searchHistory)
      } else {
        uni.setStorageSync('addHistory', this.searchHistory)
      }
    },
    clearHistory: function() {
      this.searchHistory = []
      if (this.flag === 0) {
        uni.setStorageSync('searchHistory', this.searchHistory)
      } else {
        uni.setStorageSync('addHistory', this.searchHistory)
      }
    },
    goBack: function() {
      uni.navigateBack()
    },
    clearSearch: function() {
      this.searchKeyword = ''
      this.goodsList = []
      this.searched = false
    },
    handleSearch: function() {
      var self = this
      if (!this.searchKeyword.trim()) {
        uni.showToast({
          title: '请输入搜索关键词',
          icon: 'none'
        })
        return
      }
      this.addHistory(this.searchKeyword)
      this.page = 1
      this.hasMore = true
      this.searched = true
      this.searchGoods()
    },
    searchGoods: function() {
      var self = this
      return goodsInfoObj.searchGoods({
        keyword: this.searchKeyword,
        page: this.page,
        pageSize: this.pageSize
      }).then(function(res) {
        if (self.page === 1) {
          self.goodsList = res.data
        } else {
          self.goodsList = self.goodsList.concat(res.data)
        }
        self.hasMore = res.data.length === self.pageSize
      }).catch(function(err) {
        uni.showToast({
          title: '搜索失败',
          icon: 'error'
        })
      })
    },
    loadMore: function() {
      if (!this.hasMore) return
      this.page++
      this.searchGoods()
    },
    handleGoodsDetail: function(goods) {
      if (this.flag === 0) {
        this.currentGoods = goods
        this.showPopup = true
      } else {
        this.$emit('sendGoodsInfo', goods)
      }
    },
    refreshList: function() {
      this.handleSearch()
      this.showPopup = false
    }
  }
}
</script>

<style scoped>
.search-box {
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
}

.search-header {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  gap: 16rpx;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 36rpx;
  color: #333;
}

.search-input-wrap {
  flex: 1;
  position: relative;
}

.search-input {
  width: 100%;
  height: 70rpx;
  padding: 0 60rpx 0 30rpx;
  background: #f5f5f5;
  border-radius: 35rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.clear-btn {
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 40rpx;
  height: 40rpx;
  line-height: 36rpx;
  text-align: center;
  background: #ccc;
  color: #fff;
  border-radius: 50%;
  font-size: 24rpx;
}

.search-btn {
  font-size: 28rpx;
  color: #28B389;
  padding: 0 10rpx;
}

.search-body {
  flex: 1;
  overflow: hidden;
}

.search-history {
  padding: 30rpx;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.history-title {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.clear-history {
  font-size: 24rpx;
  color: #999;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.history-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 30rpx;
  padding: 12rpx 20rpx;
  gap: 10rpx;
}

.history-text {
  font-size: 26rpx;
  color: #666;
}

.history-delete {
  font-size: 24rpx;
  color: #ccc;
}

.goods-list-scroll {
  height: 100%;
  padding: 20rpx;
  box-sizing: border-box;
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
