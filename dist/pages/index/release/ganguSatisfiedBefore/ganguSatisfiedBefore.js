/**  
 *   作者:  lingfe 
 *   时间:  2017-7-11
 *   描述:  发布_干股纳才页面
 * 
 * */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    isAgree: false,
    hangye: ['金融理财', '教育', '电子商务', '房地产', '餐饮业'],
    hangyeIndex: 0,
    shareDivision: ['出让10%的股权', '出让15%的股权', '出让20%的股权', '出让25%的股权'],
    shareDivisionIndex:0,
    projectDescription: null,
    incomeDescription: null,
    introduce: null,
    skillsRequired:null,
    
  },
  //技能/资源要求
  skillsRequiredClick: function (e) {
    console.log("技能/资源要求");
    wx.navigateTo({
      url: "/pages/index/release/ganguSatisfiedBefore/skillsRequired/skillsRequired"
    });
  },
  //选择行业
  sethangye: function (e) {
    console.log('行业选择  发生选择改变，携带值为', e.detail.value);
    this.setData({
      hangyeIndex: e.detail.value
    });
  },
  //股权划分
  setshareDivision: function (e) {
    console.log('股权划分  发生选择改变，携带值为', e.detail.value);
    this.setData({
      shareDivisionIndex: e.detail.value
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
  //阅读并同意,相关条约
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  //表单提交
  formSubmit: function (e) {
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
    }
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