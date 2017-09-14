/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_生意转让_地理位置页面
 * 
 * */
 var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,         //tab切换下标
    sliderOffset: 0,        //坐标x
    sliderLeft: 0,          //坐标y
    tabs: [{                //删选数据
      name: "云岩",
      content: [{
        minThreshold: 0,
        maxThreshold: 1,
        value: '0',
        checked: false,
      }, {
        minThreshold: 1,
        maxThreshold: 5,
        value: '1',
        checked: true,
      }, {
        minThreshold: 5,
        maxThreshold: 30,
        value: '2',
        checked: false,
      }, {
        minThreshold: 30,
        maxThreshold: 100,
        value: '3',
        checked: false,
      }, {
        minThreshold: 100,
        maxThreshold: null,
        value: '4',
        checked: false,
      }],
    },{
      name:"南明",
      content: [{
        name: '全部',
        value: '0',
        checked: false,
      }, {
        name: '合伙创业',
        value: '1001',
        checked: false,
      }, {
        name: '生意转让',
        value: '1002',
        checked: false,
      }, {
        name: '加盟分店',
        value: '1003',
        checked: false,
      }, {
        name: '干股纳才',
        value: '1004',
        checked: false,
      }, {
        name: '金融理财',
        value: '1005',
        checked: false,
      }, {
        name: '房产投资',
        value: '1006',
        checked: false,
      }, {
        name: '微商代理',
        value: '1007',
        checked: false,
      }, {
        name: '其他',
        value: '1008',
        checked: false,
      }],
    },{
      name:"花溪",
      content: [{
        name: '全部',
        value: '0',
        checked: false,
      }, {
        name: '餐饮',
        value: '1',
        checked: false,
      }, {
        name: '休闲娱乐',
        value: '2001',
        checked: false,
      }, {
        name: '旅游与酒店',
        value: '2',
        checked: false,
      }, {
        name: '美发美容',
        value: '3',
        checked: false,
      }, {
        name: "教育",
        value: '30001',
        checked: false,
      }, {
        name: '服饰鞋包',
        value: '4',
        checked: false,
      }, {
        name: "生活服务",
        value: '40001',
        checked: false,
      }, {
        name: "汽车",
        value: '40002',
        checked: false,
      }, {
        name: '地产',
        value: '5',
        checked: false,
      }, {
        name: '金融',
        value: '6',
        checked: false,
      }, {
        name: "家装建材",
        value: '7',
        checked: false
      }, {
        name: '百货超市',
        value: '8',
        checked: false
      }, {
        name: '医疗保健',
        value: '9',
        checked: false
      }, {
        name: '建筑工程',
        value: '10',
        checked: false,
      }, {
        name: '工厂',
        value: '11',
        checked: false
      }, {
        name: '其他',
        value: '12',
        checked: false
      }],
    }],
    geographicalPosition:null,
    num:0
  },

  //tab切换
  tabClick: function (e) {
    this.setData({ sliderOffset: e.currentTarget.offsetLeft, activeIndex: e.currentTarget.id });
  },

  //获取值
  dataChange: function (e) {
    if (e.detail.value.length > 500) {
      wx.showModal({
        title: '内容的长度不能打大于500',
        showCancel: false,
      });
      return;
    }
    this.setData({
      num: e.detail.value.length,
      geographicalPosition: e.detail.value
    });
  },

  //保存地理位置
  bindtapgeographicalPosition: function (e) {
    var geographicalPosition = this.data.geographicalPosition;
    //判断是否为空
    if (geographicalPosition == null) {
      wx.showModal({
        title: '地理位置不能为空!',
        showCancel: false,
      });
    } else {
      //保存地理位置
      app.globalData.geographicalPosition = geographicalPosition;
      //得到打开的页面
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];  //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面

      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        geographicalPosition: geographicalPosition
      })
      //返回上一页
      wx.navigateBack();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //重新赋值
    this.setData({
      geographicalPosition: app.globalData.geographicalPosition
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