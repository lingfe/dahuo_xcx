/**  
 *   作者:  lingfe 
 *   时间:  2017-7-12
 *   描述:  个人_个人资料
 * 
 * */
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isUpdateName:false,   //是否显示弹窗修改名称
    phone:null,           //电话
    inputValue: '',       //名称
    avatarUrl:'',         //头像
    provinceName:''       //城市
  },
  
  //获取图片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        if (res.tempFilePaths.length>1){
          wx.showToast({title: '只能选择一张照片',icon: 'error',duration: 3000,});
          return;
        }
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          avatarUrl:res.tempFilePaths
        });
        //上传图片到服务器
        uploadimg(res.tempFilePaths);
      }
    })

    //多张图片上传
    function uploadimg(imgPath) {
      wx.uploadFile({
        url: app.config.domain,                       //开发者服务器 url
        filePath: imgPath[0],                          //要上传文件资源的路径
        name: 'file',                               //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
        header: {                                   //HTTP 请求 Header , header 中不能设置 Referer
          cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded"},
        formData: null,                             //参数(HTTP 请求中其他额外的 form data)
        success: function (res) {                   //接口调用成功的回调函数
          var json = JSON.parse(res.data);
          that.setData({
            avatarUrl: app.config.domainImage +json[0]
          });
          //上传成功，执行修改()
          that.personalUpdate(that);
        },
        fail: function (res) {                      //接口调用失败的回调函数
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
    this.setData({inputValue: e.detail.value});
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
      url: '/pages/personal/personalData/autograph/autograph?autograph=' + e.currentTarget.dataset.autograph,
    });
  },

  //修改手机号
  bindtapPhone:function(e){
    wx.navigateTo({
      url: '/pages/personal/personalData/updatePhone/updatePhone',
    })
  },

  //显示或关闭
  bindtapClear: function () {
    this.setData({ isUpdateName: this.data.isUpdateName == true ? false : true });
  },

  //确定修改名称
  bindtapUpdateName: function () {
    var that = this;
    //判断是否为空
    if (app.checkInput(that.data.inputValue)) {
      wx.showModal({ title: '名称不能为空!', showCancel: false });
      return;
    } else {
      //调用函数修改信息
      that.personalUpdate(that);
    }
  },

  //修改个人信息
  personalUpdate:function(e){
    var that=this;
    var url = app.config.basePath_sys + "api/exe/save";
    //请求头
    var header= {
      cookie: wx.getStorageSync("cookie"),
      "Content-Type": "application/x-www-form-urlencoded"
    };
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        cudScriptName: 'Save',
        nameSpaceMap: {
          rows: [{
            id: wx.getStorageSync("personalId"),            //个人资料id
            realname: that.data.inputValue,                 //名称
            avatarUrl: that.data.avatarUrl,                 //头像
            provinceName: that.data.provinceName,           //城市
          }],
        }
      })
    };

    //发送请求
    app.request.reqPost(url,header,data,function(res){
      console.log(res);
      that.setData({
        "userinfo.realname": that.data.inputValue,
        isUpdateName: false
      });
      //获取个人信息
      that.personalGetData(that);
    });
  },

  //获取个人信息
  personalGetData: function (that) {
    var url = app.config.basePath_sys + "api/exe/get";
    //请求头
    var header = {
      cookie: wx.getStorageSync("cookie"),
      "Content-Type": "application/x-www-form-urlencoded"
    };
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time") ,
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            id: wx.getStorageSync("personalId")    //个人资料id
          }],
        }
      })
    };

    //发送请求
    app.request.reqPost(url,header,data,function(res){
      console.log(res);
      that.setData({
        userinfo: res.data.rows[0],
        avatarUrl: res.data.rows[0].avatarUrl,
        provinceName: res.data.rows[0].provinceName,
      });
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (!app.checkInput(that.data.obj)) {
      that.setData({ provinceName:that.data.obj});
      //调用函数修改信息
      that.personalUpdate(that);
    }else{
      //获取个人信息
      that.personalGetData(that);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    //获取个人信息
    that.personalGetData(that);
    //下拉完成后执行回退
    wx.stopPullDownRefresh();
  },
})