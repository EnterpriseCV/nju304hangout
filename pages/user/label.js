// pages/user/label.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    labelArray: [],
    label: "",
    hiddenmodalnput: true
  },

  loadLabels: function(labels) {
    var labelArray = [];
    if (labels.length == 0) {
      return
    }
    var temp = labels.split(';');
    var labelsStr = temp[0].split(' ');
    var labelsNum = temp[1].split(' ');
    var labelJson;
    for (var i = 0; i < labelsStr.length; i++) {
      labelJson = {};
      labelJson.label = labelsStr[i];
      labelJson.num = labelsNum[i];
      labelArray.push(labelJson);
    }
    this.setData({
      labelArray: labelArray
    });
  },

  cancel: function() {
    this.setData({
      hiddenmodalnput: true
    });
  },

  showInput: function() {
    this.setData({
      hiddenmodalnput: false
    });
  },

  updateLabel: function (event) {
    this.setData({
      label: event.detail.value
    })
  },

  addLabel: function() {
    console.log(this.data.label);
    
    this.onLoad({});
    this.setData({
      hiddenmodalnput: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var labels = ";";
    if (options.labels == null) {
      var that = this;
      wx.request({
        url: 'https://nju304.xyz/user/' + getApp().globalData.userInfo.openid,
        success: function(res) {
          var labels = res.data.labels
          that.loadLabels(labels);
        },
        fail: function(res) {

        }
      });
    } else {
      this.loadLabels(options.labels);
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