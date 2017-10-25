# 微信小程序-搭伙
# 归属公司： 贵州合丰力科技有限公司
# 时间日期： 2017-7-6


## 1.项目说明：
- 基于微信小程序开发的一款信息服务平台(搭伙)
- 基于 weui.wxss、es6 前端技术开发
- 项目下载地址https://github.com/lingfe/dahuo_xcx
- 开发者: 零风

## 2.目录结构：
m-mall/
  |-assets/                     # 静态文件
      |- images/                   # 公共图片图片
      |- plugins/                  # 插件
        |- request.js                 # 请求的封装
        |- ..
      |- style/                    # 公共样式
      |- ..
  |-config/                     # 配置文件
      |- config.js                 # 常用配置
      |- ..
  |-helpers/                    # 帮助文件
      |- components.js             # 默认资源
      |- dahuoData.js              # 搭伙数据
      |- ..
  |-utils/                      # 工具包
      |- md5.js                    # md5加密
      |- service.js                # 定位工具
      |- util.js                   # 初始工具
      |- WxValidate.js             # 表单验证工具 
      |- ..
  |-pages/                      # 小程序页面相关文件
      |- login                    # 登录页面
      |- logs                     # 小程序日志信息
      |- index/                   # 首页
        |- info/                    # 发布信息详细页面
          |- report                   # 举报页面
          |- visitFriends             # 查看搭友页面
          |- ..
        |- release/                 # 发布类型页面
          |- affilliateStores         # 加盟分店
          |- businessTransfer         # 生意转让
          |- derivativeAgent          # 微商代理
          |- financialManagement      # 金融理财
          |- ganguSatisfiedBefore     # 干股纳才
          |- propertyInvestment       # 房产投资
          |- partnership              # 合伙创业
          |- other                    # 其他
          |- ..
        |- ..
      |- personal/                 # 个人页面
        |- personalData             # 个人资料页面
        |- ..
      |- dahuo/                    # 搭伙小程序公共页面
        |- industryChoice           # 行业选择页面
        |- indexCity                # 首页地址选择
        |- releaseRul               # 信息发布规则
        |- useProtocol              # 用户使用说明
        |- ..
      |- message/                  # 通知页面
        |- chat                     # 聊天页面
        |- search                   # 搭伙小秘书页面
        |- ..
      |- ..
  |- app.js                      # 小程序逻辑
  |- app.json                    # 小程序公共设置
  |- app.wxss                    # 小程序公共样式表
  |- ..

## 3.项目截图

## 4.贡献
有任何意见或建议都欢迎提 issue

## 5.其他