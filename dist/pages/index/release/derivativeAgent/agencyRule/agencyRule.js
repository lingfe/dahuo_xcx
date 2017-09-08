/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_微商代理_代理规则页面
 * 
 * */
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    agencyRule: null,
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
      agencyRule:e.detail.value
    });
  },

  //保存代理规则
  savaagencyRule: function (e) {
    var agencyRule = this.data.agencyRule;
    //判断是否为空
    if (agencyRule == null) {
      wx.showModal({
        title: '代理规则不能为空!',
        showCancel: false,
      });
    } else {
      //保存产品亮点
      app.globalData.agencyRule = agencyRule;
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        agencyRule: agencyRule
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
      agencyRule: app.globalData.agencyRule
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