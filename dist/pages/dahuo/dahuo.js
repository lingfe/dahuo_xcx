/**  作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  发布页面
 * 
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
    }
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
  //生命周期函数--监听页面初次渲染完成
  onReady: function () {
    // 页面渲染完成
  },
  //生命周期函数--监听页面显示
  onShow: function () {
    // 页面显示
  },
  //生命周期函数--监听页面隐藏
  onHide: function () {
    // 页面隐藏
  },
  //生命周期函数--监听页面卸载
  onUnload: function () {
    // 页面关闭
  },
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function (){

  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {

  },
  //用户点击右上角分享
  onShareAppMessage: function (){

  }
});