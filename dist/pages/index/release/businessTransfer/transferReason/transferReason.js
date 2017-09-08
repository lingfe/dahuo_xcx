/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_生意转让_转让原因页面
 * 
 * */
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    transferReason: null,
    num:0
  },
  
  //获取值
  dataChange: function (e) {
    if (e.detail.value.length > 500) {
      wx.showModal({
        title: '内容的长度不能打大于500',
        showCancel: false,
      });
      return;
    }
    this.setData({
      num: e.detail.value.length,
      transferReason: e.detail.value
    });
  },

  //保存转让原因
  savatransferReason: function (e) {
    var transferReason = this.data.transferReason;
    //判断是否为空
    if (transferReason == null) {
      wx.showModal({
        title: '转让原因不能为空!',
        showCancel: false,
      });
    } else {
      //保存转让原因
      app.globalData.transferReason = transferReason;
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        transferReason: transferReason
      });
      //返回上一页
      wx.navigateBack();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //重新赋值
    this.setData({
      transferReason: app.globalData.transferReason
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