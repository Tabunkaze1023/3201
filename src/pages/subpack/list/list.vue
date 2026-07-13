<template>
  <view class="page">
    <view class="search-bar">
      <view class="search-input-wrap">
        <text class="search-icon">🔍</text>
        <input 
          class="search-input" 
          v-model="searchText" 
          placeholder="搜索商品"
          @input="handleSearch"
        />
      </view>
      <view class="add-btn" @click="showAddModal = true">
        <text>+</text>
      </view>
    </view>

    <view class="category-bar">
      <scroll-view scroll-x class="category-scroll">
        <view class="category-items">
          <view 
            class="category-item" 
            :class="{ active: activeCategory === item }"
            v-for="item in categories" 
            :key="item"
            @click="activeCategory = item; handleSearch()"
          >
            {{ item }}
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="goods-list">
      <view class="goods-item" v-for="goods in filteredGoods" :key="goods.id">
        <image class="goods-image" :src="goods.goodsImage" mode="aspectFill" />
        <view class="goods-info">
          <text class="goods-name">{{ goods.goodsName }}</text>
          <text class="goods-spec">{{ goods.goodsSpec }}</text>
          <view class="goods-meta">
            <text class="goods-code">{{ goods.goodsCode }}</text>
            <text class="goods-type">{{ goods.goodsType }}</text>
          </view>
          <view class="goods-bottom">
            <text class="goods-price">¥{{ goods.goodsPrice }}</text>
            <text class="goods-stock" :class="{ low: goods.goodsStock < 10 }">库存: {{ goods.goodsStock }}{{ goods.goodsUnit }}</text>
          </view>
        </view>
        <view class="goods-actions">
          <view class="action-btn edit" @click="editGoods(goods)">
            <text>✏️</text>
          </view>
          <view class="action-btn delete" @click="deleteGoods(goods.id)">
            <text>🗑️</text>
          </view>
        </view>
      </view>
      <view class="empty-tip" v-if="filteredGoods.length === 0">
        <text>暂无商品</text>
      </view>
    </view>

    <view class="add-modal" v-if="showAddModal" @click="showAddModal = false">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-title">{{ isEdit ? '编辑商品' : '添加商品' }}</text>
          <text class="modal-close" @click="showAddModal = false">✕</text>
        </view>
        <scroll-view scroll-y class="modal-body">
          <view class="form-item">
            <text class="form-label">商品名称 *</text>
            <input class="form-input" v-model="formData.goodsName" placeholder="请输入商品名称" />
          </view>
          <view class="form-item">
            <text class="form-label">商品类型</text>
            <input class="form-input" v-model="formData.goodsType" placeholder="请输入商品类型" />
          </view>
          <view class="form-item">
            <text class="form-label">商品编码</text>
            <input class="form-input" v-model="formData.goodsCode" placeholder="请输入商品编码" />
          </view>
          <view class="form-item">
            <text class="form-label">商品条码</text>
            <input class="form-input" v-model="formData.goodsBarcode" placeholder="请输入商品条码" />
          </view>
          <view class="form-item">
            <text class="form-label">商品规格</text>
            <input class="form-input" v-model="formData.goodsSpec" placeholder="请输入商品规格" />
          </view>
          <view class="form-item">
            <text class="form-label">商品单位</text>
            <input class="form-input" v-model="formData.goodsUnit" placeholder="如：台、个、副" />
          </view>
          <view class="form-item">
            <text class="form-label">销售价格 *</text>
            <input class="form-input" type="digit" v-model="formData.goodsPrice" placeholder="请输入销售价格" />
          </view>
          <view class="form-item">
            <text class="form-label">成本价格</text>
            <input class="form-input" type="digit" v-model="formData.goodsCost" placeholder="请输入成本价格" />
          </view>
          <view class="form-item">
            <text class="form-label">库存数量 *</text>
            <input class="form-input" type="number" v-model="formData.goodsStock" placeholder="请输入库存数量" />
          </view>
        </scroll-view>
        <view class="modal-footer">
          <view class="submit-btn" @click="submitForm">
            <text>{{ isEdit ? '保存修改' : '添加商品' }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { storage } from '@/utils/storage'
import { mockGoods, generateId, formatDate } from '@/utils/mock'
import type { Goods } from '@/types'

const goodsList = ref<Goods[]>([])
const searchText = ref('')
const activeCategory = ref('全部')
const showAddModal = ref(false)
const isEdit = ref(false)

const categories = ['全部', '手机数码', '电脑办公', '音频设备', '平板设备', '电脑配件']

const formData = reactive({
  id: '',
  goodsName: '',
  goodsType: '',
  goodsCode: '',
  goodsBarcode: '',
  goodsSpec: '',
  goodsUnit: '',
  goodsPrice: '',
  goodsCost: '',
  goodsStock: ''
})

const filteredGoods = computed(() => {
  let result = goodsList.value
  
  if (activeCategory.value !== '全部') {
    result = result.filter(g => g.goodsType === activeCategory.value)
  }
  
  if (searchText.value) {
    const keyword = searchText.value.toLowerCase()
    result = result.filter(g => 
      g.goodsName.toLowerCase().includes(keyword) ||
      g.goodsCode.toLowerCase().includes(keyword) ||
      g.goodsBarcode.includes(keyword)
    )
  }
  
  return result
})

onMounted(() => {
  loadGoods()
})

function loadGoods() {
  let goods = storage.getGoods()
  if (goods.length === 0) {
    storage.setGoods(mockGoods)
    goods = mockGoods
  }
  goodsList.value = goods
}

function handleSearch() {}

function resetForm() {
  formData.id = ''
  formData.goodsName = ''
  formData.goodsType = ''
  formData.goodsCode = ''
  formData.goodsBarcode = ''
  formData.goodsSpec = ''
  formData.goodsUnit = ''
  formData.goodsPrice = ''
  formData.goodsCost = ''
  formData.goodsStock = ''
}

function editGoods(goods: Goods) {
  isEdit.value = true
  formData.id = goods.id
  formData.goodsName = goods.goodsName
  formData.goodsType = goods.goodsType
  formData.goodsCode = goods.goodsCode
  formData.goodsBarcode = goods.goodsBarcode
  formData.goodsSpec = goods.goodsSpec
  formData.goodsUnit = goods.goodsUnit
  formData.goodsPrice = goods.goodsPrice.toString()
  formData.goodsCost = goods.goodsCost.toString()
  formData.goodsStock = goods.goodsStock.toString()
  showAddModal.value = true
}

function deleteGoods(id: string) {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除该商品吗？',
    confirmColor: '#FF5722',
    success: (res) => {
      if (res.confirm) {
        storage.deleteGoods(id)
        loadGoods()
        uni.showToast({ title: '删除成功', icon: 'success' })
      }
    }
  })
}

