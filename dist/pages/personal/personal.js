/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  个人
 * 
 * */
//获取应用实例
var app = getApp();

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
    isnotice:0              //是否有通知
  },

  //个人资料,跳转
  bindtapMy:function(e){
    wx.navigateTo({
      url: '/pages/personal/personalData/personalData',
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

    //设置
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  //刷新
  bindtapRefresh:function(e){
    var that=this;
    //发布信息id
    var releaseId = e.currentTarget.id;
    //剩余天数
    var day = e.currentTarget.dataset.day;
    if(day>59){
      wx.showToast({
        title: "今日已刷!",
        icon: 'ok',
        duration: 1000,
      });
      return;
    }
    //发送请求刷新
    var url = app.config.basePath_web + "api/exe/save";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'releaseinfo',       //发布信息信息表
        scriptName: 'Query',
        cudScriptName: 'Save',
        nameSpaceMap: {
          rows: [{
            releaseinfo:{
              save:{
                mdate:new Date()
              },
              id: releaseId,             //发布信息id
            }
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      wx.showToast({ title: "刷新完成!",icon: 'ok',duration: 1000 });
      //调用我的发布
      that.requestDataRelease(that);
    });
  },

  //下架
  bindtapOffTheShelf: function (e) {
    var that = this;
    //得到df 0=显示中，1=已下架，2=未发布，4=审核中，5=未通过
    var df = e.currentTarget.dataset.df;
    if ("0".indexOf(df)==-1){
      //提示
      wx.showToast({ title: "不允许下架！",icon: 'loading',duration: 1000 });
      return;
    }else{
      //提示
      wx.showModal({title: '消息下架',content: '是否确定下架？',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          console.log(res);
          if (res.confirm) {//确定
            //将信息下架
            var url = app.config.basePath_web + "api/exe/save";
            //请求头
            var header = {
              cookie: wx.getStorageSync("cookie"),
              "Content-Type": "application/x-www-form-urlencoded"
            };
            //参数
            var data = {
              timeStamp: wx.getStorageSync("time"),
              token: wx.getStorageSync("token"),
              reqJson: JSON.stringify({
                nameSpace: 'releaseinfo',       //发布信息信息表
                scriptName: 'Query',
                cudScriptName: 'Save',
                nameSpaceMap: {
                  rows: [{
                    id: e.currentTarget.id,             //发布信息id
                    df: 1                               //0=正常;，1=已下架，2=未发布，4=审核中，5=未通过
                  }],
                }
              })
            };
            //发送请求
            app.request.reqPost(url,header,data,function(res){
              //调用获取我的发布
              that.requestDataRelease(that);
            });
          }
        }
      });
    }
  },

  //编辑
  bindtapEdit:function(e){
    var that=this;
    //发布信息id
    var id=e.currentTarget.id;
    //发布类型
    var name = e.currentTarget.dataset.name;
    //得到df 0=显示中，1=已下架，2=未发布，4=审核中，5=未通过
    var df = e.currentTarget.dataset.df;
    if ("0125".indexOf(df) == -1) {
      //提示
      wx.showToast({title: "不允许编辑！",icon: 'loading',duration: 1000, });
      return;
    }else{
      var url = "";
      if (name == "合伙创业") {
        url = '/pages/index/release/partnership/partnership';
      } else if (name == "生意转让") {
        url = '/pages/index/release/businessTransfer/businessTransfer';
      } else if (name == "加盟代理") {
        url = '/pages/index/release/affiliateStores/affiliateStores';
      } else if (name == "干股纳才") {
        url = '/pages/index/release/ganguSatisfiedBefore/ganguSatisfiedBefore';
      } else if (name == "金融理财") {
        url = '/pages/index/release/financialManagement/financialManagement';
      } else if (name == "房产投资") {
        url = '/pages/index/release/propertyInvestment/propertyInvestment';
      } else if (name == "股权交易") {
        url = '/pages/index/release/derivativeAgent/derivativeAgent';
      } else if (name == "其他") {
        url = '/pages/index/release/other/other';
      }

      //跳转
      wx.navigateTo({
        url: url + "?releaseId=" + id + "&df=" + df + "&text=保存",
      });
    }
  },
  
  //上架
  bindtapTheShelves:function(e){
    var that = this;
    wx.showModal({title: '上架提醒',content: '是否确定上架？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {//确定
          //将信息上架
          var url = app.config.basePath_web + "api/exe/save";
          //请求头
          var header={
            cookie: wx.getStorageSync("cookie"),
            "Content-Type": "application/x-www-form-urlencoded"
          };
          //设置参数
          var data = {
            timeStamp: wx.getStorageSync("time"),
            token: wx.getStorageSync("token"),
            reqJson: JSON.stringify({
              nameSpace: 'releaseinfo',       //发布信息信息表
              scriptName: 'Query',
              cudScriptName: 'Update',
              nameSpaceMap: {
                rows: [{
                  id: e.currentTarget.id,             //发布信息id
                  df: 0                      //0=显示中，1=已下架，2=未发布，4=审核中，5=未通过
                }],
              }
            })
          };
          //发送请求
          app.request.reqPost(url,header,data,function(res){
            //获取档案袋
            that.requestDataRecovery(that);
          });
        }
      }
    });
  },

  //删除
  bindtapDelete: function (e) {
    var that = this;
    wx.showModal({title: '消息删除',content: '是否确定删除？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {//确定
          //删除发布信息
          var url = app.config.basePath_web + "api/exe/save";
          //请求头
          var header = { cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded" };
          //设置参数
          var data = {
            timeStamp: that.data.time,
            token: that.data.token,
            reqJson: JSON.stringify({
              nameSpace: 'releaseinfo',       //发布信息信息表
              scriptName: 'Query',
              cudScriptName: 'Delete',
              nameSpaceMap: {
                rows: [{
                  id: e.currentTarget.id,             //发布信息id
                }],
              }
            })
          };
          //发送请求
          app.request.reqPost(url,header,data,function(res){
            //调用获取档案袋
            that.requestDataRecovery(that);
          });
        } 
      }
    });
  },

  //获取个人信息
  personalGetData:function(that){
    var url=app.config.basePath_sys+"api/exe/get";
    //请求头
    var header= { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            id: wx.getStorageSync('personalId')    //个人资料id
          }],
        }
      })
    };
    
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      that.setData({userinfo: res.data.rows[0] });
    });
  },

  //通知
  bindtapService:function(){
    wx.switchTab({
      url: '/pages/message/message',
    });
  },

  //加载完成
  onLoad: function () {
    //当前
    var that = this;

    //获取个人信息
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
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'notice',       //发布信息表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            static: 0,                                      //0=未读
            personalId: wx.getStorageSync("personalId")    //个人id
          }],
        }
      })
    };

    //发送请求
    app.request.reqPost(url,header,data,function(res){
      var row = res.data.rows;
      if (row.length != 0) {
        that.setData({ isnotice: row.length });
      } else {
        that.setData({ isnotice: 0 });
      }
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
    var url=app.config.basePath_web+"api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data=that.data.data;
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      //定义空数组
      var pageList = [];
      //得到数据
      var list = res.data.rows;
      for (var i = 0, lenI = list.length; i < lenI; ++i) {
        //图片
        if (list[i].imageArray != null) list[i].imageArray = app.config.domainImage + list[i].imageArray.split(',')[0];
        //截取
        if (list[i].projectDescription != null) list[i].projectDescription = list[i].projectDescription.substring(0, 60);
        if (list[i].incomeDescription != null) list[i].incomeDescription = list[i].incomeDescription.substring(0, 60);
        if (list[i].businessDescription != null) list[i].businessDescription = list[i].businessDescription.substring(0, 60);
        
        //时间间隔
        var strTime = that.getDate(list[i].mdate);
        list[i].mdate = strTime.date;
        //计算剩余天数
        list[i].timeNuber = (60 - strTime.timeNuber);
        //添加到当前数组
        pageList.push(list[i]);
      }

      //设置数据
      that.setData({
        list: pageList
      });
      
      //我发布的帖子数量
      if (that.data.tizhi == "tizhi") {
        //设置数据，提示框
        that.setData({
          numBer: pageList.length
        });
      }
    });
  },

  //我发布的
  requestDataRelease: function (that) {
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
        reqJson: JSON.stringify({
          nameSpace: 'releaseinfo',       //发布表
          scriptName: 'Query',
          nameSpaceMap: {
            pageable: 0,
            rows: [{
              inDf: [0, 4, 5],                      //0=正常显示，4=正在审核中，5=审核未通过
              personalId: wx.getStorageSync("personalId"),    //个人资料id
            }],
          }
        })
    };
    that.setData({ data:data,tizhi: 'tizhi', list: [] });
    //请求获取数据,我发布的
    that.requestData(that);
  },

  //收藏夹
  requestDataFavorites: function (that) {
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //定义参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'collectioninfo',       //收藏夹表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            personalId: wx.getStorageSync("personalId")    //个人资料id
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      //得到数据
      var list = res.data.rows;
      for (var i = 0, lenI = list.length; i < lenI; ++i) {
        //设置参数
        data = {
          timeStamp: wx.getStorageSync("time"),
          token: wx.getStorageSync("token"),
          reqJson: JSON.stringify({
            nameSpace: 'releaseinfo',       //发布信息表
            scriptName: 'Query',
            nameSpaceMap: {
              rows: [{
                id: list[i].releaseId    //发布id
              }],
            }
          })
        };
        that.setData({ data: data, tizhi: '', list: [] });
        //请求获取数据
        that.requestData(that);
      }
    });
  },

  //档案袋
  requestDataRecovery: function (that) {
    //定义参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'releaseinfo',       //回收站表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            inDf: [1, 2],            //0=正常显示，1=已下架，2=未发布，4=正在审核中，5=审核未通过
            personalId: wx.getStorageSync("personalId"),    //个人资料id
          }],
        }
      })
    };
    that.setData({ data: data,tizhi: '',list:[]});
    //请求获取数据
    that.requestData(that);
  },

  //显示
  onShow:function(){
    var that=this;
    //获取是否有通知
    that.getIsnotice(that);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that= this;

    //获取个人信息
    that.personalGetData(that);
    //获取是否有通知
    that.getIsnotice(that);
    //获取我发布的
    that.requestDataRelease(that);
    //下拉完成后执行回退
    wx.stopPullDownRefresh();
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