// pages/show/show.js
Page({

  onLoad: function (options) {
    this.fetchCountry(options.id)
    let user = wx.getStorageSync('user');
    this.setData({user});
    this.getFonts();
    this.getFavorites(user);
  },
  
  fetchCountry: function (id) {
    let countries = new wx.BaaS.TableObject('countries')
    let funfacts = new wx.BaaS.TableObject('funfacts')
    countries.get(id).then(res => {
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