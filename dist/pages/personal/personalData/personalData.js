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
    jb:false,
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
      jb: this.data.jb == true ? false : true
    });
  },
  //确定修改姓名
  bindtapUpdateName:function(){
    console.log("确定修改姓名");
    this.setData({
      updateName: this.data.inputValue,
      jb: this.data.jb == true ? false : true
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
  JB: function () {
    this.setData({
      jb: this.data.jb == true ? false : true
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