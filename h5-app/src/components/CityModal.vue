<template>
  <div class="relative bg-white rounded-2xl w-[80%] h-[80%]  overflow-hidden shadow-2xl animate-modal-enter flex" @click.stop>
    <!-- 关闭按钮 -->
    <button 
      class="absolute top-0 right-1 w-10 h-10 bg-black/5 hover:bg-red-50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-30 group border border-gray-200 hover:border-red-200"
      @click="$emit('close')" 
      aria-label="关闭"
    >
      <svg class="w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M6 18L18 6"/>
      </svg>
    </button>

    <!-- 彩带装饰 -->
    <!-- <img src="@/assets/yz/04/彩带1.png" class="absolute -bottom-4 -left-4 w-30 h-30 opacity-80 pointer-events-none z-10 animate-ribbon"> -->

    <!-- 城市信息 -->
    <div v-if="cityData" class="flex w-full h-full">
      
      <!-- 左侧：城市标题 + 历史事件列表 -->
      <div class="flex-shrink-0 w-[22%] bg-gradient-to-br from-gray-50 to-gray-100 p-2 overflow-y-auto custom-scrollbar border-r border-gray-200">
        <!-- 城市标题 -->
        <div class="text-center mb-2 pb-1.5">
          <h2 class="text-xl font-bold text-red-800 mb-0.5 drop-shadow-sm tracking-wide">{{ cityData.name }}</h2>
          <div class="text-xs text-red-600 font-medium bg-red-50 px-1.5 py-0.5 rounded-full inline-block">历史名城</div>
        </div>

        <!-- 历史事件列表 -->
        <div v-if="cityData.historyItems && cityData.historyItems.length > 0">
          <div class="flex items-center justify-between mb-1.5">
            <h3 class="text-xs font-bold text-gray-800 pl-1 border-l-2 border-red-600">事件</h3>
            <span class="text-xs text-gray-500 bg-gray-200 px-1 py-0.5 rounded-full">{{ cityData.historyItems.length }}</span>
          </div>
          
          <div class="space-y-1">
            <div 
              v-for="(item, index) in cityData.historyItems" 
              :key="index"
              class="group relative p-1.5 rounded cursor-pointer transition-all duration-200 border shadow-sm hover:shadow-md"
              :class="selectedHistoryIndex === index 
                ? 'bg-gradient-to-r from-red-50 to-red-25 border-red-300 shadow-md ring-2 ring-red-200 transform scale-[1.02]' 
                : 'bg-white border-gray-200 hover:bg-gradient-to-r hover:from-red-25 hover:to-red-50 hover:border-red-200'"
              @click="selectHistory(index)"
            >
              <div class="flex items-start">
                <div 
                  class="w-3.5 h-3.5 rounded-full flex items-center justify-center text-white text-xs font-bold mr-1.5 flex-shrink-0 transition-all duration-200 shadow-sm"
                  :class="selectedHistoryIndex === index ? 'bg-gradient-to-br from-red-600 to-red-700 scale-110' : 'bg-gradient-to-br from-gray-400 to-gray-500 group-hover:from-red-500 group-hover:to-red-600'"
                >
                  {{ index + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-xs font-medium mb-0 transition-colors duration-200 leading-tight"
                      :class="selectedHistoryIndex === index ? 'text-red-900' : 'text-gray-800 group-hover:text-red-800'">
                    {{ item.title }}
                  </h4>
                  <!-- <p class="text-xs leading-relaxed transition-colors duration-300"
                     :class="selectedHistoryIndex === index ? 'text-red-700' : 'text-gray-600 group-hover:text-red-600'">
                    {{ getPreview(item.description, 60) }}
                  </p> -->
                </div>
                <!-- 选中指示器 -->
                <div v-if="selectedHistoryIndex === index" 
                     class="absolute right-1 top-1/2 transform -translate-y-1/2">
                  <div class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 无历史事件时的城市介绍 -->
        <div v-else>
          <h3 class="text-lg font-bold text-gray-800 mb-3 pl-2 border-l-4 border-red-800">城市介绍</h3>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <p class="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
              {{ cityData.description || '暂无描述' }}
            </p>
          </div>
        </div>
      </div>

      <!-- 右侧：详情展示区域 -->
      <div class="flex-1 flex flex-col bg-white">
        <!-- 详情标题栏 - 紧凑样式 -->
        <div class="flex-shrink-0 bg-gradient-to-r from-red-800 via-red-700 to-red-600 text-white px-4 py-2.5 shadow-xl">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold truncate tracking-wide">
              {{ selectedHistory?.title || (cityData.name + ' 城市介绍') }}
            </h4>
          </div>
        </div>

        <!-- 详情内容区域 -->
        <div class="flex-1 flex overflow-hidden">
          
          <!-- 有历史事件时：视频优先布局 -->
          <div v-if="selectedHistory" class="flex flex-col w-full h-full">
            
            <!-- 压缩的文字描述区域 -->
            <div class="h-[30%] bg-gradient-to-br from-gray-50 to-gray-100 border-b-2 border-red-200 flex-shrink-0">
              <div class="h-full p-3 overflow-y-auto custom-scrollbar">
                <div class="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                  <p class="text-xs leading-5 text-gray-800 whitespace-pre-line font-light">
                    {{ selectedHistory.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 主要视频显示区域 -->
            <div class="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 min-h-0">
              <div class="h-full p-4 flex flex-col">
                <div v-if="selectedHistory.src" class="flex-1 flex items-center justify-center bg-black/20 rounded-xl overflow-hidden min-h-0">
                  <video 
                    :src="selectedHistory.src" 
                    controls 
                    class="w-full h-full object-contain rounded-lg shadow-2xl"
                    playsinline
                    webkit-playsinline
                  >
                    您的浏览器不支持视频播放
                  </video>
                </div>
                <div v-else class="flex-1 flex items-center justify-center text-gray-400 bg-black/20 rounded-xl">
                  <div class="text-center">
                    <div class="text-5xl mb-4 opacity-60">📹</div>
                    <p class="text-sm font-medium">暂无配套视频</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 无历史事件时：优化城市介绍布局 -->
          <div v-else class="w-full bg-gradient-to-br from-gray-50 to-gray-100">
            <div class="h-full p-8 overflow-y-auto custom-scrollbar flex items-center justify-center">
              <div class="max-w-3xl w-full">
                <div class="bg-white rounded-2xl p-8 shadow-lg">
                  <div class="text-center mb-8">
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span class="text-2xl">🏛️</span>
                    </div>
                    <h3 class="text-lg font-bold text-red-800 mb-2">{{ cityData.name }}</h3>
                    <div class="w-12 h-0.5 bg-red-600 mx-auto"></div>
                  </div>
                  <div class="prose prose-gray max-w-none">
                    <p class="text-sm leading-6 text-gray-700 whitespace-pre-line text-justify">
                      {{ cityData.description || '暂无城市详细介绍' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="flex items-center justify-center w-full h-full text-gray-500">
      <div class="text-center">
        <div class="text-6xl mb-4 opacity-60">🏛️</div>
        <p class="text-sm text-gray-400">暂无城市信息</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  cityData: {
    type: Object,
    default: () => null
  }
})

const emit = defineEmits(['close'])

// 选中的历史事件索引
const selectedHistoryIndex = ref(0)

// 选中的历史事件
const selectedHistory = computed(() => {
  if (!props.cityData?.historyItems?.length) return null
  return props.cityData.historyItems[selectedHistoryIndex.value] || null
})

// 选择历史事件
const selectHistory = (index) => {
  selectedHistoryIndex.value = index
}


// 监听城市数据变化，重置选中状态
watch(() => props.cityData, () => {
  selectedHistoryIndex.value = 0
}, { immediate: true })
</script>

<style scoped>
/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 自定义动画 */
.animate-modal-enter {
  animation: modalEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animate-detail-fade {
  animation: detailFade 0.3s ease-out;
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes detailFade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 文本截断 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 微信兼容性备用样式 */
@supports not (backdrop-filter: blur(8px)) {
  .bg-black\/10 {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
  
  .bg-black\/20 {
    background-color: rgba(0, 0, 0, 0.2) !important;
  }
}

/* 横屏优化 */
@media (orientation: landscape) {
  .animate-modal-enter {
    width: 90vw !important;
    height: 80vh !important;
  }
}


</style>