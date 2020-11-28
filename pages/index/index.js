Page({
  onLoad: function () {
    // Fetch all the flags from database
    let countries = new wx.BaaS.TableObject("countries")
    countries.find().then(res => {
      console.log(res)
      this.setData({countries: res.data.objects})
    })
  },
  goToCountry: function(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
    })
  },
})
