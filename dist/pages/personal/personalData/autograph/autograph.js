/**  
 *   作者:  lingfe 
 *   时间:  2017-7-26
 *   描述:  个人_个人资料_修改签名
 * 
 * */
 var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autograph: null,
    dialog: {
      title: '',
      content: '',
      hidden: true
    }
  },
  //获取值
  dataChange: function (e) {
    this.data.autograph = e.detail.value;
  },

  //修改用户名称
  bindtapautograph: function (e) {
    var autograph = this.data.autograph;
    //判断是否为空
    if (autograph == null) {
      //提示
      this.setData({
        autograph: autograph,
        'dialog.hidden': false,
        'dialog.title': '保存数据失败',
        'dialog.content': '不能为空'
      })
    } else {
      //修改用户名称
      console.log(app.globalData.autograph);
      app.globalData.autograph = autograph;
      console.log(app.globalData.autograph);
      //提示
      this.setData({
        autograph: autograph,
        'dialog.hidden': false,
        'dialog.title': '存储数据成功'
      })
    }
  },
  //点击确定
  confirm: function () {
    //判断是否为空
    if (this.data.autograph != null) {
      var autograph = this.data.autograph;
      console.log('autograph' + autograph);
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        autograph: autograph
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
      autograph: app.globalData.autograph
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
  
  }
})