// pages/comment/comments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actId: "",
    comments: {},
    showAdd: true,
    isShow: "+",
    sliderColor: "red"
  },

  sliderchange: function (event) {
    var color = "red";
    if (event.detail.value>=6){
      color = "green"
    }
    this.setData({
      score: event.detail.value,
      sliderColor: color
    });
  },

  isShowAdd: function(){
    var show = "+";
    if(this.data.isShow == "+"){
      show = "-"
    }
    this.setData({
      showAdd: !this.data.showAdd,
      isShow: show
    });
  },

  addComment: function (event) {
    var that = this;
    wx.request({
      url: 'https://nju304.xyz/comment/org/' + this.data.actId,
      method: 'POST',
      data: {
        userId: getApp().globalData.userInfo.openid,
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
              that.setData({
                showAdd: !that.data.showAdd
              });
              that.getComments()
            }, 1000);
          }
        });
      }
    })
  },

  getComments: function () {
    var that = this;
    wx.request({
      url: 'https://nju304.xyz/comment/org/' + this.data.actId,
      success: function (res) {
        if (res.statusCode != 404) {
          that.setData({
            comments: res.data
          });
        }
      },
      fail: function (res) {

      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      actId: options.actId
    });
    this.getComments();
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
    this.getComments()
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