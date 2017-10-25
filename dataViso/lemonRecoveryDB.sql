/**
* database lemonRecoveryDB 柠檬回收
* visor 1.0
* athor lingfe
*/

/*创建数据库*/
CREATE DATABASE lemonRecoveryDB;
USER lemonRecoveryDB;


/*预约表*/
DROP TABLE IF EXISTS lemonRecovery;
CREATE TABLE lemonRecovery(
	id VARCHAR(32) NOT NULL COMMENT '预约表id标识',
	personalId VARCHAR(255) NOT NULL COMMENT '用户id',
	doorTime VARCHAR(255) NOT NULL COMMENT '上门时间',
	yuyueAdress VARCHAR(255) NOT NULL COMMENT '预约地点',
	adressInfo VARCHAR(255) NOT NULL COMMENT '详细地址',
	cellYou VARCHAR(255) NOT NULL COMMENT '对您称呼',
	phone VARCHAR(255) NOT NULL COMMENT '联系电话',
	
  `cdate` DATETIME DEFAULT NULL COMMENT '创建时间',
  `mdate` DATETIME DEFAULT NULL COMMENT '最后修改时间',
  `creator` VARCHAR(32) DEFAULT NULL COMMENT '创建人',
  `uman` VARCHAR(32) DEFAULT NULL COMMENT '修改人',
  `df` INT(11) DEFAULT '0' COMMENT '是否删除',
  `version` INT(11) DEFAULT '0' COMMENT '数据版本',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;
