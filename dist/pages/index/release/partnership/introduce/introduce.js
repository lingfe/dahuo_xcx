/**  
 *   作者:  lingfe 
 *   时间:  2017-7-10
 *   描述:  合伙创业_输入团队/公司介绍.js
 * 
 * */
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamIntroduction: '',
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
      teamIntroduction: e.detail.value
    });
  },

  //保存收益描述
  savaintroduce: function () {
    var teamIntroduction = this.data.teamIntroduction;
    //判断是否为空
    if (teamIntroduction == null) {
      wx.showModal({
        title: '内容不能为空!',
        showCancel: false,
      });
    } else {
      //保存项目描述到app
      app.globalData.teamIntroduction = teamIntroduction;
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        teamIntroduction: teamIntroduction
      })
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
      teamIntroduction: app.globalData.teamIntroduction
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