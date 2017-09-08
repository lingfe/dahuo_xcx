/**  作者:  lingfe 
 *   时间:  2017-7-17
 *   描述:  行业选择页面
 * 
 * */
 var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    industryChoice:null,    //行业选择
  },
  //选择行业
  bindtapGetIndustryChoice:function(e){
    var industryChoice = e.currentTarget.dataset.name;
    //设置值
    this.setData({
      industryChoice:industryChoice,
    });
  },
  //确定
  bindtapOk:function(){
    var industryChoice = this.data.industryChoice;
    //判断是否为空
    if (industryChoice == null) {
      wx.showModal({
        title: '请选择行业!',
        showCancel: false,
      });
    } else {
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        industryChoice: industryChoice
      })
      //返回上一页
      wx.navigateBack();
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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