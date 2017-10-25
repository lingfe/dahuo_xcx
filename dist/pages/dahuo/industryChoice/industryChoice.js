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
    industryChoice: ['餐饮', '休闲娱乐', '旅游酒店', '互联网', '传媒', '教育', 
    '装修', '生活服务', '百货', '医疗保健', '美容美发', '汽车', '地产', '金融', 
    '其他'],
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