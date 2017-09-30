/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_生意转让_转让原因页面
 * 
 * */

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
    if (transferReason.length==0) {
      wx.showModal({
        title: '转让原因不能为空!',
        showCancel: false,
      });
    } else {
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面

      //储存到缓存中
      wx.setStorageSync("transferReason", transferReason);
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
      transferReason: wx.getStorageSync("transferReason")
    });
  },
})