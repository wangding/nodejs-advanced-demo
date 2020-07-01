-- 探索数据库
show databases;

-- 创建 test 数据库
drop database if exists test;
create schema test default character set utf8mb4;
show databases;

-- 使用 test 数据库，否则操作的时候需要制定数据库的名字
use test;

-- 在 test 数据库中，创建表 areas
drop table if exists areas;
create table areas (
  id int(11) not null auto_increment,
  area_name varchar(255) not null comment '地区名',
  primary key (id),
  unique key area_name (area_name)
) engine=innodb default charset=utf8mb4;

show tables;
describe areas;

-- 在 areas 表中插入漫画书的区域数据
insert into areas(area_name) values('港台'), ('日韩'), ('大陆'), ('欧美');
insert into areas(area_name) values('英国');

select * from areas;

delete from areas where area_name = '英国';

select * from areas;

update areas set area_name = '港澳台' where area_name = '港台';

select * from areas;
