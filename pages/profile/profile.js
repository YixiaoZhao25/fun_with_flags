// pages/profile/profile.js
Page({
  data: {

  },

  getFavorites: function (user) {
    let Favorites = new wx.BaaS.TableObject('favorites');
    let query = new wx.BaaS.Query();
    
    query.compare("user_id", "=", user.id);
    
    Favorites.setQuery(query).expand(['country_id']).find().then((res) => {
      if (res.data.objects) this.setData({ favorites: res.data.objects });
    });
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

  onLoad: function () {
    let user = wx.getStorageSync('user');
    this.setData({user})
    this.getFavorites(user);
    this.getFonts();
  }
})