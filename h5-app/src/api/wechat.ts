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
//   const isDev = import.meta.env.DEV
  
//   // 开发环境使用mock数据
//   if (isDev) {
//     console.warn('[微信分享] 开发环境使用mock数据')
//     await new Promise(resolve => setTimeout(resolve, 100)) // 模拟网络延迟
    
//     return {
//       appId: 'wx1234567890abcdef', // 替换为真实的appId
//       timestamp: Math.floor(Date.now() / 1000),
//       nonceStr: generateNonceStr(),
//       signature: 'mock-signature-' + generateNonceStr(),
//       jsApiList: [
//         'updateAppMessageShareData',
//         'updateTimelineShareData',
//         'hideMenuItems',
//         'showMenuItems'
//       ]
//     }
//   }
  
  // 调用真实API
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒超时
    
    console.log('[微信分享] 请求API:', params.url)
    
    // 根据环境选择不同的API路径
    const apiPath = import.meta.env.DEV 
      ? `/api/wechat/share` // 开发环境使用代理
      : `/wechat/share`     // 生产环境直接调用后端路径
    
    const response = await fetch(`${apiPath}?url=${encodeURIComponent(params.url)}`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[微信分享] API错误详情:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body: errorText
      })
      
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { errMsg: errorText || '响应解析失败' }
      }
      
      throw new Error(`获取微信配置失败: ${response.status} ${errorData.errMsg || errorData.message || errorText}`)
    }
    
    const result = await response.json()
    
    // 适配后端返回格式
    if (!result.success || !result.data) {
      throw new Error('API返回数据格式错误')
    }

    const data = result.data.jssdkConfig
    
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
    
    return {
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'hideMenuItems',
        'showMenuItems'
      ]
    }
    
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