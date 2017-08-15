/**  
 *   作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  信息页面，首页
 * 
 * */

//index.js
//获取应用实例
var app = getApp();
var server = require('../../utils/server');
var utilMd5 = require('../../utils/md5.js');

Page({
  //页面的初始数据
  data: {
    PriceRange: ['0 - 1万','1 - 5 万', '5 - 15 万','15 - 25 万','25 - 50 万','50 - 500 万'],
    priceIndex:0,
    addressInfo:'定位中..',
    isHiddenLoading:true,
    isHiddenToast:true,
    isPrices:false,
    windowHeight:1000,
    screen:false,
    tabs: [{
      name:"金额",
      content: [{
          name: '0 - 1万',
          value:'0',
          checked:false,
      },{
          name: '1 - 5 万',
          value: '1', 
          checked: false, 
      } , {
          name: '5 - 15 万',
          value:'2',
          checked: false,
      }, {
          name: '15 - 25 万',
          value:'3',
          checked: false,
      },{
          name: '25 - 50 万',
          value:'4',
          checked: false,
      }, {
          name: '50 - 500 万',
          value:'5',
          checked: false,
      }],
    }, {
      name: "类型",
      content: [{
          name: '全部',
          value: '1000',
          checked: false,
      },{
          name: '合伙创业',
          value: '1001',
          checked: false,
      },{
          name: '生意转让',
          value: '1002',
          checked: false,
      },{
          name: '加盟分店',
          value:'1003',
          checked:false,
      },{
          name: '入股干才(技术,资源)',
          value: '1004',
          checked: false,
      },{
          name: '金融理财',
          value: '1005',
          checked: false,
      },{
          name: '房产投资',
          vakye: '1006',
          checked: false,
      },{
          name: '其他',
          value: '1007',
          checked: false,
      }],
    }, {
      name:"行业",
      content: [{
          name: '全部',
          value: '1007',
          checked: false,
      },{
          name: '餐饮业',
          value: '1',
          checked: false,
      },{
          name: '休闲娱乐',
          value: '2001',
          checked: false,
      } ,{
          name: '金融业',
          value: '2',
          checked: false,
      } ,{
          name: '旅游／酒店业',
          value: '3',
          checked: false,
      } ,{
          name: '服装与百货',
          value: '4',
          checked: false,
      }, {
          name: '生活服务',
          value: '5',
          checked: false,
      },{
          name: '其他',
          value: '6',
          checked: false,
      }],
    }],

    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    tabsName: ['金额','类型','行业'],
    str: {
      threshold:'0-1万',
      releaseType:'全部',
      industryChoice:'全部',
    },
    num:0,
    list:null,//  数据
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
    console.log("index:"+index); console.log("str:"+str); console.log(tabs[index]);console.log("values:"+values);
    //遍历tabs
    for (var i = 0, lenI = tabs[index].content.length;i<lenI; ++i) {
        //遍历tabs.content
        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          //判断
          if (tabs[index].content[i].value == values[j]) {
            if(tabs[index].name == '金额'){
              tabs[index].content[i].checked = tabs[index].content[i].checked == true?false:true;
              str.threshold = tabs[index].content[i].name;
              console.log("tabs[index].name:" + tabs[index].name);
              break;
            }
            
            if(tabs[index].name == '类型'){
              tabs[index].content[i].checked = tabs[index].content[i].checked == true ? false : true;
              str.releaseType = tabs[index].content[i].name;
              console.log("tabs[index].name:" + tabs[index].name);
              break;
            }
            
            if (tabs[index].name == '行业'){
              tabs[index].content[i].checked = tabs[index].content[i].checked == true ? false : true;
              str.industryChoice = tabs[index].content[i].name;
              console.log("tabs[index].name:" + tabs[index].name);
              break;
            }
          }else{
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
    if (values.threshold == e.currentTarget.dataset.value){
      values.threshold="";
    }
    else if (values.releaseType == e.currentTarget.dataset.value) {
      values.releaseType = "";
    }
    else if (values.industryChoice == e.currentTarget.dataset.value) {
      values.industryChoice = "";
      
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
        threshold: '0-1万',
        releaseType: '全部',
        industryChoice: '全部',
      },
      screen:this.data.screen==true?false:true,
    });
  },
  //tab切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //筛选
  bindtapScreen:function(){
    console.log("screen:" + this.data.screen);
    this.setData({
      screen: this.data.screen == true ? false : true,
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
  //选择地址
  setAddressInfo:function(e){
    console.log('定位 发生选择改变，携带值为', e.detail.value);
    this.setData({
      addressIndex: e.detail.value
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  // 下拉刷新
  upper: function (e) {
    console.log("下拉刷新了");
    this.requestData("newlist");
  },
  // 加载 
  lower: function (e) {
    console.log("加载更多了");
    this.requestData("list");
  },
  closeToast: function (e) {
    this.setData({
      isHiddenToast: true
    });
  },
  openLocation: function (e) {

    console.log(e)

    var value = e.detail.value

    console.log(value)



  },
  //页面加载
  onLoad: function () {

    var self = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        server.getJSON('/waimai/api/location.php', {
          latitude: latitude,
          longitude: longitude
        }, function (res) {
          if (res.data.status != -1) {
            self.setData({
              addressInfo: res.data.result.ad_info.city
            });
          } else {
            self.setData({
              addressInfo: '定位失败'
            });
          }
        });
      }
    });

    //必要参数
    console.log("cookie:" + wx.getStorageSync("cookie"));
    var cookie = wx.getStorageSync("cookie");
    console.log(cookie);
    var time = new Date().getTime();
    console.log(time);
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    console.log(token);

    //请求获取发布信息,
    wx.request({
      url: "http://web.dahuo.cloud/api/exe/get",
      method: "POST",
      header: {
        cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: '',
      data: {
        timeStamp: time,
        token: token,
        reqJson: JSON.stringify({
          nameSpace: 'releaseinfo',
          scriptName: 'Query',
          nameSpaceMap: {
            releaseinfo: {
              Query: []
            }
          }
        })
      },
      success: function (res) {
        //得到数据
        var list = res.data.rows;
        for (var i = 0, lenI = list.length; i < lenI; ++i) {
          var strTime = getDate(list[i].cdate);
          list[i].cdate=strTime;
        }

        //设置数据
        self.setData({
          list: list
        });
        //提示
        wx.showToast({
          title: res.data.message,
          icon: 'loading',
          duration: 3000,
        });
        console.log("成功了");
      },
      fail: function () {
        console.log("失败了");
      },
      complete: function () {

      }
    });

    //获取时间差
    function getDate(date) {
      var date1 = new Date(date);    //开始时间
      var date2 = new Date();    //结束时间
      var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数

      //计算出相差年
      //还有一个小bug，当事件差为负数时，值为负数，将上面leftsecond代码改一下
      //var leftsecond = parseInt(Math.abs((date2.getTime() - date1.getTime())) / 1000);

      //计算出相差月
      var months = (date2.getFullYear() - date1.getFullYear()) * 12;
      if(months != 0){
        return months+"月";
      }

      //计算出相差天数
      var days = Math.floor(date3 / (24 * 3600 * 1000));
      if (days != 0) {
        return days+"天";
      }

      //计算出小时数
      var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000));
      if (hours != 0) {
        return hours+"小时";
      }

      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000));
      if (minutes != 0) {
        return minutes+"分钟";
      }

      //计算相差秒数
      var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000);
      if (seconds != 0) {
        return seconds+"秒";
      }
    }

    this.setData({
      windowHeight: wx.getStorageSync('windowHeight')
    });

    this.requestData("newlist");

    //筛选tab
    var that = this;
    var sliderWidth = 100;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

  },
  requestData: function (a) {
    var that = this;
    //  请求数据
    wx.request({
      url: "http://api.budejie.com/api/api_open.php",
      data: {
        a: a,
        c: "data",
        maxtime: that.data.maxtime,
        type: 29
      },
      header:{},
      method: "GET",
      success: function (res) {
        console.log(res);
        that.setData({
          isHiddenLoading: true,
          dataList: res.data.list,
          maxtime: res.data.info.maxtime,
          isHiddenToast: false
        });
        console.log("成功了");
      },
      fail: function () {
        console.log("失败了");
      }
    });
  }
});

