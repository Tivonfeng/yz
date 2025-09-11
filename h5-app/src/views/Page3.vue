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
      <div class="city-item city-yizheng" v-motion="getCityMotion(0)" @click="openCityModal('yizheng')">
        <div class="city-landmark">
          <img src="@/assets/yz/03/仪征.png" alt="仪征" class="landmark-image" />
        </div>
        <div class="city-name">仪征</div>
        <div class="position-point" v-motion="getPointMotion(0)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
      
      <!-- 来安 - 上方中左 -->
      <div class="city-item city-laian" v-motion="getCityMotion(1)" @click="openCityModal('laian')">
        <div class="city-landmark">
          <img src="@/assets/yz/03/来安.png" alt="来安" class="landmark-image" />
        </div>
        <div class="city-name">来安</div>
        <div class="position-point" v-motion="getPointMotion(1)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
      
      <!-- 六合 - 上方中右 -->
      <div class="city-item city-liuhe" v-motion="getCityMotion(2)" @click="openCityModal('liuhe')">
        <div class="city-landmark">
          <img src="@/assets/yz/03/六合.png" alt="六合" class="landmark-image" />
        </div>
        <div class="city-name">六合</div>
        <div class="position-point" v-motion="getPointMotion(2)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>

      <!-- 金湖 - 中下位置 -->
      <div class="city-item city-jinhu" v-motion="getCityMotion(3)" @click="openCityModal('jinhu')">
        <div class="city-landmark">
          <img src="@/assets/yz/03/金湖.png" alt="金湖" class="landmark-image" />
        </div>
        <div class="city-name">金湖</div>
        <div class="position-point" v-motion="getPointMotion(3)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
      
      <!-- 定远 - 右上角 -->
      <div class="city-item city-dingyuan" v-motion="getCityMotion(4)" @click="openCityModal('dingyuan')">
        <div class="city-landmark">
          <img src="@/assets/yz/03/定远.png" alt="定远" class="landmark-image" />
        </div>
        <div class="city-name">定远</div>
        <div class="position-point" v-motion="getPointMotion(4)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
      
      <!-- 盱眙 - 右下角 -->
      <div class="city-item city-xuyi" v-motion="getCityMotion(5)" @click="openCityModal('xuyi')">
        <div class="city-landmark">
          <img src="@/assets/yz/03/盱眙.png" alt="盱眙" class="landmark-image" />
        </div>
        <div class="city-name">盱眙</div>
        <div class="position-point" v-motion="getPointMotion(5)">
          <img src="@/assets/yz/03/位置点.png" alt="位置点" class="point-image" />
        </div>
      </div>
    </div>

    <!-- 城市详情弹窗 -->
    <CityModal 
      :isVisible="isModalVisible" 
      :cityData="selectedCityData"
      @close="closeCityModal"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CityModal from '@/components/CityModal.vue'

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

// 弹窗相关状态
const isModalVisible = ref(false)
const selectedCityData = ref<typeof citiesData[keyof typeof citiesData] | null>(null)

// 城市数据
const citiesData = {
  yizheng: {
    name: '仪征',
    description: '仪征市位于江苏省中部，长江北岸，是一座历史悠久的文化名城。这里有着深厚的历史底蕴和丰富的文化资源，是江南水乡的典型代表。仪征有着悠久的历史文化传统，是古代文人墨客聚集之地，留下了众多珍贵的文化遗产。著名景点包括扬州瘦西湖、个园、何园、大明寺等。',
    videoUrl: '/assets/videos/yizheng.mp4'
  },
  laian: {
    name: '来安',
    description: '来安县位于安徽省东部，地处江淮分水岭，是一座山清水秀的生态之城。来安历史悠久，文化底蕴深厚，是楚汉文化的重要发源地之一。这里有白鹭岛、池杉湖、舜山风景区等美丽的自然景观，展现着独特的生态魅力。',
    videoUrl: '/assets/videos/laian.mp4'
  },
  liuhe: {
    name: '六合',
    description: '六合区位于南京市北部，是南京江北新区的重要组成部分，发展潜力巨大。六合有着丰富的民俗文化和农业文化传统，是江苏重要的农业基地。金牛湖、桂子山、竹镇民俗村等景点展现了六合的自然风光和文化底蕴。',
    videoUrl: '/assets/videos/liuhe.mp4'
  },
  jinhu: {
    name: '金湖',
    description: '金湖县位于江苏省中部，以荷花闻名，素有"荷花之乡"的美誉。金湖有着深厚的水文化底蕴，荷花文化是其独特的文化名片。荷花荡、金湖湿地公园、水上森林等景点展现了金湖独特的水乡风情和生态之美。',
    videoUrl: '/assets/videos/jinhu.mp4'
  },
  dingyuan: {
    name: '定远',
    description: '定远县位于安徽省东部，历史悠久，是著名的历史文化名城。定远有着深厚的历史文化底蕴，是楚汉文化的重要载体。虞姬墓、定远古城、花园湖等景点承载着深厚的历史文化内涵，展现着古韵今风的魅力。',
    videoUrl: '/assets/videos/dingyuan.mp4'
  },
  xuyi: {
    name: '盱眙',
    description: '盱眙县位于江苏省西部，以盱眙龙虾闻名全国，是著名的美食之城。盱眙有着悠久的历史和独特的美食文化，龙虾文化已成为城市名片。明祖陵、第一山、龙虾节广场等景点展现了盱眙深厚的历史底蕴和独特的美食文化。',
    videoUrl: '/assets/videos/xuyi.mp4'
  }
}

// 打开城市详情弹窗
const openCityModal = (cityKey: keyof typeof citiesData) => {
  selectedCityData.value = citiesData[cityKey]
  isModalVisible.value = true
}

// 关闭弹窗
const closeCityModal = () => {
  isModalVisible.value = false
  selectedCityData.value = null
}


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