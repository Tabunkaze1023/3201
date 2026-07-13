<template>
  <view class="category-nav">
    <scroll-view scroll-x class="nav-scroll">
      <view class="nav-items">
        <view 
          class="nav-item" 
          :class="{ active: activeIndex === index }"
          v-for="(item, index) in categories" 
          :key="item.name"
          @click="handleClick(index)"
        >
          <view class="nav-icon">{{ item.icon }}</view>
          <text class="nav-name">{{ item.name }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Category {
  name: string
  icon: string
  path?: string
}

const props = withDefaults(defineProps<{
  categories?: Category[]
}>(), {
  categories: () => [
    { name: '全部', icon: '📦' },
    { name: '手机数码', icon: '📱' },
    { name: '电脑办公', icon: '💻' },
    { name: '音频设备', icon: '🎧' },
    { name: '平板设备', icon: '📱' },
    { name: '电脑配件', icon: '⌨️' }
  ]
})

const emit = defineEmits<{
  change: [index: number, category: string]
}>()

const activeIndex = ref(0)

function handleClick(index: number) {
  activeIndex.value = index
  emit('change', index, props.categories[index].name)
}
</script>

<style lang="scss" scoped>
.category-nav {
  background-color: #fff;
  padding: 16rpx 0;
}

.nav-scroll {
  white-space: nowrap;
}

.nav-items {
  display: inline-flex;
  padding: 0 20rpx;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx 24rpx;
  margin-right: 16rpx;
  border-radius: 12rpx;
  transition: all 0.3s;
  
  &.active {
    background-color: #F0FFF5;
    
    .nav-name {
      color: #28B389;
      font-weight: bold;
    }
  }
}

.nav-icon {
  font-size: 40rpx;
  margin-bottom: 8rpx;
}

.nav-name {
  font-size: 24rpx;
  color: #666;
}
</style>
