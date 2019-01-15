// pages/activity/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actinfo:"",
    userlist:"",
    notEditable:true,
    inthisact:false,
    curDate:'',
    maxDate:''
  },
  exitActivity:function(event){
    //console.log(getApp().globalData.userInfo.openid+" "+this.data.actinfo.id);
    
  },
  checkuser:function(event){
    wx.navigateTo({
      url: '/pages/user/index?userId=' + event.currentTarget.dataset.userid,
    })
  },
  applyForActivity:function(e){
    var that = this;
    wx.request({
      url: 'https://nju304.xyz/activities/'+that.data.actinfo.id+'/applications',
      method:'post',
      data:{
        actId: that.data.actinfo.id,
        actName: that.data.actinfo.name,
        nickName:getApp().globalData.userInfo.nickName,
        userId: getApp().globalData.userInfo.openid,
      },
      success:function(res){
        if (res.data == 'Created') {
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({

                })
              }, 1000);
            }
          });
        }
      }
    })
  },
  formSubmit:function(e){
    e.detail.value.ownerId=getApp().globalData.userInfo.openid;
    wx.request({
      url: 'https://nju304.xyz/activities/',
      method:'post',
      data:e.detail.value,
      success:function(res){
        if(res.data=='Created'){
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1000,
          mask: true,
          success:function(){
            setTimeout(function(){
              wx.navigateBack({

              })
            },1000);
          }
        });
        }
      }
    })
  },
  bindStartTimeChange:function(event){
    this.setData({'actinfo.startTime':event.detail.value+" 00:00"});
  },
  bindEndTimeChange: function (event) {
    this.setData({ 'actinfo.endTime': event.detail.value + " 00:00" });
  },

  getNowFormatDate:function() {
    var date = new Date();
    return this.formatDate(date);
  },

  getMaxFormatDate: function () {
    var date = new Date();
    date.setDate(date.getDate()+30);
    return this.formatDate(date);
  },
  formatDate:function(date){
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
    var currentdate = year + seperator1 + month + seperator1 + strDate +" "+strHour+":"+strMinute;
    return currentdate;
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({curDate:that.getNowFormatDate(),maxDate:that.getMaxFormatDate()});
    if(options.opentype=='create'){
      that.setData({ notEditable: false, actinfo:{startTime: that.getNowFormatDate(),endTime: that.getNowFormatDate()}});
    }else{
      wx.request({
        url: 'https://nju304.xyz/activities/'+options.actId,
        success:function(res){
          that.setData({actinfo:res.data});
        }
      });
      wx.request({
        url: 'https://nju304.xyz/activities/' + options.actId+"/users",
        success: function (res) {

          that.setData({ userlist: res.data });
          for(var user of res.data){
            if(user.id==getApp().globalData.userInfo.openid){
              console.log(user);
              that.setData({inthisact:true});
              break;
            }
          }
        }
      });
    }

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