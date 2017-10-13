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
    tabs: ["项目细节", "问问看"],    //tab
    activeIndex: 0,                //tab切换索引
    sliderOffset: 0,               //x坐标    
    sliderLeft: 0,                 //y坐标
    inputValue: '',                //评论文本框的值
    allContentList: [],            //评论内容
    jb:false,                      //控制举报显示
    sc:1,                          //控制收藏图标
    inputHF:false,                 //回复文本框是否显示
    inputHfName:'',                //回复名称
    releaseId:'',                  //发布信息id
    personalId:'',                 //个人资料id
    strTime:'刚刚来过',             //最新访问日期
    numBer:1,                      //发布帖子数量
    releaseInfo:null,              //发布信息，单个
    length:null,                   //信息描述     
    userAn:true,                 //是否是自己的项目    
  },

  //预览
  previewImage: function (e) {
    var that=this;
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: that.data.imgPass // 需要预览的图片http链接列表
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
          //删除通知
          that.neticeDelete(that);
        }
      }
    });
  },

  //删除评论
  neticeDelete: function (that) {
    //发送请求
    wx.request({
      url: __config.basePath_web + "api/exe/save",
      method: "POST",
      header: { cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: that.data.time,
        token: that.data.token,
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
      },
      success: function (res) {
        var allContentList = that.data.allContentList;
        var index = that.data.index;
        allContentList.splice(index, 1);
        that.setData({
          allContentList: allContentList
        });
      },
      fail: function (res) { },
      complete: function () { }
    });
  },

  //收藏,添加收藏
  bindtapSC:function(e){
    var that =this;
    //请求更新
    reqSetData();

    //设置收藏
    function reqSetData() {
      wx.request({
        url: __config.basePath_web+"api/exe/get",
        method: "POST",
        header: {  cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          timeStamp: that.data.time,
          token: that.data.token,
          reqJson: JSON.stringify({
            nameSpace: 'collectioninfo',
            scriptName: 'Query',
            nameSpaceMap: {
              rows: [{
                releaseId: that.data.releaseId,     //发布信息id
                personalId: wx.getStorageSync("personalId")    //个人资料id
              }]
            }
          })
        },
        success: function (res) {
          if(res.data.rows.length !=0 ){
            that.setData({
              id: res.data.rows[0].id,
              df: 1,
            });
            reqCloseData(that);

            //获取用户
            var user = wx.getStorageSync("user");
            var userName = user.cnName;
            //参数
            that.data.notifyname=userName;
            that.data.content ="我取消收藏你的项目。";
            that.data.tile="";
            that.data.ntype=3;
            that.data.avatarUrl = user.avatarUrl;
            //设置通知
            that.setNotice(that);
          }else{
            that.setData({
              df: 0,
            });
            reqCloseData(that);

            //获取用户
            var user = wx.getStorageSync("user");
            var userName = user.cnName;
            //参数
            that.data.notifyname = userName;
            that.data.content = "我收藏了你的项目。";
            that.data.tile = "";
            that.data.ntype = 3;
            that.data.avatarUrl = user.avatarUrl;
            //设置通知
            that.setNotice(that);
          }
        },
        fail: function (res) {},
        complete: function () {}
      });
    }
    
    //取消收藏
    function reqCloseData(that) {
      wx.request({
        url: __config.basePath_web + "api/exe/save",
        method: "POST",
        header: { cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          timeStamp: that.data.time,
          token: that.data.token,
          reqJson: JSON.stringify({
            nameSpace: 'collectioninfo',
            scriptName: 'Query',
            cudScriptName: 'Save',
            nameSpaceMap: {
              rows: [{
                id: that.data.id,
                df: that.data.df,
                releaseId: that.data.releaseId,     //发布信息id
                personalId: wx.getStorageSync("personalId")    //个人资料id
              }]
            }
          })
        },
        success: function (res) {
          if (res.data.rows.length != 0) {
            if (res.data.rows[0].df == 0){
              that.setData({ sc: 2, });//设置收藏
              wx.showToast({ title: '已收藏!', icon: 'toast', duration: 1000 });//提示
            }else{
              that.setData({ sc: 1, });//设置收藏
              wx.showToast({ title: '已取消收藏!', icon: 'toast', duration: 1000 });//提示
            }
          }
        },
        fail: function (res) { },
        complete: function () { }
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
    function reqSetData() {
      wx.request({
        url: __config.basePath_web + "api/exe/save",
        method: "POST",
        header: {  cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          timeStamp: that.data.time,
          token: that.data.token,
          reqJson: JSON.stringify({
            nameSpace: 'reportinfo',
            scriptName: 'Query',
            cudScriptName: 'Save',
            nameSpaceMap: {
              rows: [{
                releaseId: that.data.releaseId,        //发布信息id
                personalId: that.data.personalId,      //个人id   
                reportTypeId: reportTypeId             //举报类型
              }]
            }
          })
        },
        success: function (res) {
          that.setData({  jb:  false  }); //关闭举报
          wx.showToast({ title: '举报成功!', icon: 'loading', duration: 3000 });//提示
        },
        fail: function (res) {},
        complete: function () {}
      });
    }
  },

  //查看全文
  bindtapSelectInfo: function () {
    var that=this;
    that.setData({  bl: that.data.bl == true ? false : true   });
  },

  //tab切换,切换索引
  tabClick: function (e) {
    this.setData({ sliderOffset: e.currentTarget.offsetLeft, activeIndex: e.currentTarget.id    });
  },

  //拨打电话
  bindtapPhone: function () {
    var that=this;
    wx.showModal({
      title: '拨打电话',
      content: '是否拨打？' + that.data.releaseInfo.phone ,
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: that.data.releaseInfo.phone //仅为示例，并非真实的电话号码
          });
        } 
      }
    });
  },
  
  //发送信息,复制电话号码
  bindtagFasho: function () {
    var that=this;
    //复制电话号码
    wx.showModal({
      title: '复制电话号码',
      content: '复制电话号码？' + that.data.releaseInfo.phone,
      confirmText: "复制",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          //剪贴板
          wx.setClipboardData({
            data: that.data.releaseInfo.phone,
            success: function (res) {
              wx.showToast({ title: '复制成功!', icon: 'ok', duration: 1000 }); //提示
            },
            fail:function(res){}
          });
        } 
      }
    });
  },

  //输入评论内容事件
  bindKeyInput: function (e) {
    this.setData({  inputValue: e.detail.value  });
  },

  //评论,发送评论
  submitTo: function (e) {
    var that = this;
    //获取评论人
    var user = wx.getStorageSync("user");
    var userName = user.cnName;
    //if (that.data.HF != null) userName += that.data.HF;

    //请求更新
    reqSetData();
    function reqSetData() {
      wx.request({
        url: __config.basePath_web + "api/exe/save",
        method: "POST",
        header: { cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          timeStamp: that.data.time,
          token: that.data.token,
          reqJson: JSON.stringify({
            nameSpace: 'commentinfo',
            scriptName: 'Query',
            cudScriptName: 'Save',
            nameSpaceMap: {
              rows: [{
                avatarUrl: user.avatarUrl,                        //头像
                releaseId: that.data.releaseId,                   //发布信息id
                personalId: that.data.personalId,                 //个人id
                commentContent: that.data.inputValue,             //评论内容
                remark: userName,                                 //名称
              }]
            }
          })
        },
        success: function (res) {
          if (that.data.inputHf == true) {
            that.setData({
              inputHf:false,
              inputValue:'',
            });
            wx.showToast({ title: '已回复!', icon: 'toast', duration: 1000 });//提示
            //参数
            that.data.notifyname = userName;
            that.data.content = that.data.inputValue;
            that.data.tile = "";
            that.data.ntype = 2;
            that.data.avatarUrl = user.avatarUrl;
            

            //设置通知
            that.setNotice(that);
          }else{
            wx.showToast({ title: '评论成功!', icon: 'toast', duration: 1000 });//提示
            that.setData({
              inputValue: '',
            });
            //参数
            that.data.notifyname = userName;
            that.data.content = "我评论了你的项目：‘" + that.data.inputValue+"'";
            that.data.tile = "";
            that.data.ntype = 1;
            that.data.avatarUrl = user.avatarUrl;
            //设置通知
            that.setNotice(that);
          }
          //获取评论信息
          that.conmmentGetData(that);
        },
        fail: function (res) {},
        complete: function () {}
      });
    }
  },

  //回复
  commentHuiFu: function (e) {
    this.setData({
      inputHf: true,
      inputHfName: e.currentTarget.dataset.name,
      inputValue: '回复@'+e.currentTarget.dataset.name+':',
      HF: '回复@' + e.currentTarget.dataset.name
    });
  },

  //举报其他
  otherReport:function(e){
    var that = this;
    var reportTypeId = e.currentTarget.dataset.jbname;    //举报类型
    that.setData({jb: false});    //关闭举报
    //跳转
    wx.navigateTo({
      url: "/pages/index/info/report/report?releaseId=" + that.data.releaseId + "&personalId=" + that.data.personalId + "&reportTypeId=" + reportTypeId,
    });
  },
  
  //加载页面
  onLoad: function (options) {
    var that = this;
    //必要参数
    var cookie = wx.getStorageSync("cookie");
    var time = new Date().getTime();
    var token = utilMd5.hexMD5(app.globalData.token + time.toString()).toUpperCase();

    //设置全局参数
    that.setData({
      releaseId: options.releaseId,         //发布信息id
      personalId: options.personalId,       //个人id
      cookie: cookie,                       //请求cookie
      time:time,                            //请求时间
      token:token                           //请求token
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
  
  /**
   * 设置通知
   * that           当前页面对象
   */
  setNotice: function (that){
    //发送请求
    wx.request({
      url: __config.basePath_web + "api/exe/save",
      method: "POST",
      header: { cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: that.data.time,
        token: that.data.token,
        reqJson: JSON.stringify({
          nameSpace: 'notice',
          scriptName: 'Query',
          cudScriptName: 'Save',
          nameSpaceMap: {
            rows: [{
              personalId: that.data.personalId,         //接收者id
              releaseId: that.data.releaseId,           //发布信息id
              imgUrl: that.data.imageArray[0],          //发布信息对应的图片
              ntype: that.data.ntype,                   //通知类型 0=系统,1=评论，2=回复,3=收藏，4=审核，5=..',
              content: that.data.content,               //通知内容
              tile: that.data.tile,                     //通知标题
              creator: wx.getStorageSync("personalId"), //通知者
              notifyname: that.data.notifyname,        //通知者名称
              avatarUrl: that.data.avatarUrl          //头像
            }]
          }
        })
      },
      //请求成功
      success: function (res) {
        var row = res.data.rows;

      },
      fail: function (res) { },
      complete: function () { }
    });
  },

  //获取发布人发布信息数量
  getReleaseInfoNumber:function(that){
    //请求获取数据
    wx.request({
      url: __config.basePath_web + "api/exe/get",
      method: "POST",
      header: { cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: that.data.time,
        token: that.data.token,
        reqJson: JSON.stringify({
          nameSpace: 'releaseinfo',
          scriptName: 'Query',
          nameSpaceMap: {
            pageable:0,
            rows: [{
              df: 0,
              personalId: that.data.personalId    //发布信息id
            }],
          }
        })
      },
      success: function (res) {
        if (res.statusCode == 408) {
          wx.showToast({
            title: "会话已过期，请重新登录！",
            icon: 'loading',
            duration: 2000,
          });

          wx.redirectTo({
            url: '/pages/wxUserinfoLogin/wxUserinfoLogin',
          });
          return;
        }
        //得到数据
        var list = res.data.rows;
        if (list.length != 0) {
          //设置帖子数量
          that.setData({ numBer: list.length, });
        }
      },
      fail: function (res) {},
      complete: function () {}
    });
  },

  //获取是否已经收藏
  getIsSC:function(that){
    //请求获取数据,收藏夹
    wx.request({
      url: __config.basePath_web + "api/exe/get",
      method: "POST",
      header: { cookie: that.data.cookie, "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: that.data.time,
        token: that.data.token,
        reqJson: JSON.stringify({
          nameSpace: 'collectioninfo',       //收藏夹表
          scriptName: 'Query',
          nameSpaceMap: {
            rows: [{
              df: 0,
              personalId: wx.getStorageSync("personalId"),    //个人资料id
              releaseId: that.data.releaseId                  //发布信息id
            }],
          }
        })
      },
      success: function (res) {
        //得到数据
        var list = res.data.rows;
        if(list.length != 0){
          //设置收藏
          that.setData({ sc: 2, });
        }else{
          //设置收藏
          that.setData({ sc: 1, });
        }
      },
      fail: function (res) { },
      complete: function () { }
    });
  },
  
  //获取访问时间,阅览量
  getAccesstime:function(that){
    //发送请求
    wx.request({
      url: __config.basePath_web + "api/plug/save",
      method: "POST",
      header: {cookie: that.data.cookie,"Content-Type": "application/x-www-form-urlencoded" },
      data: {
        timeStamp: that.data.time,
        token: that.data.token,
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
      },
      //请求成功
      success: function (res) {
        var row=res.data.rows;
        if (row != null){
          var mdate;
          if (app.checkInput(row.mdate)){
            mdate="正在查看";
          }else{
            mdate=that.getDate(row.mdate);
          }
          that.setData({ strTime: mdate, previewinCount: row.previewinCount });
        }
      },
      fail: function (res) { },
      complete: function () { }
    });
  },

  //获取评论信息
  conmmentGetData: function (that){
    //发送请求
    wx.request({
      url: __config.basePath_web + "api/exe/get",
      method: "POST",
      header: { cookie: that.data.cookie,"Content-Type": "application/x-www-form-urlencoded"},
      data: {
        timeStamp: that.data.time,
        token: that.data.token,
        reqJson: JSON.stringify({
          nameSpace: 'commentinfo',       //发布信息表
          scriptName: 'Query',
          nameSpaceMap: {
            rows: [{
              releaseId: that.data.releaseId    //发布id
            }],
          }
        })
      },
      success: function (res) {   //请求成功
        var row = res.data.rows;
        for(var i=0;i<row.length;++i){
          row[i].cdate=that.getDate(row[i].cdate)+"评论";
        }
        //row.reverse();
        that.setData({ allContentList: row });
      },
      fail: function (res) {},
      complete: function () {}
    });
  },

  //获取个人信息
  personalGetData: function (that) {
    //设置请求参数获取数据,默认0第一页
    var data = {
      timeStamp: that.data.time,
      token: that.data.token,
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
    that.setData({  data: data });

    //发送请求
    this.requestDataPersonal(that);
  },

  //请求获取数据,个人信息
  requestDataPersonal: function (that) {
    wx.request({
      url: __config.basePath_sys + "api/exe/get",
      method: "POST",
      header: {cookie: that.data.cookie,"Content-Type": "application/x-www-form-urlencoded"},
      data: that.data.data,
      success: function (res) {   //请求成功
        if (res.statusCode == 408) {
          wx.showToast({
            title: "会话已过期，请重新登录！",
            icon: 'loading',
            duration: 2000,
            success:function(res){
              wx.redirectTo({
                url: '/pages/wxUserinfoLogin/wxUserinfoLogin',
              });
              return;
            }
          });
        }
        that.setData({ userinfo: res.data.rows[0]});
      },
      fail: function (res) {},
      complete: function () {}
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
    //请求获取发布信息,
    wx.request({
      url: __config.basePath_web + "api/exe/get",
      method: "POST",
      header: {cookie: that.data.cookie,"Content-Type": "application/x-www-form-urlencoded"},
      data: {
        timeStamp: that.data.time,
        token: that.data.token,
        reqJson: JSON.stringify({
          nameSpace: 'releaseinfo',
          scriptName: 'Query',
          nameSpaceMap: {
            rows: [{
              id: that.data.releaseId    //发布信息id
            }],
          }
        })
      },
      success: function (res) {
        //得到数据
        var list = res.data.rows;
        if(list.length == null) return;

        //取详细信息的描述
        var info = list[0];
        var length = 0;
        var userAn=true;

        if (info.personalId == wx.getStorageSync("personalId")){
          userAn=false;
        }

        //判断
        if (info != null) {
          if (info.projectDescription != null) length = info.projectDescription.length;
          else if (info.businessDescription != null) length = info.businessDescription.length;
          else length = info.incomeDescription.length;
        }
        var strTime = that.getDate(info.cdate);
        info.cdate = strTime;
        if (info.imageArray!=null){
          var imageArray=info.imageArray.split(",");
          for(var k=0;k<imageArray.length;++k){
            imageArray[k] = __config.domainImage+imageArray[k];
          }
        }
        //设置值
        that.setData({
          length: length>90?true:false,
          releaseInfo: info,
          imageArray: imageArray,
          imgPass: imageArray ,
          userAn: userAn
        });
      },
      fail: function (res) {},
      complete: function () {}
    });
  },
  
  /**
* 页面相关事件处理函数--监听用户下拉动作
*/
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

  //转发，分享
  onShareAppMessage:function (e){
    return {
      title: '搭伙',
      desc: '同城生意人必备神器!',
      path: '/pages/index/info/info?releaseId=' + this.data.releaseId + "&personalId=" + this.data.personalId,
    }
  },
});