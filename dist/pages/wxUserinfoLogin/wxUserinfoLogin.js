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
    appid: 'wxdb07051dc3fc031e',//appid需自己提供，此处的appid我随机编写  
    secret: '783ffd9d359cb66c053d95647176aeea',//secret需自己提供，此处的secret我随机编写  
  }, 
  /**
   * 确定登录
   */
  bindtapLogin: function () {
    //发起登录请求
    wx.login({
      success: function (res) {
        //登录成功
        requestUrlLogin(res);
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
      //请求服务器,该用户是否登录
      
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