// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse:wx.canIUse("getUserInfo"),
    userInfo:"",
    hasUserInfo:true
  },

  getUserInfo:function(){
    var that = this;
    this.setData({hasUserInfo:true});
    wx.showTabBar({
      
    });
    that.registerOrUpdateUserInfo();
    setInterval(function () {
      that.registerOrUpdateUserInfo();
      console.log(getApp().globalData.session_id);
    }, 1000*60*20);
    this.gotoactlist();
  },

  gotoactlist:function(){
    wx.switchTab({
      url: '/pages/activity/list'
    })
  },

  registerOrUpdateUserInfo:function(){
    var userInfo = getApp().globalData.userInfo;

    wx.login({
      success:function(res){
        var code = res.code;
        wx.request({
          url: 'https://nju304.xyz/user/login',
          method:"post",
          data:{
            nickName:userInfo.nickName,
            gender: userInfo.gender,
            avatarUrl: userInfo.avatarUrl,
            city: userInfo.city,
            province: userInfo.province,
            jscode:code
          },
          success:function(res){
            console.log(res);
            getApp().globalData.userInfo.openid = res.data.openid;
            getApp().globalData.session_id = res.data.session_id;
          }
        })
      }
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thispage = this;
    wx.getSetting({
      success:function(res){
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:function(res){
              getApp().globalData.userInfo = res.userInfo;
              thispage.setData({ userInfo: getApp().globalData.userInfo });
              if(getApp().userInfoReadyCallback){
                getApp().userInfoReadyCallback(res);
              }
              thispage.getUserInfo();
            }
          })
        }
        else{
          thispage.setData({hasUserInfo:false})
          wx.hideTabBar({
            
          })
        }
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