<template>
  <div class="relative bg-white rounded-2xl w-[80%] h-[80%] overflow-hidden shadow-2xl animate-modal-enter flex mt-8" @click.stop>

    <!-- 彩带装饰 -->
    <!-- <img src="@/assets/yz/04/彩带1.png" class="absolute -bottom-4 -left-4 w-30 h-30 opacity-80 pointer-events-none z-10 animate-ribbon"> -->

    <!-- 城市信息 -->
    <div v-if="cityData" class="flex w-full h-full">
      
      <!-- 左侧：城市标题 + 历史事件列表 + 主创按钮 -->
      <div class="flex-shrink-0 w-[22%] bg-gradient-to-br from-gray-50 to-gray-100 border-r border-gray-200 flex flex-col">
        <!-- 城市标题（固定不滚动） -->
        <div class="flex-shrink-0 text-center p-2 pb-1.5 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-red-800 mb-0.5 drop-shadow-sm tracking-wide">{{ cityData.name }}</h2>
        </div>

        <!-- 上部区域：历史事件列表 (80%) -->
        <div class="flex-1 p-2 overflow-y-auto custom-scrollbar" style="flex: 0.8;">
          <!-- 历史事件列表 -->
          <div v-if="cityData.historyItems && cityData.historyItems.length > 0">
            <div class="flex items-center justify-between mb-1.5">
              <h3 class="text-xs font-bold text-gray-800 pl-1 border-l-2 border-red-600">历史事件</h3>
              <span class="text-xs text-gray-500 bg-gray-200 px-1 py-0.5 rounded-full">{{ cityData.historyItems.length }}</span>
            </div>
            
            <div class="space-y-1">
              <div 
                v-for="(item, index) in cityData.historyItems" 
                :key="index"
                class="group relative p-1.5 rounded cursor-pointer transition-all duration-200 border shadow-sm hover:shadow-md"
                :class="selectedHistoryIndex === index && viewMode === 'history'
                  ? 'bg-gradient-to-r from-red-50 to-red-25 border-red-300 shadow-md ring-2 ring-red-200 transform scale-[1.02]' 
                  : 'bg-white border-gray-200 hover:bg-gradient-to-r hover:from-red-25 hover:to-red-50 hover:border-red-200'"
                @click="selectHistory(index)"
              >
                <div class="flex items-start">
                  <div 
                    class="w-3.5 h-3.5 rounded-full flex items-center justify-center text-white text-xs font-bold mr-1.5 flex-shrink-0 transition-all duration-200 shadow-sm"
                    :class="selectedHistoryIndex === index && viewMode === 'history' ? 'bg-gradient-to-br from-red-600 to-red-700 scale-110' : 'bg-gradient-to-br from-gray-400 to-gray-500 group-hover:from-red-500 group-hover:to-red-600'"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-xs font-medium mb-0 transition-colors duration-200 leading-tight"
                        :class="selectedHistoryIndex === index && viewMode === 'history' ? 'text-red-900' : 'text-gray-800 group-hover:text-red-800'">
                      {{ item.title }}
                    </h4>
                  </div>
                  <!-- 选中指示器 -->
                  <div v-if="selectedHistoryIndex === index && viewMode === 'history'" 
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

        <!-- 下部区域：主创人员按钮 (20%) -->
        <div v-if="cityData.creativeTeam" class="p-2 border-t border-gray-200" style="flex: 0.2;">
          <div class="h-full flex flex-col">
            <!-- 标题 -->
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xs font-bold text-gray-800 pl-1 border-l-2 border-red-600">主创人员</h3>
              <span class="text-xs text-red-700 bg-red-100 px-1 py-0.5 rounded-full border border-red-200">{{ getCreativeTeamCount() }}</span>
            </div>
            
            <!-- 主创按钮 -->
            <button 
              class="flex-1 text-left p-2 rounded cursor-pointer transition-all duration-200 border border-gray-300 min-h-0"
              :class="viewMode === 'creators' 
                ? 'bg-red-50 border-red-300 text-red-800' 
                : 'bg-gray-50 hover:bg-red-25 hover:border-red-200 text-gray-600 hover:text-red-700'"
              @click="viewMode = 'creators'"
            >
              <div class="flex items-center">
                <div class="w-2 h-2 rounded-full mr-2 flex-shrink-0"
                     :class="viewMode === 'creators' ? 'bg-red-500' : 'bg-gray-400'">
                </div>
                <span class="text-xs font-medium">
                  主创团队
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- 右侧：详情展示区域 -->
      <div class="flex-1 flex flex-col bg-white">
        <!-- 详情标题栏 - 紧凑样式 -->
        <div class="flex-shrink-0 bg-gradient-to-r from-red-800 via-red-700 to-red-600 text-white px-4 py-2.5 shadow-xl">
          <div class="flex items-center justify-between">
            <h4 class="text-base font-bold truncate tracking-wide">
              {{ getDisplayTitle() }}
            </h4>
          </div>
        </div>

        <!-- 详情内容区域 -->
        <div class="flex-1 flex overflow-hidden">
          
          <!-- 历史事件模式：视频优先布局 -->
          <div v-if="viewMode === 'history' && selectedHistory" class="flex flex-col w-full h-full">
            
            <!-- 压缩的文字描述区域 -->
            <div class="h-[34%] bg-gradient-to-br flex-shrink-0 p-1">
              <div class="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div class="h-full pt-1 pb-1 px-3 overflow-hidden relative" style="-webkit-overflow-scrolling: touch;">
                  <div 
                    class="text-base leading-6 text-gray-800 font-light scroll-text-content"
                    :style="{ transform: `translateY(${scrollOffset}px)` }"
                  >
                    {{ selectedHistory.description }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 主要视频显示区域 -->
            <div class="flex-1 bg-gradient-to-br  min-h-0">
              <div class="h-full p-1 flex flex-col">
                <div v-if="selectedHistory.src" class="flex-1 flex items-center justify-center rounded-xl overflow-hidden min-h-0">
                  <video 
                    :src="selectedHistory.src" 
                    :poster="selectedHistory.poster"
                    controls 
                    class="h-full object-contain rounded-lg shadow-2xl"
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

          <!-- 主创人员模式：主创人员展示 -->
          <div v-else-if="viewMode === 'creators'" class="w-full bg-gradient-to-br from-red-50 to-red-100">
            <div class="h-full p-3 overflow-y-auto custom-scrollbar flex flex-col">
              <!-- 项目信息头部 -->
              <div class="bg-white rounded-lg border border-red-200 mb-3 p-3 flex-shrink-0">
                <div class="text-center border-b border-red-100 pb-2 mb-2">
                  <h3 class="text-base font-bold text-red-800">《烽火》第二季 {{ cityData.name }}篇</h3>
                </div>
                
                <!-- 主要职位紧凑布局 -->
                <div class="grid grid-cols-3 gap-2 text-center">
                  <!-- 总导演 -->
                  <div v-if="cityData.creativeTeam?.totalDirector" class="bg-red-50 rounded p-2 border border-red-200">
                    <div class="text-xs font-bold text-red-800">总导演</div>
                    <div class="text-sm font-bold text-red-900">{{ cityData.creativeTeam.totalDirector }}</div>
                  </div>

                  <!-- 总制片人 -->
                  <div v-if="cityData.creativeTeam?.totalProducer" class="bg-red-50 rounded p-2 border border-red-200">
                    <div class="text-xs font-bold text-red-800">总制片人</div>
                    <div class="text-sm font-bold text-red-900">{{ cityData.creativeTeam.totalProducer }}</div>
                  </div>

                  <!-- 总策划 -->
                  <div v-if="cityData.creativeTeam?.totalPlanner?.length" class="bg-red-50 rounded p-2 border border-red-200">
                    <div class="text-xs font-bold text-red-800">总策划</div>
                    <div class="text-sm font-bold text-red-900">
                      {{ cityData.creativeTeam.totalPlanner.join('、') }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- 制作团队（紧凑版） -->
              <div class="bg-white rounded-lg border border-red-200 p-3 flex-shrink-0">
                <div class="text-center border-b border-red-100 pb-1 mb-3">
                  <h4 class="text-sm font-bold text-red-800">制作团队</h4>
                </div>

                <div class="grid grid-cols-2 gap-3 h-full">
                  <!-- 左列 -->
                  <div class="space-y-2">
                    <!-- 制片人 -->
                    <div v-if="cityData.creativeTeam?.producer?.length">
                      <div class="flex items-center mb-1">
                        <div class="w-2 h-2 bg-red-600 mr-1"></div>
                        <h5 class="font-bold text-red-800 text-xs">制片人</h5>
                      </div>
                      <div class="space-y-1">
                        <div v-for="(person, index) in cityData.creativeTeam.producer" :key="index" 
                             class="text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200 text-center">
                          {{ person }}
                        </div>
                      </div>
                    </div>

                    <!-- 视觉设计 -->
                    <div v-if="cityData.creativeTeam?.visual?.length">
                      <div class="flex items-center mb-1">
                        <div class="w-2 h-2 bg-red-600 mr-1"></div>
                        <h5 class="font-bold text-red-800 text-xs">视觉设计</h5>
                      </div>
                      <div class="space-y-1">
                        <div v-for="(person, index) in cityData.creativeTeam.visual" :key="index" 
                             class="text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200 text-center">
                          {{ person }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 右列 -->
                  <div class="space-y-2">
                    <!-- 导演 -->
                    <div v-if="cityData.creativeTeam?.director?.length">
                      <div class="flex items-center mb-1">
                        <div class="w-2 h-2 bg-red-600 mr-1"></div>
                        <h5 class="font-bold text-red-800 text-xs">导演</h5>
                      </div>
                      <div class="space-y-1">
                        <div v-for="(person, index) in cityData.creativeTeam.director" :key="index" 
                             class="text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200 text-center">
                          {{ person }}
                        </div>
                      </div>
                    </div>

                    <!-- 宣传推广 -->
                    <div v-if="cityData.creativeTeam?.promotion?.length">
                      <div class="flex items-center mb-1">
                        <div class="w-2 h-2 bg-red-600 mr-1"></div>
                        <h5 class="font-bold text-red-800 text-xs">宣传推广</h5>
                      </div>
                      <div class="space-y-1">
                        <div v-for="(person, index) in cityData.creativeTeam.promotion" :key="index" 
                             class="text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200 text-center">
                          {{ person }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 默认城市介绍模式 -->
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

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

interface HistoryItem {
  title: string
  description: string
  src: string
  poster?: string
}

interface CreativeTeam {
  totalDirector: string
  totalPlanner: string[]
  totalProducer: string
  producer: string[]
  director: string[]
  visual: string[]
  promotion: string[]
}

interface CityData {
  name: string
  historyItems: HistoryItem[]
  creativeTeam?: CreativeTeam
  description?: string
}

const props = defineProps<{
  cityData: CityData
}>()

const emit = defineEmits(['close'])

// 视图模式：'history' | 'creators'
const viewMode = ref<'history' | 'creators'>('history')

// 选中的历史事件索引
const selectedHistoryIndex = ref(0)

// 滚动字幕相关状态
const scrollOffset = ref(0)
const scrollTimer = ref<number | null>(null)

// 选中的历史事件
const selectedHistory = computed(() => {
  if (!props.cityData?.historyItems?.length) return null
  return props.cityData.historyItems[selectedHistoryIndex.value] || null
})

// 获取显示标题
const getDisplayTitle = () => {
  if (viewMode.value === 'creators') {
    return '主创人员介绍'
  }
  return selectedHistory.value?.title || '城市介绍'
}

// 获取主创团队人数
const getCreativeTeamCount = () => {
  const team = props.cityData?.creativeTeam
  if (!team) return 0
  
  let count = 0
  if (team.totalDirector) count++
  if (team.totalProducer) count++
  count += (team.totalPlanner?.length || 0)
  count += (team.producer?.length || 0)
  count += (team.director?.length || 0)
  count += (team.visual?.length || 0)
  count += (team.promotion?.length || 0)
  
  return count
}


// 开始滚动字幕效果
const startScrollText = () => {
  if (scrollTimer.value) {
    clearInterval(scrollTimer.value)
  }
  
  scrollOffset.value = 0
  
  // 延迟获取尺寸，确保DOM已渲染
  setTimeout(() => {
    const container = document.querySelector('.scroll-text-content')?.parentElement
    const content = document.querySelector('.scroll-text-content')
    
    if (container && content) {
      const containerHeight = container.clientHeight
      const contentHeight = content.scrollHeight
      
      // 只有当内容高度大于容器高度时才开始滚动
      if (contentHeight > containerHeight) {
        const maxScroll = contentHeight - containerHeight
        const scrollStep = 1 // 每次滚动1像素
        
        scrollTimer.value = window.setInterval(() => {
          if (Math.abs(scrollOffset.value) < maxScroll) {
            scrollOffset.value -= scrollStep
          } else {
            // 滚动完成，暂停一会儿再重新开始
            setTimeout(() => {
              scrollOffset.value = 0
              startScrollText()
            }, 2000)
            clearInterval(scrollTimer.value!)
            scrollTimer.value = null
          }
        }, 100) // 每100ms滚动一次
      } else {
        // 内容未超出容器，不需要滚动，确保内容在顶部显示
        scrollOffset.value = 0
      }
    }
  }, 100)
}

// 选择历史事件
const selectHistory = (index: number) => {
  selectedHistoryIndex.value = index
  viewMode.value = 'history'  // 切换到历史模式
  // 选择新事件时重新开始滚动字幕效果
  setTimeout(() => {
    startScrollText()
  }, 100)
}



// 监听城市数据变化，重置选中状态
watch(() => props.cityData, () => {
  selectedHistoryIndex.value = 0
  viewMode.value = 'history'  // 重置为历史模式
  // 延迟启动滚动字幕效果，确保DOM更新完成
  setTimeout(() => {
    startScrollText()
  }, 200)
}, { immediate: true })

// 组件挂载时初始化
onMounted(() => {
  setTimeout(() => {
    startScrollText()
  }, 300)
})
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
  line-clamp: 2;
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

/* 滚动字幕效果样式 */
.scroll-text-content {
  position: relative;
  padding: 8px 0;
  white-space: pre-line;
  transition: transform 0.1s linear;
  word-break: break-word;
  line-height: 1.6;
}

</style>