import wx from 'weixin-js-sdk'
import type { WeChatShareConfig } from '@/api/wechat'

interface WeChatConfig {
  appId: string
  timestamp: number
  nonceStr: string
  signature: string
  jsApiList?: string[]
}

interface ShareCallbacks {
  onSuccess?: (type: 'timeline' | 'appmessage') => void
  onCancel?: (type: 'timeline' | 'appmessage') => void
  onFail?: (error: any, type: 'timeline' | 'appmessage') => void
}

// 微信环境检测结果
interface WeChatEnvironment {
  isWeChat: boolean
  isAndroid: boolean
  isIOS: boolean
  version: string
}

export class WeChatShare {
  private static instance: WeChatShare
  private isConfigured = false
  private configPromise: Promise<void> | null = null
  private currentShareConfig: WeChatShareConfig | null = null
  private environment: WeChatEnvironment

  constructor() {
    this.environment = this.detectEnvironment()
  }

  static getInstance(): WeChatShare {
    if (!WeChatShare.instance) {
      WeChatShare.instance = new WeChatShare()
    }
    return WeChatShare.instance
  }

  // 检测微信环境和设备信息
  private detectEnvironment(): WeChatEnvironment {
    const ua = navigator.userAgent.toLowerCase()
    const isWeChat = /micromessenger/i.test(ua)
    const isAndroid = /android/i.test(ua)
    const isIOS = /iphone|ipad|ipod/i.test(ua)
    
    // 提取微信版本号
    const versionMatch = ua.match(/micromessenger\/(\d+\.\d+\.\d+)/)
    const version = versionMatch ? versionMatch[1] : 'unknown'
    
    return { isWeChat, isAndroid, isIOS, version }
  }

  // 获取环境信息
  getEnvironment(): WeChatEnvironment {
    return { ...this.environment }
  }

  // 配置微信JSSDK，并在ready内设置分享
  async configWx(config: WeChatConfig, shareConfig?: WeChatShareConfig, callbacks?: ShareCallbacks, customHideMenus?: string[]): Promise<void> {
    // 防止重复配置
    if (this.configPromise) {
      return this.configPromise
    }

    // 开发环境跳过WeChat配置
    // const isDev = import.meta.env.DEV
    
    // if (isDev) {
    //   console.warn('[微信分享] 开发环境跳过WeChat JSSDK配置')
    //   this.isConfigured = true
    //   this.configPromise = Promise.resolve()
    //   return this.configPromise
    // }

    // 检查是否在微信环境中
    if (!this.environment.isWeChat) {
      const error = new Error('当前不在微信环境中')
      this.configPromise = Promise.reject(error)
      return this.configPromise
    }

    this.configPromise = new Promise((resolve, reject) => {
      // 配置超时处理
      const configTimeout = setTimeout(() => {
        console.error('[微信分享] JSSDK配置超时')
        reject(new Error('微信JSSDK配置超时'))
      }, 5000)

      const jsApiList: string[] = config.jsApiList || [
        'updateAppMessageShareData', // 分享给朋友
        'updateTimelineShareData',   // 分享到朋友圈
        'hideMenuItems',             // 隐藏菜单项
        'showMenuItems'              // 显示菜单项
      ]

      console.log('[微信分享] 开始配置JSSDK:', {
        appId: config.appId,
        timestamp: config.timestamp,
        nonceStr: config.nonceStr,
        jsApiList,
        environment: this.environment
      })

      wx.config({
        debug: true, // 关闭调试模式，避免微信弹窗
        appId: config.appId,
        timestamp: config.timestamp,
        nonceStr: config.nonceStr,
        signature: config.signature,
        jsApiList: jsApiList as any // 类型断言解决JSSDK类型定义问题
      })

      wx.ready(() => {
        clearTimeout(configTimeout)
        this.isConfigured = true
        console.log('[微信分享] JSSDK配置成功，环境信息:', this.environment)
        
        // 在wx.ready内设置分享内容 - iOS兼容性关键
        if (shareConfig) {
          this.setShareContentInReady(shareConfig, callbacks)
        }
        
        // 在wx.ready内隐藏菜单项 - iOS兼容性关键
        this.hideMenuItemsInReady(customHideMenus)
        
        resolve()
      })

      wx.error((res: any) => {
        clearTimeout(configTimeout)
        console.error('[微信分享] JSSDK配置失败:', res)
        
        // 提供更详细的错误信息
        let errorMsg = '微信JSSDK配置失败'
        if (res.errMsg) {
          if (res.errMsg.includes('invalid signature')) {
            errorMsg = '签名验证失败，请检查服务端签名算法'
          } else if (res.errMsg.includes('invalid url domain')) {
            errorMsg = '域名未配置，请在微信公众号后台配置JS接口安全域名'
          } else if (res.errMsg.includes('config:invalid_appid')) {
            errorMsg = 'AppID配置错误'
          }
        }
        
        const error = new Error(`${errorMsg}: ${res.errMsg || 'Unknown error'}`)
        reject(error)
      })
    })

    return this.configPromise
  }

