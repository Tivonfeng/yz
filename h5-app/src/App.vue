<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isPlaying = ref(false)
const audioElement = ref<HTMLAudioElement | null>(null)
const isWechat = ref(false)

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

onMounted(() => {
  isWechat.value = checkWechat()
  
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
</template>

<style>
/* 完全重置所有元素的默认样式 */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  touch-action: manipulation;
  -webkit-overflow-scrolling: touch;
  /* 移除浏览器默认样式 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* 移动端安全区域处理 */
  position: relative;
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

#app {
  width: 100vh;
  height: 100vw;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 0;
  border: 0;
  transform-origin: center center;
  transform: translate(-50%, -50%) rotate(90deg);
  /* 确保完全填满 */
  min-width: 100vh;
  min-height: 100vw;
  max-width: 100vh;
  max-height: 100vw;
}

.app-container {
  width: 100%;
  height: 100%;
  position: relative;
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