function submitForm() {
  if (!formData.goodsName || !formData.goodsPrice || !formData.goodsStock) {
    uni.showToast({ title: '请填写必填项', icon: 'none' })
    return
  }

  const now = formatDate(new Date())
  
  if (isEdit.value) {
    const goods: Goods = {
      id: formData.id,
      goodsName: formData.goodsName,
      goodsType: formData.goodsType || '其他',
      goodsCode: formData.goodsCode,
      goodsBarcode: formData.goodsBarcode,
      goodsSpec: formData.goodsSpec,
      goodsUnit: formData.goodsUnit || '个',
      goodsPrice: parseFloat(formData.goodsPrice),
      goodsCost: parseFloat(formData.goodsCost) || 0,
      goodsStock: parseInt(formData.goodsStock),
      goodsImage: '',
      goodsDesc: '',
      createTime: now,
      updateTime: now
    }
    storage.updateGoods(goods)
    uni.showToast({ title: '修改成功', icon: 'success' })
  } else {
    const goods: Goods = {
      id: generateId(),
      goodsName: formData.goodsName,
      goodsType: formData.goodsType || '其他',
      goodsCode: formData.goodsCode,
      goodsBarcode: formData.goodsBarcode,
      goodsSpec: formData.goodsSpec,
      goodsUnit: formData.goodsUnit || '个',
      goodsPrice: parseFloat(formData.goodsPrice),
      goodsCost: parseFloat(formData.goodsCost) || 0,
      goodsStock: parseInt(formData.goodsStock),
      goodsImage: '',
      goodsDesc: '',
      createTime: now,
      updateTime: now
    }
    storage.addGoods(goods)
    uni.showToast({ title: '添加成功', icon: 'success' })
  }

  showAddModal.value = false
  resetForm()
  loadGoods()
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #F5F5F5;
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;
}

