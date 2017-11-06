/**  作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  详细信息页面
 * 
 * */
var app = getApp();
var utilMd5 = require('../../../utils/md5.js');
import __config from '../../../config/config'

Page({
  data:{
    bl:false,                      //是否显示查看全文
    tabs: ["项目细节", "留言"],    //tab
    activeIndex: 0,                //tab切换索引
    sliderOffset: 0,               //x坐标    
    sliderLeft: 0,                 //y坐标
    inputValue: '',                //评论文本框的值
    allContentList: [],            //评论内容
    jb:false,                      //控制举报显示
    sc:1,                          //控制收藏图标，1=未收藏，2=已收藏
    inputHF:false,                 //回复文本框是否显示
    inputHfName:'',                //回复名称
    releaseId:'',                  //发布信息id
    personalId:'',                 //个人资料id
    strTime:'刚刚来过',             //最新访问日期
    numBer:1,                      //发布帖子数量
    releaseInfo:null,              //发布信息，单个
    length:null,                   //信息描述     
    userAn:true,                 //是否是自己的项目    
    commNumber:0,                 //评论数量
  },

  //预览
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imgPass // 需要预览的图片http链接列表
    });
  },

  //长按提示删除评论
  bindlongtapURL: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var index = e.currentTarget.dataset.index;
    var comenntid = e.currentTarget.dataset.comenntid;//评论人id
    var personalId = wx.getStorageSync('personalId');//用户id

    wx.showModal({
      title: '删除评论',
      content: '是否删除？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          if (personalId != that.data.personalId){
            if (comenntid != personalId) {
              wx.showToast({ title: '你不能删除哦!', icon: 'toast', duration: 1000 });//提示
              return;
            }
          }       
          that.data.id = id;
          that.data.index = index;
          //删除评论
          that.neticeDelete(that);
        }
      }
    });
  },

  //删除评论
  neticeDelete: function (that) {
    var url = app.config.basePath_web + "api/exe/save";
    //请求头
    var header = { 
      cookie: wx.getStorageSync('cookie'), 
      "Content-Type": "application/x-www-form-urlencoded" 
    };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'commentinfo',       //评论表
        scriptName: 'Query',
        cudScriptName: 'Delete',
        nameSpaceMap: {
          rows: [{
            id: that.data.id,
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      var allContentList = that.data.allContentList;
      var index = that.data.index;
      allContentList.splice(index, 1);

      that.setData({
        allContentList: allContentList
      });
    });
  },

  //设置是否已经收藏
  bindtapSC:function(e){
    var that =this;
    //判断是否已经收藏
    if (app.checkInput(that.data.scid)){
      //设置收藏
      setScReq();
    }else{
      //取消收藏
      reqCloseData();
    }

    //设置收藏
    function setScReq() {
      var url = app.config.basePath_web + "api/exe/save";
      //请求头
      var header = { 
        cookie: wx.getStorageSync('cookie'), 
        "Content-Type": "application/x-www-form-urlencoded" 
      };
      //参数
      var data = {
        timeStamp: wx.getStorageSync('time'),
        token: wx.getStorageSync('token'),
        reqJson: JSON.stringify({
          nameSpace: 'collectioninfo',
          scriptName: 'Query',
          cudScriptName: 'Save',
          nameSpaceMap: {
            rows: [{
              releaseId: that.data.releaseId,     //发布信息id
              personalId: wx.getStorageSync("personalId")    //个人资料id
            }]
          }
        })
      };
      //发送请求
      app.request.reqPost(url,header,data,function(res){
        var list=res.data.rows;
        if (list != null) {
          that.setData({scid: list[0].id,sc:2  });
          wx.showToast({ title: '收藏成功!', icon: 'ok', duration: 2000 });//提示
          //发送通知
          //获取用户
          var user = wx.getStorageSync("user");
          //参数
          that.data.notifyname = user.cnName;
          that.data.content = "我收藏了你的项目。";
          that.data.ntype = 1;      //通知类型 0=系统，1=其他
          that.data.avatarUrl = user.avatarUrl;
          that.setNotice(that);
        }
      });
    }

    //取消收藏
    function reqCloseData() {
      var url = app.config.basePath_web + "api/exe/save";
      //请求头
      var header = {
        cookie: wx.getStorageSync('cookie'),
        "Content-Type": "application/x-www-form-urlencoded"
      };
      //参数
      var data = {
        timeStamp: wx.getStorageSync('time'),
        token: wx.getStorageSync('token'),
        reqJson: JSON.stringify({
          nameSpace: 'collectioninfo',
          scriptName: 'Query',
          cudScriptName: 'Delete',
          nameSpaceMap: {
            rows: [{
              id: that.data.scid        //收藏id
            }]
          }
        })
      };
      //发送请求
      app.request.reqPost(url,header,data,function(res){
        var list=res.data.rows;
        if (list != null) {
          that.setData({ sc: 1,scid:null });//设置收藏
          wx.showToast({ title: '已取消收藏!', icon: 'toast', duration: 2000 });//提示
          //发送通知
          //获取用户
          var user = wx.getStorageSync("user");
          //参数
          that.data.notifyname = user.cnName;
          that.data.content = "我取消收藏你的项目。";
          that.data.tile = "";
          that.data.ntype = 1;              //通知类型 0=系统，1=其他
          that.data.avatarUrl = user.avatarUrl;
          that.setNotice(that);
        }
      });
    }
  },

  //点击举报,显示举报信息
  bindtapJB: function () {
    this.setData({  jb: true   });
  },

  //点击举报,关闭举报信息
  bindtapJBclose:function(){
    this.setData({ jb: false });
  },

  //举报
  JB:function(e){
    var that = this;
    var reportTypeId = e.currentTarget.dataset.jbname;    //举报类型

    //请求更新
    reqSetData();
    var url = app.config.basePath_web + "api/exe/save";
    //请求头
    var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'reportinfo',
        scriptName: 'Query',
        cudScriptName: 'Save',
        nameSpaceMap: {
          rows: [{
            releaseId: that.data.releaseId,        //发布信息id
            personalId: wx.getStorageSync('personalId'),      //个人id   
            reportTypeId: reportTypeId             //举报类型
          }]
        }
      })
    };
    app.request.reqPost(url,header,data,function(res){
      that.setData({ jb: false }); //关闭举报
      wx.showToast({ title: '举报成功!', icon: 'loading', duration: 3000 });//提示
    });
  },

  //查看全文
  bindtapSelectInfo: function () {
    var that=this;
    that.setData({  bl: that.data.bl == true ? false : true   });
  },

  //tab切换,切换索引
  tabClick: function (e) {
    console.log(e.currentTarget.offsetLeft);
    this.setData({ sliderOffset: e.currentTarget.offsetLeft, activeIndex: e.currentTarget.id    });
  },

  //拨打电话
  bindtapPhone: function () {
    var that=this;
    wx.showModal({
      title: '拨打电话',
      content: '很抱歉!拨打电话官方正在修复,是否复制？' + that.data.releaseInfo.phone ,
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log(that.data.releaseInfo.phone);
          wx.makePhoneCall({
            phoneNumber: that.data.releaseInfo.phone 
          });

          wx.setClipboardData({
            data: that.data.releaseInfo.phone ,
            success: function (res) {
              wx.showModal({
                title: '复制成功!',
                showCancel: false 
              });
            }
          })
        } 
      }
    });
  },
  
  //输入评论内容事件
  bindKeyInput: function (e) {
    this.setData({  inputValue: e.detail.value  });
  },

  //发送模板消息
  webStoketReq: function (res, frmid) {
    var that = this;
    console.log(res);
    //1.获取 access_token
    var url = app.config.login_sys + 'cgi-bin/token';
    //参数
    var data = {
      grant_type: 'client_credential',
      appid: app.globalData.appid,
      secret: app.globalData.secret
    };
    //发送请求
    app.request.reqGet(url,data,function(res2){
      //2.发送模板消息
      //2.发送模板消息
      url = app.config.login_sys + 'cgi-bin/message/wxopen/template/send?access_token=' + res2.data.access_token;
      //请求头
      var header = {
        'content-type': 'application/json'
      };
      //参数
      data = {
        touser: wx.getStorageSync('openid'),                          //微信用户openid
        template_id: 'aZ_627zngL3YznnN3FfNUGKtNWn5yw4bZUIoxv_gDto',   //模板id
        page: 'pages/index/index',                                    //跳转的页面
        form_id: frmid,
        data: {
          "keyword1": {
            "value": that.data.releaseInfo.title,
            "color": "#173177"
          },
          "keyword2": {
            "value": res.neiro,
            "color": "#173177"
          },
          "keyword3": {
            "value": res.name,
            "color": "#173177"
          },
          "keyword4": {
            "value": app.getDateTime(),
            "color": "#173177"
          }
        }//'模板内容'，
      };
      //发送请求
      app.request.reqPost(url,header,data,function(res){
        console.log(res);
      })
    });
  },

  //评论,发送评论
  submitTo: function (e) {
    var that = this;
    if (app.checkInput(that.data.inputValue)) {
      wx.showToast({ title: '不能为空!', icon: 'toast', duration: 1000 });//提示
      return;
    }

    //获取评论人
    var user = wx.getStorageSync("user");
    var url = app.config.basePath_web + "api/exe/save";
    //请求头
    var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'commentinfo',
        scriptName: 'Query',
        cudScriptName: 'Save',
        nameSpaceMap: {
          rows: [{
            avatarUrl: user.avatarUrl,                        //头像
            releaseId: that.data.releaseId,                   //发布信息id
            personalId: wx.getStorageSync("personalId"),      //个人id
            commentContent: that.data.inputValue,             //评论内容
            remark: user.cnName,                              //名称
          }]
        }
      })
    };
    app.request.reqPost(url,header,data,function(res){
      //初始化设置
      that.setData({ inputValue: '' });
      wx.showToast({ title: '评论成功!', icon: 'toast', duration: 1000 });//提示
      //参数
      that.data.notifyname = user.cnName;
      that.data.content = "我评论了你的项目：‘" + res.data.rows[0].commentContent; + "'";
      that.data.ntype = 1;            //通知类型 0=系统，1=其他
      that.data.avatarUrl = user.avatarUrl;

      //设置通知
      that.setNotice(that);
      //获取评论信息
      that.conmmentGetData(that);
    });
  },

  //回复
  commentHuiFu: function (e) {
    var that=this;
    that.setData({
      inputHf: true,
      commentinfoId: e.currentTarget.dataset.commentinfoid,//评论id
      replypersonalId: e.currentTarget.dataset.replypersonalid,//评论者id
      inputHfName: e.currentTarget.dataset.name,    //回复谁的名称
    });
  },

  //添加跳回复信息
  setReplyInfo:function(e){
    var that=this;

    //添加一条回复纪录
    var url = app.config.basePath_web + "api/exe/save";
    //请求头
    var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var releaseId = that.data.releaseId;  //发布信息id
    var commentinfoId = that.data.commentinfoId; //评论id
    var replypersonalId = that.data.replypersonalId;//评论者id
    var content = '回复 ' + that.data.inputHfName + ":" + that.data.inputValue;//回复内容
    //获取评论人
    var user = wx.getStorageSync("user");
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'reply', //回复表
        scriptName: 'Query',
        cudScriptName: 'Save',
        nameSpaceMap: {
          rows: [{
            commentinfoId: commentinfoId,       //评论信息id
            releaseId: releaseId,               //发布信息id
            personalId: wx.getStorageSync("personalId"),//回复者id
            personalName: user.cnName,          //回复者名称
            avatarUrl: user.avatarUrl,          //头像
            content: content,                   //回复内容
            replypersonalId: replypersonalId,   //回复谁的id
          }]
        }
      })
    };
    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      //初始化
      that.setData({ inputHf: false, inputValue: '' });
      console.log(res);
      wx.showToast({ title: '已回复!', icon: 'toast', duration: 1000 });//提示

      //参数
      that.data.notifyname = user.cnName;
      that.data.content = content;
      that.data.ntype = 1;            //通知类型 0=系统，1=其他
      that.data.avatarUrl = user.avatarUrl;

      //设置通知
      that.setNotice(that);
      //获取评论信息
      that.conmmentGetData(that);
    });
  },

  //举报其他
  otherReport:function(e){
    var that = this;
    var reportTypeId = e.currentTarget.dataset.jbname;    //举报类型
    that.setData({jb: false});    //关闭举报
    var data = JSON.stringify({
      releaseId: that.data.releaseId,
      personalId: wx.getStorageSync('personalId'),
      reportTypeId: reportTypeId
    });
    
    //跳转
    wx.navigateTo({
      url: "/pages/index/info/report/report?data="+data
    });
  },
  
  //加载页面
  onLoad: function (options) {
    var that = this;
    //设置全局参数
    that.setData({
      releaseId: options.releaseId,         //发布信息id
      personalId: options.personalId,       //发布者id
      activeIndex: options.activeIndex != null ? options.activeIndex:0,
    });

    //获取发布相关信息
    that.requestData(that);
    //获取个人信息
    that.personalGetData(that);
    //获取评论信息
    that.conmmentGetData(that);
    //获取访问时间
    that.getAccesstime(that);
    //获取是否已经收藏
    that.getIsSC(that);
    //获取发布人发布信息数量
    that.getReleaseInfoNumber(that);

    //初始化tabs
    var sliderWidth=80;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  //咨询
  bindtapConsultation:function(e){
    this.setData({
      activeIndex:1,
      sliderOffset:188,
    });
  },

  //私信
  privateLetter:function(that){
    //首先验证通知是否存在
    var url = app.config.basePath_sys + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'notice',
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            personalId: that.data.personalId,         //接收者id
            releaseId: that.data.releaseId,           //发布信息id
          }]
        }
      })
    };
    //发送请求
    app.request.reqPost(url, header, data, function (res) {
      console.log("获取通知:");
      console.log(res);
    });
  },
  
  //设置通知
  setNotice: function (that){
    var url = app.config.basePath_web + "api/exe/save";
    //请求头
    var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'notice',
        scriptName: 'Query',
        cudScriptName: 'Save',
        nameSpaceMap: {
          rows: [{
            personalId: that.data.personalId,         //接收者id
            releaseId: that.data.releaseId,           //发布信息id
            imgUrl: that.data.imageArray[0],          //发布信息对应的图片
            ntype: that.data.ntype,                   //通知类型 0=系统,1=留言,2=私信',
            content: that.data.content,               //通知内容
            tile: that.data.tile,                     //通知标题
            creator: wx.getStorageSync("personalId"), //通知者
            notifyname: that.data.notifyname,         //通知者名称
            avatarUrl: that.data.avatarUrl            //头像
          }]
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      console.log("发送通知:");
      console.log(res);
    });
  },

  //获取发布人发布信息数量
  getReleaseInfoNumber:function(that){
    var url = app.config.basePath_web + "api/plug/get";
    //请求头
    var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'numBer',
        scriptName: 'com.dahuo.plugin.impl.PostsPlugin',
        nameSpaceMap: {
          rows: [{
            id: that.data.personalId    //发布者id
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      //得到数据
      that.setData({ numBer: res.data.rows, });
    });
  },

  //获取是否已经收藏
  getIsSC:function(that){
    //请求获取数据,收藏夹
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'collectioninfo',       //收藏夹表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            static: 0,
            personalId: wx.getStorageSync("personalId"),    //个人id
            releaseId: that.data.releaseId                  //发布信息id
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      console.log("获取是否已经收藏：");
      console.log(res);
      //得到数据
      var list = res.data.rows;
      if (list.length != 0) {
        //设置收藏，已收藏
        that.setData({ sc: 2,scid:list[0].id });
      } else {
        //设置收藏,未收藏
        that.setData({ sc: 1, });
      }
    });
  },
  
  //获取访问时间,阅览量
  getAccesstime:function(that){
    var url = app.config.basePath_web + "api/plug/save";
    //请求头
    var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: "previewinformation",
        scriptName: "com.dahuo.plugin.impl.PreviewinformationPlugin",
        nameSpaceMap: {
          rows: [{
            id: wx.getStorageSync("personalId"),         //用户id
            releaseId: that.data.releaseId,      //发布id
          }]
        }
      })
    };

    //发送请求
    app.request.reqPost(url,header,data,function(res){
      var row = res.data.rows;
      if (row != null) {
        var mdate;
        if (app.checkInput(row.mdate)) {
          mdate = "正在查看";
        } else {
          mdate = that.getDate(row.mdate);
        }
        var previewinCount = row.previewinCount*3;
        that.setData({ strTime: mdate, previewinCount: previewinCount });
      }
    });
  },

  //获取评论信息
  conmmentGetData: function (that){
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'commentinfo',       //发布信息表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            releaseId: that.data.releaseId    //发布id
          }],
        }
      })
    };

    //发送请求
    app.request.reqPost(url,header,data,function(res){
      var row = res.data.rows;
      if(row==null) return;
      var commNumber=row.length;
      for (var j = 0; j < row.length; ++j) {
        //得到回复信息
        getReply(row[j].id,j);
        row[j].cdate = that.getDate(row[j].cdate) + "评论";
      }


      //获取该评论的回复信息
      function getReply(id,j){
        var url = app.config.basePath_web + "api/exe/get";
        //请求头
        var header = { cookie: wx.getStorageSync('cookie'), "Content-Type": "application/x-www-form-urlencoded" };
        //参数
        var data = {
          timeStamp: wx.getStorageSync('time'),
          token: wx.getStorageSync('token'),
          reqJson: JSON.stringify({
            nameSpace: 'reply',       //回复表
            scriptName: 'Query',
            nameSpaceMap: {
              rows: [{
                commentinfoId: id    //评论id
              }],
            }
          })
        };
        //发送请求
        app.request.reqPost(url, header, data, function (res2) {
          var row2 = res2.data.rows;
          if (row2 == null) return;
          commNumber+=row2.length;
          for (var i = 0; i < row2.length; ++i) {
            row2[i].cdate = that.getDate(row2[i].cdate) + "回复";
          }
          //设置回复信息
          row[j].replyList=row2;
          //row.reverse();
          that.setData({ allContentList: row, commNumber: commNumber});
        });
      }
    });
  },

  //获取个人信息
  personalGetData: function (that) {
    var url = app.config.basePath_sys + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync("time"),
      token: wx.getStorageSync("token"),
      reqJson: JSON.stringify({
        nameSpace: 'sys_userinfo',       //个人信息表
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            id: that.data.personalId    //个人资料id
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      that.setData({ userinfo: res.data.rows[0] });
    });
  },

  //获取时间差
  getDate: function (date) {
    var date1 = new Date(date);                    //开始时间
    var date2 = new Date();                        //结束时间
    var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数

    //计算出相差年
    //还有一个小bug，当事件差为负数时，值为负数，将上面leftsecond代码改一下
    //var leftsecond = parseInt(Math.abs((date2.getTime() - date1.getTime())) / 1000);

    //计算出相差月
    var months = (date2.getFullYear() - date1.getFullYear()) * 12;
    if (months != 0) {
      return months + "月前";
    }

    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    if (days != 0) {
      return days + "天前";
    }

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    if (hours != 0) {
      return hours + "小时前";
    }

    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    if (minutes != 0) {
      return minutes + "分钟前";
    }

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);     //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    if (seconds != 0) {
      return "刚刚来过";
    }
  },

  //请求获取数据,发布信息
  requestData: function (that) {
    var url = app.config.basePath_web + "api/exe/get";
    //请求头
    var header = { cookie: wx.getStorageSync("cookie"), "Content-Type": "application/x-www-form-urlencoded" };
    //参数
    var data = {
      timeStamp: wx.getStorageSync('time'),
      token: wx.getStorageSync('token'),
      reqJson: JSON.stringify({
        nameSpace: 'releaseinfo',
        scriptName: 'Query',
        nameSpaceMap: {
          rows: [{
            id: that.data.releaseId    //发布信息id
          }],
        }
      })
    };
    //发送请求
    app.request.reqPost(url,header,data,function(res){
      //得到数据
      var list = res.data.rows;
      if (list.length == null) return;

      //取详细信息的描述
      var info = list[0];
      var length = 0;
      var userAn = true;

      if (info.personalId == wx.getStorageSync("personalId")) {
        userAn = false;
      }

      //判断
      if (info != null) {
        if (info.projectDescription != null) {
          length = info.projectDescription.length;
        }
        else if (info.businessDescription != null) {
          length = info.businessDescription.length;
        }
        else length = info.incomeDescription.length;
      }
      var strTime = that.getDate(info.cdate);
      info.cdate = strTime;
      if (info.imageArray != null) {
        var imageArray = info.imageArray.split(",");
        for (var k = 0; k < imageArray.length; ++k) {
          imageArray[k] = __config.domainImage + imageArray[k];
        }
      }
      //设置值
      that.setData({
        length: length > 90 ? true : false,
        releaseInfo: info,
        imageArray: imageArray,
        imgPass: imageArray,
        userAn: userAn
      });
    });
  },
  
  //用户下拉动作
  onPullDownRefresh: function () {
    var that=this;
    //获取发布相关信息
    that.requestData(that);
    //获取个人信息
    that.personalGetData(that);
    //获取评论信息
    that.conmmentGetData(that);
    //获取访问时间
    that.getAccesstime(that);
    //获取是否已经收藏
    that.getIsSC(that);
    //获取发布人发布信息数量
    that.getReleaseInfoNumber(that);
    //下拉完成后执行回退
    wx.stopPullDownRefresh();
  },

  //页面显示的时候执行
  onShow:function(){
    //判断cookie
    var cookie = wx.getStorageSync('cookie');
    if (app.checkInput(cookie)) {
      wx.redirectTo({
        url: '/pages/wxUserinfoLogin/wxUserinfoLogin',
      });
      return;
    }
  },

  //转发，分享
  onShareAppMessage:function (e){
    return {
      title: '搭伙-邀请全城一起来发布生意',
      desc: '同城生意人必备神器!',
      path: '/pages/index/info/info?releaseId=' + this.data.releaseId + "&personalId=" + this.data.personalId,
    }
  },
});