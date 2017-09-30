import components from './helpers/components'

App({
  components,
  //生命周期函数--监听小程序显示	。当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow: function () {
    console.log('App Show')
  },
  //	生命周期函数--监听小程序隐藏	。当小程序从前台进入后台，会触发 onHide
  onHide: function () {
    console.log('App Hide')
  },
  //错误监听函数	当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  onError: function () {
    console.log('APP Error');
  },
  //生命周期函数--监听小程序初始化。	当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.getSystemInfo({
      success: function (res) {
        console.log("屏幕高度" + res.windowHeight);
        wx.setStorageSync("windowHeight", res.windowHeight)
      }
    })
  },
  //自定义获取用户数据
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  /**
   * 验证非空
   */
  checkInput: function (data) {
    if (data == null || data == undefined || data == "" || data == 'null') {
      return true;
    }
    if (typeof data == "string") {
      var result = data.replace(/(^\s*)|(\s*$)/g, "");
      return result.length == 0 ? true : false;
    } else {
      return false;
    }
  },

  //用户数据
  globalData: {
    userInfo: null,
    fundDistribution: null,        //入伙门槛，需要金额，转让门槛..
    teamIntroduction: null,           //公司/团队介绍
    geographicalPosition: null,      //地理位置
    businessDescription: null,       //营业描述
    transferReason: null,            //转让原因
    productHighlights: null,//产品亮点
    agentCondition: null,//代理条件
    agencyRule: null,//代理规则
    resourceRequirements: null,//技能要求
    updateName: null,//用户名称
    autograph: null,//签名

    appid: 'wxdb07051dc3fc031e',   //小程序id
    secret: '783ffd9d359cb66c053d95647176aeea', //小程序的 app secret

    hasLogin: false,
    openid: null,   //微信用户id
    token: '31963CBD8CA24DEFB48B9799766F0583',//请求唯一标识
  }
});