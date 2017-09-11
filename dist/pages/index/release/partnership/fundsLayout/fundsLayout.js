/**  
 *   作者:  lingfe 
 *   时间:  2017-7-10
 *   描述:  合伙创业_输入资金布局.wxxml
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

  //保存资金布局
  bindtapFundsLayout: function (e){
    var fundDistribution = this.data.fundDistribution;
    //判断是否为空
    if (fundDistribution == null) {
      //提示
      wx.showModal({
        title: '资金布局不能为空!',
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