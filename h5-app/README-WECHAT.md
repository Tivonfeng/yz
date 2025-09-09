# 微信分享功能配置说明

## 功能概述
已为项目集成微信分享功能，支持分享到朋友圈和分享给朋友，适用于党政项目的严肃性要求。

## 文件结构
```
src/
├── utils/wechat.ts          # 微信分享核心工具类
├── api/wechat.ts           # 微信API接口
└── views/Home.vue          # 集成分享功能的主页
```

## 配置步骤

### 1. 后端接口配置
需要在后端实现 `/api/wechat/config` 接口，返回微信JSSDK所需参数：

```json
{
  "appId": "wx1234567890abcdef",
  "timestamp": "1640995200",
  "nonceStr": "randomstring123",
  "signature": "sha1signature"
}
```

### 2. 微信公众号配置
1. 登录微信公众平台
2. 在"设置与开发 -> 基本配置"中获取AppID和AppSecret
3. 在"设置与开发 -> 公众号设置 -> JS接口安全域名"中添加项目域名

### 3. 服务器端签名生成
参考微信官方文档实现signature生成逻辑：
- 获取access_token
- 获取jsapi_ticket
- 按规则拼接字符串并进行sha1加密

## 分享内容配置
当前分享配置：
- **标题**: 纪念中国人民抗日战争暨世界反法西斯战争胜利80周年
- **描述**: 苏皖6家县级融媒体中心联合报道，共同缅怀历史，珍爱和平
- **分享图**: 使用项目标题图片
- **链接**: 当前页面URL

## 使用说明

### 自动初始化
在Home.vue组件mounted时自动检测微信环境并初始化分享功能

### 手动配置
```typescript
import { WeChatShare } from '@/utils/wechat'

const wechatShare = WeChatShare.getInstance()

// 配置JSSDK
await wechatShare.configWx({
  appId: 'your-app-id',
  timestamp: 'your-timestamp',
  nonceStr: 'your-nonce',
  signature: 'your-signature'
})

// 设置分享内容
wechatShare.setShareContent({
  title: '分享标题',
  desc: '分享描述',
  link: '分享链接',
  imgUrl: '分享图片URL'
})
```

## 测试说明
1. 在微信开发者工具中测试
2. 在真实微信环境中测试分享功能
3. 检查分享后的展示效果

## 注意事项
1. 必须在HTTPS环境下使用
2. 域名必须在微信公众号中配置
3. 分享图片建议使用正方形，最小200x200px
4. 当前使用mock数据，上线前需要替换为真实的后端接口

## 错误排查
- 检查控制台是否有JSSDK配置错误
- 确认域名是否在微信公众号中正确配置
- 验证signature生成是否正确