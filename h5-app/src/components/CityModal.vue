<template>
  <div v-if="isVisible" class="city-modal-overlay" v-motion="overlayMotion">
    <!-- 右上角角标 -->
    <div class="corner-badge">
      <img src="@/assets/yz/04/角标.png" alt="纪念抗日战争胜利80周年" class="badge-img" />
    </div>
    
    <!-- 模态框主体 -->
    <div class="city-modal" @click.stop v-motion="modalMotion">
      <!-- 居中容器 -->
      <div class="modal-inner">
        <!-- 背景图片 -->
        <img src="@/assets/yz/04/bg1.png" alt="模态框背景" class="modal-bg-image" />
        
        <!-- 关闭按钮 -->
        <button class="close-btn" @click="close">
          <img src="@/assets/yz/04/关闭.png" alt="关闭" class="close-icon" />
        </button>
        
        <!-- 内容区域 -->
        <div class="modal-content">
          <!-- 城市标题 -->
          <h2 v-if="cityData?.name" class="city-title" v-motion="textMotion">
            {{ cityData.name }}
          </h2>
          
          <!-- 文字内容 -->
          <div class="text-content" v-motion="textMotion">
            <p>{{ cityData?.description || '这里是城市的详细介绍内容...' }}</p>
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
  width:100%;
  height:100%;
  background: linear-gradient(135deg, 
    rgba(139, 0, 0, 0.15), 
    rgba(0, 0, 0, 0.8)
  );
  z-index: 1000;
  backdrop-filter: blur(8px) saturate(1.2);
}

/* 右上角角标 - 移动端优化 */
.corner-badge {
  position: fixed;
  top: 20px;
  left: 20px;
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
  height: 25px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))
          drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}


/* 主模态框容器 - 移动端优化 */
.city-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height:100%;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 模态框内部居中容器 */
.modal-inner {
  position: relative;
  width: 80%;
  height: 80%;
  border-radius: 12px;
  overflow: hidden;
  filter: drop-shadow(0 15px 30px rgba(139, 0, 0, 0.3));
}

/* 背景图片 - img标签 */
.modal-bg-image {
  position: absolute;
  width: 100%;
  object-fit: contain;
  object-position: center -10px;
  z-index: 1;
}


/* 关闭按钮 - 移动端优化 */
.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 3;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
}

.close-btn:active {
  transform: scale(0.95);
}

.close-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  display: block;
}

/* 内容容器 - 移动端优化 */
.modal-content {
  position: absolute;
  top: 40px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  box-sizing: border-box;
  overflow: hidden;
}

/* 城市标题 */
.city-title {
  color: #8B0000;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 15px 0;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  letter-spacing: 1px;
  background: linear-gradient(135deg, #8B0000, #DAA520);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  flex-shrink: 0;
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


/* 文字内容样式 - 简化版 */
.text-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 10px;
  min-height: 0;
}

.text-content p {
  color: #2c3e50;
  line-height: 1.6;
  font-size: 0.9rem;
  margin: 0;
  padding: 0 5px 15px 25px;
  text-indent: 2em;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
}




/* 自定义滚动条 - 移动端优化 */
.text-content::-webkit-scrollbar {
  width: 6px;
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