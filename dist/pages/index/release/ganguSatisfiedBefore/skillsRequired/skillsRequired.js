/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_干股纳才_技能要求页面
 * 
 * */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resourceRequirements: '',
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
      resourceRequirements:e.detail.value
    });
  },

  //保存收益描述
  savaskillsRequired: function () {
    var resourceRequirements = this.data.resourceRequirements;
    //判断是否为空
    if (resourceRequirements == '') {
      wx.showModal({
        title: '内容不能为空!',
        showCancel: false,
      });
    } else {
      //保存项目描述到app
      app.globalData.resourceRequirements = resourceRequirements;
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        resourceRequirements: resourceRequirements
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
      resourceRequirements: app.globalData.resourceRequirements
    });
  },
})