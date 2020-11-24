

Page({
  onLoad:function(){ 
    let tableName = 'countries'
    let Country = new wx.BaaS.TableObject(tableName)
    Country.find().then(res => {
      console.log(res)
      this.setData({countries: res.data.objects})
    })
  }  
})
