// pages/activity/condition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    place:"",
    number:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    let prevcondition = prevPage.data.searchCondition
    if (prevcondition.place) {
      this.setData({
        place: prevcondition.place
      })
    }


    if (prevcondition.number) {
      this.setData({
        number: prevcondition.number
      })
    }

    this.setData({
      curDate: this.formatDate(new Date()),
    });
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

  },
  saveCondition: function (e) {
    var condition = e.detail.value
  
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      'searchCondition.place': condition.place,
      'searchCondition.number': condition.number
    })
    wx.navigateBack({

    })
    
  },

  formatDate: function (date) {
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var strHour = date.getHours();
    var strMinute = date.getMinutes();
    var currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate;
  },
})