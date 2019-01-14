// pages/message/msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['申请', '邀请'],
    currentTab: 0,
    // invitations: {},
    applications: {}
  },
  
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = "1832247";
    wx.request({
      url: 'https://nju304.xyz/activities/applications/user/' + openid,
      success: function (res) {
        that.setData({ applications: res.data });
      },
      // url: 'https://nju304.xyz/activities/invitations/user/' + openid,
      // success: function (res) {
      //   that.setData({ invitations: res.data });
      // }
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