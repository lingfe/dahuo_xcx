Page({
  //这个页面，数据
  data: {
    inputShowed: false,
    inputVal: ""
  },
  //显示 input
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  //隐藏  input
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  //关闭  input
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
});