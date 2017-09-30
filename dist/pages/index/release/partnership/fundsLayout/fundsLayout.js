/**  
 *   作者:  lingfe 
 *   时间:  2017-7-10
 *   描述:  合伙创业_输入资金规划.wxxml
 * 
 * */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fundDistribution: '',
    num:0
  },

  //获取值
  dataChange:function(e){
    if (e.detail.value.length > 800) {
      wx.showModal({
        title: '内容的长度不能打大于800',
        showCancel: false,
      });
      return;
    }
    this.setData({
      num: e.detail.value.length,
      fundDistribution: e.detail.value
    });
  },

  //保存资金规划
  bindtapFundsLayout: function (e){
    var fundDistribution = this.data.fundDistribution;
    //判断是否为空
    if (fundDistribution.length==0) {
      //提示
      wx.showModal({
        title: '资金规划不能为空!',
        showCancel: false,
      });
    } else {
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面

      //储存到缓存中
      wx.setStorageSync("fundDistribution", fundDistribution);
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
      fundDistribution: wx.getStorageSync('fundDistribution')
    });
  },
})