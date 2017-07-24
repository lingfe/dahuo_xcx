/*
SQLyog Ultimate v10.00 Beta1
MySQL - 5.6.35-log : Database - dahuodb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dahuodb` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `dahuodb`;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

/*tab1.发布类型表*/
DROP TABLE IF EXISTS `releaseType`;
CREATE TABLE `releaseType` (
  `releaseTypeId` VARCHAR(100)  NOT NULL  COMMENT '发布类型Id标识',
  `releaseTypeName` VARCHAR(100) NOT NULL  COMMENT '发布类型名称',
  `releaseTypeIco` VARCHAR(255)  COMMENT '图标名称',
  `releaseTypeUrl` VARCHAR(255)  COMMENT '访问url',
  `releaseTypeRemark` VARCHAR(255)  COMMENT '城市等级',
  PRIMARY KEY (`releaseTypeid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

/*tab2.发布信息表*/
DROP TABLE IF EXISTS `releaseInfo`;
CREATE TABLE `releaseInfo` (
  `releaseId` VARCHAR(100)  NOT NULL  COMMENT '发布Id标识',
  `releaseTypeId` VARCHAR(100)  NOT NULL COMMENT '发布类型id',
  `personalId` VARCHAR(100)  NOT NULL COMMENT '个人资料id',
  `title` VARCHAR(100) NOT NULL  	COMMENT '标题',
  `threshold` FLOAT  COMMENT '入伙门槛，转让门槛,加盟金额,购入门槛，投资金额，代理金额,需要金额',
  `industryChoice` VARCHAR(255)  	COMMENT '行业选择',
  `fundDistribution` VARCHAR(255) 	COMMENT '资金布局',
  `projectDescription` FLOAT  		COMMENT '项目描述',
  `incomeDescription` VARCHAR(255)  	COMMENT '收益描述',
  `teamIntroduction` VARCHAR(255)	COMMENT '公司/团队介绍',
  `phone` VARCHAR(11)  COMMENT '联系方式',
  `imageArray` VARCHAR(255)  COMMENT '图片数组',
  `publisherIdentity` VARCHAR(255)  COMMENT '发布人身份',
  `geographicalPosition` VARCHAR(255)  COMMENT '地理位置',
  `operatingArea` VARCHAR(255)  COMMENT '经营面积',
  `monthlyRent` VARCHAR(255)  COMMENT '每月租金',
  `businessDescription` VARCHAR(255)  COMMENT '经营描述',
  `transferReason` VARCHAR(255)  COMMENT '转让原因',
  `throwInTheCity` VARCHAR(255)  COMMENT '投放城市',
  `headquartersLocation` VARCHAR(255)  COMMENT '总部位置',
  `resourceRequirements` VARCHAR(255)  COMMENT '技能/资源要求',
  `shareDivision` VARCHAR(255)  COMMENT '股份划分',
  `productType` VARCHAR(255)  COMMENT '产品种类',
  `houseType` VARCHAR(255)  COMMENT '房产类型',
  `projectAdvantage` VARCHAR(255)  COMMENT '项目优势',
  `productCategory` VARCHAR(255)  COMMENT '产品类目',
  `productHighlights` VARCHAR(255)  COMMENT '产品亮点',
  `agentCondition` VARCHAR(255)  COMMENT '代理条件',
  `agencyRule` VARCHAR(255)  COMMENT '代理规则',
  PRIMARY KEY (`releaseId`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;




/*tab3.个人资料表*/
DROP TABLE IF EXISTS `personal`;
CREATE TABLE `personal` (
  `personalId` VARCHAR(100)  NOT NULL  COMMENT '个人资料Id标识',
  `headPortrait` VARCHAR(100)  NOT NULL  COMMENT '头像',
  `fullName` VARCHAR(100) NOT NULL  COMMENT '姓名',
  `region` VARCHAR(255)  COMMENT '地域',
  `autograph` VARCHAR(255)  COMMENT '签名',
  `phone` VARCHAR(11)  COMMENT '手机号',
   estherNumber INT COMMENT '帖子数量',
  PRIMARY KEY (`personalId`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;



/*tab4.信息预览量表*/
DROP TABLE IF EXISTS `previewInformation`;
CREATE TABLE `previewInformation` (
  `previewInformationId` VARCHAR(100)  NOT NULL  COMMENT '信息预览量Id标识',
  `releaseId` VARCHAR(100)  NOT NULL  COMMENT '发布信息id',
  `personalId` VARCHAR(100)  NOT NULL  COMMENT '个人资料Id',
  PRIMARY KEY (`previewInformationId`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;





/*tab5.访问信息时间表*/
DROP TABLE IF EXISTS `accessInformationTime`;
CREATE TABLE `accessInformationTime` (
  `accessInformationTimeId` VARCHAR(100)  NOT NULL  COMMENT '访问信息时间id标识',
  `releaseId` VARCHAR(100)  NOT NULL  COMMENT '发布信息id',
  `personalId` VARCHAR(100)  NOT NULL  COMMENT '个人资料Id',
   accesstime  DATE NOT NULL COMMENT '访问时间',
  PRIMARY KEY (`accessInformationTimeId`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;





/*tab5.筛选类型表*/
DROP TABLE IF EXISTS `filterType`;
CREATE TABLE `filterType` (
  `filterTypeId` VARCHAR(100)  NOT NULL  COMMENT '筛选类型id标识',
  `filterTypeName` VARCHAR(100) NOT NULL  COMMENT '筛选类型名称',
   remark  VARCHAR(255) COMMENT '筛选类型备注',
  PRIMARY KEY (`filterTypeId`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;


/*tab6.筛选类型信息表*/
DROP TABLE IF EXISTS `filterTypeInfo`;
CREATE TABLE `filterTypeInfo` (
  `filterTypeInfoId` VARCHAR(100)  NOT NULL  COMMENT '筛选类型信息id标识',
  `filterTypeId` VARCHAR(100)   NOT NULL  COMMENT '筛选类型id',
  `content` VARCHAR(255) NOT NULL  COMMENT '筛选类型信息内容',
   remark  VARCHAR(255) COMMENT '筛选类型信息备注',
  PRIMARY KEY (`filterTypeInfoId`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;



/*tab7.地址信息表*/
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '行政代码',
  `name` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '名称',
  `parent_id` INT(11) NOT NULL COMMENT '父id',
  `first_letter` VARCHAR(10) NOT NULL DEFAULT '' COMMENT '首字母',
  `level` INT(11) NOT NULL COMMENT '城市等级',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=3186 DEFAULT CHARSET=utf8;


/*tab8.收藏信息表*/
DROP TABLE IF EXISTS `collectionInfo`;
CREATE TABLE `collectionInfo` (
  `collectionInfoId` VARCHAR(100)  NOT NULL  COMMENT '收藏信息id标识',
  `releaseId` VARCHAR(100)  NOT NULL  COMMENT '发布信息id',
  `personalId` VARCHAR(100)  NOT NULL  COMMENT '个人资料Id',
   collectionTime  DATE NOT NULL COMMENT '收藏时间',
   remark VARCHAR(255) COMMENT '收藏备注',
  PRIMARY KEY (`collectionInfoId`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;



/*tab9.评论信息表*/
DROP TABLE IF EXISTS `commentInfo`;
CREATE TABLE `commentInfo` (
  `commentInfoId` VARCHAR(100)  NOT NULL  COMMENT '评论信息id标识',
  `releaseId` VARCHAR(100)  NOT NULL  COMMENT '发布信息id',
  `personalId` VARCHAR(100)  NOT NULL  COMMENT '个人资料Id',
   commentTime  DATE NOT NULL COMMENT '评论时间',
   commentContent VARCHAR(255) COMMENT '评论内容',
   remark VARCHAR(255) COMMENT '评论备注',
  PRIMARY KEY (`commentInfoId`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;



/*tab10.举报类型表*/
DROP TABLE IF EXISTS `reportType`;
CREATE TABLE `reportType` (
  `reportTypeId` VARCHAR(100)  NOT NULL  COMMENT '举报类型id标识',
   reportTitle VARCHAR(100) NOT NULL COMMENT '举报标题',
  PRIMARY KEY (`reportTypeId`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

/*tab11.举报信息表*/
DROP TABLE IF EXISTS `reportInfo`;
CREATE TABLE `reportInfo` (
  `reportInfoId` VARCHAR(100)  NOT NULL  COMMENT '举报信息id标识',
  `releaseId` VARCHAR(100)  NOT NULL  COMMENT '发布信息id',
  `personalId` VARCHAR(100)  NOT NULL  COMMENT '个人资料Id',
   reportTypeId VARCHAR(100)  NOT NULL COMMENT '举报类型id',
   reportTime  DATE NOT NULL COMMENT '举报时间',
   remark VARCHAR(255) COMMENT '举报备注',
  PRIMARY KEY (`reportInfoId`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;






