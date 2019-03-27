// pages/user/label.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    labelArray: [],
    label: "",
    userId: "",
    hiddenmodalnput: true
  },

  loadLabels: function (labels) {
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

  cancel: function () {
    this.setData({
      hiddenmodalnput: true
    });
  },

  showInput: function () {
    this.setData({
      hiddenmodalnput: false
    });
  },

  updateLabel: function (event) {
    this.setData({
      label: event.detail.value
    })
  },

  addLabel: function () {
    console.log(this.data.label);
    var that = this;
    wx.request({
      method: 'POST',
      url: 'https://nju304.xyz/user/' + this.data.userId + '/label/' + this.data.label,
      success: function (res) {

      },
      fail: function (res) {

      }
    });
    this.setData({
      hiddenmodalnput: true
    });
    wx.request({
      url: 'https://nju304.xyz/user/' + this.data.userId,
      success: function (res) {
        var labels = res.data.labels
        that.loadLabels(labels);
      },
      fail: function (res) {

      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var labels = ";";
    this.setData({
      userId: options.userId
    });
    this.loadLabels(options.labels);
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