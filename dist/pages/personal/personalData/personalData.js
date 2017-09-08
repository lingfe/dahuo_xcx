/**  
 *   作者:  lingfe 
 *   时间:  2017-7-12
 *   描述:  个人_个人资料
 * 
 * */
var app = getApp();
var utilMd5 = require('../../../utils/md5.js');
import __config from '../../../config/config'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"pages/personal/personalData/personalData",
    updateName:"",//名称
    phone:null,//电话
    isUpdateName:false,   //是否显示弹窗修改名称
    inputValue:'',
  },
  //获取 图片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        if (res.tempFilePaths.length>1){
          wx.showToast({
            title: '只能选择一张照片',
            icon: 'error',
            duration: 3000,
          });
          return;
        }
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          "userinfo.avatarUrl": res.tempFilePaths
        });
        //上传图片到服务器
        uploadimg(res.tempFilePaths);
      }
    })


    //多张图片上传
    function uploadimg(imgPath) {
      wx.uploadFile({
        url: __config.domain,                       //开发者服务器 url
        filePath: imgPath,                          //要上传文件资源的路径
        name: 'file',                                //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
        header: {                                   //HTTP 请求 Header , header 中不能设置 Referer
          cookie: cookie,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        formData: null,                             //参数(HTTP 请求中其他额外的 form data)
        success: function (res) {                         //接口调用成功的回调函数
          //上传成功，执行修改()
          that.personalUpdate(that);
        },
        fail: function (res) {                         //接口调用失败的回调函数
          //提示
          wx.showToast({
            title: '上传文件失败',
            icon: 'loading',
            duration: 3000,
          });
          return;
        },
        complete: function () {                     //接口调用结束的回调函数（调用成功、失败都会执行）

        }
      });
    }
  },
  //文本框内容改变
  inputGetValue:function(e){
    console.log("文本框内容改变：" + e.detail.value);
    this.setData({
      inputValue: e.detail.value
    });
  },
  //取消
  bindtapClear:function(){
    console.log("取消");
    this.setData({
      isUpdateName: this.data.isUpdateName == true ? false : true
    });
  },
  //确定修改姓名
  bindtapUpdateName:function(){
    console.log("确定修改姓名");
    var that=this;
    that.setData({
      "userinfo.realname": this.data.inputValue,
      isUpdateName: this.data.isUpdateName == true ? false : true
    });

    if (this.data.inputValue == '') return;
    //调用函数修改名称
    that.personalUpdate(that);
  },
  //修改地域
  bindtapSearch:function(e){
    wx.navigateTo({
      url: '/pages/search/search?personalId=' + e.currentTarget.id,
    });
  },
  //修改签名
  bindtapAutograph:function(e){
    wx.navigateTo({
      url: '/pages/personal/personalData/autograph/autograph?personalId=' + e.currentTarget.id + "&autograph=" + e.currentTarget.dataset.autograph,
    });
  },
  //修改手机号
  bindtapPhone:function(e){
    wx.navigateTo({
      url: '/pages/personal/personalData/updatePhone/updatePhone?personalId=' + e.currentTarget.id,
    })
  },

  //举报
  updateName: function () {
    this.setData({
      isUpdateName: this.data.isUpdateName == true ? false : true
    });
  },
  //修改个人信息
  personalUpdate:function(that){
    //必要参数
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    //设置请求参数获取数据
    var data = {
      timeStamp: time,
      token: token,
      reqJson: JSON.stringify({
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        cudScriptName: 'Update',
        nameSpaceMap: {
          sys_userinfo: {
            Query: [{
              id: that.data.personalId,           //个人资料id
              realname: that.data.userinfo.realname,      //名称
              avatarUrl: that.data.userinfo.avatarUrl,    //头像
              provinceName: that.data.userinfo.provinceName,  //地址
            }],
          }
        }
      })
    };

    //发送请求
    //必要参数
    var cookie = wx.getStorageSync("cookie");
    wx.request({
      url: __config.basePath_sys + "api/exe/save",
      method: "POST",
      header: {
        cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: function (res) {   //请求成功
        console.log("userinfo:");
        console.log(res);
        //获取个人信息
        that.personalGetData(that);
      },
      fail: function (res) {      //请求失败
        //提示
        wx.showToast({
          title: "请求失败！",
          icon: 'loading',
          duration: 3000,
        });
        console.log("失败了");
      },
      //不管成功失败都执行
      complete: function () { }
    });
  },

  //获取个人信息
  personalGetData: function (that) {
    //必要参数
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();
    //个人资料id
    var personalId = wx.getStorageSync("personalId")
    console.log('personalId:' + personalId);
    //设置请求参数获取数据,默认0第一页
    var data = {
      timeStamp: time,
      token: token,
      reqJson: JSON.stringify({
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        nameSpaceMap: {
          sys_userinfo: {
            Query: [{
              id: personalId    //个人资料id
            }],
          }
        }
      })
    };
    that.setData({
      data: data,
    });

    //发送请求
    this.requestDataPersonal(that);
  },

  //请求获取数据,个人信息
  requestDataPersonal: function (that) {
    //必要参数
    var cookie = wx.getStorageSync("cookie");
    wx.request({
      url: __config.basePath_sys + "api/exe/get",
      method: "POST",
      header: {
        cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: that.data.data,
      success: function (res) {   //请求成功
        console.log("userinfo:");
        console.log(res);
        that.setData({
          userinfo: res.data.rows[0]
        });
      },
      fail: function (res) {      //请求失败
        //提示
        wx.showToast({
          title: "请求失败！",
          icon: 'loading',
          duration: 3000,
        });
        console.log("失败了");
      },
      //不管成功失败都执行
      complete: function () { }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      personalId: options.personalId
    });

    //获取个人信息
    that.personalGetData(that);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that =this;
    if (that.data.userinfo.provinceName == '') return;
    //执行修改
    that.personalUpdate(that);
    //提示
    wx.showToast({
      title: "修改成功!",
      icon: 'ok',
      duration: 3000,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})