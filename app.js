App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo)

    let clientID = '238017543e3900bf96a0'  // 应用名称: FunWithFlags
    wx.BaaS.init(clientID)
    wx.BaaS.auth.loginWithWechat().then(user=> {
      wx.setStorageSync('user', user);
    })
  },
})