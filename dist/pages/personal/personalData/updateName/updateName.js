/**  
 *   作者:  lingfe 
 *   时间:  2017-7-26
 *   描述:  个人_个人资料_修改名称
 * 
 * */
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    updateName: null,
    dialog: {
      title: '',
      content: '',
      hidden: true
    }
  },
  //获取值
  dataChange: function (e) {
    this.data.updateName = e.detail.value;
  },

  //修改用户名称
  bindtapUpdateName: function (e) {
    var updateName = this.data.updateName;
    //判断是否为空
    if (updateName == null) {
      //提示
      this.setData({
        updateName: updateName,
        'dialog.hidden': false,
        'dialog.title': '保存数据失败',
        'dialog.content': '不能为空'
      })
    } else {
      //修改用户名称
      console.log(app.globalData.updateName);
      app.globalData.updateName = updateName;
      console.log(app.globalData.updateName);
      //提示
      this.setData({
        updateName: updateName,
        'dialog.hidden': false,
        'dialog.title': '存储数据成功'
      })
    }
  },
  //点击确定
  confirm: function () {
    //判断是否为空
    if (this.data.updateName != null) {
      var updateName = this.data.updateName;
      console.log('updateName：' + updateName);
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        updateName: updateName
      })
      //返回上一页
      wx.navigateBack();
    }
    this.setData({
      'dialog.hidden': true,
      'dialog.title': '',
      'dialog.content': ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //重新赋值
    this.setData({
      updateName: app.globalData.updateName
    });
  },
})