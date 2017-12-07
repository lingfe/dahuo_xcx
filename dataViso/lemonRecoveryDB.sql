/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.6.37 : Database - ningmeng
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ningmeng` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `ningmeng`;

/*Table structure for table `applyOldclothes` */

DROP TABLE IF EXISTS `applyOldclothes`;

CREATE TABLE `applyOldclothes` (
  `id` varchar(32) NOT NULL COMMENT '申领旧衣表id标识',
  `personalId` varchar(255) NOT NULL COMMENT '用户id',
  `contactPeople` varchar(255) NOT NULL COMMENT '联系人',
  `phone` varchar(255) NOT NULL COMMENT '联系电话',
  `adressInfo` varchar(255) NOT NULL COMMENT '详细地址',
  `applyReason` varchar(255) NOT NULL COMMENT '申请原因',
  `demandExplain` varchar(255) NOT NULL COMMENT '需求说明',
  `state` int(11) DEFAULT '0' COMMENT '申领旧衣状态,0..',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `uman` varchar(32) DEFAULT NULL COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `applyOldclothes` */

LOCK TABLES `applyOldclothes` WRITE;

insert  into `applyOldclothes`(`id`,`personalId`,`contactPeople`,`phone`,`adressInfo`,`applyReason`,`demandExplain`,`state`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`) values ('1438ece7b72948969db8a04695a171b6','20029ae4dd50400a88a7771eb95ac82e','xzczxczxc','zxczxczxczx','zxczxczxc','xczxczxc','xczxczxcz',0,'2017-11-13 16:34:45','2017-11-13 16:34:45','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0),('2c1b35b946f84ad6a5c9d05d6dffaf28','20029ae4dd50400a88a7771eb95ac82e','xzczxczxc','zxczxczxczx','zxczxczxc','xczxczxc','xczxczxcz',0,'2017-11-13 16:29:51','2017-11-13 16:29:51','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0);

UNLOCK TABLES;

/*Table structure for table `collectorTab` */

DROP TABLE IF EXISTS `collectorTab`;

