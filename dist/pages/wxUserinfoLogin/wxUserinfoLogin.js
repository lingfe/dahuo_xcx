/**  
 *   作者:  lingfe 
 *   时间:  2017-7-26
 *   描述:  微信登录
 * 
 * */
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    text:'..',
  }, 
  /**
   * 确定登录
   */
  bindtapLogin: function () {
    //发起登录请求
    wx.login({
      success: function (res) {
        console.log(res);
        //获取登录信息
        wx.getUserInfo({//getUserInfo流程
          //成功
          success: function (res2) {//获取userinfo成功
            console.log(res2);
            console.log(JSON.stringify(res2.userInfo));
            //请求服务器,该用户是否登录
            wx.request({
              method: 'POST',
              data: { reqJson: JSON.stringify(res2.userInfo) },
              header: { "Content-Type": "application/x-www-form-urlencoded"},
              url: 'http://cms.echsoft.com/lg/wxLg/04C63783B2894CA0976349D76F128EEC/' + res.code,
              success: function (res) {
                if (res.data.status === 1) {
                  //提示
                  wx.showToast({
                    title: res.data.message,
                    icon: 'loading',
                    duration: 3000,
                  });

                  //保存在本地缓存中
                  wx.setStorage({
                    key: 'cookie',
                    data: res.header["Set-Cookie"].split(";")[0]
                  });
               
                  console.log(wx.getStorageSync("cookie"));
                  //跳转到首页
                  wx.switchTab({
                    url: '/pages/index/index',
                  });
                  return;
                }
                if (res.header == null || res.header.length == 0 || res.header == 'undefined') {
                  //提示
                  wx.showToast({
                    title: res.data.message,
                    icon: 'loading',
                    duration: 3000,
                  });
                } else {}
              }
            });
          }
        });

        //登录成功
        //requestUrlLogin(res);
      },
      fail:function(){
        //登录失败
      }
    });

    //登录请求获取openid
    function requestUrlLogin(res) {
      //请求拼接
      var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + app.globalData.appid + '&secret=' + app.globalData.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
      console.log(l);
      wx.request({
        url: l,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
        // header: {}, // 设置请求的 header    
        success: function (res) {
          console.log(res);
          app.globalData.openid = res.data.openid;//存储openid 到app 
          //创建一个dialog
          wx.showToast({
            title: '登录中...',
            icon: 'loading',
            duration: 3000,
            success: function () {
              wx.switchTab({
                url: '/pages/index/index',
              });
            }
          });
        },
        fail: function () {
          //请求失败
          //创建一个dialog
          wx.showToast({
            title: '登录失败!。。',
            icon: 'loading',
            duration: 3000,
            success: function () {
              wx.switchTab({
                url: '/pages/index/index',
              });
            }
          });
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //发起登录请求
    wx.login({//login流程
      success: function (res) {//登录成功
        if (res.code) {
          var code = res.code;
          //获取登录信息
          wx.getUserInfo({//getUserInfo流程
            //成功
            success: function (res2) {//获取userinfo成功
              var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
              var iv = res2.iv;
              //设置数据
              that.setData({
                hasUserInfo: true,
                userInfo: res2.userInfo
              });
              that.update();
              //请求自己的服务器
              Login(res, encryptedData, iv,that);
              that.update();
            },//失败
            fail:function(res2){
              console.log(res2);
            }
          });

        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }
      }
    });

    function Login(res, encryptedData, iv,that) {
      console.log('code=' + res.code + '&encryptedData=' + encryptedData + '&iv=' + iv);
      //创建一个dialog
      wx.showToast({
        title: '获取中...',
        icon: 'loading',
        duration: 3000,
        success:function(){
          that.setData({
            text: "获取你的公开信息,如：头像,名称等.."
          });
        }
      });

    }

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