/**  
 *   作者:  lingfe 
 *   时间:  2017-9-15
 *   描述:  发布_加盟分店_投放城市页面
 *   url:pages/index/release/affiliateStores/throwInTheCity/throwInTheCity.js
 * */
 var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    str: app.dahuoData.throwInTheCityData,  //投放城市数据
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
    if(throwInTheCity.length==0){
      wx.showModal({
        title: '请选择投放城市!',
        showCancel: false,
      });
    } 
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