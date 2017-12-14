/**  
 *   作者:  lingfe 
 *   时间:  2017-12-7
 *   描述:  众筹项目详情_合伙创业
 * 
 * */
//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["项目介绍", "投资方案", "股东特权",'风险提示'],   //tab菜单列
    activeIndex: 0,         //tab切换下标
    sliderOffset: 0,        //坐标x
    sliderLeft: 0,          //坐标y
    ax:1,
    yes:false,            //是否展开已申请的数据
  },

  //已申请
  bindtapYes:function(e){
    this.setData({
      yes:this.data.yes==false?true:false
    });
  },

  //收藏
  bindtabAX:function(e){
    this.setData({
      ax:this.data.ax == 1?2:1,
    });
  },

  //信息
  bindtabXX:function(e){
    wx.showModal({
      title: '提示',
      content: '请申请入伙,我们会联系您!',
    })
  },
  
  //申请入伙
  bindtapShengqing:function(e){
    var id = e.currentTarget.id;
    var maxApplyNumber = e.currentTarget.dataset.maxapplynumber;
    var threshold = e.currentTarget.dataset.threshold;
    wx.navigateTo({
      url: "/pages/dahuo/crowdFunding/infoCF/applyOccupation/applyOccupation?id=" + id + "&maxApplyNumber=" + maxApplyNumber +"&threshold="+threshold,
      
    });
  },

  //tab点击切换
  tabClick: function (e) {
    //当前
    var that = this;
    var name = e.currentTarget.dataset.name;
    if (name == "我发布的") {
      //我发布的
      // that.requestDataRelease(that);
    } else if (name == "收藏夹") {
      //收藏夹
      //that.requestDataFavorites(that);
    } else if (name == "档案袋") {
      //回收站
      //that.requestDataRecovery(that);
    }

    //设置
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //设置tab
    var sliderWidth = 60;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          id:options.id,
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
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
    //根据id获取优质项目数据
    that.gethighQualityProject(that);
    //根据id获取优质项目申请数据
    that.gethighQualityProjectApply(that);
  },

  //根据id获取优质项目数据
  gethighQualityProject: function (that) {
    //请求获取数据
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'highQualityProject',       //优质项目表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            state: 0, //状态
            id:that.data.id,//id
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      // 得到数据
      var row = res.data.rows[0];
      var str = JSON.stringify(row.dockingPlan);;

      var json = JSON.parse(row.dockingPlan);

      row.dockingPlan = json;

      that.setData({
        data: res.data,
        info: row,
      });
    });

  },

  //根据id获取优质项目申请数据
  gethighQualityProjectApply:function(that){
    //请求获取数据
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'highQualityProjectApply',       //优质项目申请表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            highQualityProjectId: that.data.id,//id
          }],
        }
      })
    };
    
    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      var row=res.data.rows;
      if (!app.checkInput(row)){
        var prices=0;
        var personalId = wx.getStorageSync('personalId');
        var personaInfo = {};
        for(var i=0;i<row.length; ++i){
           //验证是否已经申请
           if (personalId == row[i].personalId){
             personalId=true;
             personaInfo=row[i];
           }
           prices += row[i].amountofMoney;
        }

        that.setData({
          prices: prices,
          personalId:personalId,
          personaInfo: personaInfo,
          renshu:row.length
        });
      }else{
        that.setData({
          row: {max:0},
          prices:0,
          renshu: 0
        });
      }
    });
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