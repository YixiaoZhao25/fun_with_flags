Page({
  onLoad: function (options) {
    let countries = new wx.BaaS.TableObject('countries')
    let funfacts = new wx.BaaS.TableObject('funfacts')
    let recordID = options.id 
    
    console.log(recordID)

    countries.get(recordID).then(res => {
      console.log(res)
      this.setData({countries: res.data})
    })

    let query = new wx.BaaS.Query()
    query.compare('country_id', '=', options.id) 
    funfacts.setQuery(query).expand(['country_id']).find().then(funfacts => {
      console.log('funfacts',funfacts)
      this.setData({funfacts: funfacts.data.objects})
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  backToIndex: function (event) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }

})