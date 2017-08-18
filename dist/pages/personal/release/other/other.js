/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_其他页面
 * 
 * */
var app = getApp();
var utilMd5 = require('../../../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    isAgree: false,
    ruhuoValue: '',
    projectDescription: null,     //项目描述
    incomeDescription: null,      //收益描述
    industryChoice:null,          //行业选择
  },
  //需要金额,移出
  bindinputValue: function (e) {
    console.log('需要金额 移出，携带值为', e.detail.value);
    this.setData({
      ruhuoValue: e.detail.value + "万"
    });
  },
  //需要金额,移入
  bindfocusValue: function (e) {
    console.log("移入", e.detail.value);
    let that = this;
    that.setData({
      ruhuoValue: null,
    });
  },
  //选择行业
  industryChoiceClick: function (e) {
    console.log('行业选择  发生选择改变，携带值为', e.detail.value);
    wx.navigateTo({
      url: "/pages/dahuo/industryChoice/industryChoice"
    });
  },
  //项目描述
  projectDescriptionClick: function (e) {
    console.log("项目描述");
    wx.navigateTo({
      url: "/pages/index/release/partnership/projectDescription/projectDescription"
    });
  },
  //收益描述
  incomeDescriptionClick: function (e) {
    console.log("收益描述");
    wx.navigateTo({
      url: "/pages/index/release/partnership/incomeDescription/incomeDescription"
    });
  },
  //阅读并同意,相关条约
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  //提示框
  showModal: function (msg) {
    wx.showModal({
      title: msg,
      showCancel: false,
    });
  },
  //表单提交
  formSubmit: function (e) {
    //标题
    var title = e.detail.value.title;
    if (title == "" || title == null || title.length == 0) {
      this.showModal("标题不能为空!");
      return;
    }
    if (title.length > 16) {
      this.showModal("标题的长度不能大于16位!");
      return;
    }

    //入伙门槛，转让门槛,加盟金额,购入门槛，投资金额，代理金额,需要金额
    var threshold = e.detail.value.threshold;
    if (threshold == "" || threshold == null) {
      this.showModal("入伙门槛不能为空!");
      return;
    }
    //行业选择
    var industryChoice = e.detail.value.industryChoice;
    if (industryChoice == "" || industryChoice == null) {
      this.showModal("行业选择不能为空!");
      return;
    }
    //项目描述
    var projectDescription = e.detail.value.projectDescription;
    if (projectDescription == "" || projectDescription == null) {
      this.showModal("项目描述不能为空!");
      return;
    }
    //收益描述
    var incomeDescription = e.detail.value.incomeDescription;
    if (incomeDescription == "" || incomeDescription == null) {
      this.showModal("收益描述不能为空!");
      return;
    }

    //电话号码
    var phone = e.detail.value.phone;
    if (phone.length == 0) {
      this.showModal("电话号码不能为空!");
      return;
    }
    if (phone.length < 11 || phone.length > 11) {
      this.showModal("电话号码必须是11位数！");
      return;
    }
    //正则表达式验证电话号码
    var pattern = /[^\d]/g;
    //获取电话号码
    var flag = pattern.test(e.detail.value.phone);
    if (flag) {
      //弹出提示
      wx.showModal({
        content: '电话号码不正确',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
      return;
    }

    //图片
    var imageArray = this.data.files;
    if (imageArray == null || imageArray.length == 0) {
      this.showModal("请上传图片!");
      return;
    }
    if (imageArray.length > 6) {
      this.showModal("图片最多只能上传六张!");
      return;
    }

    //同意条款
    var isAgree = e.detail.value.isAgree;
    if (isAgree != 'agree') {
      this.showModal("请同意相关条款!");
      return;
    }

    //弹出提示
    wx.showModal({
      content: '内容:',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
        }
      }
    });

    //必要参数
    console.log("cookie:" + wx.getStorageSync("cookie"));
    var cookie = wx.getStorageSync("cookie");
    console.log(cookie);
    var time = new Date().getTime();
    console.log(time);
    var token = utilMd5.hexMD5(app.globalData.token+time.toString()).toUpperCase();
    console.log(token);

    //发送请求,发布信息,
    wx.request({
      url: "http://web.dahuo.cloud/api/exe/save",
      method: "POST",
      header: {
        cookie: cookie,
       "Content-Type": "application/x-www-form-urlencoded" 
      },
      dataType:'',
      data: {
        timeStamp: time,
        token: token,
        reqJson: JSON.stringify({
          nameSpace: 'releaseinfo',
          scriptName: 'Query',
          cudScriptName: 'Update',
          nameSpaceMap: {
            releaseinfo: {
              Query: [{
                releaseType:'其他',                        //发布类型
                personalId: wx.getStorageSync("id"),      //个人资料id
                title: title,                             //标题
                threshold: threshold.substring(0,threshold.indexOf('万')),                     //入伙门槛
                industryChoice: industryChoice,           //行业选择
                projectDescription: projectDescription,   //项目描述
                incomeDescription: incomeDescription,     //收益描述
                phone: phone                             //电话号码
              }]
            }
          }
        })
      },
      success: function (res) {
        //提示
        wx.showToast({
          title: res.data.message,
          icon: 'loading',
          duration: 3000,
        });
        console.log("成功了");
      },
      fail: function () {
        console.log("失败了");
      },
      complete: function () {

      }
    });
    return;
    //发送请求,图片上传
    wx.uploadFile({
      url: 'http://example.weixin.qq.com/upload', //开发者服务器 url（仅为示例，非真实的接口地址）
      filePath: imageArray,                       //要上传文件资源的路径
      name: 'imageArray',                         //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
      header: {                                   //HTTP 请求 Header , header 中不能设置 Referer
        cookie: '',
      },
      formData: {                                 //参数(HTTP 请求中其他额外的 form data)

      },
      success: function (res) {                   //接口调用成功的回调函数
        var data = res.data
        //do something
      },
      fail: function () {                         //接口调用失败的回调函数

      },
      complete: function () {                     //接口调用结束的回调函数（调用成功、失败都会执行）

      }

    });


  },
  //删除图片
  bindtapImageDelete: function (e) {
    var img = e.currentTarget.dataset.img;
    var files = this.data.files;
    for (var j = 0; j < files.length; j++) {
      if (files[j] == img) {
        //files[j]='';
        files.splice(j, 1);
      }
    }
    this.setData({
      files: files
    });
    return false;
  },
  //获取 图片
  chooseImage: function (e) {
    var that = this;
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
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("cookie:" + wx.getStorageSync("cookie"));
    console.log("md5:" + utilMd5.hexMD5('123456').toUpperCase());
    console.log('str:' + new Date().getTime().toString());
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