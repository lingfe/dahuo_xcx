/**  
 *   作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  合作创业页面
 * 
 * */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    isAgree:false,
    hangye: ['金融理财', '教育', '电子商务', '房地产', '餐饮业'],
    hangyeIndex: 0,
    PriceRange: ['1 - 5 万', '5 - 15 万', '15 - 25 万', '25 - 50 万', '50 - 500 万'],
    priceIndex: 0,
    ruhuoValue:'',

    title: '',                         //标题
    threshold: null,                   //入伙门槛
    industryChoice:null,               //行业选择
    fundsLayout:null,                  //资金布局
    projectDescription: null,          //项目描述
    incomeDescription:null,            //收益描述
    introduce:null,                    //公司团队介绍
    phone:null,                        //电话号码

  },
  //入伙门槛,移出
  bindinputValue:function(e){
    console.log('入伙门槛 移出', e.detail.value);
    this.setData({
      ruhuoValue: e.detail.value+"万"
    });
  },
  //入伙门槛,移入
  bindfocusValue: function (e) {
    console.log("移入", e.detail.value);
    let that = this;
    that.setData({
      ruhuoValue: null,
    });
  },
  //选择行业
  sethangye: function(e){
    console.log('行业选择  发生选择改变，携带值为', e.detail.value);
    this.setData({
      hangyeIndex: e.detail.value
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
  projectDescriptionClick:function(e){
    console.log("项目描述");
    wx.navigateTo({
      url: "/pages/index/release/partnership/projectDescription/projectDescription"
    });
  },
  //收益描述
  incomeDescriptionClick:function(e){
    console.log("收益描述");
    wx.navigateTo({
      url: "/pages/index/release/partnership/incomeDescription/incomeDescription"
    });
  },
  //团队/公司介绍
  introduceClick:function(e){
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
  //提示框
  showModal:function(msg) {
    wx.showModal({
      title: msg,
      showCancel: false,
    });
  },
  //表单提交
  submitForm:function (e){
    //标题
    var title= e.detail.value.title;
    if (title == "" || title == null || title.length == 0) {
      this.showModal("标题不能为空!");
      return;
    }
    if(title.length>16){
      this.showModal("标题的长度不能大于16位!");
      return;
    }

    //入伙门槛
    var threshold = e.detail.value.threshold;
    if(threshold==""||threshold==null){
      this.showModal("入伙门槛不能为空!");
      return;
    }


    //行业选择
    var industryChoice = e.detail.value.industryChoice;
    if(industryChoice == "" || industryChoice == null){
      this.showModal("行业选择不能为空!");
      return;
    }
    //资金布局
    var fundDistribution = e.detail.value.fundDistribution;
    if(fundDistribution == "" || fundDistribution == null){
      this.showModal("资金布局不能为空!");
      return;
    } 
    //项目描述
    var projectDescription = e.detail.value.projectDescription;
    if(projectDescription=="" || projectDescription==null){
      this.showModal("项目描述不能为空!");
      return;
    }
    //收益描述
    var incomeDescription = e.detail.value.incomeDescription;
    if(incomeDescription==""||incomeDescription==null){
      this.showModal("收益描述不能为空!");
      return;
    }
    //公司、团队介绍
    var teamIntroduction = e.detail.value.teamIntroduction;
    if(teamIntroduction == "" || teamIntroduction == null){
      this.showModal("公司/团队介绍不能为空!");
      return;
    }
    
    //电话号码
    var phone = e.detail.value.phone;
    if(phone.length == 0){
      this.showModal("电话号码不能为空!");
      return;
    }
    if(phone.length<11 || phone.length>11){
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
    if(imageArray == null || imageArray.length == 0){
      this.showModal("请上传图片!");
      return;
    }
    if(imageArray.length >6){
      this.showModal("图片最多只能上传六张!");
      return;
    }

    //同意条款
    var isAgree = e.detail.value.isAgree;
    if (isAgree !='agree'){
      this.showModal("请同意相关条款!");
      return;
    }

    var str="data：" + e.detail.value.phone + ",title:" + title 
    + ",threshold:" + threshold + ",industryChoice:" + industryChoice
      + ",fundDistribution:" + fundDistribution + ",projectDescription:" + projectDescription
      + ",incomeDescription:" + incomeDescription + ",teamIntroduction:" + teamIntroduction + ",图片数组:" + imageArray;

    //弹出提示
    wx.showModal({
      content: '内容:'+str,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
        }
      }
    });
    return;

    //发送请求
    wx.request({
      url: "http://api.budejie.com/api/api_open.php",
      data: {
        title: title, threshold: threshold,
        industryChoice: industryChoice, fundDistribution: fundDistribution,
        projectDescription: projectDescription, incomeDescription: incomeDescription,
        teamIntroduction: teamIntroduction, imageArray: imageArray
      },
      method: "GET",
      success: function (res) {
        console.log("成功了");
      },
      fail: function () {
        console.log("失败了");
      }
    });
  },
  //删除图片
  bindtapImageDelete:function(e){
    var img=e.currentTarget.dataset.img;
    var files=this.data.files;
    for (var j = 0; j<files.length; j++) {
      if (files[j] == img) {
       //files[j]='';
        files.splice(j, 1);
      }
    }
    this.setData({
      files:files
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