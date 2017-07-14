/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  个人
 * 
 * */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我发布的", "收藏夹", "回收站"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft:0 ,
  },
  //个人资料
  bindtapMy:function(){
    wx.navigateTo({
      url: '/pages/personal/personalData/personalData',
    });
  },
  //客服
  bindtapService: function(){
    wx.navigateTo({
      url: '',
    });
  },
  //下架
  bindtapOffTheShelf: function () {
    wx.showModal({
      title: '消息下架',
      content: '是否确定下架？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('下架成功!')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  //删除
  bindtapDelete: function () {
    wx.showModal({
      title: '消息删除',
      content: '是否确定删除？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('删除成功!')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  //加载完成
  onLoad: function () {
    var that = this;
    var sliderWidth=100;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  //tab点击切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
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