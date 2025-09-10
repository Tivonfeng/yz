<template>
  <div 
    class="home-page landscape-forced" 
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- Logo -->
    <div class="logo-container" v-motion="logoMotion">
      <img 
        src="@/assets/yz/01/logo.png" 
        alt="纪念抗战胜利80周年logo" 
        class="main-logo"
      />
    </div>
    
    <!-- 主标题 -->
    <div class="main-title" v-motion="titleMotion">
      <img 
        src="@/assets/yz/01/标题.png" 
        alt="主标题" 
        class="main-title-image"
      />
    </div>
    <!-- 副标题条幅 -->
    <div class="subtitle-banner" v-motion="subtitleMotion">
      <img 
        src="@/assets/yz/01/苏皖6家县级融媒体中心联合报到.png" 
        alt="苏皖6家县级融媒体中心联合报到" 
        class="subtitle-image"
      />

      <div class="logos-container">
        <div class="logo-item" v-for="(logo, index) in logos" :key="index" v-motion="getLogoMotion(index)">
          <img :src="logo.src" :alt="`台标${index + 1}`" class="logo-image" />
        </div>
      </div>
    </div>

    <!-- 手势滑动提示 -->
    <div class="swipe-hint" v-motion="swipeHintMotion">
      <img 
        src="@/assets/yz/01/hand.png" 
        alt="滑动手势" 
        class="hand-gesture"
        :class="{ 'swiping': isAnimating }"
      />
      <!-- 向左箭头动效 -->
      <div class="arrow-container">
        <span class="arrow" v-for="i in 5" :key="i" :style="{ animationDelay: (i - 1) * 0.2 + 's' }">‹</span>
      </div>
      <div class="swipe-text">向左滑动</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { WeChatShare } from '@/utils/wechat'
import { getWxConfig } from '@/api/wechat'

const router = useRouter()
const isAnimating = ref(false)

// 触摸事件相关
let startX = 0
let startY = 0
let startTime = 0

// 导入台标图片
import logo1 from '@/assets/yz/01/logos/1.png'
import logo2 from '@/assets/yz/01/logos/2.png'
import logo3 from '@/assets/yz/01/logos/3.png'
import logo4 from '@/assets/yz/01/logos/4.png'
import logo5 from '@/assets/yz/01/logos/5.png'
import logo6 from '@/assets/yz/01/logos/6.png'
import logo7 from '@/assets/yz/01/logos/7.png'

// 台标数据
const logos = [
  { src: logo1 },
  { src: logo2 },
  { src: logo3 },
  { src: logo4 },
  { src: logo5 },
  { src: logo6 },
  { src: logo7 }
]

// Logo动画
const logoMotion = computed(() => ({
  initial: { 
    opacity: 0, 
    scale: 0.3,
    rotate: -180
  },
  enter: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { 
      delay: 100,
      duration: 1200,
      ease: [0.34, 1.56, 0.64, 1] // 弹性缓动
    }
  }
}))

// 主标题动画
const titleMotion = computed(() => ({
  initial: { 
    opacity: 0, 
    scale: 0.6,
    y: -120,
    rotateX: 60,
    rotateY: 15,
    z: -200
  },
  enter: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    rotateX: 0,
    rotateY: 0,
    z: 0,
    transition: { 
      delay: 300,
      duration: 1500,
      ease: [0.165, 0.84, 0.44, 1] // 更丝滑的缓动曲线
    }
  }
}))

// 副标题动画
const subtitleMotion = computed(() => ({
  initial: { opacity: 0, x: -200 },
  enter: { 
    opacity: 1, 
    x: 0,
    transition: { delay: 1000, duration: 800, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}))


// 单个台标动画
const getLogoMotion = (index: number) => ({
  initial: { opacity: 0, scale: 0, rotate: 180 },
  enter: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { 
      delay: 1500 + index * 100, 
      duration: 500, 
      ease: [0.34, 1.56, 0.64, 1] // 弹性缓动
    }
  }
})

// 手势提示动画
const swipeHintMotion = computed(() => ({
  initial: { opacity: 0, x: 100, scale: 0.8 },
  enter: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { 
      delay: 2500, 
      duration: 1000, 
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
  // 条件：向上滑动距离 > 80px，水平距离 < 150px，时间 < 500ms
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
  
  // 2秒后跳转到下一页
  setTimeout(() => {
    router.push('/page2')
  }, 2000)
}


// 初始化微信分享和事件监听
onMounted(async () => {
  // 检查是否在微信浏览器中
  if (WeChatShare.isWeChatBrowser()) {
    try {
      const wechatShare = WeChatShare.getInstance()
      
      // 获取微信配置参数
      const wxConfig = await getWxConfig({ url: window.location.href })
      
      // 分享配置
      const shareConfig = {
        title: '纪念中国人民抗日战争暨世界反法西斯战争胜利80周年',
        desc: '苏皖6家县级融媒体中心联合报道，共同缅怀历史，珍爱和平',
        link: window.location.href,
        imgUrl: `${window.location.origin}/src/assets/yz/01/标题.png`
      }
      
      // 配置微信JSSDK
      await wechatShare.configWx(wxConfig)
      
      // 设置分享内容
      wechatShare.setShareContent(shareConfig)
      
      // 隐藏不需要的菜单项
      wechatShare.hideMenuItems()
      
      console.log('微信分享功能初始化成功')
    } catch (error) {
      console.error('微信分享初始化失败:', error)
    }
  } else {
    console.log('非微信环境，跳过微信分享配置')
  }
})

</script>

<style scoped>
.home-page {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-image: url('@/assets/yz/01/背景.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Logo容器 */
.logo-container {
  position: absolute;
  top: 2%;
  left: 2%;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-logo {
  width: 55px;
  height: 55px;
  /* filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3)); */
  transition: all 0.3s ease;
}

/* 主标题 */
.main-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  pointer-events: none;
}

.main-title-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
  transform-style: preserve-3d;
}

/* 副标题条幅 */
.subtitle-banner {
  position: absolute;
  bottom: 23%;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

.subtitle-image {
  width: 60%;
  filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.2));
}

/* 台标容器 */
.logos-container {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

/* 台标区域（在副标题内） */
.logo-item {
  transition: transform 0.3s ease;
}

.logo-item:hover {
  transform: scale(1.1) translateY(-5px);
}

.logo-image {
  height: 30px;
  max-width: 80px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
}

/* 手势滑动提示 */
.swipe-hint {
  position: absolute;
  right: 12%;
  top: 70%;
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

/* 箭头容器 */
.arrow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin: 3px 0;
  height: 16px;
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

/* 提示文字 */
.swipe-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}


</style>