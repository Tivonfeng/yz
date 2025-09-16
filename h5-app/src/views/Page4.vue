<template>
  <div 
    class="page4 landscape-forced" 
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
    <div class="max-w-[85%] bg-white/95 backdrop-blur-md border border-red-200/50 rounded-2xl p-5 shadow-2xl z-[5]" v-motion="contentMotion">
      <div class="relative pl-6">
        <!-- 左侧装饰线 -->
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 via-red-500 to-red-600 rounded-full"></div>
        
        <h1 class="text-3xl font-bold text-red-800 text-center mb-6 tracking-[3px] drop-shadow-sm relative pb-4">
          结语
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-15 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </h1>
        <div class="space-y-1">
          <p class="text-[15px] leading-relaxed text-gray-800 indent-8 tracking-wider font-normal text-justify">
            抗战期间，新四军第二师在淮南开创了拥有330万人口，3万平方公里的解放区，建立了17个县的抗日民主政权。主力部队从一开始的不到3100人，发展到抗战胜利后4个旅11个团共35000多人。地方部队15000余人，民兵多达20万人。
          </p>
          <p class="text-[15px] leading-relaxed text-gray-800 indent-8 tracking-wider font-normal text-justify">
            让我们牢记新四军第二师的光荣历史，继承和发扬新四军第二师的优良传统，进一步弘扬“铁军”精神，为中华民族的繁荣富强而努力奋斗。
          </p>
        </div>
      </div>
    </div>

    <!-- 手势滑动提示 -->
    <div class="swipe-hint" v-motion="swipeHintMotion">
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

// 滑动提示动画
const swipeHintMotion = computed(() => ({
  initial: { opacity: 0, x: 100 },
  enter: { 
    opacity: 1, 
    x: 0,
    transition: { 
      delay: 2500,
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
  
  // 跳转到 Page5
  setTimeout(() => {
    router.push('/page5') 
  }, 1000)
}
</script>

<style scoped>
.page4 {
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
}

/* 完成提示 */
.completion-hint {
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

.completion-text {
  font-size: 12px;
  color: #8B0000;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.85);
  padding: 6px 12px;
  border-radius: 15px;
  border: 1px solid rgba(139, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  animation: pulse 2s ease-in-out infinite;
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.2);
}

/* 图标容器 */
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
}

/* 完成图标样式 */
.completion-icon {
  font-size: 30px;
  font-weight: bold;
  color: #22c55e;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  animation: checkPulse 2s ease-in-out infinite;
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

/* 完成图标脉冲动画 */
@keyframes checkPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
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

/* 箭头滑动动画 - 向左 */
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

/* 滑动动画 - 向左 */
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
</style>