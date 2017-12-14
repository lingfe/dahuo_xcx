/**  
 *   作者:  lingfe 
 *   时间:  2017-12-7
 *   描述:  众筹项目详情
 * 
 * */
//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["项目介绍", "对接方案", "加盟标准"],   //tab菜单列
    activeIndex: 0,         //tab切换下标
    sliderOffset: 0,        //坐标x
    sliderLeft: 0,          //坐标y
    ax: 1,
  },

  //根据id获取优质项目申请数据
  gethighQualityProjectApply: function (that) {
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
      var row = res.data.rows;
      if (!app.checkInput(row)) {
        var personalId = wx.getStorageSync('personalId');
        for (var i = 0; i < row.length; ++i) {
          //验证是否已经申请
          if (personalId == row[i].personalId) {
            personalId = true;
          }
        }

        that.setData({
          personalId: personalId,
        });
      }
    });
  },

  //申请加盟
  bindtapShengqing:function(e){
    wx.navigateTo({
      url: "/pages/dahuo/crowdFunding/info/applyO/applyO?id=" + e.currentTarget.id
    })
  },

  //收藏
  bindtabAX: function (e) {
    this.setData({
      ax: this.data.ax == 1 ? 2 : 1,
    });
  },

  //信息
  bindtabXX: function (e) {
    wx.showModal({
      title: '提示',
      content: '请申请加盟,我们会联系您!',
    })
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
    var that=this;

    //设置tab
    var sliderWidth = 88;
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    //根据id获取优质项目申请数据
    that.gethighQualityProjectApply(that);
    //根据id获取优质项目数据
    that.gethighQualityProject(that);
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
        nameSpace: 'highQualityProject',       //收藏夹表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            state: 0, //状态
            id: that.data.id,//id
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      // 得到数据
      var row=res.data.rows[0];
      var projectIntroduction = JSON.parse(row.projectIntroduction);
      var dockingPlan = JSON.parse(row.dockingPlan);
      var standardofJoining = JSON.parse(row.standardofJoining);

      row.projectIntroduction = projectIntroduction;
      row.dockingPlan = dockingPlan;
      row.standardofJoining = standardofJoining;

      that.setData({
        data: res.data,
        info: row,
      });
    });

  },
  
})