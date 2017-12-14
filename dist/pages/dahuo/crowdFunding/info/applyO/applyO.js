/**  
 *   作者:  lingfe 
 *   时间:  2017-12-12
 *   描述:  申请加盟
 * 
 * */
//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      userName: null, //姓名
      phone: null, //电话
      userRemark: null, //个人描述
    }
  },

  //姓名
  inputuserName: function (e) {
    this.setData({
      'form.userName': e.detail.value
    });
  },

  //电话
  inputphone: function (e) {
    this.setData({
      'form.phone': e.detail.value
    })
  },

  //个人描述
  inputuserRemark: function (e) {
    this.setData({
      'form.userRemark': e.detail.value
    });
  },

  //提示框
  showModal: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
    });
  },

  //提交申请
  bindtapShengqing: function (e) {
    var that = this;
    var form = that.data.form;

    if (app.checkInput(form.userName)) {
      that.showModal("请输入姓名！");
      return;
    }

    if (app.checkInput(form.phone)) {
      that.showModal('请输入电话!');
      return;
    }

    if (app.checkInput(form.userRemark)) {
      that.showModal("请输入个人描述");
      return;
    }

    //保存数据
    var url = app.config.basePath_web + "api/exe/save";
    //请求头
    var header = {
      cookie: wx.getStorageSync("cookie"),
      "Content-Type": "application/x-www-form-urlencoded"
    };
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'highQualityProjectApply',
        scriptName: 'Query',
        cudScriptName: 'Save',
        nameSpaceMap: {
          rows: [{
            highQualityProjectId: that.data.id,           //优质项目id
            userName: form.userName,                     //姓名
            phone: form.phone,//电话
            state: 1,//状态, 0=众筹,1=加盟代理
            userRemark: form.userRemark,//个人描述
            personalId: wx.getStorageSync('personalId') //申请者id
          }]
        }
      })
    };

    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      if (!app.checkInput(res.data.rows)) {
        that.showModal("提交成功!");
        //清空表单
        that.setData({
          form: {
            userName: null, //姓名
            phone: null, //电话
            userRemark: null, //个人描述
          }
        });

        //得到打开的页面
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];  //当前页面
        var prevPage = pages[pages.length - 2]; //上一个页面
        //返回上一页
        wx.navigateBack();
      } else {
        that.showModal("提交失败!");
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
})