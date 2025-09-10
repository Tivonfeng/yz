<template>
  <div class="page3 landscape-forced">
    <!-- 角标装饰 -->
    <div class="corner-decoration" v-motion="cornerMotion">
      <img 
        src="@/assets/yz/03/角标.png" 
        alt="角标装饰" 
        class="corner-image"
      />
    </div>


    <!-- 位置线背景 -->
    <div class="position-line" v-motion="lineMotion">
      <img src="@/assets/yz/03/位置线.png" alt="位置线" class="line-image" />
    </div>

    <!-- 城市展示区域 -->
    <div class="cities-container" v-motion="citiesMotion">
      <!-- 仪征 - 左上角 -->
      <div class="city-item city-yizheng" v-motion="getCityMotion(0)">
        <div class="city-landmark">
          <img src="@/assets/yz/03/仪征.png" alt="仪征" class="landmark-image" />
        </div>
        <div class="city-name">仪征</div>
        <div class="position-point" v-motion="getPointMotion(0)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
      
      <!-- 来安 - 上方中左 -->
      <div class="city-item city-laian" v-motion="getCityMotion(1)">
        <div class="city-landmark">
          <img src="@/assets/yz/03/来安.png" alt="来安" class="landmark-image" />
        </div>
        <div class="city-name">来安</div>
        <div class="position-point" v-motion="getPointMotion(1)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
      
      <!-- 六合 - 上方中右 -->
      <div class="city-item city-liuhe" v-motion="getCityMotion(2)">
        <div class="city-landmark">
          <img src="@/assets/yz/03/六合.png" alt="六合" class="landmark-image" />
        </div>
        <div class="city-name">六合</div>
        <div class="position-point" v-motion="getPointMotion(2)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>

      <!-- 金湖 - 中下位置 -->
      <div class="city-item city-jinhu" v-motion="getCityMotion(3)">
        <div class="city-landmark">
          <img src="@/assets/yz/03/金湖.png" alt="金湖" class="landmark-image" />
        </div>
        <div class="city-name">金湖</div>
        <div class="position-point" v-motion="getPointMotion(3)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
      
      <!-- 定远 - 右上角 -->
      <div class="city-item city-dingyuan" v-motion="getCityMotion(4)">
        <div class="city-landmark">
          <img src="@/assets/yz/03/定远.png" alt="定远" class="landmark-image" />
        </div>
        <div class="city-name">定远</div>
        <div class="position-point" v-motion="getPointMotion(4)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
      
      <!-- 盱眙 - 右下角 -->
      <div class="city-item city-xuyi" v-motion="getCityMotion(5)">
        <div class="city-landmark">
          <img src="@/assets/yz/03/盱眙.png" alt="盱眙" class="landmark-image" />
        </div>
        <div class="city-name">盱眙</div>
        <div class="position-point" v-motion="getPointMotion(5)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
    </div>



  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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


// 位置线动画
const lineMotion = computed(() => ({
  initial: { opacity: 0, scale: 0.5 },
  enter: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      delay: 700,
      duration: 1500,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}))

