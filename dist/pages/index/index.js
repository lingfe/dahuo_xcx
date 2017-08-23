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
  //页面的初始数据
  data: {
    PriceRange: ['0 - 1万','1 - 5 万', '5 - 15 万','15 - 25 万','25 - 50 万','50 - 500 万'],
    priceIndex:0,
    addressInfo:'定位中..',
    isHiddenLoading: true,   //加载中提示控制
    isHiddenToast:true,     //加载完成提示控制
    isPrices:false,         //是否显示价格控制
    windowHeight:1000,      //默认高度
    screen:false,           //是否显示筛选控制
    tabs: [{
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
        checked: false,
      }, {
          minThreshold: 5,
          maxThreshold: 15,
        value: '2',
        checked: false,
      }, {
          minThreshold: 15,
          maxThreshold: 25,
        value: '3',
        checked: false,
      }, {
          minThreshold: 25,
          maxThreshold: 50,
        value: '4',
        checked: false,
      }, {
          minThreshold:50,
          maxThreshold:500,
        value: '5',
        checked: false,
      }],
    },
    {
      name: "类型",
      content: [{
        name: '全部',
        value: '1000',
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
        name: '入股干才(技术,资源)',
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
        name: '其他',
        value: '1007',
        checked: false,
      }],
    },
    {
      name: "行业",
      content: [{
        name: '全部',
        value: '1007',
        checked: false,
      }, {
        name: '餐饮业',
        value: '1',
        checked: false,
      }, {
        name: '休闲娱乐',
        value: '2001',
        checked: false,
      }, {
        name: '金融业',
        value: '2',
        checked: false,
      }, {
        name: '旅游／酒店业',
        value: '3',
        checked: false,
      }, {
        name: '服装与百货',
        value: '4',
        checked: false,
      }, {
        name: '生活服务',
        value: '5',
        checked: false,
      }, {
        name: '其他',
        value: '6',
        checked: false,
      }],
    }],

    activeIndex: 0,         //tab切换下标
    sliderOffset: 0,        //坐标x
    sliderLeft: 0,          //坐标y
    tabsName: ['金额','类型','行业'],   //筛选类型
    str: {
      AmountOfMoney: [{ minThreshold: 0, maxThreshold:1}],     //金额
      releaseTypeList: [{ releaseType:'全部'}],                //类型
      industryChoiceList: [{ industryChoice:'全部'}],            //行业
    },
    num:0,                  //获取选中的价格索引，控制样式
    list:[],                //发布信息数据
    pagenum:0,              //分页，第几业
    isCaidan:true,          //底部菜单是否显示

    dahuo:1,                 //搭伙菜单
    personal:1,              //个人菜单

    data:null                 //请求参数
  },
  //复选
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    //得到activeIndex
    var index = e.currentTarget.dataset.index;
    //得到str
    var str = this.data.str;
    //得到tabs
    var tabs = this.data.tabs, values = e.detail.value;
    this.setData({
      tabs: tabs,
      str: str
    });
    console.log("index:" + index); console.log("str:" + str); console.log(tabs[index]); console.log("values:" + values);
    //遍历tabs
    for (var i = 0, lenI = tabs[index].content.length; i < lenI; ++i) {
      //遍历tabs.content
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        //判断
        if (tabs[index].content[i].value == values[j]) {
          if (tabs[index].name == '金额') {
            tabs[index].content[i].checked = tabs[index].content[i].checked == true ? false : true;
            str.AmountOfMoney[0] = { 
                minThreshold: tabs[index].content[i].minThreshold, 
                maxThreshold: tabs[index].content[i].maxThreshold
              };
            console.log("tabs[index].name:" + tabs[index].name);
            break;
          }

          if (tabs[index].name == '类型') {
            tabs[index].content[i].checked = true;
            str.releaseTypeList[j]={releaseType:tabs[index].content[i].name};
            console.log("tabs[index].name:" + tabs[index].name);
            break;
          }

          if (tabs[index].name == '行业') {
            tabs[index].content[i].checked = true;
            str.industryChoiceList[j]={industryChoice:tabs[index].content[i].name};
            console.log("tabs[index].name:" + tabs[index].name);
            break;
          }
        } else {
          tabs[index].content[i].checked = false;
        }
      }
    }

    this.setData({
      tabs: tabs,
      str: str
    });
  },
  //删除
  clearBtn: function (e) {
    console.log("删除了" + e.currentTarget.dataset.value);
    var values = this.data.str;
    //得到name 
    var name = e.currentTarget.dataset.name;
    //得到index 
    var index = e.currentTarget.dataset.index;

    //判断
    if (name == "AmountOfMoney") {
      values.AmountOfMoney.splice(index, 1);
    } else if (name == 'releaseTypeList') {
      values.releaseTypeList.splice(index, 1);9
    } else if (name == "industryChoiceList") {
      values.industryChoiceList.splice(index, 1);
    }

    this.setData({
      str: values
    });
  },
  //重置并关闭筛选
  bindtapReset: function (e) {
    console.log("重置了");
    this.setData({
      str: {
        AmountOfMoney: ['0-1万'],
        releaseTypeList: [{ releaseType:'全部'}],
        industryChoiceList: [{ industryChoice:'全部'}],
      },
      screen: this.data.screen == true ? false : true,
    });
  },
  //tab切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //筛选是否显示
  bindtapScreen:function(){
    console.log("screen:" + this.data.screen);
    this.setData({
      screen: this.data.screen == true ? false : true,
      isCaidan:false,
    });
    console.log("screen:" + this.data.screen);
  },
  //分享
  onShareAppMessage: function (e) {
    return {
      title: '分享',
      path: '/page/user?id=123'
    }
  },
  //是否显示选择价格
  bindtapButton:function(e){
    console.log('是否显示选择价格  发生选择改变，携带值为', this.data.isPrices);
    this.setData({
      isPrices: this.data.isPrices == false ? true : false
    });
  },
  //选择价格
  bindtapPrices:function(e){
    console.log('选择价格  发生选择改变，携带值为', e.currentTarget.dataset.index);
    var index=e.currentTarget.dataset.index;
    this.setData({
      priceIndex: index,
      num:index,
      isPrices: this.data.isPrices == false ? true : false
    });
  },
  // 下拉刷新
  upper: function (e) {
    console.log("下拉刷新了");
    var that =this;
    that.data.pagenum=0;
    that.setData({
      pagenum:0,
      isCaidan:true,
      list:[]
    });
    that.requestData(that);
  },
  // 加载更多
  lower: function (e) {
    console.log("加载更多了");
    var that = this;
    var num = that.data.pagenum;
    num++;
    that.setData({
      pagenum:num,
      isCaidan: false
    });
    that.requestData(that);
  },
  //加载完成
  closeToast: function (e) {
    this.setData({
      isHiddenToast: true
    });
  },
  //发布
  bindtapfabu:function(){
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
            that.setData({
              addressInfo: res.data.result.ad_info.city
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
    console.log(__config.basePath_web);
    //当前
    var self = this;
    //定位
    self.getAddress(self);

    //必要参数
    console.log("cookie:" + wx.getStorageSync("cookie"));
    var cookie =  console.log(cookie);
    var time = new Date().getTime();
    console.log(time);
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    console.log(token);

    //设置请求参数获取数据,默认0第一页
    var data = {
      timeStamp: time,
      token: token,
      reqJson: JSON.stringify({
        nameSpace: 'releaseinfo',
        scriptName: 'Query',
        nameSpaceMap: {
          releaseinfo: {
            Query: [],
          },
          pagenum: self.pagenum,   //当前业
          pagesize: 3,        //数据大小长度
          pageable: 1         //是否分页
        }
      })
    };
    self.setData({
      data: data,
    });

    this.requestData(self);

    //设置页面高度
    this.setData({
      windowHeight: wx.getStorageSync('windowHeight')
    });

    //筛选tab初始化设置
    var sliderWidth = 100;//滑动条初始宽度
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          sliderLeft: (res.windowWidth / self.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / self.data.tabs.length * self.data.activeIndex
        });
      }
    });

  },
  //筛选请求
  bindtapOk:function(){
    var self = this;

    //必要参数
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();

    //定义查询参数
    var query={};

    //类型
    var releaseTypeList = self.data.str.releaseTypeList;
    if (releaseTypeList.length !=0)    query.releaseTypeList=releaseTypeList;
    //行业
    var industryChoiceList = self.data.str.industryChoiceList;
    if (industryChoiceList.length !=0) query.industryChoiceList = industryChoiceList;
    //金额
    var AmountOfMoney = self.data.str.AmountOfMoney[0];
    if (AmountOfMoney !=null){
      query.minThreshold = AmountOfMoney.minThreshold; 
      query.maxThreshold = AmountOfMoney.maxThreshold;
    }

    //设置请参数
    var data = {
      timeStamp: time,
      token: token,
      reqJson: JSON.stringify({
        nameSpace: 'releaseinfo',
        scriptName: 'Query',
        nameSpace: "releaseinfo", scriptName: "Query", nameSpaceMap: {
          releaseinfo: {
            Query: [query]
          }
        },
        pagenum: self.data.pagenum,   //当前业
        pagesize: 3,                  //数据大小长度
        pageable: 1                   //是否分页
      }
      )
    };
    self.setData({
      data:data,
    });

    //调用请求
    this.requestData(self);
  },

  //请求获取数据
  requestData: function (self) {
    //必要参数
    console.log("cookie:" + wx.getStorageSync("cookie"));
    var cookie = wx.getStorageSync("cookie");

    //请求获取发布信息,
    wx.request({
      url: __config.basePath_web+"api/exe/get",
      method: "POST",
      header: {
        cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: self.data.data,
      success: function (res) {
        var pageList=self.data.list;
        //得到数据
        var list = res.data.rows;
        for (var i = 0, lenI = list.length; i < lenI; ++i) {
          var strTime = self.getDate(list[i].cdate);
          list[i].cdate = strTime;
          //添加到当前数组
          pageList.push(list[i]);
        }

        //设置数据，提示框
        self.setData({
          isHiddenLoading: true,
          isHiddenToast: false,
          list: pageList
        });
        self.update();
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
  }
});

