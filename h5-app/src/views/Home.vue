<template>
  <div class="home-page landscape-forced">
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 导入台标图片
import logo2 from '@/assets/yz/01/logos/2.png'
import logo3 from '@/assets/yz/01/logos/3.png'
import logo4 from '@/assets/yz/01/logos/4.png'
import logo5 from '@/assets/yz/01/logos/5.png'
import logo6 from '@/assets/yz/01/logos/6.png'
import logo7 from '@/assets/yz/01/logos/7.png'

// 台标数据
const logos = [
  { src: logo2 },
  { src: logo3 },
  { src: logo4 },
  { src: logo5 },
  { src: logo6 },
  { src: logo7 }
]

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



</style>