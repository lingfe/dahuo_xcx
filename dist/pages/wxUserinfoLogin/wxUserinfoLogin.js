/**  
 *   作者:  lingfe 
 *   时间:  2017-7-26
 *   描述:  微信登录
 * 
 * */
var app=getApp();

Page({

  //发送模板消息
  webStoketReq: function (loginRes){
    var that=this;
    console.log(loginRes);
    //1.获取 access_token
    var url = app.config.login_sys + 'cgi-bin/token';
    //参数
    var data = {
      grant_type: 'client_credential',
      appid: app.globalData.appid,
      secret: app.globalData.secret
    };

    //发送请求
    app.request.reqGet(url,data,function(res){
      console.log(res);
      //2.发送模板消息
      url = app.config.login_sys + 'cgi-bin/message/wxopen/template/send?access_token=' + res.data.access_token;
      //请求头
      var header = {
        'content-type': 'application/json'  
      };
      //参数
      data = {
        touser: wx.getStorageSync('openid') ,                                   //微信用户openid
        template_id: 'xLM4QMhu_SPW0AXfezQwPt5cOrbpHlVEdQ9i8NldbMw',             //模板id
        page: '/pages/index/index',                                              //跳转的页面，相对
        form_id: loginRes.formid,                                               //formid，表单id
        data: {
          "keyword1": {
            "value": "欢迎您登录搭伙小程序!",
            "color": "#173177"
          },
          "keyword2": {
            "value": loginRes.data.userInfo.nickName,
            "color": "#173177"
          },
          "keyword3": {
            "value": app.getDateTime,
            "color": "#173177"
          }
        }//'模板内容'，
      };

      //发送请求
      app.request.reqPost(url,header,data,function(res){
        console.log(res);
        //登录请求
        that.loginRequest(loginRes);
      });
    });
  },

  /**
   * 确定登录
   */
  bindtapLogin: function (e) {
    var that = this;
    //提示
    wx.showToast({ title: '正在登录..', icon: 'loading', duration: 1000, });
    //设置参数
    var res = {
      data: { userInfo: that.data.userInfo},
      formid: e.detail.formId,
    }
    //发送模板，并登录
    that.webStoketReq(res);
  },

  //发起登录请求
  loginRequest:function(that){
    //地址
    var url = app.config.basePath_sys + "api/plug/save";
    //请求头
    var header={
      "Content-Type": "application/x-www-form-urlencoded"
    };
    //参数
    var time = new Date().getTime();
    var token = app.md5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    var data = {
      timeStamp: time,
      token: token,
      reqJson: JSON.stringify({
        nameSpace: "sys_userinfo",
        scriptName: "com.dahuo.plugin.impl.WxLgPlugin",
        nameSpaceMap: {
          rows: [{
            openid: wx.getStorageSync('openid'),         //用户id
            realname: that.data.userInfo.nickName,
            avatarUrl: that.data.userInfo.avatarUrl,
            appId: app.globalData.loginAppid,
          }]
        }
      })
    };
    //发送请求
    app.request.reqPost(url, header,data,
      function(res){
        console.log(res);
        if (res.data.status === 1) {
          if (res.data.rows == null) return;
          //提示
          wx.showToast({title: res.data.message,icon: 'ok',duration: 2000,});
          //得到cookie
          var cookie = res.header["Set-Cookie"].split(",")[0].split(";")[0] + ";";

          //保存在本地缓存中
          wx.setStorageSync("cookie", cookie);
          wx.setStorageSync("time", time);
          wx.setStorageSync("token", token);
          //得到个人id，保存在本地缓存中
          var personalId = res.data.rows.id;
          var user = res.data.rows;
          wx.setStorageSync("personalId", personalId);
          wx.setStorageSync("user", user);

          //登录成功！跳转到首页
          wx.switchTab({
            url: '/pages/index/index',
          });
        }
      },function(res){
        //提示
        wx.showToast({title: "请求失败!",icon: 'loading',duration: 2000,});
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
    //自动登录第一步，获取openid
    that.getOpenId(that);
  },

  //获取openid
  getOpenId: function (that) {
    //调用登录接口
    wx.login({
      success: function (logRes) {
        //获取openid  gang/manage/openid.action
        //var url = app.config.login_sys + 'sns/jscode2session';
        var url = app.config.login_sys + 'gang/manage/openid.action';
        // var data = {
        //   appid: app.globalData.appid,
        //   secret: app.globalData.secret,
        //   js_code: logRes.code,
        //   grant_type: 'authorization_code'
        // }
        var data={
          code:logRes.code
        }
        //发送请求
        // app.request.reqGet(url, data,
        //   function (res) {
        //     app.globalData.openid = res.data.openid;
        //     wx.setStorageSync('openid', res.data.openid);
        //     that.setData({ openid: res.data.openid });
        //     //自动登录第二步，获取微信用户
        //     that.getUserInfo(that);
        //   });
        app.request.reqGet(url, data,
          function (res) {
            app.globalData.openid = res.data;
            wx.setStorageSync('openid', res.data);
            that.setData({ openid: res.data });
            //自动登录第二步，获取微信用户
            that.getUserInfo(that);
          });
      }, fail: function (res) {
        console.log(res);
      }
    });
  },

  //自定义获取用户数据
  getUserInfo: function (that) {
    //调用登录接口
    wx.login({
      success: function () {
        //获取用户
        wx.getUserInfo({
          success: function (res) {
            app.globalData.userInfo = res.userInfo
            wx.setStorageSync('userinfo', res.userInfo);
            that.setData({ userInfo: res.userInfo});
            ////自动登录第三步，发送登录服务器请求
            that.loginRequest(that); 
          }
        });
      }
    })
  },
})