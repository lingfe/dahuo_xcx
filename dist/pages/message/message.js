
/**  作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  信息页面
 * 
 * */
 var app=getApp();

Page({
  
  //加载执行
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that=this;
    that.getmessteges(that);
  },

  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.getmessteges(that);
    //下拉完成后执行回退
    wx.stopPullDownRefresh();
  },

  //获取通知信息
  getmessteges:function(that){
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'notice',       //通知表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{                
            personalId: wx.getStorageSync("personalId")    //个人id
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      var row = res.data.rows;
      var list=[];
      for (var i = 0; i < row.length; ++i) {
        if (row[i].ntype != 0) {//通知类型 0=系统，1=其他
          if (row[i].static != 1) {
            that.setData({ msgTZ: true });
            return;
          }else{
            that.setData({ msgTZ: false });
          } 
        }else{
          if (row[i].static != 1) {
            that.setData({ sysTZ: true });
            return;
          }else{
            that.setData({ sysTZ: false });
          }
        }
      }
    });
  },

  //页面显示
  onShow:function(){
    var that = this;
    that.getmessteges(that);
  },
})