CREATE TABLE `collectorTab` (
  `id` varchar(32) NOT NULL COMMENT '回收员表id标识',
  `codeing` varchar(32) DEFAULT NULL COMMENT '编号，密匙',
  `codeName` varchar(255) DEFAULT NULL COMMENT '名称',
  `imgUrl` varchar(255) DEFAULT NULL COMMENT '头像地址',
  `state` int(11) DEFAULT '0' COMMENT '状态,1=正常',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `uman` varchar(32) DEFAULT NULL COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `collectorTab` */

LOCK TABLES `collectorTab` WRITE;

insert  into `collectorTab`(`id`,`codeing`,`codeName`,`imgUrl`,`state`,`remark`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`) values ('f771e4de3ae24d5da9938b33a2d809bb','666','007','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/62c25737c7bc4586858c4e3b1504da56.jpg',0,NULL,'2017-12-04 10:10:55','2017-12-04 10:10:55','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,0);

UNLOCK TABLES;

/*Table structure for table `convertibleCommodity` */

DROP TABLE IF EXISTS `convertibleCommodity`;

CREATE TABLE `convertibleCommodity` (
  `id` varchar(32) NOT NULL COMMENT '可兑换商品表id标识',
  `imgUrl` varchar(255) NOT NULL COMMENT '商品图片',
  `title` varchar(255) NOT NULL COMMENT '商品标题',
  `integral` int(11) NOT NULL COMMENT '积分',
  `surplus` int(11) NOT NULL COMMENT '剩余(件/个/份)',
  `state` int(11) DEFAULT '0' COMMENT '可兑换商品状态,0=正常显示,1=已下架',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `uman` varchar(32) DEFAULT NULL COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `convertibleCommodity` */

LOCK TABLES `convertibleCommodity` WRITE;

insert  into `convertibleCommodity`(`id`,`imgUrl`,`title`,`integral`,`surplus`,`state`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`) values ('042d580d4a7b4b9288ab73c6c0a5532e','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/4bb6454d43014b54a942e9f4d479f6b0.jpg','倍思/安卓/苹果快充数据线',68,94,0,'2017-12-04 11:14:51','2017-12-06 11:10:34','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,3),('14070d39198f4f57ba94ec00dabbd5f1','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171202/539faa2140fc4e779f587848b1a54b7a.jpg','JS超薄充电宝',180,99,0,'2017-12-02 14:10:53','2017-12-06 11:09:28','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,1),('285ede6e24fd42bfb5721af034457b54','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/3d00ea04973c46b9bc86e2467c183407.jpg','混光机械键盘 游戏键盘',360,100,0,'2017-12-04 11:22:42','2017-12-04 18:19:00','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,2),('37a4b7462bb74858b047c416ea8ec524','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/d80b22f08e17401bae68d63cd03fd98b.jpg','HiFi耳机入耳式索尼UiiSii',140,95,0,'2017-12-04 11:27:08','2017-12-06 11:14:37','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,2),('3f05bedd602e4118ba928c999a0e5ce6','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/c9090454456a4c47b60ab679c67c4e96.jpg','富士一次成像相机',600,100,0,'2017-12-04 11:25:26','2017-12-06 11:10:44','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,1),('4f41aa86a7d846728b0e456daf9be97b','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/f3f526d7deaa4dd1ab78ecdc9fc9a700.jpg','联想 15.6英寸游戏笔记本电脑',14000,100,0,'2017-12-04 11:16:04','2017-12-04 18:16:42','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,1),('5260925341b34fbc9a80e2eb4eb6f750','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/066a913b4a2c4c52a48543be9515cf5d.jpg','维达3层140g10卷有芯卷纸',40,89,0,'2017-12-04 11:17:43','2017-12-06 11:10:59','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,3),('53c27894b7da4c98bbfb8b5698c13565','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/2619eee8912b4d6d88998f5ff7ff0147.jpg','家用电磁炉特价智能大功率火锅爆炒电池炉',400,100,0,'2017-12-04 11:19:55','2017-12-04 18:16:54','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,1),('5618481524c649108c3da0025330cba2','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171202/b4d1871f7ade49e0ab8a5da1cd9aa74c.jpg','HiFi耳机入耳式索尼',140,98,0,'2017-12-02 14:15:22','2017-12-06 11:09:56','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,1),('629db94135a9453fa04c5d8e31b13e5c','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/721e7d13961f4179bb8c40054e8670a2.jpg','长虹LED高清液晶电视机',3400,100,0,'2017-12-04 11:16:43','2017-12-06 11:11:27','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,2),('70a696a0518642748dc66bd9d4f0aaac','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/f49b2d66b2d8427c9a56c16d3f02c1a9.jpg','床上四件套（纯棉）',380,100,0,'2017-12-04 11:13:13','2017-12-04 11:13:13','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,0),('766532c59b354fa3b21adc14c0b45307','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/9dcdc9358216416b9254257f4227d8b7.jpg','苏泊尔4L智能家用电饭煲',600,99,0,'2017-12-04 11:19:01','2017-12-06 11:11:57','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,2),('860289c2b96c42d2ae31a5edaedf1409','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/0b20f8ccf5b2454ca40376b03c35b569.jpg','Ted休闲电脑椅',600,100,0,'2017-12-04 11:12:46','2017-12-06 11:12:37','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,1),('90ae5b21264446618adade421431e744','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171202/2cf6097c00ae4f9097ee36a3bc384a90.jpg','手机懒人支架',18,97,0,'2017-12-02 14:09:07','2017-12-06 11:12:59','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,2),('92021838fc54419c8ff3c9cc49be426d','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171202/92c9eba782b04c29b0e7adf0adbe46e5.jpg','SK2精华露神仙水 230ml',1998,100,0,'2017-12-02 14:12:39','2017-12-06 11:12:07','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,2),('9e5ea745ec944864999f185a1fe549cd','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171202/41e3a95a19f545578fe8e67f46f72768.jpg','Meilen智能电子称',150,100,0,'2017-12-02 14:12:00','2017-12-02 14:12:00','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,0),('a6ed5ea28af24f0cb4780ddb25802873','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/bb3536af30d445808506e23ca1eb30f8.jpg','平板电脑air2更新版',5000,100,0,'2017-12-04 11:22:01','2017-12-04 18:18:02','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,1),('b3c5bf4c41414acb97aec6f2c8cb6c5c','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/4fa901611d2148acb8c70c87086cba60.jpg','索尼官方PS4家庭游戏机',4400,100,0,'2017-12-04 11:13:38','2017-12-06 11:13:24','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,1),('cd45f5d41f684da38de414bfe9fa7e84','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/7a18e0a2c5e24710a3f63bc9cad0525b.jpg','小米路由器3C无线家用',200,100,0,'2017-12-04 11:20:49','2017-12-04 18:18:21','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,1),('d4ecc3f66f6f474ca7f6d7a949387578','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/5ddc47c4895749bd932b84e5ac1af7cc.jpg','Wee蓝牙手机游戏手柄',360,100,0,'2017-12-04 11:24:42','2017-12-06 11:13:44','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,2),('d61b50b134b54c9596291973bce04311','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/772328034bf04556a4ab0221861d6d10.jpg','电脑桌台式家用简约现代笔记本简易书桌办公桌子',340,100,0,'2017-12-04 11:28:13','2017-12-04 11:28:13','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,0),('fcb42b0c326e4a90ae6f5cc9bf4b09b5','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171129/6f8dea6e386e4fc88f4847bee08a86f5.jpg_430x430q90.jpg','维达抽纸',5,981,0,'2017-11-29 12:56:52','2017-12-01 16:49:46','873446c281224d238defe4c9b956725d','3a767ea9a4294f25802605de97815747',0,7),('fcd68efab1d448ab81fed95326b9195a','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/8cb9bf9c79954f16a4e166f6fcfa7976.png','海尔机器人',2600,100,0,'2017-12-04 11:12:23','2017-12-04 11:12:23','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,0),('fd52bb32c5664789a150cf53026c6b06','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171204/a5a52d3d02d6404e954890889c238c76.jpg','电子秤称重人体秤精准电子称家用计体重秤',120,100,0,'2017-12-04 11:26:28','2017-12-04 11:26:28','873446c281224d238defe4c9b956725d','873446c281224d238defe4c9b956725d',0,0);

UNLOCK TABLES;

/*Table structure for table `convertibleOrder` */

DROP TABLE IF EXISTS `convertibleOrder`;

CREATE TABLE `convertibleOrder` (
  `id` varchar(32) NOT NULL COMMENT '兑换订单表id标识',
  `personalId` varchar(255) NOT NULL COMMENT '用户id',
  `contactPeople` varchar(255) NOT NULL COMMENT '联系人',
  `phone` varchar(255) NOT NULL COMMENT '联系电话',
  `adressInfo` varchar(255) NOT NULL COMMENT '详细地址',
  `imgUrl` varchar(255) NOT NULL COMMENT '商品图片',
  `title` varchar(255) NOT NULL COMMENT '商品标题',
  `integral` int(11) NOT NULL COMMENT '积分',
  `totalIntegral` int(11) NOT NULL COMMENT '合计积分',
  `number` int(11) NOT NULL COMMENT '兑换数量',
  `state` int(11) DEFAULT '0' COMMENT '兑换订单状态,状态,0=（已下单,未发货）,1=（已发货,未确认),2=(已收货,已确认)',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `uman` varchar(32) DEFAULT NULL COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  `logisticsNumber` varchar(64) DEFAULT NULL COMMENT '物流单号,发货时由管理员填写',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `convertibleOrder` */

LOCK TABLES `convertibleOrder` WRITE;

insert  into `convertibleOrder`(`id`,`personalId`,`contactPeople`,`phone`,`adressInfo`,`imgUrl`,`title`,`integral`,`totalIntegral`,`number`,`state`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`,`logisticsNumber`) values ('5944064514f845b4b4ac528794c7cbc1','20029ae4dd50400a88a7771eb95ac82e','你呢','18612363057','玩玩','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171129/6f8dea6e386e4fc88f4847bee08a86f5.jpg_430x430q90.jpg','维达抽纸',5,20,4,0,'2017-12-01 11:59:52','2017-12-01 11:59:52','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0,NULL),('619a9cb3d2da48efaed970a04cef3aab','3a767ea9a4294f25802605de97815747','蒋鹏','18798870531','Tim提哦why','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171129/6f8dea6e386e4fc88f4847bee08a86f5.jpg_430x430q90.jpg','维达抽纸',5,15,3,0,'2017-12-01 16:49:45','2017-12-01 16:49:45','3a767ea9a4294f25802605de97815747','3a767ea9a4294f25802605de97815747',0,0,NULL),('6de6a334d24f44fc82bd4cc7ea4aa193','62fa13bebc79443ba4980203d4449bd8','11','11','11','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171129/6f8dea6e386e4fc88f4847bee08a86f5.jpg_430x430q90.jpg','维达抽纸',5,15,3,0,'2017-12-01 14:23:58','2017-12-01 14:23:58','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0,NULL),('70ae616bc9ac45c5a3ca5ce076b829db','20029ae4dd50400a88a7771eb95ac82e','2131','123','24234','https://img30.360buyimg.com/img/jfs/t10600/291/2590070942/40905/a86bdb59/59faf2f1Nc3456779.jpg','母婴护理',71,71,1,0,'2017-11-28 17:07:33','2017-11-28 17:07:33','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0,NULL),('968a10782e2f458bb7b7240dab248fd2','20029ae4dd50400a88a7771eb95ac82e','234234','23423423','234234234','https://img30.360buyimg.com/img/jfs/t10600/291/2590070942/40905/a86bdb59/59faf2f1Nc3456779.jpg','母婴护理',71,71,1,0,'2017-11-28 17:29:31','2017-11-28 17:29:31','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0,NULL),('a0efe96488264e5c92d196c4d30df308','20029ae4dd50400a88a7771eb95ac82e','243234324','24234234','34234234234','https://img30.360buyimg.com/img/jfs/t10600/291/2590070942/40905/a86bdb59/59faf2f1Nc3456779.jpg','母婴护理',71,142,2,0,'2017-11-28 17:00:27','2017-11-28 17:00:27','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0,NULL),('d2b10d37b12f47ae87599cadad75e675','20029ae4dd50400a88a7771eb95ac82e','飞飞陈','55885','擦GV给高分','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171129/6f8dea6e386e4fc88f4847bee08a86f5.jpg_430x430q90.jpg','维达抽纸',5,10,2,0,'2017-12-01 11:58:17','2017-12-01 11:58:17','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0,NULL),('faa0b9424a1245549ed8481a0214b3a3','20029ae4dd50400a88a7771eb95ac82e','123','123','4343','https://static.daho.club/static/upload/ningmeng.daho.club/lingfe/20171129/6f8dea6e386e4fc88f4847bee08a86f5.jpg_430x430q90.jpg','维达抽纸',5,10,2,0,'2017-12-01 14:22:39','2017-12-01 14:22:39','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0,NULL);

UNLOCK TABLES;

/*Table structure for table `integralTransaction` */

DROP TABLE IF EXISTS `integralTransaction`;

CREATE TABLE `integralTransaction` (
  `id` varchar(32) NOT NULL COMMENT '积分交易表id标识',
  `personalId` varchar(32) NOT NULL COMMENT '积分发送者',
  `lq_personalId` varchar(32) DEFAULT NULL COMMENT '积分领取者',
  `integral` float NOT NULL COMMENT '积分',
  `pwd` varchar(32) NOT NULL COMMENT '领取密匙',
  `state` int(11) DEFAULT '0' COMMENT '状态,0=未领取,1=已领取',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `uman` varchar(32) DEFAULT NULL COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `integralTransaction` */

LOCK TABLES `integralTransaction` WRITE;

insert  into `integralTransaction`(`id`,`personalId`,`lq_personalId`,`integral`,`pwd`,`state`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`) values ('109d84f353294c5aa46f2c41c32501cb','62fa13bebc79443ba4980203d4449bd8','3a767ea9a4294f25802605de97815747',22,'看看',1,'2017-12-01 18:04:35','2017-12-01 18:04:49','62fa13bebc79443ba4980203d4449bd8','3a767ea9a4294f25802605de97815747',0,1),('2a943b2bc59f45a5815c9ebbb021b89d','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',9,'111',1,'2017-12-01 11:48:40','2017-12-01 11:50:54','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,1),('2db3dcc8ef1e412b87d0b71db55b2f0f','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',10,'123456',1,'2017-12-01 10:28:19','2017-12-01 11:51:36','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,1),('3408ae02cec44c0a9cbdc72b24c35441','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',2,'分d',1,'2017-12-01 18:11:12','2017-12-01 18:11:27','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,1),('5e09f18e9bba407ba9307744620d5dcb','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',2,'刚刚',1,'2017-12-03 19:37:13','2017-12-03 19:37:23','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,1),('6088921631964a5a9fb9f5a650531024','20029ae4dd50400a88a7771eb95ac82e','3a767ea9a4294f25802605de97815747',50,'666',1,'2017-12-01 16:35:52','2017-12-01 16:36:01','20029ae4dd50400a88a7771eb95ac82e','3a767ea9a4294f25802605de97815747',0,1),('767c0f1d7ebb4302b4cc7c1d6ae29976','20029ae4dd50400a88a7771eb95ac82e','62fa13bebc79443ba4980203d4449bd8',999,'520',1,'2017-12-01 11:52:31','2017-12-01 11:55:10','20029ae4dd50400a88a7771eb95ac82e','62fa13bebc79443ba4980203d4449bd8',0,1),('90f7baf63bbf4b0698b720b4131c94a9','3a767ea9a4294f25802605de97815747','62fa13bebc79443ba4980203d4449bd8',25,'3521',1,'2017-12-01 18:03:59','2017-12-01 18:04:16','3a767ea9a4294f25802605de97815747','62fa13bebc79443ba4980203d4449bd8',0,1),('b1ab5994c7c640299b7a8a0af595fc43','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',50,'123456',1,'2017-12-01 16:42:21','2017-12-01 16:43:24','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,1),('c9d85a6503534c779a3d87af94d76b3c','62fa13bebc79443ba4980203d4449bd8','a788d15773cc43e58aa5e177c756352c',10,'789',1,'2017-12-01 11:55:45','2017-12-01 11:56:31','62fa13bebc79443ba4980203d4449bd8','a788d15773cc43e58aa5e177c756352c',0,1),('ca1b7ae4918e4a6e9e3dc4f400daeee2','20029ae4dd50400a88a7771eb95ac82e',NULL,10,'666',1,'2017-12-01 11:28:41','2017-12-01 11:41:31','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,1),('fb2a1c89445a453889313c7f59cbe5e3','20029ae4dd50400a88a7771eb95ac82e','62fa13bebc79443ba4980203d4449bd8',200,'666',1,'2017-12-01 14:23:37','2017-12-01 14:23:43','20029ae4dd50400a88a7771eb95ac82e','62fa13bebc79443ba4980203d4449bd8',0,1),('ff989533f5fa4246935866d62b372c2d','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',4,'lingfe',1,'2017-12-05 10:35:47','2017-12-05 10:36:37','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,1);

UNLOCK TABLES;

/*Table structure for table `lemonDynamic` */

DROP TABLE IF EXISTS `lemonDynamic`;

CREATE TABLE `lemonDynamic` (
  `id` varchar(32) NOT NULL COMMENT '柠檬公益动态表id标识',
  `personalId` varchar(32) DEFAULT NULL COMMENT '编写者',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `imgUrl` varchar(255) NOT NULL COMMENT '图片地址',
  `content` varchar(255) NOT NULL COMMENT '内容',
  `state` int(11) DEFAULT '0' COMMENT '状态,1=正常',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `uman` varchar(32) DEFAULT NULL COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `lemonDynamic` */

LOCK TABLES `lemonDynamic` WRITE;

UNLOCK TABLES;

/*Table structure for table `lemonRecovery` */

DROP TABLE IF EXISTS `lemonRecovery`;

CREATE TABLE `lemonRecovery` (
  `id` varchar(32) NOT NULL COMMENT '预约表id标识',
  `personalId` varchar(255) NOT NULL COMMENT '用户id',
  `doorTime` varchar(255) NOT NULL COMMENT '上门时间',
  `yuyueAdress` varchar(255) NOT NULL COMMENT '预约地点',
  `adressInfo` varchar(255) NOT NULL COMMENT '详细地址',
  `cellYou` varchar(255) NOT NULL COMMENT '对您称呼',
  `phone` varchar(255) NOT NULL COMMENT '联系电话',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `uman` varchar(32) DEFAULT NULL COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  `state` int(11) DEFAULT '0' COMMENT '预约状态,0=(已提交,未处理),1=(已完成,已处理),2=(未采纳,不处理),3=(已取消,)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `lemonRecovery` */

LOCK TABLES `lemonRecovery` WRITE;

insert  into `lemonRecovery`(`id`,`personalId`,`doorTime`,`yuyueAdress`,`adressInfo`,`cellYou`,`phone`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`,`state`) values ('08dfc2195aa7438b868246ccb4a7b72a','20029ae4dd50400a88a7771eb95ac82e','2017-12-04,备注:叫姐姐','云岩区-大营坡','不会哈哈哈','刘老师','16025800852','2017-12-04 14:22:29','2017-12-04 14:22:49','20029ae4dd50400a88a7771eb95ac82e','3a767ea9a4294f25802605de97815747',0,1,1),('1da0fa43b4b6410b98965ac08a1fda07','62fa13bebc79443ba4980203d4449bd8','2017-11-29,备注:以前回收的','观山湖区','贵山城市花园','王力','18612363057','2017-11-29 16:04:02','2017-11-29 16:04:58','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,1,1),('3acceebaf1ba414c972476e772aca5c8','8524c3116eaa473387771c519be5651e','2017-11-26','观山湖区','交警六大队生活区','刘','13984848220','2017-11-24 17:09:16','2017-11-26 09:46:12','8524c3116eaa473387771c519be5651e','a788d15773cc43e58aa5e177c756352c',0,1,1),('6064bf782c1047e3919060959a606621','5f78132dcd9d47bc86c5ed0c77f607ae','2017-10-28','南明区花果园','贵阳市南明区花果园m区二单元3605','李先生','13025800852','2017-10-26 15:34:18','2017-10-28 14:57:20','5f78132dcd9d47bc86c5ed0c77f607ae','5f78132dcd9d47bc86c5ed0c77f607ae',0,1,1),('69f36edee6d34a7ba2016139902b0213','b16420d65bff412c90fb2482840305bc','2017-11-04,备注:早上8点到9点之前','云岩区-大营坡','新添大道南段104#2栋1单元3-2','晏凤','13984147148','2017-11-04 00:09:58','2017-11-05 08:36:04','b16420d65bff412c90fb2482840305bc','a788d15773cc43e58aa5e177c756352c',0,1,1),('85b5d1cef8d74595bdc86ce97e649e27','f06139e5555b45648b7386ede437a8ff','2017-12-04','观山湖区','阳关小区','1','13087833374','2017-12-04 14:16:15','2017-12-04 14:24:17','f06139e5555b45648b7386ede437a8ff','62fa13bebc79443ba4980203d4449bd8',0,16,1),('8a59c00494b6415ab50346d9567d71dd','20029ae4dd50400a88a7771eb95ac82e','2017-12-04,备注:23','观山湖区','23','213','13012311231','2017-12-04 10:13:54','2017-12-07 12:32:36','20029ae4dd50400a88a7771eb95ac82e','62fa13bebc79443ba4980203d4449bd8',0,1,2),('8e965c3922c94eb08f27b73c5342b5cf','d9268ab6249e4e0ebca5fe219084a322','2017-11-05,备注:11月5日下午2点左右','云岩区-大营坡','春雷路小石城12栋2单元102','滕女士','13985143114','2017-11-04 14:45:09','2017-11-05 15:07:07','d9268ab6249e4e0ebca5fe219084a322','a788d15773cc43e58aa5e177c756352c',0,1,1),('aaa4db9e243543efae6155a353950bb1','20029ae4dd50400a88a7771eb95ac82e','2017-12-04,备注:666','云岩区-大营坡','哈哈哈哈','刘老师','13025800852','2017-12-04 14:21:15','2017-12-04 14:21:45','20029ae4dd50400a88a7771eb95ac82e','3a767ea9a4294f25802605de97815747',0,1,1),('ca6dfb1b39f141319953b173c22538ae','c3eac6ec49b54e2c90eb6acd50bd92b1','2017-11-18','观山湖区','大营坡银佳花园圆通快递点','郭先生','13809405826','2017-11-16 00:28:56','2017-11-18 21:29:37','c3eac6ec49b54e2c90eb6acd50bd92b1','a788d15773cc43e58aa5e177c756352c',0,1,1),('d4c2805e34604b15868b9437d8e11e74','b6695393c00142fea2c03557c08815d1','2017-11-19','云岩区-大营坡','南明区红岩桥滨河路红岩桥红岩东郡4栋11楼4号','史女士','13678509577','2017-11-18 21:04:48','2017-11-21 10:20:41','b6695393c00142fea2c03557c08815d1','a788d15773cc43e58aa5e177c756352c',0,1,1),('f9ece82e23c74eb2a0ea324f5f32545f','6714ab42d9b74d3e8a08f4a5de9aade8','2017-12-30','云岩区-大营坡','景藤堡','林女士','18985786792','2017-10-30 11:56:24','2017-12-01 18:01:47','6714ab42d9b74d3e8a08f4a5de9aade8','20029ae4dd50400a88a7771eb95ac82e',0,1,1);

UNLOCK TABLES;

/*Table structure for table `myContribution` */

DROP TABLE IF EXISTS `myContribution`;

CREATE TABLE `myContribution` (
  `id` varchar(32) NOT NULL COMMENT '我的贡献表id标识',
  `personalId` varchar(255) NOT NULL COMMENT '用户id',
  `resourceContribution` float DEFAULT '0' COMMENT '资源贡献(斤)',
  `lemonIntegral` float DEFAULT '0' COMMENT '柠檬积分',
  `cityRanking` int(11) DEFAULT '0' COMMENT '城市排名',
  `usedClothes` float DEFAULT '0' COMMENT '旧衣服(斤)',
  `wastePaper` float DEFAULT '0' COMMENT '废纸(斤)',
  `other` float DEFAULT '0' COMMENT '其他(斤)',
  `state` int(11) DEFAULT '0' COMMENT '我的贡献表状态,0..',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `uman` varchar(32) DEFAULT NULL COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  `avatarUrl` varchar(255) DEFAULT NULL COMMENT '头像',
  `userName` varchar(32) DEFAULT NULL COMMENT '名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `myContribution` */

LOCK TABLES `myContribution` WRITE;

insert  into `myContribution`(`id`,`personalId`,`resourceContribution`,`lemonIntegral`,`cityRanking`,`usedClothes`,`wastePaper`,`other`,`state`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`,`avatarUrl`,`userName`) values ('2edc5eeb0664454d9679de4ab8bac595','d0e35aeb239a4307931ce7ac50aa70ee',0,0,0,0,0,0,0,'2017-12-02 19:33:53','2017-12-02 19:33:53','d0e35aeb239a4307931ce7ac50aa70ee','d0e35aeb239a4307931ce7ac50aa70ee',0,0,'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epVh4QoCj2A7icibFhUkWWGXSBubhw9kczia6QFgLCgQV7a32ksKT4YP4iaTdNDwrmDcG24s0OPeIRc6A/0','D.ING'),('3b985f198ef34991b23c15b0bd2e13a6','716807c4d8a544f1ba9ed63e438040d9',0,0,0,0,0,0,0,'2017-12-07 10:28:08','2017-12-07 10:28:08','716807c4d8a544f1ba9ed63e438040d9','716807c4d8a544f1ba9ed63e438040d9',0,0,'https://wx.qlogo.cn/mmopen/vi_32/T6DibKNlGcQ63DtYReMdrDrZGIVs3HNujCq2PlEdzxkZkdOaHlowSVxjj5eNBiauu0EQicttceePeSJx6EWvEn3jQ/0','monkeyman'),('54febf686da240489517b976e6ab397b','14661a6f810442ad91ba5da094669b30',0,0,0,0,0,0,0,'2017-12-02 21:09:48','2017-12-02 21:09:48','14661a6f810442ad91ba5da094669b30','14661a6f810442ad91ba5da094669b30',0,0,'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLZicK83hXbun9Mrh48qjY4wIDzan6tLtaWY9ZdXRTQXhwzEODJ5UjS7wTgQh7fkfqYs7mynw74kUg/0','ZL'),('70a8c4c04a0247ba90f27c1383bb8d44','62fa13bebc79443ba4980203d4449bd8',102,103.6,0,100,1,1,0,'2017-11-29 16:10:18','2017-12-01 18:04:35','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,8,'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eownMrczzwsWXKUahqice6pExOMN9N2MY5RvZDSWfqxEEB5FibYsco111C5hkKrZrs5ZVxuGV4iaXgQA/0','合光同尘'),('771e3422c09046c89d8f6f89fd6d4a77','a788d15773cc43e58aa5e177c756352c',0,0,0,0,0,0,0,'2017-12-01 09:39:31','2017-12-01 11:56:31','a788d15773cc43e58aa5e177c756352c','a788d15773cc43e58aa5e177c756352c',0,1,'https://wx.qlogo.cn/mmopen/vi_32/TqibrwtqzKhryaUb7zUCictFiaVQVib7UnyzgQDLQgJ7WFib7J9LN9LbTATibMBriaOIrlbf49PdiblnEd22eYiag7Cvn3g/0','DDW'),('846ec7d8bec04a6ca614397f60d1c1a4','35494816a4c0427195577c23b414c2d6',0,0,0,0,0,0,0,'2017-12-03 17:54:59','2017-12-03 17:54:59','35494816a4c0427195577c23b414c2d6','35494816a4c0427195577c23b414c2d6',0,0,'https://wx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM60O80MEC77YYDBywArX89Na8PtmBibnickhgrcqW0USrTy1FgrkeUW2DndFvj4P6GBMKdqRpX2XjCg/0','王晓'),('91227a22857e418d905762a66706989f','2bc8d47eb7fc48adbb38c228e8db5c25',0,0,0,0,0,0,0,'2017-12-04 18:16:41','2017-12-04 18:16:41','2bc8d47eb7fc48adbb38c228e8db5c25','2bc8d47eb7fc48adbb38c228e8db5c25',0,0,'https://wx.qlogo.cn/mmopen/vi_32/NuwYnsI1a7JKXMZ2o9rGZJ97bc5FX9ibpgNdSza4ZevqeAa15icYqHP4Pd6GUqnKO9jQ3r12mHqdsOIjKWribf7gg/0','Mondi'),('98a50cfb71e44573bba646c7c6977523','410088b8699446d28de901c9681a4add',0,0,0,0,0,0,0,'2017-11-29 19:49:02','2017-11-29 19:49:02','410088b8699446d28de901c9681a4add','410088b8699446d28de901c9681a4add',0,0,NULL,'rdgztest_QUQPMI'),('b1f9f8d0180447989b307806ea4c3e5e','41c0966ceeca49aaa22ad7c94ea611fa',0,0,0,0,0,0,0,'2017-12-02 13:56:39','2017-12-02 13:56:39','41c0966ceeca49aaa22ad7c94ea611fa','41c0966ceeca49aaa22ad7c94ea611fa',0,0,NULL,'rdgztest_EWGHWQ'),('be52ea7c4e1b49f088db64e5b52ace93','e74de875199e4803a616f37174d0547e',0,0,0,0,0,0,0,'2017-12-04 16:30:13','2017-12-04 16:30:13','e74de875199e4803a616f37174d0547e','e74de875199e4803a616f37174d0547e',0,0,'https://wx.qlogo.cn/mmopen/vi_32/RLuNqVO12rynRKRA7QfzhB2MK4Z5oncAg3wyvQMRDdIy2ibxwnR0Oz0VDMLibEMBhvq0maBTgI0joTpT2g59hZTw/0','印敬明'),('c9e08799107f4b508e37be7e9b9b02c7','c05eff9b7e354a219e1919c919a18cd3',0,0,0,0,0,0,0,'2017-12-04 20:17:36','2017-12-04 20:17:36','c05eff9b7e354a219e1919c919a18cd3','c05eff9b7e354a219e1919c919a18cd3',0,0,'https://wx.qlogo.cn/mmopen/vi_32/tANLzkWibMmh2fhYGRqN18qAVa4w1nRTBcficvoVCcLQf6bhlNpPQ7IQpyArjKBsnlNwEwxIfj6icOMC2foHpJxkg/0','果咚小璐'),('d07758f2242b42b3996957db51108f7d','20029ae4dd50400a88a7771eb95ac82e',104,54,0,54,50,0,0,'2017-11-29 16:14:18','2017-12-05 10:36:37','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,24,'https://wx.qlogo.cn/mmopen/vi_32/o7B2qXgusTWzGahwMoSxMWVibKgnqY3JpCuCChzoyS8U33FuUaH0qek60cl37uvdrwnUHkfLkiaFMIsrLduiaFRGQ/0','零风'),('e223433361ed40f38dab318eb995c39d','3a767ea9a4294f25802605de97815747',3,35,0,3,0,0,0,'2017-11-29 16:24:50','2017-12-04 09:40:47','3a767ea9a4294f25802605de97815747','3a767ea9a4294f25802605de97815747',0,5,'https://wx.qlogo.cn/mmopen/vi_32/BdupNoAam8cLb1KIvGeVn9skVdb5dq8muf1ZqPASKOR4yMfYkaN30m4AVApSCLT5R0KBWuUbYZvokZQ9rBjLxw/0','蒋鹏'),('f06139e5555b45648b7386ede437a800','f06139e5555b45648b7386ede437a8ff',5,5,0,5,0,0,0,NULL,NULL,NULL,NULL,0,0,NULL,NULL),('f96f51f1075441f08cd0c37e6dc601a5','b160157015bb4c7880157659c90ddf6e',0,0,0,0,0,0,0,'2017-12-02 14:31:35','2017-12-02 14:31:35','b160157015bb4c7880157659c90ddf6e','b160157015bb4c7880157659c90ddf6e',0,0,'https://wx.qlogo.cn/mmopen/vi_32/QTaOZDXLsZxZA8ZdSxf7SJbvfzmeKm8QpXic2MG3z4iaiaHnl6KfGYIOIZPDkTqWIX1KR7rl7CNkeUSJlWtSWoaBQ/0','DBY');

UNLOCK TABLES;

/*Table structure for table `recyclingRecords` */

DROP TABLE IF EXISTS `recyclingRecords`;

CREATE TABLE `recyclingRecords` (
  `id` varchar(32) NOT NULL COMMENT '回收纪录表id标识',
  `personalId` varchar(255) NOT NULL COMMENT '用户id',
  `lemonIntegral` double DEFAULT '0' COMMENT '柠檬积分',
  `usedClothes` int(11) DEFAULT '0' COMMENT '旧衣服(斤)',
  `wastePaper` int(11) DEFAULT '0' COMMENT '废纸(斤)',
  `other` int(11) DEFAULT '0' COMMENT '其他(斤)',
  `state` int(11) DEFAULT '0' COMMENT '回收纪录表状态,0..',
  `collector` varchar(255) DEFAULT NULL COMMENT '收集员编号',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `uman` varchar(32) DEFAULT NULL COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `recyclingRecords` */

LOCK TABLES `recyclingRecords` WRITE;

insert  into `recyclingRecords`(`id`,`personalId`,`lemonIntegral`,`usedClothes`,`wastePaper`,`other`,`state`,`collector`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`) values ('0c517118213d4839b8d74d8eed79682e','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,NULL,'2017-12-04 14:17:17','2017-12-04 14:17:17','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('19eaff4935da463fb204e2842c03c1ee','20029ae4dd50400a88a7771eb95ac82e',1.9,1,1,1,0,NULL,'2017-11-14 17:14:22','2017-11-14 17:14:22','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0),('1b5de09911dc4c00a82d1f1035f8849d','62fa13bebc79443ba4980203d4449bd8',100.6,100,1,1,0,NULL,'2017-12-01 17:15:31','2017-12-01 17:15:31','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('1db9570476e9474ca0c485417bae9bcd','20029ae4dd50400a88a7771eb95ac82e',3,3,0,0,0,'666','2017-12-04 14:21:45','2017-12-04 14:21:45','3a767ea9a4294f25802605de97815747','3a767ea9a4294f25802605de97815747',0,0),('275a9875bd284807bb5675217bb12326','20029ae4dd50400a88a7771eb95ac82e',3.1,1,3,3,0,NULL,'2017-11-14 17:02:30','2017-11-14 17:02:30','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0),('302b0bad55014f97b33c5b3f369f21a9','20029ae4dd50400a88a7771eb95ac82e',10.6,10,1,1,0,NULL,'2017-11-14 16:49:10','2017-11-14 16:49:10','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0),('39484ffc14e14ea28d7cea3a6c53e326','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,NULL,'2017-12-04 14:16:45','2017-12-04 14:16:45','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('3e9b1984b3bb463b9693b06252cddaac','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,NULL,'2017-12-04 14:16:49','2017-12-04 14:16:49','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('5c4491d397184c769ca8d71249056406','20029ae4dd50400a88a7771eb95ac82e',1.6,1,1,1,0,NULL,'2017-11-14 17:10:37','2017-11-14 17:10:37','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0),('5deb0ad9f209441ab43b6b7f2f20913b','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,NULL,'2017-12-04 14:17:18','2017-12-04 14:17:18','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('62ad16efd3924d9a8de1f2376ec4a882','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,NULL,'2017-12-04 14:16:48','2017-12-04 14:16:48','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('665d7a601af4496ca5c5abe0bec1b714','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,NULL,'2017-12-04 14:17:16','2017-12-04 14:17:16','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('76b54aa9eee244b8b9a4327cf7150d97','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,NULL,'2017-12-04 14:17:17','2017-12-04 14:17:17','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('91e8a29c38e644979b56d92aa3ad67f1','6714ab42d9b74d3e8a08f4a5de9aade8',0.3,0,0,0,0,NULL,'2017-12-01 18:01:47','2017-12-01 18:01:47','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0),('9632cf76f83d42ae8c32ed764d309377','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,'666','2017-12-04 14:24:17','2017-12-04 14:24:17','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('96ae81bb797549ccbe455fc793eeb8d3','20029ae4dd50400a88a7771eb95ac82e',1.6,1,1,1,0,NULL,'2017-11-10 17:57:25','2017-11-10 17:57:25','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0),('9b29ce79c2b94d29936de2680b2b1d99','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,'666','2017-12-04 14:24:14','2017-12-04 14:24:14','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('a41a48c356784faf9609c1395b29319c','3a767ea9a4294f25802605de97815747',3,3,0,0,0,NULL,'2017-12-04 09:40:47','2017-12-04 09:40:47','3a767ea9a4294f25802605de97815747','3a767ea9a4294f25802605de97815747',0,0),('a4bfd9f56be04b3f945695f614cc73c4','20029ae4dd50400a88a7771eb95ac82e',3.1,1,3,3,0,NULL,'2017-11-14 16:58:32','2017-11-14 16:58:32','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0),('a6c184d0e2a946ceb8e998ff51b57a7a','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,NULL,'2017-12-04 14:17:18','2017-12-04 14:17:18','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('a8ad5faa37ca4981880535313848c708','20029ae4dd50400a88a7771eb95ac82e',190.4,35,513,513,0,NULL,'2017-11-28 15:43:14','2017-11-28 15:43:14','3a767ea9a4294f25802605de97815747','3a767ea9a4294f25802605de97815747',0,0),('b7d6c50dae154a1f83cdd04edd0ae31e','20029ae4dd50400a88a7771eb95ac82e',2.2,1,2,2,0,'1001','2017-11-10 18:08:08','2017-11-10 18:08:08','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0),('ba2f114502aa409b940590eb6490398a','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,'666','2017-12-04 14:24:17','2017-12-04 14:24:17','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('c083d99301544839985a9036a5069691','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,NULL,'2017-12-04 14:17:17','2017-12-04 14:17:17','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('c760003ceea642b59ef4305aba116e84','20029ae4dd50400a88a7771eb95ac82e',3.1,1,3,3,0,NULL,'2017-11-14 17:05:48','2017-11-14 17:05:48','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0),('cb99e4a1d16e44c787d2939b8eac4231','62fa13bebc79443ba4980203d4449bd8',50.6,50,1,1,0,NULL,'2017-11-29 16:04:58','2017-11-29 16:04:58','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('cece8c19af9d4a279ded0f9f4581fc46','20029ae4dd50400a88a7771eb95ac82e',4.8,3,3,3,0,NULL,'2017-11-14 17:12:31','2017-11-14 17:12:31','20029ae4dd50400a88a7771eb95ac82e','20029ae4dd50400a88a7771eb95ac82e',0,0),('d9a6b07864bc4dceb0978603663925df','20029ae4dd50400a88a7771eb95ac82e',1,1,0,0,0,'666','2017-12-04 14:22:48','2017-12-04 14:22:48','3a767ea9a4294f25802605de97815747','3a767ea9a4294f25802605de97815747',0,0),('dfcc3e78e95e4b62a020741720bb50f7','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,NULL,'2017-12-04 14:17:18','2017-12-04 14:17:18','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('e23294d982db4105a37b2c17b9304304','f06139e5555b45648b7386ede437a8ff',3.6,3,1,1,0,NULL,'2017-12-04 14:17:04','2017-12-04 14:17:04','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('ed8ce6c9572b4f12998f605ec16252b0','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,'0','2017-12-04 14:16:53','2017-12-04 14:16:53','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0),('ff14360af6d34adeb68bbeef050bc7e5','f06139e5555b45648b7386ede437a8ff',5,5,0,0,0,NULL,'2017-12-04 14:16:49','2017-12-04 14:16:49','62fa13bebc79443ba4980203d4449bd8','62fa13bebc79443ba4980203d4449bd8',0,0);

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
