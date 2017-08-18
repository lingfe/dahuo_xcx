/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_生意转让_营业描述页面
 * 
 * */
 var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessDescription:null,
    dialog: {
      title: '',
      content: '',
      hidden: true
    }
  },
  //获取值
  dataChange: function (e) {
    this.data.businessDescription = e.detail.value;
  },

  //保存营业描述
  savabusinessDescription: function (e) {
    var businessDescription = this.data.businessDescription;
    //判断是否为空
    if (businessDescription == null) {
      //提示
      this.setData({
        businessDescription: businessDescription,
        'dialog.hidden': false,
        'dialog.title': '保存数据失败',
        'dialog.content': '不能为空'
      })
    } else {
      //保存地理位置
      console.log(app.globalData.businessDescription);
      app.globalData.businessDescription = businessDescription;
      console.log(app.globalData.businessDescription);
      //提示
      this.setData({
        businessDescription: businessDescription,
        'dialog.hidden': false,
        'dialog.title': '存储数据成功'
      })
    }
  },
  //点击确定
  confirm: function () {
    //判断是否为空
    if (this.data.businessDescription != null) {
      var businessDescription = this.data.businessDescription;
      console.log('geographicalPosition：' + businessDescription);
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        businessDescription: businessDescription
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
      businessDescription: app.globalData.businessDescription
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