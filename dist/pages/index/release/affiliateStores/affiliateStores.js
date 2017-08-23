/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_加盟分店页面
 * 
 * */
var app=getApp();
var utilMd5 = require('../../../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    isAgree: false,
    PriceRange: ['1 - 5 万', '5 - 15 万', '15 - 25 万', '25 - 50 万', '50 - 500 万'],
    priceIndex: 0,
    ruhuoValue: '',
    fundsLayout: null,                //资金布局
    projectDescription: null,         //项目描述
    industryChoice:null,              //行业选择
    incomeDescription: null,          //收益描述
    introduce: null,                  //输入公司/团队介绍
    geographicalPosition:null,        //总部位置
    address: ['北京', '上海', '深圳', '广州', '贵阳'],
    addressIndex: 0,
  },
  //入伙门槛 ,移出
  bindinputValue: function (e) {
    console.log('移出', e.detail.value);
    this.setData({
      ruhuoValue: e.detail.value + "万"
    });
  },
  //入伙门槛,移入
  bindfocusValue:function(e){
    console.log("移入", e.detail.value);
    let that = this; 
    that.setData({
      ruhuoValue:null,
    });
  },
  //选择行业
  industryChoiceClick: function (e) {
    console.log('行业选择  发生选择改变，携带值为', e.detail.value);
    wx.navigateTo({
      url: "/pages/dahuo/industryChoice/industryChoice"
    });
  },
  //总部位置
  geographicalPositionClick: function (e) {
    console.log("总部位置");
    wx.navigateTo({
      url: "/pages/index/release/businessTransfer/geographicalPosition/geographicalPosition"
    });
  },
  //资金布局
  fundsLayoutClick: function (e) {
    console.log("资金布局");
    wx.navigateTo({
      url: '/pages/index/release/partnership/fundsLayout/fundsLayout'
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
  //团队/公司介绍
  introduceClick: function (e) {
    console.log("团队/公司介绍");
    wx.navigateTo({
      url: '/pages/index/release/partnership/introduce/introduce',
    });
  },
  //投放城市
  setAddressInfo: function (e) {
    console.log('投放城市 发生选择改变，携带值为', e.detail.value);
    this.setData({
      addressIndex: e.detail.value
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
      this.showModal("加盟金额不能为空!");
      return;
    }


    //行业选择
    var industryChoice = e.detail.value.industryChoice;
    if (industryChoice == "" || industryChoice == null) {
      this.showModal("行业选择不能为空!");
      return;
    }
    //总部位置
    var headquartersLocation = e.detail.value.headquartersLocation;
    if (headquartersLocation == "" || headquartersLocation == null) {
      this.showModal("总部不能为空!");
      return;
    }
    //资金布局
    var fundDistribution = e.detail.value.fundDistribution;
    if (fundDistribution == "" || fundDistribution == null) {
      this.showModal("资金布局不能为空!");
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
    //公司、团队介绍
    var teamIntroduction = e.detail.value.teamIntroduction;
    if (teamIntroduction == "" || teamIntroduction == null) {
      this.showModal("公司/团队介绍不能为空!");
      return;
    }
    //投放城市
    var throwInTheCity = e.detail.value.throwInTheCity;
    if (throwInTheCity == "" || throwInTheCity == null) {
      this.showModal("投放城市不能为空!");
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

    //必要参数
    var cookie = wx.getStorageSync("cookie");
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();

    //上传图片数组
    uploadimg(imageArray.splice(0, 1), [], imageArray);
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
        url: "http://web.dahuo.cloud/api/exe/save",
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
                  releaseType: '加盟分店',                   //发布类型
                  personalId: wx.getStorageSync("personalId"),      //个人资料id
                  title: title,                             //标题
                  threshold: threshold.substring(0, threshold.indexOf('万')),                     //入伙门槛
                  industryChoice: industryChoice,           //行业选择
                  headquartersLocation: headquartersLocation,//总部位置
                  fundDistribution: fundDistribution,       //资金布局
                  projectDescription: projectDescription,   //项目描述
                  incomeDescription: incomeDescription,     //收益描述
                  teamIntroduction: teamIntroduction,       //公司、团队介绍
                  throwInTheCity: throwInTheCity,           //投放城市
                  phone: phone,                             //电话号码
                  currentCity: wx.getStorageSync("currentCity"), //当前城市
                  imageArray:pathArr                             //数组
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

    }
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