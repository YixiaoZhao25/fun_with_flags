Page({
  onLoad: function () {
    // Fetch all the flags from database
    let countries = new wx.BaaS.TableObject("countries")
    countries.find().then(res => {
      console.log(res)
    })
  }
})