  // 在wx.ready内设置分享内容 - iOS兼容性关键
  private setShareContentInReady(shareConfig: WeChatShareConfig, callbacks?: ShareCallbacks): void {
    console.log('[微信分享] 在wx.ready内设置分享内容:', shareConfig.title)
    
    // 验证分享配置
    this.validateShareConfig(shareConfig)
    this.currentShareConfig = { ...shareConfig }

    try {
      // 分享给朋友
      wx.updateAppMessageShareData({
        title: shareConfig.title,
        desc: shareConfig.desc,
        link: shareConfig.link,
        imgUrl: shareConfig.imgUrl,
        success: () => {
          console.log('[微信分享] 分享给朋友配置成功')
          callbacks?.onSuccess?.('appmessage')
        },
        fail: (res: any) => {
          console.error('[微信分享] 分享给朋友配置失败:', res)
          callbacks?.onFail?.(res, 'appmessage')
        }
      })

      // 分享到朋友圈
      wx.updateTimelineShareData({
        title: shareConfig.title,
        link: shareConfig.link,
        imgUrl: shareConfig.imgUrl,
        success: () => {
          console.log('[微信分享] 分享到朋友圈配置成功')
          callbacks?.onSuccess?.('timeline')
        },
        fail: (res: any) => {
          console.error('[微信分享] 分享到朋友圈配置失败:', res)
          callbacks?.onFail?.(res, 'timeline')
        }
      })

    } catch (error) {
      console.error('[微信分享] 设置分享内容时发生错误:', error)
    }
  }

  // 设置分享内容（保持向后兼容）
  async setShareContent(shareConfig: WeChatShareConfig, callbacks?: ShareCallbacks): Promise<void> {
    // 等待配置完成
    if (!this.isConfigured && this.configPromise) {
      try {
        await this.configPromise
      } catch (error) {
        console.error('[微信分享] 等待配置完成时出错:', error)
        throw error
      }
    }

    if (!this.isConfigured) {
      const error = new Error('微信JSSDK未配置，无法设置分享内容')
      console.warn('[微信分享]', error.message)
      throw error
    }

    // 验证分享配置
    this.validateShareConfig(shareConfig)
    
    // 保存当前配置
    this.currentShareConfig = { ...shareConfig }

    console.log('[微信分享] 设置分享内容:', {
      title: shareConfig.title,
      desc: shareConfig.desc,
      link: shareConfig.link,
      imgUrl: shareConfig.imgUrl,
      hasCallbacks: !!callbacks
    })

    try {
      // 新版本API - 分享给朋友
      wx.updateAppMessageShareData({
        title: shareConfig.title,
        desc: shareConfig.desc,
        link: shareConfig.link,
        imgUrl: shareConfig.imgUrl,
        success: () => {
          console.log('[微信分享] 分享给朋友配置成功')
          callbacks?.onSuccess?.('appmessage')
        },
        fail: (res: any) => {
          console.error('[微信分享] 分享给朋友配置失败:', res)
          callbacks?.onFail?.(res, 'appmessage')
        }
      })

      // 新版本API - 分享到朋友圈
      wx.updateTimelineShareData({
        title: shareConfig.title,
        link: shareConfig.link,
        imgUrl: shareConfig.imgUrl,
        success: () => {
          console.log('[微信分享] 分享到朋友圈配置成功')
          callbacks?.onSuccess?.('timeline')
        },
        fail: (res: any) => {
          console.error('[微信分享] 分享到朋友圈配置失败:', res)
          callbacks?.onFail?.(res, 'timeline')
        }
      })


    } catch (error) {
      console.error('[微信分享] 设置分享内容时发生错误:', error)
      throw error
    }
  }

