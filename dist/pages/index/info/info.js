/**  作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  详细信息页面
 * 
 * */

Page({
  data:{
    bl:false,
    tabs: ["項目细节", "讨论区"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    inputValue: '',
    returnValue: '',
    allContentList: [],
    key: "d13b441029804ee99fc4e3b617a5f557",
    num: 0,
    inputTemp: ''
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  submitTo: function (e) {

    let that = this;

    that.data.allContentList.push({ "value": that.data.inputValue });

    that.setData({
      allContentList: that.data.allContentList
    })
    let _url = `http://www.tuling123.com/openapi/api`;
    wx.request({
      url: _url,
      data: {
        key: that.data.key,
        info: that.data.inputValue
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        let data = res.data;
        if (data.code === 100000) {
          that.data.allContentList.push({ "value": data.text });
          that.setData({
            returnValue: data.text,
            allContentList: that.data.allContentList
          });

        } else {

        }

      }
    });
    that.inputTemp = '';
    //////

  },
  onLoad: function () {
    var that = this;
    var sliderWidth=100;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //查看全文
  bindtapSelectInfo:function(){
    if(this.data.bl == true){
      this.setData({
        bl: false
      });
    }else{
      this.setData({
        bl: true
      });
    }
  },
  //拨打电话
  bindtapPhone:function(){
    wx.showModal({
      title: '拨打电话',
      content: '是否拨打？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '13068326391' //仅为示例，并非真实的电话号码
          });
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });

  }
});