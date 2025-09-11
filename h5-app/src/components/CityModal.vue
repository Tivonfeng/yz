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
      <div class="modal-bg-container">
        
        <div class="modal-content">
          <!-- 城市名称标题 -->
          <div class="city-header" v-if="cityData?.name" v-motion="headerMotion">
            <h2 class="city-title">{{ cityData.name }}</h2>
          </div>
          
          <!-- 内容展示区域 - 全宽显示 -->
          <div class="content-area">
            <div class="text-content" v-motion="textMotion">
              <div class="text-section">
                <p>{{ cityData?.description || '这里是城市的详细介绍内容...' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface CityData {
  name: string
  description: string
}

interface Props {
  isVisible: boolean
  cityData?: CityData | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

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

const headerMotion = computed(() => ({
  initial: { opacity: 0, y: -20 },
  enter: { opacity: 1, y: 0, transition: { delay: 100, duration: 400 } }
}))

const textMotion = computed(() => ({
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { delay: 200, duration: 500 } }
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
  height: 85vh;
  max-height: 600px;
  border-radius: 16px;
  background-image: url('@/assets/yz/04/bg1.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 1;
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
  top: 120px;
  left: 40px;
  right: 40px;
  height: 420px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  box-sizing: border-box;
  overflow: hidden;
}

/* 城市标题头部 */
.city-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 0 10px;
  flex-shrink: 0;
}

.city-title {
  color: #8B0000;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #8B0000, #DAA520);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.city-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #8B0000, #DAA520, #8B0000);
  border-radius: 2px;
}


/* 内容区域 - 精确定位在背景框内 */
.content-area {
  overflow: hidden;
  padding: 0 15px;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 350px;
  flex-shrink: 0;
}


/* 文字内容样式 - 充分填充 */
.text-content {
  flex: 1;
  overflow: hidden;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.text-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  height: 100%;
}

.text-section p {
  color: #2c3e50;
  line-height: 1.6;
  font-size: 0.95rem;
  margin: 0;
  padding: 0 5px 10px 0;
  text-indent: 2em;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  flex-shrink: 0;
}




/* 自定义滚动条 - 党政主题 */
.text-section::-webkit-scrollbar {
  width: 8px;
}

.text-section::-webkit-scrollbar-track {
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  border-radius: 4px;
}

.text-section::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #8B0000, #DAA520);
  border-radius: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.text-section::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #660000, #B8860B);
}

/* 横屏适配 */
@media screen and (orientation: landscape) and (max-height: 600px) {
  .modal-bg-container {
    height: 90vh;
    max-height: 500px;
  }
  
  .modal-content {
    top: 80px;
    left: 50px;
    right: 50px;
    height: 340px;
  }
  
  .content-area {
    height: 280px;
  }
  
  .close-btn {
    top: 50px;
    right: 140px;
  }
  
  .city-title {
    font-size: 1.3rem;
    margin-bottom: 5px;
  }
  
  .city-header {
    margin-bottom: 8px;
  }
  
  .text-section p {
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

/* 极小屏幕横屏适配 */
@media screen and (orientation: landscape) and (max-height: 450px) {
  .modal-bg-container {
    height: 95vh;
    max-height: 400px;
  }
  
  .modal-content {
    top: 60px;
    height: 280px;
  }
  
  .content-area {
    height: 220px;
  }
  
  .city-title {
    font-size: 1.2rem;
  }
  
  .text-section p {
    font-size: 0.85rem;
    line-height: 1.4;
  }
}


</style>