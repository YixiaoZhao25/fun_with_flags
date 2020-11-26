// pages/profile/profile.js
Page({
  data: {

  },
  onLoad: function (options) {
    let page = this
    wx.BaaS.auth.getCurrentUser().then(function(res) {
      page.setData ({
        CurrentUser:res
      })
      let favourites = new wx.BaaS.TableObject('favoutites')
      let query = new wx.BaaS.Query()
      query.compare("user_id","=", res.id)
      favourites.setQuery(query).expand(['country_id']).find().then(function(res) {
        console.log (res)
        Page.setData ({
          favourites: res.data.objects
        })
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})