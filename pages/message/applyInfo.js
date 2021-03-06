// pages/message/applyInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyId: "",
    status: "",
    actId: "",
    userId: "",
    activity: {}
  },

  deleteApply: function () {
    wx.request({
      method: 'DELETE',
      url: 'https://nju304.xyz/activities/applications/' + this.data.applyId,
      success: function (res) {
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1000,
          mask: true,
          success: function () {
            setTimeout(function () {
              wx.reLaunch({
                url: './msg'
              })
            }, 1000);
          }
        });
      },
      fail: function (res) {

      }
    })
  },

  acceptApply: function () {
    wx.request({
      method: 'POST',
      url: 'https://nju304.xyz/activities/applications/' + this.data.applyId + '/1',
      success: function (res) {
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1000,
          mask: true,
          success: function () {
            setTimeout(function () {
              wx.reLaunch({
                url: './msg'
              })
            }, 1000);
          }
        });
      },
      fail: function (res) {

      }
    })
  },

  rejectApply: function() {
    wx.request({
      method: 'POST',
      url: 'https://nju304.xyz/activities/applications/' + this.data.applyId + '/-1',
      success: function (res) {
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1000,
          mask: true,
          success: function () {
            setTimeout(function () {
              wx.reLaunch({
                url: './msg'
              })
            }, 1000);
          }
        });
      },
      fail: function (res){

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({
      applyId: options.applyId,
      status: options.status,
      actId: options.actId,
      userId: options.userId
    });
    console.log(this.data.actId)
    wx.request({
      url: 'https://nju304.xyz/activities/' + this.data.actId,
      success: function(res) {
        that.setData({
          activity: res.data
        });
      },
      fail: function (res) {

      }
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