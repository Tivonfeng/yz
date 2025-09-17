<script setup lang="ts">
import { ref, onMounted, provide, watch } from 'vue'
import { useRoute } from 'vue-router'
import VConsole from 'vconsole'

const route = useRoute()
const isPlaying = ref(false)
const audioElement = ref<HTMLAudioElement | null>(null)
const isLoading = ref(true)
const loadingProgress = ref(0)
const isMobile = ref(true)
const isIOS = ref(false)
const audioContext = ref<AudioContext | null>(null)
const gainNode = ref<GainNode | null>(null)
const audioSource = ref<MediaElementAudioSourceNode | null>(null)
const normalVolume = ref(1)
const lowVolume = ref(1)

// 城市模态框可见性状态
const isModalVisible = ref(false)

// 提供模态框状态和音量控制给子组件
provide('modalState', {
  isModalVisible,
  setModalVisible: (visible: boolean) => {
    isModalVisible.value = visible
  }
})

provide('audioControl', {
  setVolume: (volume: number) => setVolume(volume),
  normalVolume,
  lowVolume
})


// 检测是否是iOS设备
const checkIOS = () => {
  const ua = navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod|ios/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

// 检测是否是移动端设备
const checkMobile = () => {
  const ua = navigator.userAgent.toLowerCase()
  const mobileKeywords = [
    'mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 
    'windows phone', 'opera mini', 'iemobile', 'wpdesktop'
  ]
  
  // 检查 User Agent 是否包含移动设备关键词
  const isMobileUA = mobileKeywords.some(keyword => ua.includes(keyword))
  
  // 检查屏幕尺寸（移动端通常宽度小于768px）
  const isMobileScreen = window.innerWidth <= 768
  
  // 检查触摸支持
  const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  return isMobileUA || (isMobileScreen && hasTouchSupport)
}

// 初始化Web Audio API (iOS设备)
const initWebAudioAPI = async () => {
  if (!audioElement.value || audioContext.value) return
  console.log('开始初始化Web Audio API')
  try {
    // 创建AudioContext
    audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)()
    console.log('AudioContext创建完成，初始状态:', audioContext.value.state)
    
    // 确保AudioContext处于运行状态
    if (audioContext.value.state === 'suspended') {
      console.log('AudioContext处于suspended状态，尝试resume...')
      await audioContext.value.resume()
      console.log('AudioContext resume后状态:', audioContext.value.state)
    }
    
    // 创建GainNode用于音量控制
    gainNode.value = audioContext.value.createGain()
    console.log('GainNode创建完成')
    
    // 创建MediaElementSource
    audioSource.value = audioContext.value.createMediaElementSource(audioElement.value)
    console.log('MediaElementSource创建完成')
    
    // 连接音频节点: source -> gainNode -> destination
    audioSource.value.connect(gainNode.value)
    gainNode.value.connect(audioContext.value.destination)
    console.log('音频节点连接完成')
    
    // 设置初始音量 (根据当前页面)
    const currentVolume = route.name === 'page3' ? lowVolume.value : normalVolume.value
    gainNode.value.gain.value = currentVolume
    
    console.log('Web Audio API 初始化完成，最终AudioContext状态:', audioContext.value.state, '音量:', currentVolume)
  } catch (error) {
    console.warn('Web Audio API 初始化失败:', error)
    // 如果Web Audio API初始化失败，标记为非iOS设备处理
    isIOS.value = false
  }
}

// 设置音量
const setVolume = (volume: number) => {
  if (isIOS.value && gainNode.value) {
    // iOS设备使用Web Audio API
    gainNode.value.gain.setValueAtTime(volume, audioContext.value?.currentTime || 0)
  } else if (audioElement.value) {
    // 非iOS设备直接设置audioElement音量
    audioElement.value.volume = volume
  }
}

const initWechatAudio = () => {
  if (!audioElement.value) return
  
  // 先预加载音频
  audioElement.value.load()
  
  // 监听微信的音频事件
  document.addEventListener('WeixinJSBridgeReady', () => {
    if (audioElement.value) {
      audioElement.value.play().then(() => {
        audioElement.value?.pause()
        console.log('音频初始化完成')
      }).catch(err => {
        console.log('音频初始化失败:', err)
      })
    }
  })
  
  // 如果 WeixinJSBridge 已经准备好
  if (typeof WeixinJSBridge !== 'undefined') {
    if (audioElement.value) {
      audioElement.value.play().then(() => {
        audioElement.value?.pause()
        console.log('音频初始化完成！')
      }).catch(err => {
        console.log('音频初始化失败:', err)
      })
    }
  }
}

