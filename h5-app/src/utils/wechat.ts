import wx from 'weixin-js-sdk'

interface WeChatConfig {
  appId: string
  timestamp: number
  nonceStr: string
  signature: string
}

interface ShareConfig {
  title: string
  desc: string
  link: string
  imgUrl: string
}

export class WeChatShare {
  private static instance: WeChatShare
  private isConfigured = false

  static getInstance(): WeChatShare {
    if (!WeChatShare.instance) {
      WeChatShare.instance = new WeChatShare()
    }
    return WeChatShare.instance
  }

  // 配置微信JSSDK
  async configWx(config: WeChatConfig): Promise<void> {
    // 开发环境跳过WeChat配置
    const isDev = import.meta.env.DEV
    
    if (isDev) {
      console.warn('开发环境跳过WeChat JSSDK配置')
      this.isConfigured = true
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      wx.config({
        debug: false, // 生产环境关闭调试模式
        appId: config.appId,
        timestamp: config.timestamp,
        nonceStr: config.nonceStr,
        signature: config.signature,
        jsApiList: [
          'updateAppMessageShareData', // 分享给朋友
          'updateTimelineShareData',   // 分享到朋友圈
          'onMenuShareTimeline',       // 兼容旧版本分享到朋友圈
          'onMenuShareAppMessage',     // 兼容旧版本分享给朋友
          'hideMenuItems'              // 隐藏菜单项
        ]
      })

      wx.ready(() => {
        this.isConfigured = true
        console.log('WeChat JSSDK配置成功')
        resolve()
      })

      wx.error((res: any) => {
        console.error('WeChat JSSDK配置失败:', res)
        reject(res)
      })
    })
  }

  // 设置分享内容
  setShareContent(shareConfig: ShareConfig): void {
    if (!this.isConfigured) {
      console.warn('WeChat JSSDK未配置，无法设置分享内容')
      return
    }

    // 新版本API
    wx.updateAppMessageShareData({
      title: shareConfig.title,
      desc: shareConfig.desc,
      link: shareConfig.link,
      imgUrl: shareConfig.imgUrl,
      success: () => {
        console.log('分享给朋友配置成功')
      },
      fail: (res: any) => {
        console.error('分享给朋友配置失败:', res)
      }
    })

    wx.updateTimelineShareData({
      title: shareConfig.title,
      link: shareConfig.link,
      imgUrl: shareConfig.imgUrl,
      success: () => {
        console.log('分享到朋友圈配置成功')
      },
      fail: (res: any) => {
        console.error('分享到朋友圈配置失败:', res)
      }
    })

    // 兼容旧版本
    wx.onMenuShareAppMessage({
      title: shareConfig.title,
      desc: shareConfig.desc,
      link: shareConfig.link,
      imgUrl: shareConfig.imgUrl,
      success: () => {
        console.log('分享给朋友成功（旧版本）')
      },
      cancel: () => {
        console.log('取消分享给朋友')
      }
    })

    wx.onMenuShareTimeline({
      title: shareConfig.title,
      link: shareConfig.link,
      imgUrl: shareConfig.imgUrl,
      success: () => {
        console.log('分享到朋友圈成功（旧版本）')
      },
      cancel: () => {
        console.log('取消分享到朋友圈')
      }
    })
  }

  // 隐藏不需要的菜单项
  hideMenuItems(menuList: string[] = []): void {
    if (!this.isConfigured) return

    const defaultHideMenus = [
      'menuItem:copyUrl',        // 复制链接
      'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
      'menuItem:openWithSafari',    // 在Safari中打开
      'menuItem:share:email',       // 邮件
      'menuItem:share:brand'        // 一些第三方分享
    ]

    wx.hideMenuItems({
      menuList: [...defaultHideMenus, ...menuList] as any,
      success: () => {
        console.log('隐藏菜单项成功')
      },
      fail: (res: any) => {
        console.error('隐藏菜单项失败:', res)
      }
    })
  }

  // 检查是否在微信环境
  static isWeChatBrowser(): boolean {
    return /micromessenger/i.test(navigator.userAgent)
  }
}