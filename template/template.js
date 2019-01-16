//初始化数据
function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/activity/list",
      "text": "活动"
    },
    {
      "current": 0,
      "pagePath": "/pages/personal/index",
      "text": "我的"
    },
    {
      "current": 0,
      "pagePath": "/pages/message/msg",
      "text": "消息"  
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['current'] = 1;

  bindData[bindName] = otabbar;
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}