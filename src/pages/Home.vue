<template>
  <v-container class="home-content" :class="{ 'mobile-layout': isMobile }">
    <v-row>
      <v-col cols="12">
        <h1>欢迎来到首页</h1>
        <p>这是一个使用 Vue 3 + Vuetify 3 构建的现代化应用</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.home-content {
  min-height: 100vh;
}

.mobile-layout {
  padding: 16px 8px;
}
</style>