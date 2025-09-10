<template>
  <div 
    class="page2 landscape-forced" 
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- 角标装饰 -->
    <div class="corner-decoration" v-motion="cornerMotion">
      <img 
        src="@/assets/yz/02/角标.png" 
        alt="角标装饰" 
        class="corner-image"
      />
    </div>

    <!-- 主要内容区域 -->
    <div class="content-area" v-motion="contentMotion">
      <div class="content-text">
        <h1 class="page-title">前言</h1>
        <p class="page-description">
          今年是中国人民抗日战争暨世界反法西斯战争胜利80周年。抗日战争中，新四军第二师驰骋于安徽、江苏两省的淮南大地，为中华民族独立作出了重要贡献。
值此纪念之际，当年淮南抗日根据地区域内的苏皖两省6个县级融媒体中心，开展了“铭记抗战历史·传承红色基因 —— 烽火第二师”苏皖融媒联合采访行动，弘扬伟大抗战精神，展望和平发展未来。
        </p>
      </div>
    </div>

    <!-- 导航提示 -->
    <div class="nav-hint" v-motion="navHintMotion">
      <div class="nav-text">继续向左滑动</div>
      <div class="arrow-container">
        <span class="arrow" v-for="i in 3" :key="i" :style="{ animationDelay: (i - 1) * 0.3 + 's' }">‹</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAnimating = ref(false)

// 触摸事件相关
let startX = 0
let startY = 0
let startTime = 0

// 角标动画
const cornerMotion = computed(() => ({
  initial: { opacity: 0, scale: 0.5, rotate: -45 },
  enter: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { 
      delay: 300,
      duration: 1000,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
}))

// 内容区域动画
const contentMotion = computed(() => ({
  initial: { opacity: 0, y: 50 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: 800,
      duration: 1200,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}))

// 导航提示动画
const navHintMotion = computed(() => ({
  initial: { opacity: 0, x: 100 },
  enter: { 
    opacity: 1, 
    x: 0,
    transition: { 
      delay: 1500,
      duration: 800,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}))

// 触摸开始
const handleTouchStart = (e: TouchEvent) => {
  if (isAnimating.value) return
  
  const touch = e.touches[0]
  startX = touch.clientX
  startY = touch.clientY
  startTime = Date.now()
}

// 触摸结束，检测滑动手势
const handleTouchEnd = (e: TouchEvent) => {
  if (isAnimating.value) return
  
  const touch = e.changedTouches[0]
  const endX = touch.clientX
  const endY = touch.clientY
  const endTime = Date.now()
  
  const deltaX = endX - startX
  const deltaY = endY - startY
  const deltaTime = endTime - startTime
  
  // 横屏模式下检测向左滑动手势（在设备坐标系中是向上滑动）
  if (
    deltaY < -80 && 
    Math.abs(deltaX) < 150 && 
    deltaTime < 500
  ) {
    triggerSwipeAnimation()
  }
}

// 触发滑动动画和跳转
const triggerSwipeAnimation = () => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  
  // 跳转到下一页
  setTimeout(() => {
    router.push('/page3') // 这里可以替换为第三页的路径
  }, 1000)
}
</script>

<style scoped>
.page2 {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-image: url('@/assets/yz/02/背景.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 角标装饰 */
.corner-decoration {
  position: absolute;
  top: 3%;
  left: 3%;
  z-index: 10;
}

.corner-image {
  height: 40px;
  width: auto;
  object-fit: contain;
  /* filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3)); */
}

/* 内容区域 */
.content-area {
  text-align: left;
  color: white;
  z-index: 5;
  max-width: 85%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 32px 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.content-text {
  position: relative;
}

.content-text::before {
  content: '';
  position: absolute;
  left: -16px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, 
    #ff0000 0%, 
    #ffaa00 50%, 
    #ff0000 100%);
  border-radius: 2px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  letter-spacing: 3px;
  color: #ffffff;
  text-align: center;
  position: relative;
  padding-bottom: 16px;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    #ffaa00 50%, 
    transparent 100%);
}

.page-description {
  font-size: 15px;
  line-height: 1.9;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  margin: 0;
  letter-spacing: 0.5px;
  text-indent: 2em;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 400;
}

/* 导航提示 */
.nav-hint {
  position: absolute;
  bottom: 8%;
  right: 6%;
  z-index: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}

.nav-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  animation: pulse 2s ease-in-out infinite;
}

/* 箭头容器 */
.arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  height: 18px;
}

/* 箭头样式 */
.arrow {
  font-size: 14px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  animation: slideLeft 1.5s ease-in-out infinite;
  opacity: 0;
}

/* 箭头滑动动画 */
@keyframes slideLeft {
  0% {
    opacity: 0;
    transform: translateX(15px);
  }
  50% {
    opacity: 1;
    transform: translateX(-8px);
  }
  100% {
    opacity: 0;
    transform: translateX(-25px);
  }
}

/* 脉冲动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

</style>