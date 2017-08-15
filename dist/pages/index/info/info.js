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
    jb:false,
    sc:1,
    inputHF:false,  //回复文本框是否显示
    inputHfName:'', //回复名称
  },
  //收藏
  bindtapSC:function(){
    this.setData({
      sc: this.data.sc == 1 ? 2 : 1,
    });
    //提示
    wx.showToast({
      title: '已收藏!',
      icon: 'toast',
      duration: 1000,
    });
  },
  //点击举报
  bindtapJB: function () {
    this.setData({
      jb: this.data.jb == true ? false : true
    });

  },
  //举报
  JB:function(){
    this.setData({
      jb: this.data.jb == true ? false : true
    });
    //提示
    wx.showToast({
      title: '举报成功!',
      icon: 'loading',
      duration: 3000,
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
    //复制电话号码
    wx.showModal({
      title: '复制电话号码',
      content: '复制电话号码？13068326391',
      confirmText: "复制",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          //剪贴板
          wx.setClipboardData({
            data:"13068326391",
            success: function (res) {
              console.log("复制成功:"+res.data)
            },
            fail:function(res){
              console.log("复制失败:" + res.data)
            }
          });
        } else {
          console.log('用户点击辅助操作')
        }
      }
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
    if (that.data.inputHf){
      //提示
      wx.showToast({
        title: '已回复!',
        icon: 'toast',
        duration: 1000,
      });
    }

    that.data.allContentList.push(that.data.inputValue);
    that.setData({
      allContentList: that.data.allContentList,
      inputHf: false,
      inputValue:'',
    });
    console.log(this.data.allContentList);

  },
  //回复
  commentHuiFu:function(e){
    console.log("e.currentTarget.dataset.name:" + e.currentTarget.dataset.name);
    this.setData({
      inputHf: true,
      inputHfName: e.currentTarget.dataset.name
    });
  },
  //其他举报
  otherReport:function(){
    wx.navigateTo({
      url: "/pages/index/info/report/report",
    });
  },
  //加载页面
  onLoad: function () {
    var that = this;
    var sliderWidth=80;
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