// pages/show/show.js
Page({

  fetchCountry: function (id) {
    let countries = new wx.BaaS.TableObject('countries')
    countries.get(id).then(res => {
      console.log(res)
      let country = res.data
      this.setData({ country })
    })
    let user = wx.getStorageSync('user');
    this.setData({user});
    this.getFonts();
    this.getFavorites(user);
  },

  fetchFunFacts: function (id) {
    console.log(id)
    let query = new wx.BaaS.Query()
    let funfacts = new wx.BaaS.TableObject('funfacts')

    query.compare("country_id", "=", id) 
    
    funfacts.setQuery(query).find().then(res => {
      if (res.data.objects[0]) {
        let funFact = res.data.objects[0].description
        this.setData({ funFact })
      }
    })
  },

  addFavorite: function () {
    let Favorite = new wx.BaaS.TableObject("favorites")
    let favorite = Favorite.create()
    let data = {
      user_id: this.data.user.id,
      country_id: this.data.country.id
    }
    
    favorite.set(data).save().then(res => {
      let Countries = new wx.BaaS.TableObject("countries")
      let country = Countries.getWithoutData(this.data.country.id)
      country.set({likednum: this.data.country.likednum + 1}).update().then(res => {
        this.fetchCountry(this.data.country.id)
        this.getFavorites(this.data.country.id, this.data.user.id)
      })
    })
  },

  removeFavorite: function () {
    let Favorite = new wx.BaaS.TableObject("favorites")
    let favorite = Favorite.create()
    let data = {
      user_id: this.data.user.id,
      country_id: this.data.country.id
    }
    
    favorite.set(data).save().then(res => {
      let Countries = new wx.BaaS.TableObject("countries")
      let country = Countries.getWithoutData(this.data.country.id)
      country.set({likednum: this.data.country.likednum - 1}).update().then(res => {
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

  getFavorites: function (countryID, userID) {
    let Favorite = new wx.BaaS.TableObject("favorites")
    let query = new wx.BaaS.Query()    
    query.compare("country_id", "=", countryID)
    query.compare("user_id", "=", userID)

    Favorite.setQuery(query).find().then(res => {
      let liked = res.data.objects.length !== 0
      this.setData({liked})
    })
  },

  onLoad: function (options) {
    let user = wx.getStorageSync("user")
    let id = options.id

    this.setData({user})
    
    this.fetchCountry(id)
    this.fetchFunFacts(id)
    this.getFavorites(id, user.id)
  }
})