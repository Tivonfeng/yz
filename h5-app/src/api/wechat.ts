// 微信API相关接口

interface WxConfigParams {
  url: string
}

interface WxConfigResponse {
  appId: string
  timestamp: number
  nonceStr: string
  signature: string
  jsApiList?: string[]
}

interface WxError {
  errMsg: string
  errCode?: number
}

// 微信分享配置接口
export interface WeChatShareConfig {
  title: string
  desc: string
  link: string
  imgUrl: string
  type?: string
  dataUrl?: string
}

// 获取微信配置参数的API接口
export async function getWxConfig(params: WxConfigParams): Promise<WxConfigResponse> {
  const isDev = import.meta.env.DEV
  
  // 开发环境使用mock数据
  if (isDev) {
    console.warn('[微信分享] 开发环境使用mock数据')
    await new Promise(resolve => setTimeout(resolve, 100)) // 模拟网络延迟
    
    return {
      appId: 'wx1234567890abcdef', // 替换为真实的appId
      timestamp: Math.floor(Date.now() / 1000),
      nonceStr: generateNonceStr(),
      signature: 'mock-signature-' + generateNonceStr(),
      jsApiList: [
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'hideMenuItems',
        'showMenuItems'
      ]
    }
  }
  
  // 生产环境调用真实API
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒超时
    
    const response = await fetch(`/api/wechat/share?url=${encodeURIComponent(params.url)}`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ errMsg: '响应解析失败' }))
      console.error('[微信分享] API错误:', response.status, errorData)
      throw new Error(`获取微信配置失败: ${response.status} ${errorData.errMsg || 'Unknown Error'}`)
    }
    
    const data = await response.json()
    
    // 验证返回数据的完整性
    if (!data.appId || !data.signature || !data.timestamp || !data.nonceStr) {
      throw new Error('API返回数据不完整，缺少必要的配置参数')
    }
    
    console.log('[微信分享] 配置获取成功:', {
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      hasSignature: !!data.signature
    })
    
    return data
    
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('[微信分享] 请求超时')
        throw new Error('获取微信配置超时，请检查网络连接')
      }
      console.error('[微信分享] 获取配置失败:', error.message)
      throw error
    }
    
    console.error('[微信分享] 未知错误:', error)
    throw new Error('获取微信配置时发生未知错误')
  }
}

// 生成随机字符串
function generateNonceStr(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}

// 微信分享统计API（可选）
export async function recordShareEvent(data: {
  type: 'timeline' | 'appmessage'
  title: string
  url: string
}): Promise<void> {
  try {
    // await fetch('/api/wechat/share-record', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // })
    
    console.log('分享事件记录:', data)
  } catch (error) {
    console.error('记录分享事件失败:', error)
  }
}