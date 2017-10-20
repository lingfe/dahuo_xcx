/**  作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  发布页面
 *       {
        "pagePath": "pages/message/message",
        "text": "消息",
        "iconPath": "assets/images/news1.jpg",
        "selectedIconPath": "assets/images/news0.jpg"
      },
 * */

Page({
  //页面的初始数据
  data: {
    // text:"这是一个页面"
    url: "",
    width: "",
    height: "",
    array: [1, 2, 3, 4, 5],
    view:"APP",
    staffA: { firstName: 'Hulk', lastName: 'Hu' },
    staffB: { firstName: 'Shang', lastName: 'You' },
    staffC: { firstName: 'Gideon', lastName: 'Lin' },
    count: 1,
    zero:0,
    a: 1,
    b: 2,
    obj1: {
      a: 1,
      b: 2
    },
    obj2: {
      c: 3,
      d: 4
    },
    second: 60,
    selected: false,
    selected1: true,
  },

  getphone: function (e) {
    this.setData({
      selected: true,
      selected1: false,
    });
    countdown(this);
  },
  //点击事件
  add: function (e) {
    this.setData({
      count: this.data.count + 1
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var url = options.url;
    var width = options.width;
    var height = options.height;
    console.log("接收的数据为；" + url + "\n" + width + "\n" + height);
    this.setData({
      url: url,
      width: width,
      height: height
    });
  },
});

function countdown(that) {
  var second = that.data.second;
  if (second == 0) {
    that.setData({
      selected: false,
      selected1: true,
      second: 60,
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }
    , 1000)
}