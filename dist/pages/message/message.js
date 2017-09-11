
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
        title:"搭伙小秘书",
        url:"http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg",
        message:"您发布的'花果园火锅店转让..'未通过",
        time:"刚刚",
        count:5
      },
      {
        title:"搭伙小秘书",
        url:"http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg",
        message:"通知通知通知",
        time:"2天前",
        count:0
        },
      {
        title:"搭伙小秘书",
        url:"http://img1.3lian.com/gif/more/11/201212/c011f2b2ab1a10d79fe931a786503d03.jpg",
         message:"有人回复你..",
        time:"10天前",
        count:1
         },
      {
        title:"搭伙小秘书",
        url:"http://img1.3lian.com/gif/more/11/201212/04b335ead07530a6188a27549fad1a68.jpg",
        message:"零风评论了你的项目.",
        time:"一个月前",
        count:0
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