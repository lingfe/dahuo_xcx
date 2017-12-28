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
  `state` int(11) DEFAULT '0' COMMENT '账号状态,0=普通用户,1=管理员',
  `df` int(11) DEFAULT '0' COMMENT '是否删除',
  `creator` varchar(32) DEFAULT 'admin' COMMENT '创建人',
  `uman` varchar(32) DEFAULT 'admin' COMMENT '修改人',
  `cdate` datetime DEFAULT NULL COMMENT '创建时间',
  `mdate` datetime DEFAULT NULL COMMENT '最后修改时间',
  `version` int(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';

/*Data for the table `userinfo` */

LOCK TABLES `userinfo` WRITE;

insert  into `userinfo`(`id`,`openid`,`username`,`wechatNumber`,`avatarUrl`,`phone`,`provinceName`,`cityName`,`regionName`,`address`,`memo`,`state`,`df`,`creator`,`uman`,`cdate`,`mdate`,`version`) values ('1231231321311213','123456','lingfe','lingfe','http://pic.58pic.com/58pic/16/98/27/13A58PICIQb_1024.jpg','13012311231',NULL,NULL,NULL,NULL,NULL,0,0,NULL,NULL,NULL,'2017-12-18 14:05:55',0);

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
