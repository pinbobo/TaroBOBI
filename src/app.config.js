export default {
  pages: [
    'pages/index/index',
    'pages/pay/pay',
    'pages/my/my',
    'pages/course/course',
    'pages/userInfo/userInfo',
    'pages/demand/demand',
    'pages/category/category',
    'pages/task/task',
    'pages/search/search',
    'pages/courseDetail/courseDetail',
    'pages/guide/guide',
    'pages/myCourse/myCourse',
    'pages/news/news',
    'pages/introduction/introduction'

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  "tabBar": {
    "selectedColor": "#FC8DD4",
    "color": "#666666",
    "borderStyle": "white",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "iconPath": "images/home.png",
        "selectedIconPath": "images/home_select.png",
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "iconPath": "images/medicalBeauty.png",
        "selectedIconPath": "images/medicalBeauty_active.png",
        "pagePath": "pages/demand/demand",
        "text": "我要播"
      },
      {
        "iconPath": "images/gossip.png",
        "selectedIconPath": "images/gossip_select.png",
        "pagePath": "pages/task/task",
        "text": "直播任务"
      },
      {
        "iconPath": "images/mine.png",
        "selectedIconPath": "images/mine_select.png",
        "pagePath": "pages/my/my",
        "text": "我"
      }
    ]
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  }
}
