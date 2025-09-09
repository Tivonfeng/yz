<script setup lang="ts">
// 路由应用入口
</script>

<template>
  <RouterView />
</template>

<style>
/* 完全重置所有元素的默认样式 */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  touch-action: manipulation;
  -webkit-overflow-scrolling: touch;
  /* 移除浏览器默认样式 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* 移动端安全区域处理 */
  position: relative;
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

#app {
  width: 100vh;
  height: 100vw;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 0;
  border: 0;
  transform-origin: center center;
  transform: translate(-50%, -50%) rotate(90deg);
  /* 确保完全填满 */
  min-width: 100vh;
  min-height: 100vw;
  max-width: 100vh;
  max-height: 100vw;
}

/* 横屏素材直接展示，无论屏幕方向 */
.landscape-forced {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
