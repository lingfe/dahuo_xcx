/**  
 *   作者:  lingfe 
 *   时间:  2017-7-7
 *   描述:  发布页面
 * 
 * */

Page({

  //合伙创业
  bindtapPartnership:function(){
    wx.navigateTo({
      url: '/pages/index/release/partnership/partnership',
    });
  },
  //生意转让
  bindtapBusinessTransfer:function(){
    wx.navigateTo({
      url: '/pages/index/release/businessTransfer/businessTransfer',
    })
  },
  //加盟分店
  bindtapAffiliateStores:function(){
    wx.navigateTo({
      url: '/pages/index/release/affiliateStores/affiliateStores',
    })
  },
  //干股纳才
  bindtapGanguSatisfiedBefore:function(){
    wx.navigateTo({
      url: '/pages/index/release/ganguSatisfiedBefore/ganguSatisfiedBefore',
    })
  },
  //金融理财
  bindtapFinancialManagement:function(){
    wx.navigateTo({
      url: '/pages/index/release/financialManagement/financialManagement',
    })
  },
  //房产投资
  bindtapPropertyInvestment:function(){
    wx.navigateTo({
      url: '/pages/index/release/propertyInvestment/propertyInvestment',
    })
  },
  //微商代理
  bindtapDerivativeAgent:function(){
    wx.navigateTo({
      url: '/pages/index/release/derivativeAgent/derivativeAgent',
    });
  },
  //其他
  bindtapOther:function(){
    wx.navigateTo({
      url: '/pages/index/release/other/other',
    })
  }
});