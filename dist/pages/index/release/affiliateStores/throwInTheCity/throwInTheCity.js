/**  
 *   作者:  lingfe 
 *   时间:  2017-9-15
 *   描述:  发布_加盟分店_投放城市页面
 *   url:pages/index/release/affiliateStores/throwInTheCity/throwInTheCity.js
 * */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    str: [{
      name: "华东地区",
      index: 0,
      content: [{
        name: "山东",
        checked: false,
      }, {
        name: "江苏",
        checked: false,
      }, {
        name: "安徽",
        checked: false,
      }, {
        name: "浙江",
        checked: false,
      }, {
        name: "福建",
        checked: false,
      }, {
        name: "上海",
        checked: false,
      }]

    }, {
      name: '华南地区',
      index: 1,
      content: [{
        name: "广东",
        checked: false,
      }, {
        name: "广西",
        checked: false,
      }, {
        name: '海南',
        checked: false,
      }]
    }, {
      name: "华中地区",
      index: 2,
      content: [{
        name: "湖北",
        checked: false,
      }, {
        name: "湖南",
        checked: false
      }, {
        name: "河南",
        checked: false
      }, {
        name: "江西",
        checked: false
      }]
    }, {
      name: '华北地区',
      index: 3,
      content: [{
        name: "北京",
        checked: false,
      }, {
        name: "天津",
        checked: false
      }, {
        name: "河北",
        checked: false
      }, {
        name: "山西",
        checked: false
      }, {
        name: "内蒙古",
        checked: false
      }]
    }, {
      name: "西北地区",
      index: 4,
      content: [{
        name: "宁夏",
        checked: false
      }, {
        name: "新疆",
        checked: false
      }, {
        name: "青海",
        checked: false
      }, {
        name: "陕西",
        checked: false
      }, {
        name: "甘肃",
        checked: false
      }]
    }, {
      name: "西南地区",
      index: 5,
      content: [{
        name: "四川",
        checked: false
      }, {
        name: "云南",
        checked: false
      }, {
        name: "贵州",
        checked: false
      }, {
        name: "西藏",
        checked: false
      }, {
        name: "重庆",
        checked: false
      }]
    }, {
      name: "东北地区",
      index: 6,
      content: [{
        name: "辽宁",
        checked: false
      }, {
        name: "吉林",
        checked: false
      }, {
        name: "黑龙江",
        checked: false,
      }]
    }, {
      name: "台港澳地区",
      index: 7,
      content: [{
        name: "台湾",
        checked: false,
      }, {
        name: "香港",
        checked: false
      }, {
        name: "澳门",
        checked: false
      }]
    }],               //城市数据
    data:[],          //参数
    checked: false,   //全国是否选中
  },

  //删除筛选条件
  clearBtn: function (e) {
    var that = this;
    //得到数据，参数对象
    var values = that.data.str;
    var data = that.data.data;
    var checked = that.data.checked;
    //得到name 
    var name = e.currentTarget.dataset.name;
    //得到index 
    var index = e.currentTarget.dataset.index;
    var indexto = e.currentTarget.dataset.indexto;
    //判断
    if (name == "全国") {
      if (checked == false) {
        data = [];
        checked = true;
        //全部选中
        for (var i = 0; i < values.length; ++i) {
          for (var j = 0; j < values[i].content.length; ++j) {
            values[i].content[j].checked = true;
            data.push(values[i].content[j].name);
          }
        }
      } else {
        data = [];
        checked = false;
        //全部取消
        for (var i = 0; i < values.length; ++i) {
          for (var j = 0; j < values[i].content.length; ++j) {
            values[i].content[j].checked = false;
          }
        }
      }
    } else {
      if (values[indexto].content[index].checked == true) {
        for (var k = 0; k < data.length; ++k) {
          if (data[k] == name) {
            data.splice(k, 1);
            break;
          }
        }
        values[indexto].content[index].checked = false;
      } else {
        data.push(values[indexto].content[index].name);
        values[indexto].content[index].checked = true;
      }
    }

    that.setData({ str: values, data: data, checked: checked });
  },

  //选择一个地址城市
  savabusinessDescription: function (e) {
    var that=this;
    var throwInTheCity=that.data.data;
    //得到打开的页面
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    //放到缓存中
    wx.setStorageSync("throwInTheCity", throwInTheCity);
    prevPage.setData({
      throwInTheCity: that.data.data,
    });

    //返回上一页
    wx.navigateBack();
  }
})