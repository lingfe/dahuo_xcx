/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  个人
 * 
 * */
//获取应用实例
var app = getApp();
var server = require('../../utils/server');
var utilMd5 = require('../../utils/md5.js');
import __config from '../../config/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我发布的", "收藏夹", "档案袋"],   //tab菜单列
    activeIndex: 0,         //tab切换下标
    sliderOffset: 0,        //坐标x
    sliderLeft: 0,          //坐标y
    list: [],               //发布信息数据
    pagenum: 0,             //分页，第几业
    data: null,             //请求参数
    userinfo:null,          //个人信息
    numBer:1,               //帖子数量
    isnotice:false          //是否有通知
  },
  //个人资料,跳转
  bindtapMy:function(e){
    wx.navigateTo({
      url: '/pages/personal/personalData/personalData?personalId=' + e.currentTarget.id,
    });
  },

  //tab点击切换
  tabClick: function (e) {
    //当前
    var that = this;
    var name = e.currentTarget.dataset.name;
    if(name == "我发布的"){
      //我发布的
      that.requestDataRelease(that);
    }else if(name == "收藏夹"){
      //收藏夹
      that.requestDataFavorites(that);
    } else if (name == "档案袋"){
      //回收站
      that.requestDataRecovery(that);
    }

    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  //刷新
  bindtapRefresh:function(e){
    var that=this;
    //发布信息id
    var releaseId = e.currentTarget.id;
    //必要参数
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    var cookie = wx.getStorageSync("cookie");

    wx.request({
      url: __config.basePath_web + "api/exe/save",
      method: "POST",
      header: {cookie: cookie, "Content-Type": "application/x-www-form-urlencoded"},
      data: {
        timeStamp: time,
        token: token,
        reqJson: JSON.stringify({
          nameSpace: 'releaseinfo',       //发布信息信息表
          scriptName: 'Query',
          cudScriptName: 'Update',
          nameSpaceMap: {
            releaseinfo: {
              Query: [{
                id: releaseId,             //发布信息id
                version:11,
              }],
            }
          }
        })
      },
      success: function (res) {   //请求成功
        //调用我的发布
        that.requestDataRelease(that);
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

  //下架
  bindtapOffTheShelf: function (e) {
    var that = this;
    wx.showModal({
      title: '消息下架',
      content: '是否确定下架？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          //必要参数
          var time = new Date().getTime();
          var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
          //发布信息id
          var releaseId = e.currentTarget.id;
          //设置请求参数获取数据,默认0第一页
          var data = {
            timeStamp: time,
            token: token,
            reqJson: JSON.stringify({
              nameSpace: 'releaseinfo',       //发布信息信息表
              scriptName: 'Query',
              cudScriptName: 'Update',
              nameSpaceMap: {
                releaseinfo: {
                  Query: [{
                    id: releaseId,             //发布信息id
                    df:1                       //0，正常;1,删除，下架
                  }],
                }
              }
            })
          };

          that.setData({
            data: data,
          });

          //下架请求
          offTheShelf(that);
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });

    //下架请求
    function offTheShelf(that) {
      //必要参数
      var cookie = wx.getStorageSync("cookie");
      wx.request({
        url: __config.basePath_web + "api/exe/save",
        method: "POST",
        header: {
          cookie: cookie,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: that.data.data,
        success: function (res) {   //请求成功
          //调用我的发布
          that.requestDataRelease(that);
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
    }
  },

  //编辑
  bindtapEdit:function(e){
    console.log(e);
    var id=e.currentTarget.id;
    var name = e.currentTarget.dataset.name;
    var df = e.currentTarget.dataset.df;

    var url="";
    if(name == "合伙创业"){
      url = '/pages/index/release/partnership/partnership';
    } else if (name == "生意转让"){
      url = '/pages/index/release/businessTransfer/businessTransfer';
    } else if (name == "加盟分店"){
      url = '/pages/index/release/affiliateStores/affiliateStores';
    } else if (name == "干股纳才"){
      url = '/pages/index/release/ganguSatisfiedBefore/ganguSatisfiedBefore';
    } else if (name == "金融理财"){
      url = '/pages/index/release/financialManagement/financialManagement';
    }else if (name =="房产投资"){
      url = '/pages/index/release/propertyInvestment/propertyInvestment';
    } else if (name == "微商代理"){
      url = '/pages/index/release/derivativeAgent/derivativeAgent';
    }else if(name == "其他"){
      url = '/pages/index/release/other/other';
    }

    wx.navigateTo({
      url: url +"?releaseId="+id+"&df="+df+"&text=保存",
    });
  },
  
  //上架
  bindtapTheShelves:function(e){
    var that = this;
    wx.showModal({
      title: '上架提醒',
      content: '是否确定上架？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          //发布信息id
          var releaseId = e.currentTarget.id;
          //设置参数
          var data = {
            timeStamp: that.data.time,
            token: that.data.token,
            reqJson: JSON.stringify({
              nameSpace: 'releaseinfo',       //发布信息信息表
              scriptName: 'Query',
              cudScriptName: 'UpdateDf',
              nameSpaceMap: {
                releaseinfo: {
                  Query: [{
                    id: releaseId,             //发布信息id
                    df: 0                      //0，正常;1,删除，下架
                  }],
                }
              }
            })
          };

          that.setData({
            data: data,
          });

          //上架请求
          theShelves(that);
        }
      }
    });

    //上架请求
    function theShelves(that) {
      //必要参数
      var cookie = wx.getStorageSync("cookie");
      wx.request({
        url: __config.basePath_web + "api/exe/save",
        method: "POST",
        header: {
          cookie: cookie,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: that.data.data,
        success: function (res) {   //请求成功
          //回收站
          that.requestDataRecovery(that);
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
    }

  },

  //删除
  bindtapDelete: function (e) {
    var that = this;
    wx.showModal({
      title: '消息删除',
      content: '是否确定删除？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          //发布信息id
          var releaseId = e.currentTarget.id;
          //设置参数
          var data = {
            timeStamp: that.data.time,
            token: that.data.token,
            reqJson: JSON.stringify({
              nameSpace: 'releaseinfo',       //发布信息信息表
              scriptName: 'Query',
              cudScriptName: 'Delete',
              nameSpaceMap: {
                releaseinfo: {
                  Query: [{
                    id: releaseId,             //发布信息id
                  }],
                }
              }
            })
          };

          that.setData({
            data: data,
          });

          //删除请求
          releaseDelete(that);
        } 
      }
    });

    //删除请求
    function releaseDelete(that) {
      wx.request({
        url: __config.basePath_web + "api/exe/save",
        method: "POST",
        header: {cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded"},
        data: that.data.data,
        success: function (res) {
          //调用回收站
          that.requestDataRecovery(that);
        },
        fail: function (res) {},
        complete: function () {}
      });
    }
  },

  //获取个人信息
  personalGetData:function(that){
    var data = {
      timeStamp: that.data.time,
      token: that.data.token,
      reqJson: JSON.stringify({
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        nameSpaceMap: {
          sys_userinfo: {
            Query: [{
              id: that.data.personalId    //个人资料id
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

  //客服,消息
  bindtapService:function(){
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },

  //加载完成
  onLoad: function () {
    //当前
    var that = this;
    //必要参数
    var cookie = wx.getStorageSync("cookie");
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    //个人资料id
    var personalId = wx.getStorageSync("personalId");
    //设置值
    that.setData({
      personalId: personalId,
      cookie: cookie,
      time: time,
      token:token,
    });

    //个人
    that.personalGetData(that);
    //我发布的
    that.requestDataRelease(that);
    //获取是否有通知
    that.getIsnotice(that);

    //设置tab
    var sliderWidth=50;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  //获取是否有通知
  getIsnotice:function(that){
    //发送请求
    wx.request({
      url: __config.basePath_web + "api/exe/get",
      method: "POST",
      header: { cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: that.data.time,
        token: that.data.token,
        reqJson: JSON.stringify({
          nameSpace: 'notice',       //发布信息表
          scriptName: 'Query',
          nameSpaceMap: {
            notice: {
              Query: [{
                static:0,                                      //0=未读
                personalId: wx.getStorageSync("personalId")    //个人id
              }],
            }
          }
        })
      },
      success: function (res) {   //请求成功
        var row = res.data.rows;
        if(row.length!=0){
          that.setData({isnotice: true});
        }else{
          that.setData({ isnotice: false });
        }
      },
      fail: function (res) { },
      complete: function () { }
    });
  },

  //获取时间差
  getDate:function(date) {
    var date1 = new Date(date);    //开始时间
    var date2 = new Date();    //结束时间
    var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数
    
      //计算出相差月
      var months = (date2.getFullYear() - date1.getFullYear()) * 12;
    if(months != 0) {
      return months + "月";
    }

      //计算出相差天数
      var days = Math.floor(date3 / (24 * 3600 * 1000));
    if(days != 0) {
      return { date: days + "天", timeNuber: days };
    }

      //计算出小时数
      var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    if(hours != 0) {
      return { date: hours + "小时", timeNuber: days };
    }

      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    if(minutes != 0) {
      return { date: minutes + "分钟", timeNuber:days};
    }

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    if(seconds != 0) {
      return { date: seconds + "秒", timeNuber: days };
    }
  },

  //请求获取数据
  requestData: function (that) {
    //请求获取发布信息,
    wx.request({
      url: __config.basePath_web+"api/exe/get",
      method: "POST",
      header: {cookie: that.data.cookie,"Content-Type": "application/x-www-form-urlencoded"},
      data: that.data.data,
      success: function (res) {
        var pageList = [];
        //得到数据
        var list = res.data.rows;
        for (var i = 0, lenI = list.length; i < lenI; ++i) {
          var strTime = that.getDate(list[i].mdate);
          if (list[i].imageArray !=null )list[i].imageArray = __config.domainImage + list[i].imageArray.split(',')[0];
          if (list[i].projectDescription!=null)list[i].projectDescription = list[i].projectDescription.substring(0,60);
          if (list[i].incomeDescription != null) list[i].incomeDescription = list[i].incomeDescription.substring(0,60);
          if (list[i].businessDescription != null) list[i].businessDescription = list[i].businessDescription.substring(0,60);

          list[i].mdate = strTime.date;
          list[i].timeNuber = (60-strTime.timeNuber);
          //添加到当前数组
          pageList.push(list[i]);
        }

        //设置数据，提示框
        that.setData({
          list: pageList
        });
        
        if(that.data.tizhi == "tizhi" ){
          //设置数据，提示框
          that.setData({
            numBer: pageList.length
          });
        }
      },
      fail: function (res) {},
      complete: function () {}
    });
  },

  //请求获取数据,个人信息
  requestDataPersonal : function (that) {
    wx.request({
      url: __config.basePath_sys+"api/exe/get",
      method: "POST",
      header: {cookie: that.data.cookie,"Content-Type": "application/x-www-form-urlencoded" },
      data: that.data.data,
      success: function (res) {   //请求成功
        console.log("userinfo:");
        console.log(res);
        if(res.statusCode == 408){
          wx.showToast({
            title: "会话已过期，请重新登录！",
            icon: 'loading',
            duration: 2000,
            success:function(res){
              wx.redirectTo({
                url: '/pages/wxUserinfoLogin/wxUserinfoLogin',
              });
              return;
            }
          });
        }

        that.setData({
          userinfo:res.data.rows[0]
        });
      },
      fail: function (res) {},
      complete: function () {}
    });
  },

  //我发布的
  requestDataRelease: function (that) {
    var data = {
        timeStamp: that.data.time,
        token: that.data.token,
        reqJson: JSON.stringify({
          nameSpace: 'releaseinfo',       //发布表
          scriptName: 'Query',
          nameSpaceMap: {
            releaseinfo: {
              Query: [{
                inDf:[0,4,5],            //0=正常显示，4=正在审核中，5=审核未通过
                personalId: that.data.personalId,    //个人资料id
              }],
            }
          }
        })
      };
    that.setData({
      data: data,
      tizhi:'tizhi',
      list:[]
    });

    //请求获取数据,我发布的
    that.requestData(that);
  },

  //收藏夹
  requestDataFavorites: function (that) {
    var data = {
      timeStamp: that.data.time,
      token: that.data.token,
      reqJson: JSON.stringify({
        nameSpace: 'collectioninfo',       //收藏夹表
        scriptName: 'Query',
        nameSpaceMap: {
          collectioninfo: {
            Query: [{
              df:0,
              creator: that.data.personalId    //个人资料id
            }],
          }
        }
      })
    };

    that.setData({
      data: data,
      tizhi: '',
      list:[]
    });

    //请求获取数据,收藏夹
    wx.request({
      url: __config.basePath_web + "api/exe/get",
      method: "POST",
      header: { cookie: that.data.cookie,"Content-Type": "application/x-www-form-urlencoded" },
      data: that.data.data,
      success: function (res) {
        //得到数据
        var list = res.data.rows;
        for (var i = 0, lenI = list.length; i < lenI; ++i) {
          getSC(list[i].releaseId);
        }
      },
      fail: function (res) {},
      //不管成功失败都执行
      complete: function () { }
    });

    //根据发布id获取
    function getSC(releaseId){
      data = {
        timeStamp: that.data.time,
        token: that.data.token,
        reqJson: JSON.stringify({
          nameSpace: 'releaseinfo',       //发布信息表
          scriptName: 'Query',
          nameSpaceMap: {
            releaseinfo: {
              Query: [{
                id: releaseId    //发布id
              }],
            }
          }
        })
      };

      that.setData({
        data: data,
        list:[]
      });
      //请求获取数据
      that.requestData(that);
    }
  },

  //回收站
  requestDataRecovery: function (that) {
    var data = {
      timeStamp: that.data.time,
      token: that.data.token,
      reqJson: JSON.stringify({
        nameSpace: 'releaseinfo',       //回收站表
        scriptName: 'Query',
        nameSpaceMap: {
          releaseinfo: {
            Query: [{
              inDf: [1,2],            //0=正常显示，1=已下架，2=未发布，4=正在审核中，5=审核未通过
              personalId: that.data.personalId,    //个人资料id
            }],
          }
        }
      })
    };
    that.setData({
      data: data,
      tizhi: '',
      list:[]
    });
    //请求获取数据,回收站
    that.requestData(that);
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
    var that= this;

    //个人
    that.personalGetData(that);
    //获取是否有通知
    that.getIsnotice(that);
    //下拉完成后执行回退
    wx.stopPullDownRefresh();
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
  
  },
  //搭伙
  bindtapDahuo: function () {
    wx.redirectTo({
      url: '/pages/index/index',
    });
  },
  //个人
  bindtapUser: function () {
    wx.redirectTo({
      url: '/pages/personal/personal',
    })
  }
})