  // 验证分享配置
  private validateShareConfig(config: WeChatShareConfig): void {
    if (!config.title) {
      throw new Error('分享标题不能为空')
    }
    if (!config.link) {
      throw new Error('分享链接不能为空')
    }
    if (!config.imgUrl) {
      console.warn('[微信分享] 分享图片URL为空，可能影响分享效果')
    }
    
    // 验证URL格式
    try {
      new URL(config.link)
      if (config.imgUrl) {
        new URL(config.imgUrl)
      }
    } catch (error) {
      throw new Error('分享链接或图片URL格式不正确')
    }
  }


  // 在wx.ready内隐藏菜单项 - iOS兼容性关键
  private hideMenuItemsInReady(customMenuList: string[] = []): void {
    const defaultHideMenus = [
      'menuItem:copyUrl',           // 复制链接
      'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
      'menuItem:openWithSafari',    // 在Safari中打开
      'menuItem:share:email',       // 邮件
      'menuItem:share:brand',       // 第三方分享
      'menuItem:share:qq',          // QQ分享
      'menuItem:share:weiboApp',    // 微博分享
      'menuItem:favorite',          // 收藏
      'menuItem:share:facebook',    // Facebook分享
      'menuItem:share:QZone'        // QQ空间分享
    ]

    const menuList = [...defaultHideMenus, ...customMenuList]

    wx.hideMenuItems({
      menuList: menuList as any,
      success: () => {
        console.log('[微信分享] 隐藏菜单项成功:', menuList)
      },
      fail: (res: any) => {
        console.error('[微信分享] 隐藏菜单项失败:', res)
      }
    })
  }

  // 隐藏不需要的菜单项（保持向后兼容）
  async hideMenuItems(customMenuList: string[] = []): Promise<void> {
    if (!this.isConfigured) {
      console.warn('[微信分享] JSSDK未配置，无法隐藏菜单项')
      return
    }

    const defaultHideMenus = [
      'menuItem:copyUrl',           // 复制链接
      'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
      'menuItem:openWithSafari',    // 在Safari中打开
      'menuItem:share:email',       // 邮件
      'menuItem:share:brand',       // 第三方分享
      'menuItem:share:qq',          // QQ分享
      'menuItem:share:weiboApp',    // 微博分享
      'menuItem:favorite',          // 收藏
      'menuItem:share:facebook',    // Facebook分享
      'menuItem:share:QZone'        // QQ空间分享
    ]

    const menuList = [...defaultHideMenus, ...customMenuList]

    return new Promise((resolve) => {
      wx.hideMenuItems({
        menuList: menuList as any,
        success: () => {
          console.log('[微信分享] 隐藏菜单项成功:', menuList)
          resolve()
        },
        fail: (res: any) => {
          console.error('[微信分享] 隐藏菜单项失败:', res)
          resolve() // 不阻塞流程
        }
      })
    })
  }

  // 显示菜单项
  async showMenuItems(menuList: string[]): Promise<void> {
    if (!this.isConfigured) {
      console.warn('[微信分享] JSSDK未配置，无法显示菜单项')
      return
    }

    return new Promise((resolve) => {
      wx.showMenuItems({
        menuList: menuList as any,
        success: () => {
          console.log('[微信分享] 显示菜单项成功:', menuList)
          resolve()
        },
        fail: (res: any) => {
          console.error('[微信分享] 显示菜单项失败:', res)
          resolve() // 不阻塞流程
        }
      })
    })
  }

  // 获取当前分享配置
  getCurrentShareConfig(): WeChatShareConfig | null {
    return this.currentShareConfig ? { ...this.currentShareConfig } : null
  }

  // 重置配置状态（用于调试）
  reset(): void {
    this.isConfigured = false
    this.configPromise = null
    this.currentShareConfig = null
    console.log('[微信分享] 状态已重置')
  }

  // 检查JSSDK是否已配置
  isReady(): boolean {
    return this.isConfigured
  }

  // 检查是否在微信环境
  static isWeChatBrowser(): boolean {
    return /micromessenger/i.test(navigator.userAgent)
  }

  // 获取微信版本信息（静态方法）
  static getWeChatVersion(): string {
    const ua = navigator.userAgent.toLowerCase()
    const versionMatch = ua.match(/micromessenger\/(\d+\.\d+\.\d+)/)
    return versionMatch ? versionMatch[1] : 'unknown'
  }

  // 检查是否支持新版分享API
  static checkAPISupport(): boolean {
    const version = WeChatShare.getWeChatVersion()
    if (version === 'unknown') return false

    const [major, minor] = version.split('.').map(Number)
    
    // 微信版本 >= 7.0.0 支持新版分享API
    return major > 7 || (major === 7 && minor >= 0)
  }
}