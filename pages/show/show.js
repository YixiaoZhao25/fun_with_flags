// pages/show/show.js
Page({
  fetchCountry: function (id) {
    let countries = new wx.BaaS.TableObject('countries')
    let funfacts = new wx.BaaS.TableObject('funfacts')
    let recordID = options.id 
    console.log(recordID)

    countries.get(recordID).then(res => {
      console.log(res)
      this.setData({countries: res.data})
      
    let query = new wx.BaaS.Query()
    query.compare('country_id', '=', options.id) 
      funfacts.setQuery(query).expand(['country_id']).find().
  
      then(funfacts => {
        console.log('funfacts',funfacts)
        this.setData({funfacts: funfacts.data.objects})
      })
    })
  },
  countLikes: function () {
    let Favorite = new wx.BaaS.TableObject("favorites")
    let data = {
      user_id: this.data.currentUser.id,
      country_id: this.data.countries.id
    }
    Favorite.create().set(data).save().then(res => {
      let Countries = new wx.BaaS.TableObject("countries")
      let country = Countries.getWithoutData(this.data.countries.id)
      country.set({likednum: this.data.likednum + 1}).update().then(res => {
        console.log(res)
      })
    })
  }
})

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
