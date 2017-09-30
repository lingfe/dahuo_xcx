/**  
 *   作者:  lingfe 
 *   时间:  2017-9-27
 *   描述:  发布_通知_搭伙小秘书_反馈
 * 
 * */
var app = getApp();
import __config from '../../../../config/config';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'' ,  //反馈内容
    num:0,        //计数
  },

  //获取用户反馈值
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
      content: e.detail.value
    });
  },

  //保存用户反馈
  savebindtapfeedback:function(e){
    var that=this;

    //发送请求
    wx.request({
      url: __config.basePath_web + "api/exe/save",
      method: "POST",
      header: { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: wx.getStorageSync('time'),
        token: wx.getStorageSync('token'),
        reqJson: JSON.stringify({
          nameSpace: 'feedback',       //通知表
          scriptName: 'Query',
          cudScriptName: 'Save',
          nameSpaceMap: {
            rows: [{
              id: wx.getStorageSync('personalId'),
              content: that.data.content,
            }],
          }
        })
      },
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: "反馈成功！",
          icon: 'ok',
          duration: 2000,
          success:function(){
            //得到打开的页面
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1];  //当前页面
            var prevPage = pages[pages.length - 2]; //上一个页面
            //返回上一页
            wx.navigateBack();
          }
        });
      }
    });
  },
})