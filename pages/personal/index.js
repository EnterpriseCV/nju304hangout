// pages/personal/index.js
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {}
  },

  checkAttend:function(){
    wx.navigateTo({
      url: '/pages/activity/list?userId=' + getApp().globalData.userInfo.openid
    });
  },

  checkCreate: function () {
    wx.navigateTo({
      url: '/pages/activity/list?ownerId=' + getApp().globalData.userInfo.openid
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    template.tabbar("tabBar", 1, this);
    wx.request({
      url: 'https://nju304.xyz/user/' + getApp().globalData.userInfo.openid,
      success: function (res) {
        that.setData({
          user: res.data
        });
      },
      fail: function (res) {

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