const toggleMusic = () => {
  if (!audioElement.value) {
    isPlaying.value = !isPlaying.value
    return
  }
  
  if (isPlaying.value) {
    audioElement.value.pause()
    isPlaying.value = false
  } else {
    // 重置播放位置
    audioElement.value.currentTime = 0
    
    audioElement.value.play().then(() => {
      isPlaying.value = true
    }).catch(err => {
      console.log('音频播放失败:', err)
      // 尝试重新加载音频
      if (audioElement.value) {
        audioElement.value.load()
        setTimeout(() => {
          audioElement.value?.play().then(() => {
            isPlaying.value = true
          }).catch(() => {
            console.log('重试播放失败')
          })
        }, 500)
      }
    })
  }
}

// 一次性预加载系统
const preloadResources = async () => {
  console.log('🚀 开始一次性预加载所有资源...')
  
  // 获取所有图片资源
  const imageModules = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,gif,svg}', { eager: true })
  const imagePaths = Object.keys(imageModules).map(path => {
    const module = imageModules[path] as { default: string }
    return module.default
  })
  
  // 视频海报资源
  const posterPaths = [
    new URL('@/assets/yz/04/video/仪征/1.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/仪征/2.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/仪征/3.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/仪征/4.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/仪征/5.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/来安/1.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/来安/2.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/来安/3.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/六合/1.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/六合/2.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/六合/3.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/金湖/1.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/定远/1.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/定远/2.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/定远/3.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/盱眙/1.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/盱眙/2.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/盱眙/3.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/盱眙/4.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/盱眙/5.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/盱眙/6.png', import.meta.url).href,
    new URL('@/assets/yz/04/video/盱眙/7.png', import.meta.url).href,
  ]

  // 合并所有资源
  const allImagePaths = [...imagePaths, ...posterPaths]
  let totalLoaded = 0
  const totalResources = allImagePaths.length + 2 // +2音频

  // 更新进度辅助函数
  const updateProgress = () => {
    totalLoaded++
    loadingProgress.value = Math.round((totalLoaded / totalResources) * 100)
  }

  // 通用图片加载函数
  const loadImage = (src: string) => new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => {
      updateProgress()
      resolve()
    }
    img.onerror = () => {
      updateProgress()
      console.warn(`⚠️ 图片加载失败: ${src.split('/').pop()}`)
      resolve()
    }
    img.src = src
  })

  // 通用音频预加载函数
  const preloadAudio = (audioPath: string) => 
    new Promise<void>(async (resolve) => {
      try {
        const audio = new Audio()
        audio.preload = 'metadata'
        audio.oncanplay = () => {
          updateProgress()
          resolve()
        }
        audio.onerror = () => {
          updateProgress()
          resolve()
        }
        const module = await import(audioPath)
        audio.src = module.default
      } catch (error) {
        updateProgress()
        resolve()
      }
    })

  try {
    // 一次性加载所有资源
    console.log(`📦 一次性加载 ${totalResources} 个资源...`)
    await Promise.all([
      ...allImagePaths.map(loadImage),
      preloadAudio('@/assets/background-music.mp3'),
      preloadAudio('@/assets/open-close.mp3')
    ])
    console.log(`🎉 所有资源预加载完成！总计: ${totalResources} 个资源`)

  } catch (error) {
    console.error('❌ 资源加载失败:', error)
  }
}

// 监听路由变化，在Page3页面降低音量
watch(() => route.name, (newRouteName) => {
	console.log('切换路由')
  if (newRouteName === 'page3') {
	console.log('切换路由')
    setVolume(lowVolume.value)
  } else {
    setVolume(normalVolume.value)
  }
})

