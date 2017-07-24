/**  作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  详细信息页面
 * 
 * */

Page({
  data:{
    bl:false,
    tabs: ["项目细节", "讨论区"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    inputValue: '',
    allContentList: ['马云','马化腾'],
  },
  //收藏
  bindtapSC:function(){
    wx.showModal({
      title: '收藏',
      content: '您是否需要收藏？',
      confirmText: "是",
      cancelText: "否",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('收藏成功!');
        } else {
          console.log('收藏失败!');
        }
      }
    });
  },
  //举报
  bindtapJB:function(){
    wx.showModal({
      title: '举报',
      content: '您是否举报该发布人？',
      confirmText: "是",
      cancelText: "否",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('举报成功!');
        } else {
          console.log('举报失败!');
        }
      }
    });
  },
  //查看全文
  bindtapSelectInfo: function () {
    if (this.data.bl == true) {
      this.setData({
        bl: false
      });
    } else {
      this.setData({
        bl: true
      });
    }
  },
  //tab切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //拨打电话
  bindtapPhone: function () {
    wx.showModal({
      title: '拨打电话',
      content: '是否拨打？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '13068326391' //仅为示例，并非真实的电话号码
          });
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });

  },
  //发送信息
  bindtagFasho: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    });
  },
  //输入评论内容事件
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  //评论
  submitTo: function (e) {
    console.log("inputValue:" + this.data.inputValue);
    console.log("inputTemp:"+this.data.inputTemp);

    let that = this;
    that.data.allContentList.push(that.data.inputValue);
    that.setData({
      allContentList: that.data.allContentList
    });
    console.log(this.data.allContentList);

  },
  //加载页面
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
  }
});