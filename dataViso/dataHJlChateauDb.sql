/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.6.35-log : Database - datahjlchateaudb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`datahjlchateaudb` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `datahjlchateaudb`;

/*Table structure for table `carouselfigure` */

DROP TABLE IF EXISTS `carouselfigure`;

CREATE TABLE `carouselfigure` (
  `id` varchar(64) NOT NULL COMMENT '轮播图表id标识',
  `imgUrl` varchar(1024) NOT NULL COMMENT '图片地址',
  `imgName` varchar(64) DEFAULT NULL COMMENT '图片名称，可以为空',
  `state` int(11) DEFAULT '0' COMMENT '状态,0=显示,1=下架',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(64) DEFAULT 'admin' COMMENT '创建人',
  `uman` varchar(64) DEFAULT 'admin' COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `carouselfigure` */

LOCK TABLES `carouselfigure` WRITE;

insert  into `carouselfigure`(`id`,`imgUrl`,`imgName`,`state`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`) values ('f9159c25-5cd6-4eee-822f-6074b9f4c95d','https://static.daho.club/static/upload/hjd/shopImg/20171223/840c0ef9-9e1a-486c-a645-1c0c514fec36.jpg',NULL,0,'2017-12-23 10:25:30','2017-12-23 10:25:30','f9159c25-5cd6-4eee-822f-6074b9f4c95d','f9159c25-5cd6-4eee-822f-6074b9f4c95d',0,0),('sdf46d4f8sd46f4s1f54s54','http://pic.58pic.com/58pic/17/09/50/17m58PICewS_1024.jpg','红酒与男人广告轮播图',0,'2017-12-18 10:57:58','2017-12-18 10:58:00','admin','admin',0,0);

UNLOCK TABLES;

/*Table structure for table `distributor` */

DROP TABLE IF EXISTS `distributor`;

CREATE TABLE `distributor` (
  `id` varchar(64) NOT NULL COMMENT '经销商id标识',
  `distributorName` varchar(32) DEFAULT NULL COMMENT '经销商名称，商店名称',
  `pwd` varchar(32) DEFAULT NULL COMMENT '经销商登录密码,微信号，或者openid',
  `state` int(11) DEFAULT '0' COMMENT '状态,0=正常',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(64) DEFAULT 'admin' COMMENT '创建人',
  `uman` varchar(64) DEFAULT 'admin' COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `distributor` */

LOCK TABLES `distributor` WRITE;

insert  into `distributor`(`id`,`distributorName`,`pwd`,`state`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`) values ('12331231','零风','lingfe',0,'2017-12-21 13:45:34','2017-12-21 13:45:19','admin','admin',0,0),('4bce4a4d-3d8f-4362-9a56-7a8f8adb102d','表订单','321',0,'2017-12-25 18:22:43','2017-12-25 18:22:43','4bce4a4d-3d8f-4362-9a56-7a8f8adb102d','4bce4a4d-3d8f-4362-9a56-7a8f8adb102d',0,0),('5ac970de-81d3-4dcc-80f5-fa222f7c7cea','0000','ggg',0,'2017-12-21 15:41:40','2017-12-21 15:41:40','5ac970de-81d3-4dcc-80f5-fa222f7c7cea','5ac970de-81d3-4dcc-80f5-fa222f7c7cea',0,0),('61b88699-4fc8-4046-9cfd-d4eef137073f','火锅店','lingfe2',0,'2017-12-21 15:22:45','2017-12-21 15:22:45','61b88699-4fc8-4046-9cfd-d4eef137073f','61b88699-4fc8-4046-9cfd-d4eef137073f',0,0),('c0d0e874-48a3-4ed5-a493-e81300d89acd','66632','123',0,'2017-12-21 15:19:21','2017-12-21 15:19:21','c0d0e874-48a3-4ed5-a493-e81300d89acd','c0d0e874-48a3-4ed5-a493-e81300d89acd',0,0),('e69147aa-38a6-48f0-9714-a94ff960a734','aaa','bbbb',0,'2017-12-23 13:44:46','2017-12-23 13:44:46','e69147aa-38a6-48f0-9714-a94ff960a734','e69147aa-38a6-48f0-9714-a94ff960a734',0,0);

UNLOCK TABLES;

/*Table structure for table `feedback` */

DROP TABLE IF EXISTS `feedback`;

CREATE TABLE `feedback` (
  `id` varchar(64) NOT NULL COMMENT '投诉建议表id标识',
  `personalId` varchar(64) NOT NULL COMMENT '用户id,投诉者id',
  `content` varchar(1024) DEFAULT NULL COMMENT '内容',
  `remark` varchar(1024) DEFAULT NULL COMMENT '备注',
  `state` int(11) DEFAULT '0' COMMENT '状态,0=正常',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(64) DEFAULT 'admin' COMMENT '创建人',
  `uman` varchar(64) DEFAULT 'admin' COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `feedback` */

LOCK TABLES `feedback` WRITE;

insert  into `feedback`(`id`,`personalId`,`content`,`remark`,`state`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`) values ('2342342','ssdfsdf','水电费水电费',NULL,0,NULL,NULL,'admin','admin',0,0),('81d315d1-60b6-46d6-a3c7-6bea4d5e19fe','d9816b04-650a-48b2-8256-c7fb0174120c','sdfasdf商品源,商品源商品源商品源商品源商品源商品源商品源商品源商品源,商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源,商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源商品源,商品源商品源商品源商品源商品源商品源,商品源',NULL,0,'2017-12-23 12:09:54','2017-12-23 12:09:54','81d315d1-60b6-46d6-a3c7-6bea4d5e19fe','81d315d1-60b6-46d6-a3c7-6bea4d5e19fe',0,0);

UNLOCK TABLES;

/*Table structure for table `shopinfo` */

DROP TABLE IF EXISTS `shopinfo`;

CREATE TABLE `shopinfo` (
  `id` varchar(64) NOT NULL COMMENT '商品信息表id标识',
  `distributorId` varchar(64) DEFAULT NULL COMMENT '经销商id',
  `distributorName` varchar(32) DEFAULT NULL COMMENT '经销商名称，商品店名',
  `title` varchar(64) NOT NULL COMMENT '标题名称',
  `imgUrl` varchar(1024) DEFAULT NULL COMMENT '商品图片，最多三张',
  `price` float DEFAULT NULL COMMENT '价格',
  `infoImgUrl` varchar(1024) DEFAULT NULL COMMENT '图片信息详细，一张',
  `remark` varchar(1024) DEFAULT NULL COMMENT '商品备注',
  `state` int(11) DEFAULT '0' COMMENT '状态,0=显示,1=下架',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(64) DEFAULT 'admin' COMMENT '创建人',
  `uman` varchar(64) DEFAULT 'admin' COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `shopinfo` */

LOCK TABLES `shopinfo` WRITE;

insert  into `shopinfo`(`id`,`distributorId`,`distributorName`,`title`,`imgUrl`,`price`,`infoImgUrl`,`remark`,`state`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`) values ('0a6b4bad-719c-4067-878c-2b36d8299f2d','c0d0e874-48a3-4ed5-a493-e81300d89acd','66632','56456456','20171223/78c79715-349d-4a33-b173-bdf179a376fd.jpg,20171223/c673341b-fb49-4e05-beaa-b94f71f2c36b.jpg,20171223/79a1382b-12e3-426c-8609-d94e27593d9e.jpg',3,'20171223/9062e29f-c881-4254-82e6-c8f864197f56.jpg','sdfshgdgdfdgfdhf',0,'2017-12-23 17:49:42','2017-12-23 17:49:42','0a6b4bad-719c-4067-878c-2b36d8299f2d','0a6b4bad-719c-4067-878c-2b36d8299f2d',0,0),('50e8cb5d-abff-4b07-aabb-f1209b27e6f6','4bce4a4d-3d8f-4362-9a56-7a8f8adb102d','表订单','k','20171225/f834d927-fe39-429e-b5cf-2c906b776014.png,20171225/092139cd-8989-4a7c-ae5a-dcd1fd051bf3.png,20171225/119a6754-67c3-45fa-8ee3-62afdb2e0837.png',6,'20171225/0ed280b3-8396-48f9-a2bc-1dee7de66a1a.png','dfdfdf',0,'2017-12-25 14:07:07','2017-12-25 14:07:07','50e8cb5d-abff-4b07-aabb-f1209b27e6f6','50e8cb5d-abff-4b07-aabb-f1209b27e6f6',0,0),('56b214db-c492-458f-882f-fbd83898ea26',NULL,NULL,'4654646','20171225/340e925f-c2a8-4dd3-8003-9989691dc30f.png,20171225/d61ea426-a794-4555-b853-da36c6c775ca.png',23323,'20171225/219f7d84-9207-4dce-88c6-f00497feb88d.png','gdfgdfg',1,'2017-12-25 16:28:41','2017-12-25 16:28:41','56b214db-c492-458f-882f-fbd83898ea26','56b214db-c492-458f-882f-fbd83898ea26',0,0),('9bd0c1f7-ea53-4227-abd2-30e1f5195786','c0d0e874-48a3-4ed5-a493-e81300d89acd','66632','sfsdfsd','20171223/ecc01eda-8d35-448e-8579-63dec88216b3.jpg,20171223/0232fca1-4461-4483-b02e-a4ffb6f7fdb5.jpg,20171223/75937e47-1ce1-43c4-9b52-a20d1bb79d14.jpg',3,'20171223/c236d31c-ff57-43b4-a5c0-2dfa089b6100.png','sfsdfsdfsdfs',0,'2017-12-23 15:10:23','2017-12-23 15:10:23','9bd0c1f7-ea53-4227-abd2-30e1f5195786','9bd0c1f7-ea53-4227-abd2-30e1f5195786',0,0),('bb1999a0-64df-4573-b25b-58b54a8c9b65','c0d0e874-48a3-4ed5-a493-e81300d89acd','66632','lalala','20171220/a1f895e8-b121-4c43-a6a6-f2f5d0cc571a.png,20171220/02f0323e-2e55-4d16-bf42-ac4964606d3c.png',32,'20171221/abbe9670-794c-4734-9510-e2becc126fff.jpg','sdfsdfsdfs',0,'2017-12-20 16:23:24','2017-12-20 16:23:24','bb1999a0-64df-4573-b25b-58b54a8c9b65','bb1999a0-64df-4573-b25b-58b54a8c9b65',0,0),('da5e4244-354c-44e0-b6e5-bbc77ddac8ea','e69147aa-38a6-48f0-9714-a94ff960a734','aaa','666','20171225/0d616917-d40d-422c-a16d-440b01572f29.png,20171225/dbb05878-0cd1-492f-9f6f-ac1baad359a1.png,20171225/db3caf0d-7257-40fe-99f1-63ed2a126eb6.png',23,'20171225/f127e7c0-ae3d-4cec-88a5-ad8f03e1545c.jpg','sdfgsd',0,'2017-12-25 14:07:36','2017-12-25 14:07:36','da5e4244-354c-44e0-b6e5-bbc77ddac8ea','da5e4244-354c-44e0-b6e5-bbc77ddac8ea',0,0),('e950372a-16d4-4bd5-8bf3-2891c26a6f3a','c0d0e874-48a3-4ed5-a493-e81300d89acd','66632','6456465','20171220/d2a6efa5-186b-45d0-bd3f-5102e1e14c8b.png,20171220/087d572d-2eb8-47ec-9594-6635aee01886.png',33,'20171220/7698d5e4-9548-4403-bfda-06f80e75ac3c.png','sdggsdfsdfefwsefe',0,'2017-12-20 15:59:01','2017-12-20 15:59:01','e950372a-16d4-4bd5-8bf3-2891c26a6f3a','e950372a-16d4-4bd5-8bf3-2891c26a6f3a',0,0);

UNLOCK TABLES;

/*Table structure for table `shoporder` */

DROP TABLE IF EXISTS `shoporder`;

CREATE TABLE `shoporder` (
  `id` varchar(64) NOT NULL COMMENT '商品订单表id标识',
  `distributorId` varchar(64) DEFAULT NULL COMMENT '经销商id',
  `distributorName` varchar(32) DEFAULT NULL COMMENT '经销商名称，商品店名',
  `personalId` varchar(64) DEFAULT NULL COMMENT '用户id',
  `shopInfoid` varchar(64) DEFAULT NULL COMMENT '商品信息id',
  `title` varchar(64) DEFAULT NULL COMMENT '标题名称',
  `imgUrl` varchar(1024) DEFAULT NULL COMMENT '商品图片，最多一张',
  `price` float DEFAULT NULL COMMENT '价格',
  `number` int(11) DEFAULT NULL COMMENT '数量',
  `address` varchar(1024) DEFAULT NULL COMMENT '收货地址',
  `phone` varchar(32) DEFAULT NULL COMMENT '电话',
  `distributionTime` varchar(1024) DEFAULT NULL COMMENT '配送时间',
  `remark` varchar(1024) DEFAULT NULL COMMENT '备注',
  `state` int(11) DEFAULT '0' COMMENT '状态,0=已提交，未发货,1=已发货,未确认,2=已完成,已确认,3=已取消',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `creator` varchar(64) DEFAULT 'admin' COMMENT '创建人',
  `uman` varchar(64) DEFAULT 'admin' COMMENT '修改人',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `shoporder` */

LOCK TABLES `shoporder` WRITE;

insert  into `shoporder`(`id`,`distributorId`,`distributorName`,`personalId`,`shopInfoid`,`title`,`imgUrl`,`price`,`number`,`address`,`phone`,`distributionTime`,`remark`,`state`,`cdate`,`mdate`,`creator`,`uman`,`df`,`version`) values ('07d65cef-4d8a-4f2d-b667-f7724072c97f','4bce4a4d-3d8f-4362-9a56-7a8f8adb102d','表订单','d9816b04-650a-48b2-8256-c7fb0174120c','50e8cb5d-abff-4b07-aabb-f1209b27e6f6','k','20171225/0ed280b3-8396-48f9-a2bc-1dee7de66a1a.png',6,3,'45453453','110','123123','ssss',2,'2017-12-26 14:04:06','2017-12-26 14:04:06','07d65cef-4d8a-4f2d-b667-f7724072c97f','07d65cef-4d8a-4f2d-b667-f7724072c97f',0,0),('3fc0656e-bd99-424b-968c-cecfe9755611','e69147aa-38a6-48f0-9714-a94ff960a734','aaa','d9816b04-650a-48b2-8256-c7fb0174120c','da5e4244-354c-44e0-b6e5-bbc77ddac8ea','666','20171225/f127e7c0-ae3d-4cec-88a5-ad8f03e1545c.jpg',23,5,'2652652','232322','2017-12-26','232323',0,'2017-12-26 18:25:29','2017-12-26 18:25:29','3fc0656e-bd99-424b-968c-cecfe9755611','3fc0656e-bd99-424b-968c-cecfe9755611',0,0),('453463656456','dsfsdfds1651465','谁谁谁','d9816b04-650a-48b2-8256-c7fb0174120c','112313213','542342342','20171223/9062e29f-c881-4254-82e6-c8f864197f56.jpg',33,2,'沙发手动阀沙发斯蒂芬是','13012311231','水水水水',NULL,3,'2017-12-25 17:16:28','2017-12-25 17:16:31','d9816b04-650a-48b2-8256-c7fb0174120c','d9816b04-650a-48b2-8256-c7fb0174120c',0,0),('481e4b1d-b65f-49c1-b2f0-e0c33517b163','c0d0e874-48a3-4ed5-a493-e81300d89acd','66632','d9816b04-650a-48b2-8256-c7fb0174120c','0a6b4bad-719c-4067-878c-2b36d8299f2d','56456456','20171223/9062e29f-c881-4254-82e6-c8f864197f56.jpg',3,1,'123123','110','123','ddd',1,'2017-12-26 11:15:20','2017-12-26 11:15:20','481e4b1d-b65f-49c1-b2f0-e0c33517b163','481e4b1d-b65f-49c1-b2f0-e0c33517b163',0,0),('63e09f3f-d1ff-4b35-aecc-801d24a1b3bb','c0d0e874-48a3-4ed5-a493-e81300d89acd','66632','d9816b04-650a-48b2-8256-c7fb0174120c','0a6b4bad-719c-4067-878c-2b36d8299f2d','56456456','20171223/9062e29f-c881-4254-82e6-c8f864197f56.jpg',3,3,'是否的水电费是否','13012311231','2017-12-27','33333',0,'2017-12-27 13:11:19','2017-12-27 13:11:19','63e09f3f-d1ff-4b35-aecc-801d24a1b3bb','63e09f3f-d1ff-4b35-aecc-801d24a1b3bb',0,0),('8c9e7d7b-9a35-4252-a4f1-cb8b284a409b','c0d0e874-48a3-4ed5-a493-e81300d89acd','66632','d9816b04-650a-48b2-8256-c7fb0174120c','0a6b4bad-719c-4067-878c-2b36d8299f2d','56456456','20171223/9062e29f-c881-4254-82e6-c8f864197f56.jpg',3,2,'2222','null','null','null',2,'2017-12-26 11:06:08','2017-12-26 11:06:08','8c9e7d7b-9a35-4252-a4f1-cb8b284a409b','8c9e7d7b-9a35-4252-a4f1-cb8b284a409b',0,0);

UNLOCK TABLES;

/*Table structure for table `userinfo` */

DROP TABLE IF EXISTS `userinfo`;

CREATE TABLE `userinfo` (
  `id` varchar(64) NOT NULL COMMENT '用户信息表标识',
  `openid` varchar(64) DEFAULT NULL COMMENT '与微信小程序生成的微信用户id',
  `username` varchar(32) DEFAULT NULL COMMENT '用户名',
  `wechatNumber` varchar(32) DEFAULT NULL COMMENT '微信账号',
  `avatarUrl` varchar(255) DEFAULT NULL COMMENT '用户头像',
  `phone` varchar(32) DEFAULT NULL COMMENT '电话',
  `provinceName` varchar(64) DEFAULT NULL COMMENT '省',
  `cityName` varchar(64) DEFAULT NULL COMMENT '市',
  `regionName` varchar(64) DEFAULT NULL COMMENT '区',
  `address` varchar(256) DEFAULT NULL COMMENT '详细地址',
  `memo` varchar(64) DEFAULT NULL COMMENT '备注',
  `state` int(11) DEFAULT '0' COMMENT '账号状态,0=普通用户,1=管理员,2=经销商',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `creator` varchar(64) DEFAULT 'admin' COMMENT '创建人',
  `uman` varchar(64) DEFAULT 'admin' COMMENT '修改人',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';

/*Data for the table `userinfo` */

LOCK TABLES `userinfo` WRITE;

insert  into `userinfo`(`id`,`openid`,`username`,`wechatNumber`,`avatarUrl`,`phone`,`provinceName`,`cityName`,`regionName`,`address`,`memo`,`state`,`df`,`creator`,`uman`,`cdate`,`mdate`,`version`) values ('1231231321311213','123456','lingfe','lingfe','http://pic.58pic.com/58pic/16/98/27/13A58PICIQb_1024.jpg','13012311231',NULL,NULL,NULL,NULL,NULL,0,0,NULL,NULL,NULL,'2017-12-18 14:05:55',0),('d9816b04-650a-48b2-8256-c7fb0174120c','oh4300DFZdBeIGOoVKQK9OFuyPps','零风',NULL,'https://wx.qlogo.cn/mmopen/vi_32/o7B2qXgusTWzGahwMoSxMWVibKgnqY3JpCuCChzoyS8U33FuUaH0qek60cl37uvdratrnq85bmdt3BU7AG6Itog/0',NULL,NULL,NULL,NULL,NULL,NULL,1,0,'d9816b04-650a-48b2-8256-c7fb0174120c','d9816b04-650a-48b2-8256-c7fb0174120c','2017-12-18 15:21:14','2017-12-18 15:21:14',0);

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
