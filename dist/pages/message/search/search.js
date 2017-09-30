/**  
 *   作者:  lingfe 
 *   时间:  2017-9-25
 *   描述:  通知_搭伙小秘书页面
 * 
 * */
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["系统消息", "帮助与反馈"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    allContentList:[{value:'您好！欢迎您使用搭伙，此次测试是内测版如有问题欢迎反馈，我们竭诚为您服务。'}]
  },
  
  //反馈
  bindtapfeedback:function(){
    wx.navigateTo({
      url: '/pages/message/search/feedback/feedback',
    })
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },


  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});