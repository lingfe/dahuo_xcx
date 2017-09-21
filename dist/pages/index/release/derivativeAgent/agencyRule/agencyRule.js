/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_微商代理_代理规则页面
 * 
 * */
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
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面

      //储存到缓存中
      wx.setStorageSync("agencyRule", agencyRule);
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
      agencyRule: wx.getStorageSync('agencyRule')
    });
  },
})