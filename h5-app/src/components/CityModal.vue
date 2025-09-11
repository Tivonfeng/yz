<template>
  <div v-if="isVisible" class="city-modal-overlay" v-motion="overlayMotion">
    <!-- 右上角角标 -->
    <div class="corner-badge">
      <img src="@/assets/yz/04/角标.png" alt="纪念抗日战争胜利80周年" class="badge-img" />
    </div>
    
    <!-- 关闭按钮放在最高层级 -->
    <button class="close-btn" @click="close">
      <img src="@/assets/yz/04/关闭.png" alt="关闭" class="close-icon" />
    </button>
    
    
    <div class="city-modal" @click.stop v-motion="modalMotion">
      <div class="modal-bg-container" :class="{ 'video-bg': activeTab === 'video' }">
        
        <div class="modal-content">
          <!-- 内容展示区域 - 全宽显示 -->
          <div class="content-area">
            <div v-show="activeTab === 'text'" class="text-content" v-motion="textMotion">
              <div class="text-section">
                <p>{{ cityData?.description || '这里是城市的详细介绍内容...' }}</p>
              </div>
            </div>

            <div v-show="activeTab === 'video'" class="video-content" v-motion="videoMotion">
              <div class="video-container">
                <div class="video-wrapper">
                  <video 
                    v-if="currentVideo"
                    :src="currentVideo.url" 
					controls
                    controlslist="nodownload noremoteplayback nofullscreen"
                    class="city-video"
                    @loadstart="handleVideoLoad"
                    @fullscreenchange="handleFullscreenChange"
                    webkit-playsinline
                    playsinline
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="true"
                    x5-video-orientation="landscape"
                  >
                    您的浏览器不支持视频播放
                  </video>
                  <div v-else class="video-placeholder">
                    <div class="placeholder-content">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <polygon points="5,3 19,12 5,21"></polygon>
                      </svg>
                      <p>暂无视频内容</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	<div class="tab-buttons">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'text' }"
        @click="activeTab = 'text'"
      >
        📝 文字介绍
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'video' }"
        @click="activeTab = 'video'"
      >
        🎬 视频展示
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface CityData {
  name: string
  description: string
  videoUrl?: string
  videos?: Array<{
    url: string
    title?: string
    description?: string
  }>
}

interface Props {
  isVisible: boolean
  cityData?: CityData | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const activeTab = ref('text')
const close = () => emit('close')

const currentVideo = computed(() => {
  if (props.cityData?.videos && props.cityData.videos.length > 0) {
    return props.cityData.videos[0]
  } else if (props.cityData?.videoUrl) {
    return { url: props.cityData.videoUrl, title: '宣传片' }
  }
  return null
})


// 处理视频加载
const handleVideoLoad = (event: Event) => {
  const video = event.target as HTMLVideoElement
  if (video) {
    // 强制视频横屏属性
    video.setAttribute('x5-video-orientation', 'landscape')
    video.setAttribute('x5-video-player-fullscreen', 'true')
  }
}


// 处理全屏变化
const handleFullscreenChange = async (event: Event) => {
  const video = event.target as HTMLVideoElement
  if (video && document.fullscreenElement === video) {
    try {
      // 尝试锁定屏幕方向为横屏
      if ('orientation' in screen && 'lock' in (screen.orientation as any)) {
        await (screen.orientation as any).lock('landscape')
      }
    } catch (error) {
      console.log('Screen orientation lock not supported or failed:', error)
    }
  }
}

const overlayMotion = computed(() => ({
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 300 } },
  leave: { opacity: 0, transition: { duration: 200 } }
}))

const modalMotion = computed(() => ({
  initial: { opacity: 0, scale: 0.8, y: 50 },
  enter: { opacity: 1, scale: 1, y: 0, transition: { duration: 400 } },
  leave: { opacity: 0, scale: 0.8, y: 30, transition: { duration: 300 } }
}))

const textMotion = computed(() => ({
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { delay: 200, duration: 500 } }
}))

