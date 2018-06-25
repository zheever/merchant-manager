/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 */
let baseUrl = ''
let routerMode = 'hash'
let baseImgPath
let loginImgUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://private-ab6e0-canyonsysu1.apiary-mock.com/v1'
  loginImgUrl = 'http://localhost:3001'
} else {
  baseUrl = 'https://kangblog.top/v1'
  baseImgPath = 'http://localhost:3001'
}

export {
  baseUrl,
  loginImgUrl,
  routerMode,
  baseImgPath
}
