/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_微商代理页面
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
    files: [],                          //图片数组
    isAgree: false,                     //修改条款 
    dailiType: ['qq代理商', '微信代理商'],
    dailiTypeIndex: 0,
    arr:[],

    title: null,                        //标题
    threshold: null,                    //入伙门槛
    industryChoice: null,               //行业选择
    productCategory: null,              //产品类目
    productHighlights: null,            //产品亮点
    agentCondition: null,               //代理条件
    agencyRule: null,                   //代理规则
    incomeDescription: '',            //收益描述
    phone: null,                        //电话号码
    currentCity: null,                  //当前城市
    imageArray: [],                   //图片
    text: "发布",                     //默认
  },
  //代理金额
  bindinputValue: function (e) {
    console.log('代理金额  发生选择改变，携带值为', e.detail.value);
    this.setData({
      threshold: e.detail.value + "万"
    });
  },
  //选择行业
  industryChoiceClick: function (e) {
    console.log('行业选择  发生选择改变，携带值为', e.detail.value);
    wx.navigateTo({
      url: "/pages/dahuo/industryChoice/industryChoice"
    });
  },
  //产品类目
  setdailiType: function (e) {
    console.log('产品类目  发生选择改变，携带值为', e.detail.value);
    this.setData({
      dailiTypeIndex: e.detail.value
    });
  },
  //产品亮点
  productHighlightsClick: function (e) {
    console.log("产品亮点");
    wx.navigateTo({
      url: "/pages/index/release/derivativeAgent/productHighlights/productHighlights"
    });
  },
  //代理条件
  agentConditionClick: function (e) {
    console.log("代理条件");
    wx.navigateTo({
      url: "/pages/index/release/derivativeAgent/agentCondition/agentCondition"
    });
  },
  //代理规则
  agencyRuleClick: function (e) {
    console.log("代理规则");
    wx.navigateTo({
      url: "/pages/index/release/derivativeAgent/agencyRule/agencyRule"
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
  submitForm: function (e) {
    var that = this;
    //标题
    var title = e.detail.value.title;
    if (title == "" || title == null || title.length == 0) {
      that.showModal("标题不能为空!");
      return;
    }
    if (title.length > 16) {
      that.showModal("标题的长度不能大于16位!");
      return;
    }

    //入伙门槛，转让门槛,加盟金额,购入门槛，投资金额，代理金额,需要金额
    var threshold = e.detail.value.threshold;
    if (threshold == "" || threshold == null) {
      that.showModal("代理金额不能为空!");
      return;
    }


    //行业选择
    var industryChoice = e.detail.value.industryChoice;
    if (industryChoice == "" || industryChoice == null) {
      that.showModal("行业选择不能为空!");
      return;
    }
    //产品类目
    var productCategory = e.detail.value.productCategory;
    if (productCategory == "" || productCategory == null) {
      that.showModal("产品类目不能为空!");
      return;
    }
    //产品亮点
    var productHighlights = e.detail.value.productHighlights;
    if (productHighlights == "" || productHighlights == null) {
      that.showModal("产品亮点不能为空!");
      return;
    }
    //代理条件
    var agentCondition = e.detail.value.agentCondition;
    if (agentCondition.length == 0|| agentCondition == null){
      that.showModal("代理条件不能为空！");
      return;
    }
    //代理规则
    var agencyRule = e.detail.value.agencyRule;
    if (agencyRule.length == 0 || agencyRule==null){
      that.showModal("代理规则不能为空!");
      return;
    }
    //收益描述
    var incomeDescription = e.detail.value.incomeDescription;
    if (incomeDescription == "" || incomeDescription == null) {
      that.showModal("收益描述不能为空!");
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
    
    //必要参数
    var cookie = wx.getStorageSync("cookie");
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();

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
      reqSetData(imageArray.join(","));
    }

    //多张图片上传
    function uploadimg(path, pathArr, dataArr) {
      wx.uploadFile({
        url: __config.domain,                       //开发者服务器 url
        filePath: path[0],                          //要上传文件资源的路径
        name: 'file',                                //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
        header: {                                   //HTTP 请求 Header , header 中不能设置 Referer
          cookie: cookie,
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

          return;
        },
        complete: function () {                     //接口调用结束的回调函数（调用成功、失败都会执行）

        }
      });
    }

    //请求更新
    function reqSetData(pathArr) {
      //发送请求,发布信息,
      wx.request({
        url: __config.basePath_web+"api/exe/save",
        method: "POST",
        header: {
          cookie: cookie,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        dataType: '',
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
                  df: 4,                                       //发布信息状态，0=正常显示,1=已下架，4=审核中，5=未通过
                  id: that.data.id,                                    //发布信息id,如果为空添加，不为空更新
                  releaseType: '微商代理',                   //发布类型
                  personalId: wx.getStorageSync("personalId"),      //个人资料id
                  title: title,                             //标题
                  threshold: threshold.substring(0, threshold.indexOf('万')),                     //入伙门槛
                  industryChoice: industryChoice,           //行业选择
                  productCategory: productCategory,         //产品类目
                  productHighlights: productHighlights,     //产品亮点
                  agentCondition: agentCondition,           //代理条件
                  agencyRule: agencyRule,                   //代理规则
                  incomeDescription: incomeDescription,     //收益描述
                  phone: phone,                             //电话号码
                  currentCity: wx.getStorageSync("currentCity"), //当前城市
                  imageArray:pathArr                             //图片
                }]
              }
            }
          })
        },
        success: function (res) {
          var row = res.data.rows;
          //提示
          wx.showToast({
            title: res.data.message,
            icon: 'ok',
            duration: 3000,
            success: function () {
              wx.redirectTo({
                //url: '/pages/index/info/info?releaseId='+res.data.rows[0].id+'&personalId='+res.data.rows[0].personalId,
                url: "/pages/index/index",});
            }
          });

          //清除缓存
          wx.setStorageSync("projectDescription","");    //项目描述
          wx.setStorageSync("incomeDescription","");     //收益描述

        },
        fail: function () {},
        complete: function () {}
      });
    }
  },
  //删除图片
  bindtapImageDelete: function (e) {
    var img = e.currentTarget.dataset.img;
    var that = this;
    var files = that.data.files;

    for (var j = 0; j < files.length; j++) {
      if (files[j] == img) {
        //files[j]='';
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

    //必要参数
    var cookie = wx.getStorageSync("cookie");
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();

    reqSetData(id,df);

    //请求更新
    function reqSetData(id,df) {
      //发送请求,发布信息,
      wx.request({
        url: __config.basePath_web + "api/exe/get",
        method: "POST",
        header: {
          cookie: cookie,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          timeStamp: time,
          token: token,
          reqJson: JSON.stringify({
            nameSpace: 'releaseinfo',
            scriptName: 'Query',
            nameSpaceMap: {
              releaseinfo: {
                Query: [{
                  id: id,                        //发布信息id
                  df:df,
                }]
              }
            }
          })
        },
        success: function (res) {
          //得到信息
          var info = res.data.rows[0];

          var arr = info.imageArray.split(',');
          for (var i = 0; i < arr.length; ++i) {
            arr[i] = __config.domainImage + arr[i];
          }

          //设置到this
          that.setData({
            id: id,
            title: info.title,                             //标题
            threshold: info.threshold,                     //入伙门槛
            industryChoice: info.industryChoice,           //行业选择
            productCategory: info.productCategory,         //产品类目
            productHighlights: info.productHighlights,     //产品亮点
            agentCondition: info.agentCondition,           //代理条件
            agencyRule: info.agencyRule,                   //代理规则
            incomeDescription: info.incomeDescription,     //收益描述
            phone: info.phone,                             //电话号码
            currentCity: info.currentCity, //当前城市
            imageArray: info.imageArray.split(','),                             //图片
            files: arr
          });
        },
        fail: function () { },
        complete: function () { }
      });
    }
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