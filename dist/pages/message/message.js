
/**  作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  信息页面
 * 
 * */
    var focus
    var isShowView
Page({
  data:{
    // text:"这是一个页面"
    focus:false,
    isShowView:true,
    messages:[
      {
        title:"马云",
        url:"http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg",
        message:"我给你投资1000万",
        time:"15:15",
        count:5
      },
      {
        title:"马化腾",
        url:"http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg",
        message:"我给你投资5000万，",
        time:"15:15",
        count:22
        },
      {
        title:"李彦宏",
        url:"http://img1.3lian.com/gif/more/11/201212/c011f2b2ab1a10d79fe931a786503d03.jpg",
         message:"这个东西我已经有了！！！",
        time:"12:13",
        count:1
         },
      {
        title:"前端开发者",
        url:"http://img1.3lian.com/gif/more/11/201212/04b335ead07530a6188a27549fad1a68.jpg",
        message:"想和你聊聊这个项目",
        time:"11:35",
        count:0
        },
      {
        title:"微信小程序",
        url:"http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg",
        message:"谁有内测资格啊啊，300万买一个",
        time:"08:23",
        count:0
        },
      {
        title:"小程序",
        url:"http://img1.3lian.com/gif/more/11/201212/3fab6379b6ef53e7c17a1cc772eed0d6.jpg",
        message:"这个IDE方便都不要配置了",
        time:"03:21",
        count:5
        },
      {
        title:"后台",
        url:"http://img1.3lian.com/gif/more/11/201212/411cffabcd6e4474b48f1ecac76e1b3f.jpg",
        message:"不看好小程序",
        time:"02:45",
        count:0
        },
      {
        title:"闯天下",
        url:"http://img1.3lian.com/gif/more/11/201212/04378257474004fcdd62f619d724db0c.jpg",
        message:"微信太强大了",
        time:"01:09",
        count:0
        },
      {
        title:"小程序",
        url:"http://img1.3lian.com/gif/more/11/201212/58ec7c89b16c529fc9d0dc440a72e14d.jpg",
        message:"有快来看直播啦，学习开始啦",
        time:"00:24",
        count:2
         }
    ]
  },
  bindtap:function(event){
    wx.navigateTo({
      url: "search/search"
    })
  },
  bindfocus:function(){
    this.setData({
         focus:true
    })
    this.setData({
      isShowView:false
    })
  },
  bindblur:function(){
    this.setData({
      focus:false
    })
    this.setData({
           isShowView:true
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
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