
/**  作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  聊天页面
 * 
 * */
 var app=getApp();
 
Page({

  data: {
    files:[],                     //文件路径
    inputValue: '',               //文本框值
    allContentList: [],           //聊天数据
    key: "d13b441029804ee99fc4e3b617a5f557",
  },

  //输入内容事件
  bindKeyInput: function (e) {
    this.setData({inputValue: e.detail.value })
  },

  //图片预览
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  //获取图片
  getImg:function(e){
    var that=this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imglength = res.tempFilePaths.length;
        if (imglength > 6) {
          //弹出提示
          wx.showModal({
            content: '总共只能上传6张图片！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
              }
            }
          });
          return;
        }
        //新添加聊天内容
        var toData = {
          to: { "imgs": res.tempFilePaths, dex: 0 }
        };
        that.data.allContentList.push(toData);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
          allContentList: that.data.allContentList,
        });
      }
    })
  }, 

  //点击发送
  submitTo: function (e) {
    let that = this;
    //新添加聊天内容
    var toData = {
      to:{ "value": that.data.inputValue,dex:0 }
    };
    that.data.allContentList.push(toData);
    //设置
    that.setData({ allContentList: that.data.allContentList });
    //发送内容并获取
    var url = 'http://www.tuling123.com/openapi/api';
    //请求头
    var header = {
      'Content-Type': 'application/json'
    };
    //参数
    var data={
      key: that.data.key,
      info: that.data.inputValue
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      let data = res.data;
      if (data.code === 100000) {
        //添加到对话
        var toData={
          to:{ "value": data.text,dex:1 }
        };
        that.data.allContentList.push(toData);
        that.setData({allContentList: that.data.allContentList});
      } 
    });
  },

  //加载页面
  onLoad: function (opention) {
    var that=this;
    var releaseId = opention.releaseId;
    //根据id获取发布消息
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { 
      cookie: wx.getStorageSync('cookie'), 
      "Content-Type": "application/x-www-form-urlencoded" 
    };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'releaseinfo',
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            id: releaseId    //发布信息id
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      //得到数据
      var list = res.data.rows;
      if (list.length == 0) return;

      //取详细信息的描述
      var info = list[0];
      info.mdate = app.getTimeInterval(info.mdate);
      //图片
      if (info.imageArray != null) {
        info.imageArray = app.config.domainImage + info.imageArray.split(",")[0];
      }

      //设置值
      that.setData({ releaseInfo: info });
    });


    // 设置标题
    wx.setNavigationBarTitle({ title: '零风' })
  },
  
  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
  onPullDownRefresh: function () {
    var that = this;
    
    //下拉完成后执行回退
    wx.stopPullDownRefresh();
  },
})