/**  
 *   作者:  lingfe 
 *   时间:  2017-17-7
 *   描述:  众筹
 * 
 * */
//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //跳转
  bindtapNavigator:function(e){
    var id = e.currentTarget.id;
    var releaseType = e.currentTarget.dataset.releasetype;
    if (releaseType == "加盟代理"){
      wx.navigateTo({
        url:'/pages/dahuo/crowdFunding/info/info?id='+id,
      });
    } else if (releaseType == "众筹"){
      wx.navigateTo({
        url: '/pages/dahuo/crowdFunding/infoCF/infoCF?id=' + id,
      });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  //获取优质项目数据
  gethighQualityProject:function(that){
    //请求获取数据
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'highQualityProject',       //收藏夹表
        scriptName: 'Query',
        nameSpaceMap: {
          orderByClause: 'mdate desc',
          rows: [{
            state:0, //状态
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      that.setData({
        data:res.data,
      });
    });

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
    var that=this;
    
    that.gethighQualityProject(that);
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