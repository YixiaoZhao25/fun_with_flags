// pages/profile/profile.js
Page({

  getFavorites: function (user) {
    let Favorites = new wx.BaaS.TableObject('favorites')
    let query = new wx.BaaS.Query()
    query.compare("user_id", "=", user.id)
    Favorites.setQuery(query).expand(['country_id']).find().then(function(res) {
      this.setData ({ favorites: res.data.objects })
    })
  },
  
  userInfoHandler(data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      wx.setStorageSync('user', user);
      this.setData({user})
      this.getFavorites(user);
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