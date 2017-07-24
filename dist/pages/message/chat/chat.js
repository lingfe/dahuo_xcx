
/**  作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  聊天页面
 * 
 * */
 
Page({
  data: {
    inputValue: '',
    returnValue: '',
    allContentList: [],
    key: "d13b441029804ee99fc4e3b617a5f557",
    num: 0,
    inputTemp: ''
  },
  //输入内容事件
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //点击发送
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
          })

        } else {

        }

      }
    })
    that.inputTemp = '';
    //////

  },
  //加载页面
  onLoad: function () {
    // 设置标题
    wx.setNavigationBarTitle({
      title: '零风',
      success: function () {
        // console.log("success")
      },
      fail: function () {
        // console.log("error")
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})