const videoMotion = computed(() => ({
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { delay: 300, duration: 500 } }
}))

</script>

<style scoped>
/* 党政风格模态框设计 - 庄重大气，红色主调，金色点缀 */

/* 模态框遮罩层 - 深色背景营造庄重感 */
.city-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(139, 0, 0, 0.15), 
    rgba(0, 0, 0, 0.8)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px) saturate(1.2);
}

/* 右上角角标 - 纪念抗日战争胜利80周年 */
.corner-badge {
  position: fixed;
  top: 3%;
  left: 3%;
  z-index: 1001;
  animation: badgeEntrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes badgeEntrance {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.badge-img {
  width: auto;
  height: 30px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))
          drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}


/* 主模态框容器 - 最大屏占比 */
.city-modal {
  position: relative;
  width: 120vw;
  max-width: 750px;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(139, 0, 0, 0.3));
}

/* 背景容器 - CSS背景图片 */
.modal-bg-container {
  position: relative;
  width: 100%;
  height: 600px;
  border-radius: 16px;
  background-image: url('@/assets/yz/04/bg1.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center 150px;
  z-index: 1;
}

/* 视频专用背景 */
.modal-bg-container.video-bg {
  background-image: url('@/assets/yz/04/bg2.png');
  background-position: center center;
  background-size: 95% auto;
}

/* 关闭按钮 - 原始样式 */
.close-btn {
  position: absolute;
  top: 70px;
  right: 160px;
  background: transparent;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 9999;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:active {
  transform: scale(0.95);
}

.close-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
  display: block;
}

/* 内容容器 - 手机端优化 */
.modal-content {
  position: absolute;
  top: 140px;
  left: 20px;
  right: 20px;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  box-sizing: border-box;
}


/* 内容区域 - 精确定位在背景框内 */
.content-area {
  flex: 1;
  overflow: hidden;
  padding: 10px;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
}


/* 文字内容样式 - 充分填充 */
.text-content {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
}

.text-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.text-section p {
  color: #2c3e50;
  line-height: 1.8;
  font-size: 1.1rem;
  margin: 0;
  text-indent: 2em;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  flex: 1;
  overflow-y: auto;
}

/* 视频内容样式 - 调整位置 */
.video-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.video-container {
	top:-20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
}

.video-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  margin: 55px 35px 35px 35px;
  max-height: calc(100% - 90px);
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(218,165,32,0.08));
  backdrop-filter: blur(2px);
}


.city-video {
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  object-fit: contain;
  background: rgba(0,0,0,0.02);
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.1);
}

/* 移动端全屏视频优化 */
.city-video:fullscreen,
.city-video:-webkit-full-screen,
.city-video:-moz-full-screen,
.city-video:-ms-fullscreen {
  object-fit: contain;
  background: #000;
}

@media screen and (orientation: portrait) {
  .city-video:fullscreen {
    transform: rotate(90deg);
    transform-origin: center;
  }
}


.video-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #DAA520;
  position: relative;
  overflow: hidden;
}


.placeholder-content {
  text-align: center;
  color: #6c757d;
}

.placeholder-content svg {
  margin-bottom: 15px;
  opacity: 0.6;
}


/* 党政风格标签按钮 - 位于模态框下方 */
.tab-buttons {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 15px;
  z-index: 500;
}

.tab-btn {
  background: linear-gradient(135deg, #DAA520, #B8860B);
  border: 2px solid #8B0000;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #8B0000;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(139, 0, 0, 0.2);
  min-width: 100px;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.tab-btn.active {
  background: linear-gradient(135deg, #8B0000, #A0522D);
  color: #FFD700;
  border-color: #DAA520;
  box-shadow: 0 8px 20px rgba(139, 0, 0, 0.4);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* 自定义滚动条 - 党政主题 */
.text-content::-webkit-scrollbar {
  width: 8px;
}

.text-content::-webkit-scrollbar-track {
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  border-radius: 4px;
}

.text-content::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #8B0000, #DAA520);
  border-radius: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.text-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #660000, #B8860B);
}


</style>