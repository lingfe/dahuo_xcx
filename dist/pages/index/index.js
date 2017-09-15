/**  
 *   作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  信息页面，首页
 * 
 * */
//获取应用实例
var app = getApp();
var server = require('../../utils/server');
var utilMd5 = require('../../utils/md5.js');
import __config from '../../config/config'

Page({
  data: {
    PriceRange: ['0 - 1万','1 - 5 万', '5 - 30 万','30 - 100 万','100万+'],
    priceIndex:1,           //选择价格索引 
    addressInfo:'贵阳',     //城市定位
    isHiddenLoading: true,  //加载中提示控制
    isHiddenToast:true,     //加载完成提示控制
    isPrices:false,         //是否显示价格控制
    windowHeight:1000,      //默认高度
    screen:false,           //是否显示筛选控制
    tabs: [{                //删选数据
      name: "金额",
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
    },
    {
      name: "类型",
      content: [{
        name: '全部',
        value: '0',
        checked: false,
      },{
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
    },
    {
      name: "行业",
      content: [{
        name: '全部',
        value: '0',
        checked: false,
      },{
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
      },{
          name:"教育",
        value:'30001',
        checked:false,
      },{
          name: '服饰鞋包',
        value: '4',
        checked: false,
      }, {
          name: "生活服务",
        value:'40001',
        checked:false,
      }, {
          name: "汽车",
        value: '40002',
        checked: false,
      },{
          name: '地产',
        value: '5',
        checked: false,
      },{
          name: '金融',
        value: '6',
        checked: false,
      },{
          name:"家装建材",
          value:'7',
          checked:false
      },{
          name:'百货超市',
          value:'8',
          checked:false
      },{
          name:'医疗保健',
          value:'9',
          checked:false
      },{
          name:'建筑工程',
          value:'10',
          checked:false,
      },{
          name:'工厂',
          value:'11',
          checked:false
      },{
          name:'其他',
          value:'12',
          checked:false
      }],
    }],
    activeIndex: 0,         //tab切换下标
    sliderOffset: 0,        //坐标x
    sliderLeft: 0,          //坐标y
    tabsName: ['金额','类型','行业'],   //筛选类型
    str: {
      AmountOfMoney: [{
        minThreshold:1,
        maxThreshold:5,i:1
      }],                           //金额
      releaseTypeList: [],          //类型
      industryChoiceList: [],       //行业
    },
    num:1,                  //获取选中的价格索引，控制样式
    list:[],                //发布信息数据
    pagenum:1,              //分页，第几业
    pagesize:20,            //返回数据量
    isCaidan:true,          //底部菜单是否显示
    dahuo:1,                //搭伙菜单
    personal:1,             //个人菜单
    data:null               //请求参数
  },

  //筛选复选
  checkboxChange: function (e) {
    //得到activeIndex
    var index = e.currentTarget.dataset.index;
    //得到str
    var str = this.data.str;
    //得到tabs
    var tabs = this.data.tabs;
    var values = e.detail.value;

    if (tabs[index].name == '金额') {
      for (var j = 0; j < values.length; ++j) {
        for (var i = 0, lenI = tabs[index].content.length; i < lenI; ++i) {
          if (tabs[index].content[i].value == values[j]) {
            tabs[index].content[i].checked = tabs[index].content[i].checked == true ? false : true;
            str.AmountOfMoney[0] = {
              minThreshold: tabs[index].content[i].minThreshold,
              maxThreshold: tabs[index].content[i].maxThreshold, i: i
            };
            console.log("tabs[index].name:" + tabs[index].name);
            break;
          }else{
            tabs[index].content[i].checked =false;
          }
        }
      }
    } else if (tabs[index].name == '类型') {


      for (var i = 0, lenI = tabs[index].content.length; i < lenI; ++i) {
        for (var j = 0; j < values.length; ++j) {
          if (tabs[index].content[i].value == values[j]) {
            if (tabs[index].content[i].checked == true)continue;
            
            tabs[index].content[i].checked = true; tabs[index].content[i].i = i;
            str.releaseTypeList.push({ releaseType: tabs[index].content[i].name, i: i });
            console.log("tabs[index].name:" + tabs[index].name);
            break;
          } else {
            //tabs[index].content[i].checked = false;
          }   
        }
      }
    } else if (tabs[index].name == '行业') {
      for (var i = 0, lenI = tabs[index].content.length; i < lenI; ++i) {
        for (var j = 0; j < values.length; ++j) {
          if (tabs[index].content[i].value == values[j]) {
            if (tabs[index].content[i].checked == true) continue;
            
            tabs[index].content[i].checked = true;
            str.industryChoiceList.push({ industryChoice: tabs[index].content[i].name, i: i });
            console.log("tabs[index].name:" + tabs[index].name);
            break;
          } else {
            //tabs[index].content[i].checked = false;
          }
        }
      }
    }
    this.setData({ tabs: tabs,  str: str  });
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
              str.releaseTypeList.splice(k, 1);
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
              str.industryChoiceList.splice(k, 1);
            }
            break;
          }
        }
      }
    }

    that.setData({ tabs: tabs, str: str });
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
      str: { AmountOfMoney: [{ minThreshold: 1, maxThreshold:5,i:1}],releaseTypeList: [],industryChoiceList: [] },
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
    return { title: '分享', path: '/page/user?id=123' }
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
    str.AmountOfMoney=[{ minThreshold: min, maxThreshold: max ,i:index}];     //金额
    that.setData({
      str:str,                 //筛选参数
      pagenum: 1,
      priceIndex: index,       //选择价格索引
      list: [],                //发布信息数据
      num: index,              //获取选中的价格索引，控制样式
      isPrices: false          //关闭显示的价格
    });

    //调用删选
    this.requestData(that);
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
        server.getJSON('/waimai/api/location.php', {
          latitude: latitude,
          longitude: longitude
        }, function (res) {
          //判断状态
          if (res.data.status != -1) {

            var city=res.data.result.ad_info.city;
            if (city.lastIndexOf("市") != -1) city = city.substring(0,city.lastIndexOf("市"));
            else if (city.lastIndexOf("区") != -1) city = city.substring(0, city.lastIndexOf("区"));
            that.setData({
              addressInfo: city
            });
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
    //定位
    that.getAddress(that);
    //必要参数
    var cookie = wx.getStorageSync("cookie");
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    //设置参数
    that.setData({
      cookie: cookie,          //请求cookie
      time: time,              //请求时间
      token: token,            //请求token
    });

    //调用默认请求
    this.requestData(that);

    //设置页面高度
    this.setData({
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
    this.requestData(that);
  },

  //请求获取数据
  requestData: function (that) { 
    //定义查询参数
    var query = {
      releaseTypeList:[],
      industryChoiceList:[],
      pagenum: that.data.pagenum,          //当前业
      pagesize: that.data.pagesize,        //数据大小长度
      pageable: 1                          //是否分页
    };
    //地址 
    var currentCity = that.data.addressInfo;
    if (currentCity.length != 0) query.currentCity = currentCity;

    //类型
    var releaseTypeList = that.data.str.releaseTypeList;
    if (releaseTypeList.length != 0){
      for (var i = 0; i < releaseTypeList.length; ++i) {
        query.releaseTypeList[i] = releaseTypeList[i].releaseType;
      }
    } 

    //行业
    var industryChoiceList = that.data.str.industryChoiceList;
    if (industryChoiceList.length != 0) {
      for(var i=0;i<industryChoiceList.length;++i){
        query.industryChoiceList[i] = industryChoiceList[i].industryChoice;
      }
    }

    //金额
    var AmountOfMoney = that.data.str.AmountOfMoney;
    if (AmountOfMoney.length != 0) {
      query.minThreshold = AmountOfMoney[0].minThreshold;
      if (AmountOfMoney[0].maxThreshold!=null)query.maxThreshold = AmountOfMoney[0].maxThreshold;
    }

    //发送请求  
    wx.request({
      url: __config.basePath_web+"api/exe/get",
      method: "POST",
      header: {cookie: that.data.cookie,"Content-Type": "application/x-www-form-urlencoded"},
      data: {
        timeStamp: that.data.time,
        token: that.data.token,
        reqJson: JSON.stringify({
          nameSpace: 'releaseinfo',
          scriptName: 'Query',
          nameSpaceMap: {
            releaseinfo: {
              Query: [query],
            },
          }
        })
      },
      success: function (res) {
        var pageList = that.data.list;
        //得到数据
        var list = res.data.rows;
        if(list == null || list.length == 0) return;

        for (var i = 0, lenI = list.length; i < lenI; ++i) {
          var strTime = that.getDate(list[i].cdate);
          if (list[i].imageArray !=null )list[i].imageArray = __config.domainImage + list[i].imageArray.split(',')[0];
          if (list[i].projectDescription != null) list[i].projectDescription = list[i].projectDescription.substring(0, 60);
          if (list[i].incomeDescription != null) list[i].incomeDescription = list[i].incomeDescription.substring(0, 60);
          if (list[i].businessDescription != null) list[i].businessDescription = list[i].businessDescription.substring(0, 60);

          list[i].cdate = strTime;
          //添加到当前数组
          pageList.push(list[i]);
        }
        pageList.reverse();
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

      //计算出相差年
      //还有一个小bug，当事件差为负数时，值为负数，将上面leftsecond代码改一下
      //var leftsecond = parseInt(Math.abs((date2.getTime() - date1.getTime())) / 1000);

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

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    //当前
    var that=this;
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

  /**
   * 隐藏
   */
  onHide:function(){
    this.data.isPrices = false;
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
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

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    var that = this;
    var num = that.data.pagenum;
    num++;
    that.setData({
      pagenum: num,
      isPrices:false,
    });
    that.requestData(that);
  }
});

