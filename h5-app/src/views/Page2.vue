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
    <div class="max-w-[85%] bg-white/95 backdrop-blur-md border border-red-200/50 rounded-2xl p-8 shadow-2xl z-[5]" v-motion="contentMotion">
      <div class="relative pl-6">
        <!-- 左侧装饰线 -->
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-red-500 to-red-600 rounded-full"></div>
        
        <h1 class="text-3xl font-bold text-red-800 text-center mb-6 tracking-[3px] drop-shadow-sm relative pb-4">
          前言
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-15 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </h1>
        <p class="text-[15px] leading-relaxed text-gray-800 indent-8 tracking-wider font-normal text-justify">
          今年是中国人民抗日战争暨世界反法西斯战争胜利80周年。抗日战争中，新四军第二师驰骋于安徽、江苏两省的淮南大地，为中华民族独立作出了重要贡献。
值此纪念之际，当年淮南抗日根据地区域内的苏皖两省6个县级融媒体中心，开展了“铭记抗战历史·传承红色基因 —— 烽火第二师”苏皖融媒联合采访行动，弘扬伟大抗战精神，展望和平发展未来。
        </p>
      </div>
    </div>

    <!-- 手势滑动提示 -->
    <div class="swipe-hint" v-motion="navHintMotion">
      <!-- 向左箭头动效 -->
      <div class="arrow-container">
        <span class="arrow" v-for="i in 5" :key="i" :style="{ animationDelay: (i - 1) * 0.2 + 's' }">‹</span>
      </div>
      <img 
        src="@/assets/yz/01/hand.png" 
        alt="滑动手势" 
        class="hand-gesture"
        :class="{ 'swiping': isAnimating }"
      />
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


/* 手势滑动提示 */
.swipe-hint {
  position: absolute;
  right: 10%;
  bottom: 5%;
  transform: translateY(-50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  user-select: none;
  pointer-events: none;
}

.hand-gesture {
  width: 45px;
  height: 45px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
  animation: float 2s ease-in-out infinite;
}

.hand-gesture:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.4));
}

/* 滑动动画 */
.hand-gesture.swiping {
  animation: swipeLeft 2s ease-in-out forwards;
}

/* 箭头容器 */
.arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin: 3px 0;
  height: 24px;
}

/* 箭头样式 */
.arrow {
  font-size: 30px;
  font-weight: bold;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  animation: slideLeft 1.5s ease-in-out infinite;
  opacity: 0;
}



/* 箭头滑动动画 */
@keyframes slideLeft {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  50% {
    opacity: 1;
    transform: translateX(-10px);
  }
  100% {
    opacity: 0;
    transform: translateX(-30px);
  }
}

/* 滑动动画 */
@keyframes swipeLeft {
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateX(-100px) scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: translateX(-200px) scale(0.6);
    opacity: 0;
  }
}

/* 浮动动画 */
@keyframes float {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-8px);
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