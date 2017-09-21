/**  
 *   作者:  lingfe 
 *   时间:  2017-9-19
 *   描述:  发布_干股纳才_股权划分页面
 * 
 * */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareDivision: '',
    num: 0
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
      shareDivision: e.detail.value
    });
  },

  //保存收益描述
  savaskillsRequired: function () {
    var shareDivision = this.data.shareDivision;
    if(shareDivision ==""){
      wx.showModal({
        title: '收益描述不能为空!',
        showCancel: false,
      });
      return;
    }
    //得到打开的页面
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      shareDivision: shareDivision
    })
    //返回上一页
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
})