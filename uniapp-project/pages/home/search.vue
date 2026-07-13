<template>
  <view class="search-page">
    <search-box :BoxHeight="'100vh'" :flag="0"></search-box>
  </view>
</template>

<script>
import searchBox from '@/components/searchBox/searchBox.vue'

export default {
  components: {
    searchBox
  }
}
</script>

<style scoped>
.search-page {
  height: 100vh;
  background: #f8f8f8;
}
</style>
