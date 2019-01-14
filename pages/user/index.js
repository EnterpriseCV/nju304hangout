// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: "",
    user: {}
  },

  likeUser: function() {
    wx.request({
      method: 'POST',
      url: 'https://nju304.xyz/user/' + this.data.userId + '/0',
      success: function (res) {
        
      },
      fail: function (res) { }
    })
  },

  threadUser: function () {
    wx.request({
      method: 'POST',
      url: 'https://nju304.xyz/user/' + this.data.userId + '/1',
      success: function (res) {

      },
      fail: function (res) { }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(1)
    var that = this;
    this.setData({
      userId: options.userId
    });
    console.log(this.data.actId)
    wx.request({
      url: 'https://nju304.xyz/user/' + this.data.userId,
      success: function(res) {
        that.setData({
          user: res.data
        });
      },
      fail: function(res) {}
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})