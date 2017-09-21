/**  作者:  lingfe 
 *   时间:  2017-7-17
 *   描述:  行业选择页面
 * 
 * */
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    industryChoice: ['餐饮', '休闲娱乐', '旅游与酒店', '美发美容', "教育", '服饰鞋包',
      "生活服务", "汽车", '地产', '金融', "家装建材", '百货超市',
      '医疗保健', '建筑工程', '工厂', '其他'],
  },

  //确定
  bindtapOk: function (e) {
    var industryChoice = e.currentTarget.dataset.name;
    //得到打开的页面
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];  //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      industryChoice: industryChoice
    })
    //返回上一页
    wx.navigateBack();
  },

})