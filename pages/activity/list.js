// pages/activity/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:"",
    activitylist:""
  },

  findact:function(event){
    var that = this;
    if(this.searchValue==event.detail.value){
      return;
    }
    var value = event.detail.value;
    var url = 'https://nju304.xyz/activities';
    if(typeof value=='string' && value.length>0){
      url=url+"/name/"+value;
    }
    wx.request({
      url: url,
      success:function(res){
        that.setData({activitylist:res.data,searchValue:value});

      }
    })
    
  },

  checkActivity:function(event){
    var actid = event.currentTarget.dataset.actid;
    wx.navigateTo({
      url: '/pages/activity/detail?actId='+actid+'&opentype=check'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://nju304.xyz/activities',
      success:function(res){
        that.setData({activitylist:res.data});
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})