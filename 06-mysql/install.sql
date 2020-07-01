DROP DATABASE IF EXISTS `demo`;
CREATE SCHEMA `demo` DEFAULT CHARACTER SET utf8mb4;

USE demo;

DROP TABLE IF EXISTS `areas`;
CREATE TABLE `areas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area_name` varchar(255) NOT NULL COMMENT '地区名',
  PRIMARY KEY (`id`),
  UNIQUE KEY `area_name` (`area_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `authors`;
CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `author_name` (`author_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) NOT NULL COMMENT '分类名',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_name` (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(255) NOT NULL COMMENT '漫画拼音名称标识',
  `book_name` varchar(255) NOT NULL COMMENT '漫画名',
  `nick_name` varchar(255) DEFAULT '' COMMENT '别名',
  `last_time` int(11) DEFAULT '0' COMMENT '最后更新时间',
  `tags` varchar(255) DEFAULT '' COMMENT '分类',
  `summary` text COMMENT '简介',
  `end` int(4) DEFAULT '0' COMMENT '0 为连载，1 为完结',
  `author_id` int(11) NOT NULL COMMENT '作者 ID',
  `area_id` int(11) NOT NULL COMMENT '漫画所属地区',
  `is_top` int(4) NOT NULL COMMENT '是否推荐',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_id` (`unique_id`),
  KEY `area_id` (`area_id`),
  KEY `tags` (`tags`) USING BTREE,
  KEY `end` (`end`) USING BTREE,
  KEY `author_id` (`author_id`) USING BTREE,
  KEY `is_top` (`is_top`) USING BTREE,
  KEY `book_name` (`book_name`) USING BTREE,
  FULLTEXT KEY `fidx` (`book_name`,`summary`,`nick_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `author_books`;
CREATE TABLE `author_books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  KEY `book_id` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `demo`.`books` 
ADD CONSTRAINT `books_ibfk_1`
  FOREIGN KEY (`area_id`)
  REFERENCES `demo`.`areas` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `demo`.`author_books` 
ADD CONSTRAINT `author_books_ibfk_1`
  FOREIGN KEY (`author_id`)
  REFERENCES `demo`.`authors` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `demo`.`author_books` 
ADD CONSTRAINT `author_books_ibfk_2`
  FOREIGN KEY (`book_id`)
  REFERENCES `demo`.`books` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
