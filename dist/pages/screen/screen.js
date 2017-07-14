/**  
 *   作者:  lingfe 
 *   时间:  2017-7-14
 *   描述:  筛选
 * 
 * */

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["金额", "类型", "行业"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    checkboxItems: [
      { name: '10001', value: '0' },
      { name: '10002', value: '1' },
      { name: '10003', value: '2' },
      { name: '10004', value: '3' }
    ],
    str:[],
  },
  //复选
  checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value);
        var str=this.data.str;
        var checkboxItems = this.data.checkboxItems, values = e.detail.value;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(checkboxItems[i].value == values[j]){
                    checkboxItems[i].checked = true;
                    str[j] = checkboxItems[i].name;
                    break;
                }
            }
        }

        this.setData({
            checkboxItems: checkboxItems,
            str:str
        });
    },
  //删除
  clearBtn:function(e){
    console.log("删除了" + e.currentTarget.dataset.value);
    var values=this.data.str;
    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
      if (values[j] == e.currentTarget.dataset.value) {
        values[j] = '';
      }
    }
    this.setData({
      str: values
    });
  },
  //重置
  bindtapReset:function(e){
    console.log("重置了");
    this.setData({
      str:[],
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
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