<template>
  <div class="bottom-navigation" v-show="shouldShowNavigation">
    <div class="nav-item" 
         v-for="(item, index) in navigationItems" 
         :key="index"
         :class="{ 'active': isActive(item.path) }"
         @click="navigateTo(item.path)">
      <span class="nav-label">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 导航项配置
const navigationItems = [
  { path: '/', label: '首页' },
  { path: '/page2', label: '前言' },
  { path: '/page3', label: '城市' },
  { path: '/page4', label: '结语' },
  { path: '/page5', label: '主创' }
]

// 检查是否应该显示导航栏（排除加载状态等）
const shouldShowNavigation = computed(() => {
  return true // 始终显示，可以根据需要添加条件
})

// 检查当前路由是否激活
const isActive = (path: string) => {
  return route.path === path
}

// 导航到指定路径
const navigateTo = (path: string) => {
  if (route.path !== path) {
    router.push(path)
  }
}
</script>

<style scoped>
.bottom-navigation {
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 28px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 9999;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  cursor: pointer;
  transition: all 0.25s ease;
  border-radius: 12px;
  flex: 1;
  position: relative;
}

.bottom-navigation:hover {
  opacity: 1;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.nav-item.active {
  background: rgba(255, 215, 0, 0.1);
}

.nav-label {
  font-size: 10px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.2px;
  transition: all 0.25s ease;
}

.nav-item.active .nav-label {
  color: rgba(255, 215, 0, 0.9);
  font-weight: 500;
}

/* 移动端优化 */
@media (max-width: 480px) {
  .bottom-navigation {
    width: 60%;
    height: 26px;
    bottom: 6px;
    opacity: 0.7;
  }
  
  .nav-item {
    padding: 3px 4px;
  }
  
  .nav-label {
    font-size: 9px;
  }
}

/* 适配项目的横屏样式 */
#app:not(.desktop-mode) .bottom-navigation {
  width: 50%;
  height: 28px;
}

/* 桌面模式的导航栏样式 */
#app.desktop-mode .bottom-navigation {
  width: 50%;
  height: 28px;
}
</style>