onMounted(async () => {
  // 初始化vconsole调试工具
  if (import.meta.env.DEV) {
    new VConsole()
    console.log('VConsole 调试工具已启用')
  }
  
  // 检测移动端设备和iOS设备
  isMobile.value = checkMobile()
  isIOS.value = checkIOS()
  
  // 如果不是移动端，添加桌面模式class并停止初始化
  if (!isMobile.value) {
    document.getElementById('app')?.classList.add('desktop-mode')
    isLoading.value = false
    return
  }
  
  // 开始加载资源
  await preloadResources()
  
  // 模拟最小加载时间，让用户看到加载过程
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 隐藏加载页面
  isLoading.value = false
  
  if (audioElement.value) {
    audioElement.value.loop = true
    audioElement.value.volume = normalVolume.value
    audioElement.value.preload = 'auto'
    
    // 统一使用微信环境的音频初始化
    initWechatAudio()
    
    // 监听用户首次触摸事件自动播放
    const playOnFirstTouch = async (event: Event) => {
      console.log('触发事件类型:', event.type)
      
      if (audioElement.value && !isPlaying.value) {
        try {
          // 先开始播放音频
          await audioElement.value.play()
          isPlaying.value = true
          console.log('首次触摸自动播放成功')
          
          // iOS设备在播放成功后初始化Web Audio API
          if (false) {
            console.log('ios设备，开始初始化Web Audio API')
            initWebAudioAPI().catch(err => {
              console.warn('Web Audio API 初始化失败:', err)
            })
          }
          
          // 播放成功后移除所有事件监听器
          document.removeEventListener('touchend', playOnFirstTouch)
          document.removeEventListener('click', playOnFirstTouch)
        } catch (err) {
          console.log('自动播放失败:', err)
          isPlaying.value = false
        }
      }
    }
    
    // 使用touchend而不是touchstart，避免滑动时的误触发
    document.addEventListener('touchend', playOnFirstTouch, { once: true })
    document.addEventListener('click', playOnFirstTouch, { once: true })
  }
})
</script>

<template>
  <div class="app-container">
    <!-- 非移动端提示页面 -->
    <div v-if="!isMobile" class="mobile-only-container">
      <div class="mobile-only-content">
        <img src="@/assets/yz/mustphine.png" alt="请使用手机浏览" class="mobile-hint-image" />
      </div>
    </div>

    <!-- 加载页面 -->
    <div v-if="isLoading && isMobile" class="loading-container">
      <div class="loading-content">
        <div class="loading-logo">
          <div class="loading-icon">♪</div>
        </div>
        <div class="loading-text">铭记抗战历史·传承红色基因</div>
        <div class="loading-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: loadingProgress + '%' }"></div>
          </div>
          <div class="progress-text">{{ loadingProgress }}%</div>
        </div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div v-show="!isLoading && isMobile" class="main-content">
      <RouterView />
      
      <!-- 音乐播放器 -->
      <div v-show="!isModalVisible" class="music-player" @click="toggleMusic">
        <div class="music-icon" :class="{ rotating: isPlaying }">
          ♪
        </div>
      </div>
      
      <!-- 背景音乐 -->
      <audio 
        ref="audioElement" 
        preload="auto"
        webkit-playsinline="true"
        playsinline="true"
        controls="false"
        @play="isPlaying = true"
        @pause="isPlaying = false"
        @error="console.log('音频加载失败，请添加音频文件')"
        @canplaythrough="console.log('音频可以播放')"
      >
        <source src="@/assets/background-music.mp3" type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>

<style>

#app {
  width: 100vh;
  height: 100vw;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 0;
  transform-origin: center center;
  transform: translate(-50%, -50%) rotate(90deg);
}

/* 非移动端时不进行横屏变换 */
#app.desktop-mode {
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
}

.app-container {
	width: 100vh;
	height: 100vw;
  position: relative;
}

#app.desktop-mode .app-container {
	width: 100vw;
	height: 100vh;
}

.main-content {
	width: 100vh;
	height: 100vw;
}

/* 加载页面样式 */
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #8B0000 0%, #A0522D 50%, #D2691E 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
  color: white;
}

.loading-logo {
  margin-bottom: 30px;
}

.loading-icon {
  font-size: 60px;
  color: white;
  animation: loadingPulse 2s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.loading-text {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.loading-progress {
  max-width: 300px;
  margin: 0 auto;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  border-radius: 4px;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.progress-text {
  font-size: 18px;
  font-weight: bold;
  color: #FFD700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

@keyframes loadingPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* 音乐播放器样式 */
.music-player {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border: 2px solid rgba(139, 0, 0, 0.3);
}

.music-player:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 1);
}

.music-icon {
  font-size: 24px;
  color: #8B0000;
  font-weight: bold;
  transition: all 0.3s ease;
}

.music-icon.rotating {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 横屏素材直接展示，无论屏幕方向 */
.landscape-forced {
  width: 100%;
  height: 100%;
  position: relative;
}

/* 非移动端提示页面样式 */
.mobile-only-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #fff8dc 0%, #ffeaa7 50%, #fdcb6e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  transform: none;
}

.mobile-only-content {
  text-align: center;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-hint-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  animation: fadeInScale 1s ease-out;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
