/**  
 *   作者:  lingfe 
 *   时间:  2017-9-25
 *   描述:  通知_搭伙小秘书页面
 * 
 * */
var app=getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["系统消息", "帮助与反馈"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    allContentList: [{
      content:'您好！欢迎您使用搭伙，此次测试是内测版如有问题欢迎反馈，我们竭诚为您服务。',
      infoType:null,
      },
      {
        content: '您发布的"花果园花果园花果园花果园花果园"未通过!',
        imgUrl:'web.daho.club/oNWj80FL5IdKCxzn3JF_U3KRBPcg/20171016/9de633d98e3c48ec882a44c8688e0d48.jpg',
        infoType:'null'
       },
    ]
  },
  
  //反馈
  bindtapfeedback:function(){
    wx.navigateTo({
      url: '/pages/message/search/feedback/feedback',
    });
  },

  //编辑
  bindtapEdit: function (e) {
    var that = this;
    //发布信息id
    var id = e.currentTarget.id;
    //发布类型
    var name = e.currentTarget.dataset.name;
    var url = "";
    if (name == "合伙创业") {
      url = '/pages/index/release/partnership/partnership';
    } else if (name == "生意转让") {
      url = '/pages/index/release/businessTransfer/businessTransfer';
    } else if (name == "加盟代理") {
      url = '/pages/index/release/affiliateStores/affiliateStores';
    } else if (name == "干股纳才") {
      url = '/pages/index/release/ganguSatisfiedBefore/ganguSatisfiedBefore';
    } else if (name == "金融理财") {
      url = '/pages/index/release/financialManagement/financialManagement';
    } else if (name == "房产投资") {
      url = '/pages/index/release/propertyInvestment/propertyInvestment';
    } else if (name == "股权交易") {
      url = '/pages/index/release/derivativeAgent/derivativeAgent';
    } else if (name == "其他") {
      url = '/pages/index/release/other/other';
    }

    //跳转
    wx.navigateTo({
      url: url + "?releaseId=" + id + "&text=重新发布",
    });
  },

  //页面加载
  onLoad: function () {
    var that = this;
    //获取通知信息
    that.getSysNtion(that);

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  //获取系统通知
  getSysNtion: function (that){
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'notice',       //通知表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            ntype:'0',                                     //通知类型 0=系统，1=其他
            personalId: wx.getStorageSync("personalId")    //个人id
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      var row = res.data.rows;
      if(row.length!=0){
        for(var i=0;i<row.length;++i){
          //标为已读
          biaoweiyidu(that, row[i].id)
        }
        row.reverse();
        //设置
        that.setData({ allContentList: row });
      }
    });

    //标为已读
    function biaoweiyidu(that, id) {
      var url = app.config.basePath_web + "api/exe/save";
      //请求头
      var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
      //参数
      var data = {
        timeStamp: wx.getStorageSync('time'),
        token: wx.getStorageSync('token'),
        reqJson: JSON.stringify({
          nameSpace: 'notice',       //通知表
          scriptName: 'Query',
          cudScriptName: 'Save',
          nameSpaceMap: {
            rows: [{
              id: id,
              static: 1,                                       //0=未查看，1=已查看', 
              personalId: wx.getStorageSync("personalId")    //个人id
            }],
          }
        })
      };
      //发送请求
      app.request.reqPost(url, header, data, function (res) {
        console.log(res);
      });
    }
  },

  //菜单切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});