/**  
 *   作者:  lingfe 
 *   时间:  2017-7-26
 *   描述:  个人_个人资料_修改签名
 * 
 * */
 var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    autograph: null,
    num:0
  },

  //修改个人信息
  personalUpdate: function (e) {
    var that=this;
    if (app.checkInput(that.data.autograph)){
      wx.showModal({title: '签名不能为空!',showCancel: false });
      return;
    } 

    var url = app.config.basePath_sys + "api/exe/save";
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
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        cudScriptName: 'Save',
        nameSpaceMap: {
          rows: [{
            id: wx.getStorageSync("personalId") ,    //个人资料id
            memo: that.data.autograph                //签名
          }],
        }
      })
    };

    //发送请求
    app.request.reqPost(url,header,data,function(res){
      console.log(res);
      //获取个人信息
      that.requestDataPersonal(that);
    });
  },

  //请求获取数据个人信息
  requestDataPersonal: function (that) {
    var url = app.config.basePath_sys + "api/exe/get"
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
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            id: that.data.personalId    //个人资料id
          }],
        }
      })
    };

    //发送请求
    app.request.reqPost(url,header,data,function(res){
      console.log(res);
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        userinfo: res.data.rows[0]
      })
      //返回上一页
      wx.navigateBack();
    });
  },

  //获取值
  dataChange: function (e) {
    this.setData({
      num: e.detail.value.length,
      autograph: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //重新赋值
    this.setData({
      personalId: options.personalId,
      autograph: options.autograph
    });
  },
})