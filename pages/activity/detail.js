// pages/activity/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actinfo: "",
    userlist: "",
    notEditable: true,
    inthisact: false,
    isOwner: false,
    opentype: "",
    curDate: '',
    maxDate: '',
    actPwd: "",
    setPwd: "OFF",
    hiddenmodalnput: true,
    pwdApplyInput: true
  },


  cancel: function() {
    this.setData({
      actPwd: "",
      hiddenmodalnput: true,
      setPwd: "OFF"
    });
  },

  showInput: function() {
    this.setData({
      hiddenmodalnput: false
    });
  },

  updatePwd: function(event) {
    this.setData({
      actPwd: event.detail.value
    })
  },

  addPwd: function() {
    var that = this;
    if (this.data.actPwd != "") {
      this.setData({
        hiddenmodalnput: true,
        setPwd: "ON"
      });
      wx.showToast({
        title: '成功设置密码',
        icon: 'succes',
        duration: 1000,
        mask: true,
        success: function() {}
      });
    } else {
      this.setData({
        hiddenmodalnput: true,
        setPwd: "OFF"
      });
      wx.showToast({
        title: '密码不能为空',
        icon: 'succes',
        duration: 1000,
        mask: true,
        success: function() {}
      });
    }
  },

  cancelApply: function() {
    this.setData({
      actPwd: "",
      pwdApplyInput: true
    });
  },

  pwdApply: function() {
    var that = this;
    if (this.data.actPwd != "") {
      this.setData({
        pwdApplyInput: true
      });
      this.applyOrPwdForActivity();
    } else {
      this.setData({
        pwdApplyInput: true
      });
      wx.showToast({
        title: '密码不能为空',
        icon: 'succes',
        duration: 1000,
        mask: true,
        success: function() {}
      });
    }
  },


  checkActivityComment: function() {
    var that = this;
    wx.navigateTo({
      url: '/pages/comment/comments?actId=' + that.data.actinfo.id
    })
  },

  addActivityComment: function() {
    var that = this;
    wx.navigateTo({
      url: '/pages/comment/add?actId=' + that.data.actinfo.id + '&userId=' + getApp().globalData.userInfo.openid
    })
  },

  deleteact: function() {
    var that = this;
    wx.request({
      url: 'https://nju304.xyz/activities/' + that.data.actinfo.id,
      method: 'delete',
      header: {
        "Cookie": "JSESSIONID=" + getApp().globalData.session_id
      },
      success: function(res) {
        if (res.data == 'OK') {
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true,
            success: function() {
              setTimeout(function() {
                wx.navigateBack({

                })
              }, 1000);
            }
          });
        }
      }
    })
  },
  exitActivity: function(event) {
    var that = this;
    wx.request({
      url: 'https://nju304.xyz/activities/' + that.data.actinfo.id + '/user ',
      header: {
        "Cookie": "JSESSIONID=" + getApp().globalData.session_id
      },
      method: 'delete',
      success: function(res) {
        if (res.data == 'OK') {
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true,
            success: function() {
              setTimeout(function() {
                wx.navigateBack({

                })
              }, 1000);
            }
          });
        }
      }
    })
  },
  checkuser: function(event) {
    wx.navigateTo({
      url: '/pages/user/index?userId=' + event.currentTarget.dataset.userid,
    })
  },

  applyForActivity: function () {
    console.log(this.data.actinfo.pwd)
    if (this.data.actinfo.pwd != null && this.data.actinfo.pwd != "") {
      this.setData({
        pwdApplyInput: false
      });
      return;
    }
    this.applyOrPwdForActivity();
  },

  applyOrPwdForActivity: function() {
    var that = this;
    wx.request({
      url: 'https://nju304.xyz/activities/' + that.data.actinfo.id + '/applications',
      method: 'post',
      data: {
        actId: that.data.actinfo.id,
        actName: that.data.actinfo.name,
        nickName: getApp().globalData.userInfo.nickName,
        userId: getApp().globalData.userInfo.openid,
        pwd: this.data.actPwd
      },
      success: function(res) {
        if (res.data == 'Created' || res.data == 'OK') {
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true,
            success: function() {
              setTimeout(function() {
                wx.navigateBack({

                })
              }, 1000);
            }
          });
        }
      }
    })
  },
  formSubmit: function(e) {
    e.detail.value.ownerId = getApp().globalData.userInfo.openid;
    e.detail.value.id = this.data.actinfo.id;
    if (this.data.actPwd != "") {
      e.detail.value.pwd = this.data.actPwd;
    }
    wx.request({
      url: 'https://nju304.xyz/activities/',
      method: 'post',
      header: {
        "Cookie": "JSESSIONID=" + getApp().globalData.session_id
      },
      data: e.detail.value,
      success: function(res) {
        if (res.data == 'Created' || res.data == 'OK') {
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true,
            success: function() {
              setTimeout(function() {
                wx.navigateBack({

                })
              }, 1000);
            }
          });
        }
      }
    })
  },
  bindStartTimeChange: function(event) {
    this.setData({
      'actinfo.startTime': event.detail.value + " 00:00"
    });
  },
  bindEndTimeChange: function(event) {
    this.setData({
      'actinfo.endTime': event.detail.value + " 00:00"
    });
  },

  getNowFormatDate: function() {
    var date = new Date();
    return this.formatDate(date);
  },

  getMaxFormatDate: function() {
    var date = new Date();
    date.setDate(date.getDate() + 30);
    return this.formatDate(date);
  },
  formatDate: function(date) {
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
    var currentdate = year + seperator1 + month + seperator1 + strDate + " " + strHour + ":" + strMinute;
    return currentdate;
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      curDate: that.getNowFormatDate(),
      maxDate: that.getMaxFormatDate(),
      opentype: options.opentype
    });
    if (options.opentype == 'create') {
      that.setData({
        notEditable: false,
        actinfo: {
          startTime: that.getNowFormatDate(),
          endTime: that.getNowFormatDate()
        }
      });
    } else {
      wx.request({
        url: 'https://nju304.xyz/activities/' + options.actId,
        success: function(res) {
          that.setData({
            actinfo: res.data
          });
          if (getApp().globalData.userInfo.openid == res.data.ownerId) {
            that.setData({
              notEditable: false,
              isOwner: true
            });
          }
        }
      });
      if (this.data.actinfo.pwd != null && this.data.actinfo.pwd != "") {
        that.setData({
          setPwd: "ON"
        });
      }
      wx.request({
        url: 'https://nju304.xyz/activities/' + options.actId + "/users",
        success: function(res) {
          that.setData({
            userlist: res.data
          });
          for (var user of res.data) {
            if (user.id == getApp().globalData.userInfo.openid) {
              console.log(user);
              that.setData({
                inthisact: true
              });
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