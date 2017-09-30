/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_金融理财页面
 * 
 * */
var app = getApp();
var utilMd5 = require('../../../../utils/md5.js');
import __config from '../../../../config/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],                            //选择图片的数组，原始。包含完整的图片url，以及现在编辑数据，用于预览
    arr: [],                              //选择图片的数组，预留。不包含编辑之前的数据，用于组装
    isAgree: false,                       //同意条款

    productCategory: ["基金", "保险", "债券", "股票", "P2P", "其他"],
    productCategoryIndex:0,

    title: null,                          //标题
    threshold: null,                      //入伙门槛
    industryChoice: "金融",               //行业选择
    productType: null,                    //产品种类
    incomeDescription: '',                //收益描述
    teamIntroduction: '',                 //公司、团队介绍
    phone: null,                          //电话号码
    currentCity: null,                    //当前城市
    imageArray: [],                       //图片数组，原始。不包含完整url，用于储存

    df: 4,                                //发布信息状态，0=正常显示,1=已下架,2=未发布，4=审核中，5=未通过
    text: "发布",                         //默认
    dad: false,                           //是否保存到档案袋
  },

  /**
 * 生命周期函数--监听页面卸载
 */
  onUnload: function () {
    var that = this;
    var dad = that.data.title == null ? false : true;
    if (dad == true && that.data.dad == false) {
      that.setData({ df: 2, dad: dad });
      //是否加入档案袋
      wx.showModal({
        title: '提示',
        content: '还有没有保存，是否放入档案袋？',
        confirmText: "是",
        cancelText: "否",
        success: function (res) {
          if (res.confirm) {
            //发送请求发布
            that.reqSetData("");
          }
        }
      });
    }

    //清除缓存
    wx.setStorageSync("incomeDescription", "");     //收益描述
    wx.setStorageSync("teamIntroduction", "");      //公司、团队介绍
  },

  //标题
  bindinput_title: function (e) {
    this.setData({
      title: e.detail.value
    });
  },

  //电话号码
  bindinput_phone: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },

  //购入门槛
  bindinputValue: function (e) {
    this.setData({
      threshold: e.detail.value
    });
  },

  //选择行业
  industryChoiceClick: function (e) {
    wx.navigateTo({
      url: "/pages/dahuo/industryChoice/industryChoice"
    });
  },

  //产品种类
  setproductCategory: function (e) {
    this.setData({
      productCategoryIndex: e.detail.value
    });
  },

  //收益描述
  incomeDescriptionClick: function (e) {
    wx.navigateTo({
      url: "/pages/index/release/partnership/incomeDescription/incomeDescription"
    });
  },

  //团队/公司介绍
  introduceClick: function (e) {
    wx.navigateTo({
      url: '/pages/index/release/partnership/introduce/introduce',
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
  submitForm: function (e) {
    var that = this;
    //标题
    var title = e.detail.value.title;
    if (app.checkInput(title)) {
      that.showModal("标题不能为空!");
      return;
    }
    if (title.length > 16) {
      that.showModal("标题的长度不能大于16位!");
      return;
    }

    //入伙门槛，转让门槛,加盟金额,购入门槛，投资金额，代理金额,需要金额
    var threshold = e.detail.value.threshold;
    if (app.checkInput(threshold)) {
      that.showModal("购入门槛不能为空!");
      return;
    }


    //行业选择
    var industryChoice = e.detail.value.industryChoice;
    if (app.checkInput(industryChoice)) {
      that.showModal("行业选择不能为空!");
      return;
    }
    //产品种类
    var productType = e.detail.value.productType;
    if (app.checkInput(productType)) {
      that.showModal("产品种类不能为空!");
      return;
    }
    //收益描述
    var incomeDescription = e.detail.value.incomeDescription;
    if (app.checkInput(incomeDescription)) {
      that.showModal("收益描述不能为空!");
      return;
    }
    //公司、团队介绍
    var teamIntroduction = e.detail.value.teamIntroduction;
    if (app.checkInput(teamIntroduction)) {
      that.showModal("公司/团队介绍不能为空!");
      return;
    }

    //电话号码
    var phone = e.detail.value.phone;
    if (phone.length == 0) {
      that.showModal("电话号码不能为空!");
      return;
    }
    if (phone.length < 11 || phone.length > 11) {
      that.showModal("电话号码必须是11位数！");
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
    var imageArray = [];
    if (that.data.imageArray.length != 0) {
      imageArray = that.data.imageArray;
      var arr = that.data.arr;
      for (var i = 0; i < arr.length; ++i) {
        imageArray.push(arr[i]);
      }
    } else {
      imageArray = that.data.files;
    }
    if (imageArray == null || imageArray.length == 0) {
      that.showModal("请上传图片!");
      return;
    }
    if (imageArray.length > 6) {
      that.showModal("图片最多只能上传六张!");
      return;
    }

    //同意条款
    var isAgree = e.detail.value.isAgree;
    if (isAgree != 'agree') {
      that.showModal("请同意相关条款!");
      return;
    }

    //提示
    wx.showToast({
      title: '正在上传',
      icon: 'loading',
      duration: 3000,
    });

    if (that.data.imageArray.length == 0) {
      //上传图片数组
      uploadimg(imageArray.splice(0, 1), [], imageArray);
    } else {
      //调用请求发布
      that.reqSetData(imageArray.join(","));
    }

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
            //调用请求发布
            that.reqSetData(pathArr.join(","));
          }
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

  //请求更新
  reqSetData:function (pathArr) {
    var that=this;
    //发送请求,发布信息,
    wx.request({
      url: __config.basePath_web + "api/exe/save",
      method: "POST",
      header: {cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded"},
      data: {
        timeStamp: wx.getStorageSync("time"),
        token: wx.getStorageSync("token"),
        reqJson: JSON.stringify({
          nameSpace: 'releaseinfo',
          scriptName: 'Query',
          cudScriptName: 'Save',
          nameSpaceMap: {
            rows: [{
              df: that.data.df,                                               //发布信息状态，0=正常显示,1=已下架，4=审核中，5=未通过
              id: that.data.id,                                               //发布信息id,如果为空添加，不为空更新
              releaseType: '金融理财',                                         //发布类型
              personalId: wx.getStorageSync("personalId"),                    //个人资料id
              title: that.data.title,                                         //标题
              threshold: wx.getStorageSync("threshold"),                      //入伙门槛
              industryChoice: '金融',//industryChoice,                        //行业选择
              productType: that.data.productType,                             //产品种类
              incomeDescription: wx.getStorageSync("incomeDescription"),      //收益描述
              teamIntroduction: wx.getStorageSync("teamIntroduction"),        //公司、团队介绍
              phone: that.data.phone,                                         //电话号码
              currentCity: wx.getStorageSync("currentCity"),                  //当前城市
              imageArray: pathArr                                             //图片数组
            }]
          }
        })
      },
      success: function (res) {
        if (that.data.dad == false) {
          that.setData({ dad: true });
          //提示
          wx.showToast({
            title: res.data.message,
            icon: 'ok',
            duration: 3000,
            success: function () {
              wx.switchTab({ url: "/pages/index/index" });
            }
          });
        } else {
          //提示
          wx.showToast({ title: "保存成功！", icon: 'ok', duration: 3000 });
        }
      },
      fail: function () { },
      complete: function () { }
    });
  },

  //删除图片
  bindtapImageDelete: function (e) {
    var img = e.currentTarget.dataset.img;
    var that = this;
    var files = that.data.files;

    for (var j = 0; j < files.length; j++) {
      if (files[j] == img) {
        files.splice(j, 1);
      }
    }

    var imageArray = that.data.imageArray;
    for (var j = 0; j < imageArray.length; j++) {
      var strImg = __config.domainImage + imageArray[j];
      if (strImg == img) {
        imageArray.splice(j, 1);
      }
    }

    that.setData({
      files: files,
      imageArray: imageArray
    });
    return false;
  },

  //获取 图片
  chooseImage: function (e) {
    var that = this;
    if (that.data.files.length >= 6) {
      //弹出提示
      wx.showModal({
        content: '最多只能上传6张图片！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
      return;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imglength = res.tempFilePaths.length + that.data.files.length;
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
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
          arr: that.data.arr.concat(res.tempFilePaths),
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
    if (options.releaseId != null) {
      if (options.text != null) {
        this.setData({
          text: options.text
        });
      }
      //调用函数编辑
      this.getReleaseInfo(options.releaseId,options.df);
    }
  },

  //根据id获取发布信息
  getReleaseInfo: function (id,df) {
    var that = this;

    //发送请求,发布信息,
    wx.request({
      url: __config.basePath_web + "api/exe/get",
      method: "POST",
      header: {cookie: wx.getStorageSync("cookie"),"Content-Type": "application/x-www-form-urlencoded"},
      data: {
        timeStamp: wx.getStorageSync("time"),
        token: wx.getStorageSync("token"),
        reqJson: JSON.stringify({
          nameSpace: 'releaseinfo',
          scriptName: 'Query',
          nameSpaceMap: {
            rows: [{
              id: id,                        //发布信息id
              df: df,
            }]
          }
        })
      },
      success: function (res) {
        //得到信息
        var info = res.data.rows[0];
        var img = [];
        var arr = [];
        if (info.imageArray != null && info.imageArray != "") {
          var arr = info.imageArray.split(',');
          for (var i = 0; i < arr.length; ++i) {
            arr[i] = __config.domainImage + arr[i];
          }
          img = info.imageArray.split(",");
        }

        //收益描述
        if (info.incomeDescription == null) info.incomeDescription = '';
        else wx.setStorageSync('incomeDescription', info.incomeDescription);
        //团队介绍
        if (info.teamIntroduction == null) info.teamIntroduction = '';
        else wx.setStorageSync('teamIntroduction', info.teamIntroduction);

        //设置到this
        that.setData({
          id: id,
          title: info.title,                             //标题
          threshold: info.threshold,                     //入伙门槛
          industryChoice: info.industryChoice,           //行业选择
          productType: info.productType,                 //产品种类
          incomeDescription: info.incomeDescription,     //收益描述
          teamIntroduction: info.teamIntroduction,       //公司、团队介绍
          phone: info.phone,                             //电话号码
          currentCity: info.currentCity, //当前城市
          imageArray: img,                              //图片数组
          files: arr
        });
      },
      fail: function () { },
      complete: function () { }
    });
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
    //直接从缓存里面取
    var that = this;
    that.setData({
      incomeDescription: wx.getStorageSync("incomeDescription"),      //收益描述
      teamIntroduction:wx.getStorageSync("teamIntroduction"),          //公司、团队介绍
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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