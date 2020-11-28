Page({
  onLoad: function () {
    // Fetch all the flags from database
    let countries = new wx.BaaS.TableObject("countries")
    countries.find().then(res => {
      console.log(res)
      this.setData({countries: res.data.objects})
    })
    let user = wx.getStorageSync('user');
    this.setData({user});
    this.getFonts();
    this.getFavorites(user);
  },
  goToCountry: function(e) {
    console.log(e)
    let id= e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
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
    console.log('loadfont')
  },

})
