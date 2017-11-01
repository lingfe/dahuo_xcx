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

  webStok:function(that){
    //建立链接
    wx.connectSocket({
      url: 'ws://sys.echsoft.cn/springws/websocket.ws',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res);
      }
    })


    var socketOpen = false
    var socketMsgQueue = []
    //监听WebSocket连接打开事件。
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！');
      socketOpen = true
      for (var i = 0; i < socketMsgQueue.length; i++) {
        sendSocketMessage(socketMsgQueue[i])
      }
      socketMsgQueue = []
    })

    //监听WebSocket错误。
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })

    function sendSocketMessage(msg) {
      if (socketOpen) {
        //通过 WebSocket 连接发送数据，
        wx.sendSocketMessage({
          data: msg
        })
      } else {
        socketMsgQueue.push(msg)
      }
    }

    //监听WebSocket接受到服务器的消息事件。
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data)
    });

    //注意这里有时序问题，
    //如果 wx.connectSocket 还没回调 wx.onSocketOpen，而先调用 wx.closeSocket，那么就做不到关闭 WebSocket 的目的。
    //必须在 WebSocket 打开期间调用 wx.closeSocket 才能关闭。
    // wx.onSocketOpen(function () {
    //   wx.closeSocket()
    // })
    //监听WebSocket关闭。
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {

  var that=this;
  that.webStok(that);



    // // 页面初始化 options为页面跳转所带来的参数
    // var url = options.url;
    // var width = options.width;
    // var height = options.height;
    // console.log("接收的数据为；" + url + "\n" + width + "\n" + height);
    // this.setData({
    //   url: url,
    //   width: width,
    //   height: height
    // });
  },
  //用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    that.webStok(that);
    //下拉完成后执行回退
    wx.stopPullDownRefresh();
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