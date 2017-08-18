/**  
 *   作者:  lingfe 
 *   时间:  2017-7-12
 *   描述:  个人_个人资料
 * 
 * */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"pages/personal/personalData/personalData",
    updateName:"",//名称
    region:null, //地域
    autograph:null,//签名
    phone:null,//电话
    isUpdateName:false,   //是否显示弹窗修改名称
    inputValue:'',
  },
  //文本框内容改变
  inputGetValue:function(e){
    console.log("文本框内容改变：" + e.detail.value);
    this.setData({
      inputValue: e.detail.value
    });
  },
  //取消
  bindtapClear:function(){
    console.log("取消");
    this.setData({
      isUpdateName: this.data.isUpdateName == true ? false : true
    });
  },
  //确定修改姓名
  bindtapUpdateName:function(){
    console.log("确定修改姓名");
    this.setData({
      updateName: this.data.inputValue,
      isUpdateName: this.data.isUpdateName == true ? false : true
    });

  },
  //修改地域
  bindtapSearch:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    });
  },
  //修改签名
  bindtapAutograph:function(){
    wx.navigateTo({
      url: '/pages/personal/personalData/autograph/autograph',
    });
  },
  //修改手机号
  bindtapPhone:function(){
    wx.navigateTo({
      url: '/pages/personal/personalData/updatePhone/updatePhone',
    })
  },

  //举报
  updateName: function () {
    this.setData({
      isUpdateName: this.data.isUpdateName == true ? false : true
    });
  },
  //请求获取数据,个人信息
  requestDataPersonal: function (pagenum) {
    var self = this;

    //必要参数
    var cookie = wx.getStorageSync("cookie");
    console.log("cookie:" + cookie);
    var time = new Date().getTime();
    console.log("time:" + time);
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    console.log("token:" + token);

    //个人资料id
    var personalId = wx.getStorageSync("personalId")
    console.log('personalId:' + personalId);

    //请求获取发布信息,
    wx.request({
      url: "http://web.dahuo.cloud/api/exe/get",
      method: "POST",
      header: {
        cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        timeStamp: time,
        token: token,
        reqJson: JSON.stringify({
          nameSpace: 'userinfo',       //个人信息表
          scriptName: 'Query',
          nameSpaceMap: {
            userinfo: {
              Query: [{
                personalId: personalId    //个人资料id
              }],
            }
          }
        })
      },
      success: function (res) {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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