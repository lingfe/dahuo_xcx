/**  作者:  lingfe 
 *   时间:  2017-8-9
 *   描述:  举报
 * 
 * */
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],         //图片数据
    num: 0,            //计数
  },

  //表单提交，举报信息
  submitForm: function () {
    var that = this;
    var imageArray = that.data.files;

    //提示
    wx.showToast({ title: '正在上传图片', icon: 'loading',duration: 3000 });

    //上传图片数组
    uploadimg(imageArray.splice(0, 1), [], imageArray);
    //多张图片上传
    function uploadimg(path, pathArr, dataArr) {
      wx.uploadFile({
        url: __config.domain,                       //开发者服务器 url
        filePath: path[0],                          //要上传文件资源的路径
        name: 'file',                                //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
        header: {                                   //HTTP 请求 Header , header 中不能设置 Referer
          cookie: wx.getStorageSync("cookie"),
          "Content-Type": "application/x-www-form-urlencoded"
        },

        formData: null,                             //参数(HTTP 请求中其他额外的 form data)
        success: (resp) => {                         //接口调用成功的回调函数
          var json = JSON.parse(resp.data);
          pathArr.push(json[0])
          if (dataArr.length > 0) {
            //递归
            uploadimg(dataArr.splice(0, 1), pathArr, dataArr);
          } else {
            //调用请求举报
            reqSetData(pathArr.join(","));
          }
        },
        fail: function (res) {                         //接口调用失败的回调函数
          //提示
          wx.showToast({
            title: '上传文件失败',
            icon: 'loading',
            duration: 3000,
          });
        },
        complete: function () {                     //接口调用结束的回调函数（调用成功、失败都会执行）

        }
      });
    }

    //请求更新
    function reqSetData(pathArr) {
      var url = app.config.basePath_web + "api/exe/save";
      //请求头
      var header={
        cookie:wx.getStorageSync("cookie"),
        "Content-Type": "application/x-www-form-urlencoded"
      };
      //参数
      var data = {
        timeStamp: wx.getStorageSync("time"),
        token: wx.getStorageSync("token"),
        reqJson: JSON.stringify({
          nameSpace: 'reportinfo',
          scriptName: 'Query',
          cudScriptName: 'Save',
          nameSpaceMap: {
            rows: [{
              releaseId: that.data.releaseId,               //发布信息id
              personalId: that.data.personalId,             //个人id
              reportTypeId: that.data.reportTypeId,         //举报类型
              remark: that.data.remark,                     //举报内容
              imageArray: pathArr                           //举报图片
            }]
          }
        })
      };
      //发送请求
      app.request.reqPost(url,header,data,function(res){
        //提示
        wx.showToast({
          title: '举报成功!',
          icon: 'loading',
          duration: 3000,
          success: function (res) {
            wx.switchTab({
              url: '/pages/index/index',
            });
          }
        });
      });
    }
  },

  //内容计数
  bindconfirmValue: function (e) {
    if (e.detail.value.length > 500) {
      wx.showModal({
        title: '内容的长度不能打大于500',
        showCancel: false,
      });
      return;
    }
    this.setData({
      num: e.detail.value.length,
      remark: e.detail.value,
    });
  },

  //删除图片
  bindtapImageDelete: function (e) {
    var img = e.currentTarget.dataset.img;
    var files = this.data.files;
    for (var j = 0; j < files.length; j++) {
      if (files[j] == img) {
        files.splice(j, 1);
        break;
      }
    }
    this.setData({
      files: files
    });
  },

  //获取图片
  chooseImage: function (e) {
    var that = this;
    if (that.data.files.length >= 6) {
      //弹出提示
      wx.showModal({
        content: '最多只能上传6张图片！',
        showCancel: false,
      });
      return;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },

  //图片预览
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id,  // 当前显示图片的http链接
      urls: this.data.files         // 需要预览的图片http链接列表
    })
  },

  //页面加载
  onLoad: function (options) {
    var data=JSON.parse(options.data);
    this.setData({
      releaseId: data.releaseId,       //发布信息id
      personalId: data.personalId,     //个人id
      reportTypeId: data.reportTypeId  //发布类型
    });
  },

})