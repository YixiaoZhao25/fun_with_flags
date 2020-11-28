// pages/show/show.js
Page({

  fetchCountry: function (id) {
    let countries = new wx.BaaS.TableObject('countries')
    countries.get(id).then(res => {
      console.log(res)
      let country = res.data
      this.setData({ country })
    })
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
      user_id: this.data.currentUser.id,
      country_id: this.data.country.id
    }
    
    favorite.set(data).save().then(res => {
      let Countries = new wx.BaaS.TableObject("countries")
      let country = Countries.getWithoutData(this.data.country.id)
      country.set({likednum: this.data.country.likednum + 1}).update().then(res => {
        console.log(res)
      })
    })
  },

  removeFavorite: function () {
    let Favorite = new wx.BaaS.TableObject("favorites")
    let favorite = Favorite.create()
    let data = {
      user_id: this.data.currentUser.id,
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

  getFavorites: function () {
    // 1. Query our favorties table for userid and countryid
    // 2. Set this favorites array to our local data
    let Favorite = new wx.BaaS.TableObject("favorites")
    let favorite = Favorite.create()
    let data = {
      user_id: this.data.currentUser.id,
      country_id: this.data.country.id
    }

    favorite.set(data).save().then(res => {
      let Favorites = new wx.BaaS.TableObject("favorites")
      let favorite = Favorites.getWithoutData(this.data.country.id)
      country.set({likednum: this.data.country.likednum}).update().then(res => {
        console.log(res)
      })
    })
  },

  onLoad: function (options) {
    let id = options.id
    this.fetchCountry(id)
    this.fetchFunFacts(id)
  }

})