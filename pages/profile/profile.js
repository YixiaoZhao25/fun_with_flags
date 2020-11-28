// pages/profile/profile.js
Page({

  getFavorites: function (user) {
    let page = this
    let Favorites = new wx.BaaS.TableObject('favorites')
    let query = new wx.BaaS.Query()
    query.compare("user_id", "=", user.id)
    Favorites.setQuery(query).expand(['country_id']).find().then(function(res) {
      console.log(res)
      page.setData({ favorites: res.data.objects })
    })
  },
  
  userInfoHandler(data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      wx.setStorageSync('user', user);
      this.setData({user})
      this.getFavorites(user);
      this.getFonts()
    })
  },

  getFonts: function () {
    wx.loadFontFace({
      family: 'Lobster',
      source: 'url("https://cloud-minapp-38099.cloud.ifanrusercontent.com/1kirCgK9CzSXwYsT.ttf")'
    })

    wx.loadFontFace({
      family: 'Piedra',
      source: 'url("https://cloud-minapp-38099.cloud.ifanrusercontent.com/1kirD3cEORgqxgkU.ttf")',
    })

    wx.loadFontFace({
      family: 'Pacifico',
      source: 'url("https://cloud-minapp-38099.cloud.ifanrusercontent.com/1kirCwFE0sAdjmtU.ttf")',
    })

    wx.loadFontFace({
      family: 'OpenSans',
      source: 'url("https://cloud-minapp-38099.cloud.ifanrusercontent.com/1kirmHBeRIxvXDDF.ttf")',
    })
  },
    
  onLoad: function (options) {
    let user = wx.getStorageSync('user');
    if (user) {
      this.setData ({ user });
      this.getFavorites(user);
    }
  }
})