.search-input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #F5F5F5;
  border-radius: 40rpx;
  padding: 16rpx 24rpx;
}

.search-icon {
  font-size: 32rpx;
  margin-right: 12rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
}

.add-btn {
  width: 72rpx;
  height: 72rpx;
  background-color: #28B389;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20rpx;
  
  text {
    font-size: 48rpx;
    color: #fff;
    line-height: 1;
  }
}

.category-bar {
  background-color: #fff;
  padding: 16rpx 0;
}

.category-scroll {
  white-space: nowrap;
}

.category-items {
  display: inline-flex;
  padding: 0 20rpx;
}

.category-item {
  padding: 12rpx 28rpx;
  margin-right: 16rpx;
  border-radius: 24rpx;
  font-size: 26rpx;
  color: #666;
  background-color: #F5F5F5;
  
  &.active {
    background-color: #28B389;
    color: #fff;
  }
}

.goods-list {
  padding: 20rpx;
}

.goods-item {
  display: flex;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 16rpx;
}

.goods-image {
  width: 160rpx;
  height: 160rpx;
  border-radius: 12rpx;
  margin-right: 20rpx;
  background-color: #F5F5F5;
}

.goods-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.goods-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}

.goods-spec {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.goods-meta {
  display: flex;
  margin-bottom: 12rpx;
}

.goods-code {
  font-size: 22rpx;
  color: #666;
  margin-right: 16rpx;
}

.goods-type {
  font-size: 22rpx;
  color: #28B389;
  background-color: #F0FFF5;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
}

.goods-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goods-price {
  font-size: 32rpx;
  font-weight: bold;
  color: #FF5722;
}

.goods-stock {
  font-size: 24rpx;
  color: #999;
  
  &.low {
    color: #FF5722;
  }
}

.goods-actions {
  display: flex;
  flex-direction: column;
  margin-left: 16rpx;
}

.action-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
  
  text {
    font-size: 32rpx;
  }
  
  &.edit {
    background-color: #FFF8F0;
  }
  
  &.delete {
    background-color: #FFF0F0;
  }
}

.empty-tip {
  padding: 80rpx;
  text-align: center;
  
  text {
    font-size: 28rpx;
    color: #999;
  }
}

.add-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
}

.modal-content {
  width: 100%;
  background-color: #fff;
  border-radius: 32rpx 32rpx 0 0;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #F5F5F5;
}

.modal-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
}

.modal-close {
  font-size: 36rpx;
  color: #999;
}

.modal-body {
  flex: 1;
  padding: 32rpx;
}

.form-item {
  margin-bottom: 28rpx;
}

.form-label {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 12rpx;
  display: block;
}

.form-input {
  width: 100%;
  height: 88rpx;
  background-color: #F5F5F5;
  border-radius: 12rpx;
  padding: 0 24rpx;
  font-size: 30rpx;
}

.modal-footer {
  padding: 24rpx 32rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  border-top: 1rpx solid #F5F5F5;
}

.submit-btn {
  background-color: #28B389;
  padding: 28rpx;
  border-radius: 16rpx;
  text-align: center;
  
  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: bold;
  }
}
</style>
