<template>
  <div v-if="isVisible" class="city-modal-overlay" @click="close" v-motion="overlayMotion">
    <div class="city-modal" @click.stop v-motion="modalMotion">
      <div class="modal-bg-container">
        <img src="@/assets/yz/04/bg1.png" alt="背景框" class="modal-bg" />
      </div>
      
      <button class="close-btn" @click="close">
        <img src="@/assets/yz/04/关闭.png" alt="关闭" class="close-icon" />
      </button>
      
      <div class="modal-content">
        <div class="city-header">
          <h2 class="city-title">{{ cityData?.name || '城市名称' }}</h2>
        </div>

        <div class="content-area">
          <div v-show="activeTab === 'text'" class="text-content" v-motion="textMotion">
            <div class="text-section">
              <h3>城市介绍</h3>
              <p>{{ cityData?.description || '这里是城市的详细介绍内容...' }}</p>
            </div>
          </div>

          <div v-show="activeTab === 'video'" class="video-content" v-motion="videoMotion">
            <div class="video-wrapper">
              <video 
                v-if="cityData?.videoUrl"
                :src="cityData.videoUrl" 
                controls 
                class="city-video"
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
            
            <div class="video-info">
              <h4>{{ cityData?.name }}宣传片</h4>
              <p>展示{{ cityData?.name }}的城市风貌和文化特色</p>
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface CityData {
  name: string
  description: string
  videoUrl: string
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

watch(() => props.isVisible, (visible) => {
  if (visible) {
    document.addEventListener('keydown', handleEscKey)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleEscKey)
    document.body.style.overflow = 'auto'
  }
})

const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') close()
}
</script>

<style scoped>
.city-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.city-modal {
  position: relative;
  width: 95vw;
  max-width: 450px;
  height: auto;
}

.modal-bg-container {
  position: relative;
  width: 100%;
  height: auto;
}

.modal-bg {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 15;
  padding: 0;
}

.close-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.close-btn:hover { transform: scale(1.1); }

.modal-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 80px 40px 80px;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.city-header {
  text-align: center;
  margin-bottom: 25px;
}

.city-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #8B0000;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.content-area {
  flex: 1;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.1);
}

.text-content {
  height: 100%;
  overflow-y: auto;
}

.text-section {
  margin-bottom: 20px;
}

.text-section h3 {
  color: #8B0000;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  border-bottom: 3px solid #FFD700;
  padding-bottom: 6px;
}

.text-section p {
  color: #333;
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
}

.video-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}

.video-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.city-video {
  width: 100%;
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.video-placeholder {
  width: 100%;
  height: 150px;
  background: #f5f5f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px dashed #ddd;
}

.placeholder-content {
  text-align: center;
  color: #999;
}

.placeholder-content svg {
  margin-bottom: 10px;
}

.video-info h4 {
  color: #8B0000;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-align: center;
}

.video-info p {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
  text-align: center;
}

.tab-buttons {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 20;
}

.tab-btn {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border: 3px solid #8B0000;
  border-radius: 30px;
  padding: 12px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #8B0000;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  min-width: 120px;
}

.tab-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #FFA500, #FF8C00);
}

.tab-btn.active {
  background: linear-gradient(135deg, #8B0000, #CD5C5C);
  color: #FFD700;
  border-color: #FFD700;
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(139, 0, 0, 0.4);
}

.tab-btn.active:hover {
  transform: translateY(-4px);
}

.text-content::-webkit-scrollbar {
  width: 6px;
}

.text-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.text-content::-webkit-scrollbar-thumb {
  background: #8B0000;
  border-radius: 3px;
}

.text-content::-webkit-scrollbar-thumb:hover {
  background: #6b0000;
}

@media (max-width: 768px) {
  .city-modal {
    width: 95vw;
    max-width: 380px;
  }
  
  .modal-content {
    padding: 60px 25px 70px;
  }
  
  .city-title {
    font-size: 1.6rem;
  }
  
  .content-area {
    padding: 15px;
  }
  
  .text-section h3 {
    font-size: 1.1rem;
  }
  
  .text-section p {
    font-size: 0.9rem;
  }
  
  .tab-btn {
    padding: 10px 16px;
    font-size: 0.8rem;
    min-width: 100px;
  }
  
  .video-placeholder {
    height: 120px;
  }
}
</style>