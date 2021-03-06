// pages/activity/list.js
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchCondition: "",
    activitylist: "",
    needUpdate: false,
    fullPage:true
  },

  getActivityList: function() {
    var that = this;
    wx.request({
      url: 'https://nju304.xyz/activities',
      data: that.data.searchCondition,
      header: {
        "Cookie": "JSESSIONID=" + getApp().globalData.session_id
      },
      success: function(res) {
        that.setData({
          activitylist: res.data
        });
        wx.stopPullDownRefresh();
      }
    })
  },

  searchConditionChanged: function(event) {
    var that = this;
    var value = event.detail.value;
    that.setData({
      'searchCondition.name': value
    });
    that.getActivityList();
  },

  checkActivity: function(event) {
    var actid = event.currentTarget.dataset.actid;
    wx.navigateTo({
      url: '/pages/activity/detail?actId=' + actid + '&opentype=check'
    });
  },

  createActivity: function(event) {
    wx.navigateTo({
      url: '/pages/activity/detail?&opentype=create'
    });
  },

  setSortType:function(e){
    this.setData({
      'searchCondition.sortType': e.currentTarget.dataset['type']
    })
    this.getActivityList()
  },

  setCondition:function(){
    wx.navigateTo({
      url: '/pages/activity/condition'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      searchCondition: options
    });
    this.setData({
      'searchCondition.sortType':'default',
      'searchCondition.number':0
    })
    that.getActivityList();
    if (!options.userId&&!options.ownerId) {
      template.tabbar("tabBar", 0, this);
      that.setData({fullPage:false});
    }
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
    console.log(this.data.searchCondition)

    if (this.data.needUpdate) {
      this.getActivityList();
      this.data.needUpdate = false;
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.data.needUpdate = true;
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
    this.getActivityList();
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