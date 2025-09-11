// 微信API相关接口

interface WxConfigParams {
  url: string
}

interface WxConfigResponse {
  appId: string
  timestamp: number
  nonceStr: string
  signature: string
}

// 获取微信配置参数的API接口
export async function getWxConfig(params: WxConfigParams): Promise<WxConfigResponse> {
  // 开发环境使用mock数据，生产环境调用真实API
  const isDev = import.meta.env.DEV
  
  if (isDev) {
    console.warn('开发环境使用mock数据')
    return {
      appId: 'wx1234567890abcdef', // 替换为真实的appId
      timestamp: Math.floor(Date.now() / 1000),
      nonceStr: Math.random().toString(36).substring(2, 15),
      signature: 'mock-signature-' + Math.random().toString(36).substring(2, 10)
    }
  }
  
  try {
    const response = await fetch(`/api/wechat/share?url=${encodeURIComponent(params.url)}`)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('API错误响应:', response.status, errorText)
      throw new Error(`获取微信配置失败: ${response.status} ${errorText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('获取微信配置失败:', error)
    throw error
  }
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