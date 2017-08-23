/**  作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  详细信息页面
 * 
 * */
var app = getApp();
var utilMd5 = require('../../../utils/md5.js');
import __config from '../../../config/config'

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
    sc:1,           //控制收藏图标
    inputHF:false,  //回复文本框是否显示
    inputHfName:'', //回复名称
    releaseId:'',     //发布信息id
    personalId:'',   //个人资料id
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
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      releaseId: options.releaseId,
      personalId: options.personalId
    });

    //获取发布相关信息
    that.requestData(that);
    //获取个人信息
    that.personalGetData(that);

    //初始化tabs
    var sliderWidth=80;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  //获取个人信息
  personalGetData: function (that) {
    //必要参数
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    //个人资料id
    var personalId = that.data.personalId;
    //设置请求参数获取数据,默认0第一页
    var data = {
      timeStamp: time,
      token: token,
      reqJson: JSON.stringify({
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        nameSpaceMap: {
          sys_userinfo: {
            Query: [{
              id: personalId    //个人资料id
            }],
          }
        }
      })
    };
    that.setData({
      data: data,
    });

    //发送请求
    this.requestDataPersonal(that);
  },

  //请求获取数据,个人信息
  requestDataPersonal: function (that) {
    //必要参数
    var cookie = wx.getStorageSync("cookie");
    wx.request({
      url: __config.basePath_sys + "api/exe/get",
      method: "POST",
      header: {
        cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: that.data.data,
      success: function (res) {   //请求成功
        console.log("userinfo:");
        console.log(res);
        that.setData({
          userinfo: res.data.rows[0]
        });
      },
      fail: function (res) {      //请求失败
        //提示
        wx.showToast({
          title: "请求失败！",
          icon: 'loading',
          duration: 3000,
        });
        console.log("失败了");
      },
      //不管成功失败都执行
      complete: function () { }
    });
  },

  //获取时间差
  getDate: function (date) {
    var date1 = new Date(date);    //开始时间
    var date2 = new Date();    //结束时间
    var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数

    //计算出相差年
    //还有一个小bug，当事件差为负数时，值为负数，将上面leftsecond代码改一下
    //var leftsecond = parseInt(Math.abs((date2.getTime() - date1.getTime())) / 1000);

    //计算出相差月
    var months = (date2.getFullYear() - date1.getFullYear()) * 12;
    if (months != 0) {
      return months + "月";
    }

    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    if (days != 0) {
      return days + "天";
    }

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    if (hours != 0) {
      return hours + "小时";
    }

    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    if (minutes != 0) {
      return minutes + "分钟";
    }

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    if (seconds != 0) {
      return seconds + "秒";
    }
  },

  //请求获取数据,发布信息
  requestData: function (self) {
    //必要参数
    var cookie = wx.getStorageSync("cookie");
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();

    //设置请求参数获取数据,默认0第一页
    var data = {
      timeStamp: time,
      token: token,
      reqJson: JSON.stringify({
        nameSpace: 'releaseinfo',
        scriptName: 'Query',
        nameSpaceMap: {
          releaseinfo: {
            Query: [{
              id: self.data.releaseId    //发布信息id
            }],
          }
        }
      })
    };
    //请求获取发布信息,
    wx.request({
      url: __config.basePath_web + "api/exe/get",
      method: "POST",
      header: {
        cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function (res) {
        console.log(res);
        var pageList = [];
        //得到数据
        var list = res.data.rows;
        for (var i = 0, lenI = list.length; i < lenI; ++i) {
          var strTime = self.getDate(list[i].cdate);
          list[i].cdate = strTime;
          //添加到当前数组
          pageList.push(list[i]);
        }
        //设置值
        self.setData({
          releaseInfo: pageList[0],
        });
        console.log("成功了");
      },
      fail: function (res) {
        //提示
        wx.showToast({
          title: "请求失败！",
          icon: 'loading',
          duration: 3000,
        });
        console.log("失败了");
      },
      //不管成功失败都执行
      complete: function () { }
    });
  },
});