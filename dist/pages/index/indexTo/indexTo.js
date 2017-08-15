/**  
 *   作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  信息页面，首页
 * 
 * */

//index.js
//获取应用实例
var app = getApp();
var server = require('../../../utils/server');
var utilMd5 = require('../../../utils/md5.js');

Page({
  //页面的初始数据
  data: {
    PriceRange: ['0 - 1万','1 - 5 万', '5 - 15 万','15 - 25 万','25 - 50 万','50 - 500 万'],
    priceIndex:0,
    addressInfo:'定位中..',
    isHiddenLoading:true,
    isHiddenToast:true,
    isPrices:false,
    windowHeight:'100%',
    screen:true,
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
    }, 
    {
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
          value: '1006',
          checked: false,
      },{
          name: '其他',
          value: '1007',
          checked: false,
      }],
    }, 
    {
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
    str:{
      AmountOfMoney: ['0-1万'],  //金额
      Type: ['全部'],                //类型
      industry: ['全部'],            //行业
    },
    num:0,
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
              str.AmountOfMoney[0] = tabs[index].content[i].name;
              console.log("tabs[index].name:" + tabs[index].name);
              break;
            }
            
            if(tabs[index].name == '类型'){
              //abs[index].content[i].checked = tabs[index].content[i].checked == true ? false : true;
              tabs[index].content[i].checked = true;
              str.Type[j] = tabs[index].content[i].name;
              console.log("tabs[index].name:" + tabs[index].name);
              break;
            }
            
            if (tabs[index].name == '行业'){
              //tabs[index].content[i].checked = tabs[index].content[i].checked == true ? false : true;
              tabs[index].content[i].checked = true;
              str.industry[j] = tabs[index].content[i].name;
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
    //得到name 
    var name = e.currentTarget.dataset.name;
    //得到index 
    var index = e.currentTarget.dataset.index;

    //判断
    if (name == "AmountOfMoney"){
      values.AmountOfMoney.splice(index, 1);
    } else if (name == 'Type'){
      values.Type.splice(index, 1);
    } else if (name == "industry"){
      values.industry.splice(index, 1);
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
        Type: ['全部'],
        industry: ['全部'],
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
    console.log("cookie:"+wx.getStorageSync("cookie"));
    console.log("md5:" + utilMd5.hexMD5('123456'));
    console.log('str:'+new Date().getDate());
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
