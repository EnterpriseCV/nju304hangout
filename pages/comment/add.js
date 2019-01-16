// pages/comment/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: -1,
    actId: "",
    userId: ""
  },

  addComment: function (event){
    wx.request({
      url: 'https://nju304.xyz/comment/org/' + this.data.actId,
      method: 'POST',
      data: {
        userId: this.data.userId,
        actId: this.data.actId,
        score: event.detail.value.slider,
        description: event.detail.value.textarea
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1000,
          mask: true,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
              })
            }, 1000);
          }
        });
      }
    })
  },

  sliderchange: function(event) {
    this.setData({
      score: event.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      actId: options.actId,
      userId: options.userId
    });
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