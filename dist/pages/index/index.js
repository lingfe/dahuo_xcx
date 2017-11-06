/**  
 *   作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  信息页面，首页
 * 
 * */
//获取应用实例
var app = getApp();

Page({
  data: {
    PriceRange: ['全部','0 - 1 万', '1 - 5 万','5 - 50 万','50万+'],
    priceIndex:0,           //选择价格索引 
    addressInfo:'贵阳',     //城市定位
    isHiddenLoading: true,  //加载中提示控制
    isHiddenToast:true,     //加载完成提示控制
    isPrices:false,         //是否显示价格控制
    windowHeight:1000,      //默认高度
    screen:false,           //是否显示筛选控制
    tabs: app.dahuoData.sxData,        //筛选数据
    activeIndex: 0,                    //tab切换下标
    sliderOffset: 0,                   //坐标x
    sliderLeft: 0,                     //坐标y
    tabsName: ['金额','类型','行业'],   //筛选类型
    str: {
      AmountOfMoney: [{
        minThreshold:'全部',
        maxThreshold:null,i:0
      }],                           //金额
      releaseTypeList: [],          //类型
      industryChoiceList: [],       //行业
    },
    num:0,                  //获取选中的价格索引，控制样式
    list:[],                //发布信息数据
    pagenum:1,              //分页，第几业
    pagesize:10,            //返回数据量
    isCaidan:true,          //底部菜单是否显示
    dahuo:1,                //搭伙菜单
    personal:1,             //个人菜单
    dh:true,                //导航图片
    tz:true,                //通知信息显示
    data:null               //请求参数
  },

  //获取是否有通知
  getIsnotice: function (that) {
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'notice',       //发布信息表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            static: 0,                                      //0=未读
            personalId: wx.getStorageSync("personalId")    //个人id
          }],
        }
      })
    };

    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      var row = res.data.rows;
      if (row.length != 0) {
        that.setData({ tz:true, isnotice: row.length });
      } else {
        that.setData({ tz:false, isnotice: 0 });
      }
    });
  },

  //关闭导航图片
  bindtapCloseDh:function(e){
    this.setData({dh:false});
  },

  //删除筛选条件,重复点击去除
  clearBtn_to: function (e) {
    var that = this;
    var str = that.data.str;
    //得到name 
    var name = e.currentTarget.dataset.name;
    //得到index 
    var index = e.currentTarget.dataset.index;
    //得到value
    var value= e.currentTarget.dataset.value;
    //得到tabs
    var tabs = that.data.tabs;
    //判断
    if (name == "AmountOfMoney") {
      for (var k = 0; k < tabs[0].content.length; ++k) {
        if (tabs[0].content[k].minThreshold == value) {
          if (tabs[0].content[k].checked ==false){
            tabs[0].content[k].checked = true;
            str.AmountOfMoney[0] = {
              minThreshold: tabs[0].content[k].minThreshold,
              maxThreshold: tabs[0].content[k].maxThreshold, i: k
            };
            that.setData({
              priceIndex: k,
              num: k,
            });
          }else{
            tabs[0].content[k].checked = false;
            str.AmountOfMoney[0] = [];
          }
        }else{
          tabs[0].content[k].checked = false;
        }
      }
    } else if (name == 'releaseTypeList') {
      if (value == "全部") {
        str.releaseTypeList = [];
        if (tabs[1].content[0].checked == true){
          for (var k = 0; k < tabs[1].content.length; ++k) {
            tabs[1].content[k].checked = false;
            str.releaseTypeList.splice(k, 1);
          }
        }else{
          for (var k = 0; k < tabs[1].content.length; ++k) {
            tabs[1].content[k].checked = true;
            str.releaseTypeList.push({ releaseType: tabs[1].content[k].name, i: k });
          }
        }
        
      }else{
        for (var k = 0; k < tabs[1].content.length; ++k) {
          if (tabs[1].content[k].name == value) {
            if (tabs[1].content[k].checked == false) {
              tabs[1].content[k].checked = true;
              str.releaseTypeList.push({ releaseType: tabs[1].content[k].name, i: k });
            } else {
              tabs[1].content[k].checked = false;
              for(var j=0;j<str.releaseTypeList.length;++j){
                if (str.releaseTypeList[j].i==k){
                  str.releaseTypeList.splice(j, 1);
                  break;
                }
              }
            }
            break;
          }
        }
      }
    } else if (name == "industryChoiceList") {
      if (value == "全部") {
        str.industryChoiceList=[];
        if (tabs[2].content[0].checked == true) {
          for (var k = 0; k < tabs[2].content.length; ++k) {
            tabs[2].content[k].checked = false;
            str.industryChoiceList.splice(k, 1);
          }
        }else{
          for (var k = 0; k < tabs[2].content.length; ++k) {
            tabs[2].content[k].checked = true;
            str.industryChoiceList.push({ industryChoice: tabs[2].content[k].name, i: k });
          }
        }

      }else{
        for (var k = 0; k < tabs[2].content.length; ++k) {
          if (tabs[2].content[k].name == value) {
            if (tabs[2].content[k].checked ==false){
              tabs[2].content[k].checked=true;
              str.industryChoiceList.push({ industryChoice: tabs[2].content[k].name, i: k });
            }else{
              tabs[2].content[k].checked=false;
              for (var j = 0; j < str.industryChoiceList.length; ++j) {
                if (str.industryChoiceList[j].i == k) {
                  str.industryChoiceList.splice(j, 1);
                  break;
                }
              }
            }
            break;
          }
        }
      }
    }

    that.setData({
      tabs: tabs,
      str: str,});
  },

  //重置筛选
  bindtapReset: function (e) {
    //得到str
    var str = this.data.str;
    //得到tabs
    var tabs = this.data.tabs;
    //遍历tabs
    for (var i = 0, lenI = tabs.length; i < lenI; ++i) {
      //遍历tabs.content
      for (var j = 0, lenJ = tabs[i].content.length; j < lenJ; ++j) {
        tabs[i].content[j].checked = false;
      }
    }

    //设置值
    this.setData({
      tabs:tabs,
      priceIndex:0,
      num:0,
      str: { AmountOfMoney: [{ minThreshold: '全部', maxThreshold:null,i:0}],releaseTypeList: [],industryChoiceList: [] },
    });
  },

  //tab切换
  tabClick: function (e) {
    this.setData({ sliderOffset: e.currentTarget.offsetLeft, activeIndex: e.currentTarget.id });
  },

  //筛选是否显示
  bindtapScreen:function(){
    this.setData({ screen: this.data.screen == true ? false : true, isCaidan: this.data.screen == true ?true:false });
  },

  //分享
  onShareAppMessage: function (e) {
    return {
      title: '搭伙',
      desc: '同城生意人必备神器!',
      path: '/pages/index/index?id=1001'
    }
  },

  //是否显示选择价格
  bindtapButton:function(e){
    this.setData({
      isPrices: this.data.isPrices == false ? true : false
    });
  },

  //选择价格
  bindtapPrices:function(e){
    var that=this;
    var max = e.currentTarget.dataset.max;
    var min = e.currentTarget.dataset.min;
    var index=e.currentTarget.dataset.index;
    var str= that.data.str;
    var tabs=that.data.tabs;
    for (var i = 0; i < tabs[0].content.length;++i) {
      if(i==index){
        tabs[0].content[i].checked = true;
      }else{
        tabs[0].content[i].checked = false;
      }
    }
    str.AmountOfMoney=[{ minThreshold: min, maxThreshold: max ,i:index}];     //金额
    that.setData({
      str:str,                 //筛选参数
      pagenum: 1,
      tabs: tabs,
      priceIndex: index,       //选择价格索引
      list: [],                //发布信息数据
      num: index,              //获取选中的价格索引，控制样式
      isPrices: false          //关闭显示的价格
    });

    //调用删选
    that.requestData(that);
  },

  //发布
  bindtapfabu:function(){
    this.data.isPrices=false;
    wx.setStorageSync("currentCity", this.data.addressInfo);
    wx.navigateTo({
      url: '/pages/index/release/release',
    });
  },

  //获取定位地址
  getAddress:function(that){
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        app.service.getJSON('/waimai/api/location.php', {
          latitude: latitude,
          longitude: longitude
        }, function (res) {
          //判断状态
          if (res.data.status != -1) {
            var city=res.data.result.ad_info.city;
            if (app.checkInput(city)) return;
            if (city.lastIndexOf("市") != -1) city = city.substring(0,city.lastIndexOf("市"));
            else if (city.lastIndexOf("区") != -1) city = city.substring(0, city.lastIndexOf("区"));
            that.setData({ addressInfo: city });
          } else {
            that.setData({
              addressInfo: '定位失败'
            });
          }
        });
      }
    });
  },

  //页面加载
  onLoad: function () {
    //当前
    var that = this;
    app.getfiltertypeinfo();
    //调用默认请求
    that.requestData(that);
    //获取是否有通知
    that.getIsnotice(that);

    //设置页面高度
    that.setData({
      windowHeight: wx.getStorageSync('windowHeight')
    });

    //筛选tab初始化设置
    var sliderWidth = 100;//滑动条初始宽度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  //筛选请求
  bindtapOk: function (e){
    var that=this;
    that.data.isPrices=false;
    //设置参数值
    that.setData({
      list:[],                 //初始化list
      pagenum:1,               //初始化
      isCaidan:true,           //显示底部菜单
      isPrices:false,          //隐藏价格
      screen: false,           //隐藏删选      
    });
    //调用请求
    that.requestData(that);
  },

  //请求获取数据
  requestData: function (that) { 
    //定义查询参数
    var query = {
      orderByClause:'top desc,mdate desc',
      pagenum: that.data.pagenum,          //当前业
      pagesize: that.data.pagesize,        //数据大小长度
      rows:[{
        static: 0,                      //状态
        releaseTypeList: [],            //发布类型
        industryChoiceList: [],         //行业
      }]  
    };
    //地址 
    var currentCity = that.data.addressInfo;
    if (currentCity.length != 0) query.rows[0].currentCity = currentCity;

    //类型
    var releaseTypeList = that.data.str.releaseTypeList;
    if (releaseTypeList.length != 0){
      for (var i = 0; i < releaseTypeList.length; ++i) {
        query.rows[0].releaseTypeList[i] = releaseTypeList[i].releaseType;
      }
    } 

    //行业
    var industryChoiceList = that.data.str.industryChoiceList;
    if (industryChoiceList.length != 0) {
      for(var i=0;i<industryChoiceList.length;++i){
        query.rows[0].industryChoiceList[i] = industryChoiceList[i].industryChoice;
      }
    }

    //金额
    var AmountOfMoney = that.data.str.AmountOfMoney;
    if (AmountOfMoney.length != 0) {
      if (AmountOfMoney[0].minThreshold != '全部') {
        query.rows[0].minThreshold = AmountOfMoney[0].minThreshold;
        if (AmountOfMoney[0].maxThreshold != null) query.rows[0].maxThreshold = AmountOfMoney[0].maxThreshold;
      }
    }

    //发送请求  
    wx.request({
      url: app.config.basePath_web+"api/exe/get",
      method: "POST",
      header: { cookie: wx.getStorageSync('cookie'),"Content-Type": "application/x-www-form-urlencoded"},
      data: {
        timeStamp: wx.getStorageSync('time'),
        token: wx.getStorageSync('token'),
        reqJson: JSON.stringify({
          nameSpace: "releaseinfo",
          scriptName: "Query",
          nameSpaceMap: query
        })
      },
      success: function (res) {
        var pageList = that.data.list;
        //得到数据
        var list = res.data.rows;
        if(list == null || list.length == 0){
          //提示
          wx.showToast({
            title: '没有更多了!',
            icon: 'loading',
            duration: 1000,
          });
          return;
        } 

        for (var i = 0, lenI = list.length; i < lenI; ++i) {
          var strTime = that.getDate(list[i].mdate);
          if (list[i].imageArray !=null )list[i].imageArray = app.config.domainImage + list[i].imageArray.split(',')[0];
          if (list[i].projectDescription != null) list[i].projectDescription = list[i].projectDescription.substring(0, 55);
          if (list[i].incomeDescription != null) list[i].incomeDescription = list[i].incomeDescription.substring(0, 55);
          if (list[i].businessDescription != null) list[i].businessDescription = list[i].businessDescription.substring(0, 55);

          list[i].mdate = strTime;
          //添加到当前数组
          pageList.push(list[i]);
        }
        //设置数据，提示框
        that.setData({
          list: pageList
        });
      },
      fail: function (res) {},
      complete: function () {}
    });
  },

  //获取时间差
  getDate:function(date) {
    var date1 = new Date(date);    //开始时间
    var date2 = new Date();    //结束时间
    var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数

    //计算出相差月
    var months = (date2.getFullYear() - date1.getFullYear()) * 12;
    if(months != 0) {
      return months + "月";
    }

    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    if(days != 0) {
      return days + "天";
    }

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    if(hours != 0) {
      return hours + "小时";
    }

    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    if(minutes != 0) {
      return minutes + "分钟";
    }

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    if(seconds != 0) {
      return seconds + "秒";
    }
  },

  //搭伙
  bindtapDahuo: function () {
    wx.redirectTo({
      url: '/pages/index/index',
    });
  },

  //个人
  bindtapUser: function () {
    wx.redirectTo({
      url: '/pages/personal/personal',
    })
  },

  //监听页面显示
  onShow: function () {
    //当前
    var that=this;
    //判断cookie
    var cookie=wx.getStorageSync('cookie');
    if (app.checkInput(cookie)) {
      wx.redirectTo({
        url: '/pages/wxUserinfoLogin/wxUserinfoLogin',
      });
      return;
    }
    
    //获取是否有通知
    that.getIsnotice(that);

    //判断地址
    if (that.data.addressInfo != that.data.city && that.data.city!=null){
      that.setData({
        pagenum: 1,         //第几页
        addressInfo: that.data.city ,
        isCaidan: true,    //显示底部菜单
        list: []           //发布信息数据,清空   
      });
      that.requestData(that);
    }
  },

  //隐藏价格
  onHide:function(){
    this.data.isPrices = false;
  },

  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      pagenum: 1,         //第几页
      isPrices:false,
      list: []           //发布信息数据    
    });
    that.requestData(that);
    //下拉完成后执行回退
    wx.stopPullDownRefresh();
  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    var that = this;
    var num = that.data.pagenum;
    num++;
    that.setData({
      pagenum: num,
      isPrices:false,
    });
    that.requestData(that);
    
    //提示
    wx.showToast({
      title: '正在加载..',
      icon: 'loading',
      duration: 2000,
    });
  }
});