// 城市容器动画
const citiesMotion = computed(() => ({
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { 
      delay: 1000,
      duration: 500,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}))

// 位置点动画
const getPointMotion = (index: number) => ({
  initial: { opacity: 0, scale: 0 },
  enter: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      delay: 1100 + index * 100, 
      duration: 400, 
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
})

// 单个城市动画
const getCityMotion = (index: number) => ({
  initial: { opacity: 0, y: 50, scale: 0.8 },
  enter: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      delay: 1300 + index * 150, 
      duration: 600, 
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
})


</script>

<style scoped>
.page3 {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-image: url('@/assets/yz/03/背景.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
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


/* 位置线 */
.position-line {
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  height: 60%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.line-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  opacity: 0.9;
}

/* 城市展示区域 */
.cities-container {
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 20%;
  z-index: 5;
}

.city-item {
  position: absolute;
  cursor: pointer;
  transition: transform 0.3s ease;
}

/* 具体城市位置 - 根据效果图调整 */
.city-yizheng {
  top: 49%;
  left: 5%;
}

.city-laian {
  top: 30%;
  left: 19%;
}

.city-liuhe {
  top: 48%;
  left: 33%;
}

.city-jinhu {
  top: 55%;
  left: 53%;
}

.city-dingyuan {
  top: 45%;
  right: 20%;
}

.city-xuyi {
  top: 52%;
  right: 6%;
}

.city-item:hover {
  transform: translateY(-5px);
}


.point-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: pointPulse 2s ease-in-out infinite;
}

@keyframes pointPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

/* 仪征城市样式 */
.city-yizheng .city-landmark {
  position: absolute;
  top: -50px;
  transform: translateX(-10%);
  animation: landmarkFloat 4s ease-in-out infinite;
  z-index: 10;
}

.city-yizheng .city-name {
  position: absolute;
  top: -85px;
  left: 40px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid rgba(139, 0, 0, 0.2);
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: all 0.3s ease;
  animation: cityNameFloat 3s ease-in-out infinite;
  z-index: 9;
}

.city-yizheng .position-point {
  position: absolute;
  top: -3px;
  left: 35px;
  z-index: 5;
  width: 16px;
  height: 16px;
}

/* 来安城市样式 */
.city-laian .city-landmark {
  position: absolute;
  top: -40px;
  left: 25px;
  transform: translateX(-50%);
  animation: landmarkFloat 3.8s ease-in-out infinite;
  z-index: 10;
}

.city-laian .city-name {
  position: absolute;
  top: 35px;
  left: 78px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid rgba(139, 0, 0, 0.2);
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: all 0.3s ease;
  animation: cityNameFloat 3.2s ease-in-out infinite;
  z-index: 9;
}

.city-laian .position-point {
  position: absolute;
  top: 0;
  left: 70px;
  z-index: 5;
  width: 16px;
  height: 16px;
}

/* 六合城市样式 */
.city-liuhe .city-landmark {
  position: absolute;
  top: -35px;
  left: 25px;
  transform: translateX(-50%);
  animation: landmarkFloat 3.6s ease-in-out infinite;
  z-index: 10;
}

.city-liuhe .city-name {
  position: absolute;
  top: 35px;
  left: 78px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid rgba(139, 0, 0, 0.2);
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: all 0.3s ease;
  animation: cityNameFloat 3.4s ease-in-out infinite;
  z-index: 9;
}

.city-liuhe .position-point {
  position: absolute;
  top: 5px;
  left: 70px;
  z-index: 5;
  width: 16px;
  height: 16px;
}

/* 金湖城市样式 */
.city-jinhu .city-landmark {
  position: absolute;
  top: -40px;
  left: 10px;
  transform: translateX(-50%);
  animation: landmarkFloat 3.4s ease-in-out infinite;
  z-index: 10;
}

.city-jinhu .city-name {
  position: absolute;
  top: 30px;
  left: 48px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid rgba(139, 0, 0, 0.2);
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: all 0.3s ease;
  animation: cityNameFloat 3.6s ease-in-out infinite;
  z-index: 9;
}

.city-jinhu .position-point {
  position: absolute;
  top: 0;
  left: 40px;
  z-index: 5;
  width: 16px;
  height: 16px;
}

/* 定远城市样式 */
.city-dingyuan .city-landmark {
  position: absolute;
  top: -60px;
  left: -70px;
  transform: translateX(-50%);
  animation: landmarkFloat 3.2s ease-in-out infinite;
  z-index: 10;
}

.city-dingyuan .city-name {
  position: absolute;
  top: 30px;
  left: -32px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid rgba(139, 0, 0, 0.2);
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: all 0.3s ease;
  animation: cityNameFloat 3.8s ease-in-out infinite;
  z-index: 9;
}

.city-dingyuan .position-point {
  position: absolute;
  top: 0;
  left: -40px;
  z-index: 5;
  width: 16px;
  height: 16px;
}

/* 盱眙城市样式 */
.city-xuyi .city-landmark {
  position: absolute;
  top: -40px;
  left: -50px;
  transform: translateX(-50%);
  animation: landmarkFloat 3s ease-in-out infinite;
  z-index: 10;
}

.city-xuyi .city-name {
  position: absolute;
  top: -70px;
  left: -25px;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: #8B0000;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid rgba(139, 0, 0, 0.2);
  white-space: nowrap;
  writing-mode: vertical-rl;
  text-orientation: upright;
  transition: all 0.3s ease;
  animation: cityNameFloat 4s ease-in-out infinite;
  z-index: 9;
}

.city-xuyi .position-point {
  position: absolute;
  top: 5px;
  left: -30px;
  z-index: 5;
  width: 16px;
  height: 16px;
}

/* 公共样式 */
.landmark-image {
  height: 60px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
}

.city-item:hover .landmark-image {
  transform: scale(1.1) translateY(-5px);
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.city-item:hover .city-name {
  transform: translateX(-50%) translateY(-3px);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(139, 0, 0, 0.2);
}

.city-item:hover .position-point {
  transform: translateY(-2px);
}

/* 城市名称静态动效 */
@keyframes cityNameFloat {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-3px);
  }
}

/* 城市图片静态动效 */
@keyframes landmarkFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}





</style>