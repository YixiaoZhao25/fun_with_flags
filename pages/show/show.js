// pages/show/show.js
Page({


    countries.get(recordID).then(res => {
      console.log(res)
      this.setData({countries: res.data})
      
    let query = new wx.BaaS.Query()
    query.compare('country_id', '=', options.id) 
      funfacts.setQuery(query).expand(['country_id']).find().then(funfacts => {
        console.log('funfacts',funfacts)
        this.setData({funfacts: funfacts.data.objects})
      })
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
 onLoad: function (options) {
     let countries = new wx.BaaS.TableObject('countries')
     let funfacts = new wx.BaaS.TableObject('funfacts')
     let recordID = options.id 
     console.log(recordID)
  
     countries.get(recordID).then(res => {
       console.log(res)
       this.setData({countries: res.data})
       
     let query = new wx.BaaS.Query()
     query.compare('country_id', '=', options.id) 
     funfacts.setQuery(query).expand(['country_id']).find().then(funfacts => {
         console.log('funfacts',funfacts)
         this.setData({funfacts: funfacts.data.objects})
       })

   })

   wx.switchTab({
     url: 'pages/index/index',
     success: (res) => {},
     fail: (res) => {},
     complete: (res) => {},
   })

  },

 })