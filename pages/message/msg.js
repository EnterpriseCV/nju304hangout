// pages/message/msg.js

var sliderWidth = 96;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["申请", "邀请"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    // invitations: {},
    applications: {}
  },

  loadData: function() {
    var openid = "1832247";
    wx.request({
      url: 'https://nju304.xyz/activities/applications/user/' + openid,
      success: function(res) {
        if (res.statusCode != 404) {
          that.setData({
            applications: res.data
          });
        }
      },
      fail: function(res) {

      },
      // url: 'https://nju304.xyz/activities/invitations/user/' + openid,
      // success: function (res) {
      //   that.setData({ invitations: res.data });
      // }
    })
  },

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.loadData();
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
    this.loadData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})