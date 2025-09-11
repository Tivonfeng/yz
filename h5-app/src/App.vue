<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isPlaying = ref(false)
const audioElement = ref<HTMLAudioElement | null>(null)
const isWechat = ref(false)
const isLoading = ref(true)
const loadingProgress = ref(0)

// 检测是否是微信浏览器
const checkWechat = () => {
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('micromessenger')
}

const initWechatAudio = () => {
  if (!audioElement.value) return
  
  // 微信浏览器需要在用户交互后才能播放音频
  // 先预加载音频
  audioElement.value.load()
  
  // 监听微信的音频事件
  document.addEventListener('WeixinJSBridgeReady', () => {
    if (audioElement.value) {
      audioElement.value.play().then(() => {
        audioElement.value?.pause()
        console.log('微信音频初始化完成')
      }).catch(err => {
        console.log('微信音频初始化失败:', err)
      })
    }
  })
  
  // 如果 WeixinJSBridge 已经准备好
  if (typeof WeixinJSBridge !== 'undefined') {
    if (audioElement.value) {
      audioElement.value.play().then(() => {
        audioElement.value?.pause()
        console.log('微信音频初始化完成')
      }).catch(err => {
        console.log('微信音频初始化失败:', err)
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
    // 微信浏览器特殊处理
    if (isWechat.value) {
      audioElement.value.currentTime = 0
    }
    
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

// 预加载资源
const preloadResources = async () => {
  // 使用动态import预加载图片资源
  const imageModules = import.meta.glob('/src/assets/yz/**/*.png', { eager: true })
  const imagePaths = Object.keys(imageModules).map(path => {
    const module = imageModules[path] as { default: string }
    return module.default
  })

  const totalImages = imagePaths.length
  let loadedImages = 0

  const loadPromises = imagePaths.map(path => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        loadedImages++
        loadingProgress.value = Math.round((loadedImages / totalImages) * 100)
        resolve(path)
      }
      img.onerror = () => {
        loadedImages++
        loadingProgress.value = Math.round((loadedImages / totalImages) * 100)
        console.warn(`图片加载失败: ${path}`)
        resolve(path) // 即使失败也继续
      }
      img.src = path
    })
  })

  try {
    await Promise.all(loadPromises)
    console.log('所有资源加载完成')
  } catch (error) {
    console.error('资源加载出错:', error)
  }
}

onMounted(async () => {
  isWechat.value = checkWechat()
  
  // 开始加载资源
  await preloadResources()
  
  // 模拟最小加载时间，让用户看到加载过程
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 隐藏加载页面
  isLoading.value = false
  
  if (audioElement.value) {
    audioElement.value.loop = true
    audioElement.value.volume = 0.3
    audioElement.value.preload = 'auto'
    
    if (isWechat.value) {
      initWechatAudio()
      
      // 微信环境下，监听用户首次触摸事件自动播放
      const playOnFirstTouch = () => {
        if (audioElement.value && !isPlaying.value) {
          audioElement.value.play().then(() => {
            isPlaying.value = true
            console.log('微信环境首次触摸自动播放成功')
          }).catch(err => {
            console.log('微信环境自动播放失败:', err)
          })
        }
        // 移除事件监听器，只执行一次
        document.removeEventListener('touchstart', playOnFirstTouch)
        document.removeEventListener('click', playOnFirstTouch)
      }
      
      document.addEventListener('touchstart', playOnFirstTouch, { once: true })
      document.addEventListener('click', playOnFirstTouch, { once: true })
      
    } else {
      // 非微信浏览器延迟播放
      setTimeout(() => {
        audioElement.value?.play().then(() => {
          isPlaying.value = true
        }).catch(err => {
          console.log('自动播放失败:', err)
        })
      }, 1000)
    }
  }
})
</script>

<template>
  <div class="app-container">
    <!-- 加载页面 -->
    <div v-if="isLoading" class="loading-container">
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
    <div v-show="!isLoading" class="main-content">
      <RouterView />
      
      <!-- 音乐播放器 -->
      <div class="music-player" @click="toggleMusic">
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

.app-container {
	width: 100vh;
	height: 100vw;
  position: relative;
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
</style>
