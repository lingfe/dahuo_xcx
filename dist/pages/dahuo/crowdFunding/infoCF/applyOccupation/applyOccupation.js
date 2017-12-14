/**  
 *   作者:  lingfe 
 *   时间:  2017-12-7
 *   描述:  申请入伙
 * 
 * */
//获取应用实例
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      applyNumber:1, //申请份数
      userName:null, //姓名
      phone:null, //电话
      userRemark:null, //个人描述
      amountofMoney:null, //金额
    }
  },

  //输入份数
  inputNumber:function(e){
    var thatDate = this.data;
    
    this.setData({
      'form.applyNumber': e.detail.value,
    });
  },

  //姓名
  inputuserName:function(e){
    this.setData({
      'form.userName':e.detail.value
    });
  },

  //电话
  inputphone:function(e){
    this.setData({
      'form.phone': e.detail.value
    })
  },

  //个人描述
  inputuserRemark:function(e){
    this.setData({
      'form.userRemark':e.detail.value
    });
  },
  
  //减
  bindtapJian:function(e){
    var thatDate =this.data;
    if (thatDate.form.applyNumber >0){
      this.setData({
        'form.applyNumber': (thatDate.form.applyNumber-1)
      });
    }
  },

  //加
  bindtapJia:function(e){
    var thatDate = this.data;
    if (thatDate.form.applyNumber < thatDate.maxApplyNumber) {
      var num = (thatDate.form.applyNumber + 1);
      this.setData({
        'form.applyNumber': num,
      });
    }
  },

  //提示框
  showModal: function (msg) {
    wx.showModal({
      title: '提示',
      content:msg,
      showCancel: false,
    });
  },

  //提交申请
  bindtapShengqing:function(e){
    var that=this;
    var form=that.data.form;

    //验证非空
    if (app.checkInput(form.applyNumber)){
      that.showModal("请输入份数!");
      return;
    } else if ( parseInt(form.applyNumber) > parseInt(that.data.maxApplyNumber )){
      that.showModal("份数太多了!");
      return;
    }



    if(app.checkInput(form.userName)){
      that.showModal("请输入姓名！");
      return;
    }

    if(app.checkInput(form.phone)){
      that.showModal('请输入电话!');
      return;
    }

    if (app.checkInput(form.userRemark)){
      that.showModal("请输入个人描述");
      return;
    }
    //金额
    var amountofMoney = parseInt(form.applyNumber) * parseInt(that.data.threshold);

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
            applyNumber: form.applyNumber,             //申请份数
            amountofMoney: amountofMoney,         //金额
            userName: form.userName,                     //姓名
            phone:form.phone,//电话
            userRemark:form.userRemark,//个人描述
            personalId: wx.getStorageSync('personalId') //申请者id
          }]
        }
      })
    };

    //发送请求
    app.request.reqPost(url,header,data,function(res){
      if(!app.checkInput(res.data.rows)){
        that.showModal("提交成功!");
        //清空表单
        that.setData({
          form: {
            applyNumber: 1, //申请份数
            userName: null, //姓名
            phone: null, //电话
            userRemark: null, //个人描述
            amountofMoney: null, //金额
          }
        });

        //得到打开的页面
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];  //当前页面
        var prevPage = pages[pages.length - 2]; //上一个页面
        //返回上一页
        wx.navigateBack();
      }else{
        that.showModal("提交失败!");
      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id,
      threshold: options.threshold,
      maxApplyNumber: options.maxApplyNumber
    })
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