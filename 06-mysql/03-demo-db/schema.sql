-- 创建 demo 数据库
drop database if exists `demo`;
create schema `demo` default character set utf8mb4;

use demo;

-- 创建表
drop table if exists `areas`;
create table `areas` (
  `id` int(11) not null auto_increment,
  `area_name` varchar(255) not null comment '地区名',
  primary key (`id`),
  unique key `area_name` (`area_name`)
) engine=innodb default charset=utf8mb4;

drop table if exists `authors`;
create table `authors` (
  `id` int(11) not null auto_increment,
  `author_name` varchar(255) not null,
  primary key (`id`),
  unique key `author_name` (`author_name`)
) engine=innodb default charset=utf8mb4;

drop table if exists `tags`;
create table `tags` (
  `id` int(11) not null auto_increment,
  `tag_name` varchar(255) not null comment '分类名',
  primary key (`id`),
  unique key `tag_name` (`tag_name`)
) engine=innodb default charset=utf8mb4;

drop table if exists `books`;
create table `books` (
  `id` int(11) not null auto_increment,
  `unique_id` varchar(255) not null comment '漫画拼音名称标识',
  `book_name` varchar(255) not null comment '漫画名',
  `last_time` varchar(255) default '' comment '最后更新时间',
  `tags` varchar(255) default '' comment '分类',
  `summary` text comment '简介',
  `end` int(4) default '0' comment '0 为连载，1 为完结',
  `area_id` int(11) not null comment '漫画所属地区',
  `is_top` int(4) not null comment '是否推荐',
  primary key (`id`),
  unique key `unique_id` (`unique_id`),
  key `area_id` (`area_id`),
  key `tags` (`tags`) using btree,
  key `end` (`end`) using btree,
  key `is_top` (`is_top`) using btree,
  key `book_name` (`book_name`) using btree,
  fulltext key `fidx` (`book_name`,`summary`)
) engine=innodb default charset=utf8mb4;

drop table if exists `author_books`;
create table `author_books` (
  `id` int(11) not null auto_increment,
  `author_id` int(11) not null,
  `book_id` int(11) not null,
  primary key (`id`),
  key `author_id` (`author_id`),
  key `book_id` (`book_id`)
) engine=innodb default charset=utf8mb4;

-- 添加外键
alter table `books` 
add constraint `books_ibfk_1`
  foreign key (`area_id`)
  references `areas` (`id`)
  on delete cascade
  on update cascade;

alter table `author_books` 
add constraint `author_books_ibfk_1`
  foreign key (`author_id`)
  references `authors` (`id`)
  on delete cascade
  on update cascade;

alter table `author_books` 
add constraint `author_books_ibfk_2`
  foreign key (`book_id`)
  references `books` (`id`)
  on delete cascade
  on update cascade;
