-- 查看有哪些可用的数据库
show databases;

-- 创建 test 数据库
drop database if exists test;
create database test default character set utf8mb4;
show databases;

-- 使用 test 数据库，否则操作的时候需要指定数据库的名字
use test;

-- 在 test 数据库中，创建表 areas
drop table if exists areas;
create table areas (
  id int(11) not null auto_increment,
  area_name varchar(255) not null comment '地区名',
  primary key (id),
  unique key area_name (area_name)
) engine=innodb default charset=utf8mb4;

-- 检查表是否创建成功
show tables;

-- 查看表结构
describe areas;

-- 在 areas 表中插入漫画书的区域数据
insert into areas(area_name) values('港台'), ('日韩'), ('大陆'), ('欧美'), ('英国');

-- 检查是否插入成功
select * from areas;

-- 删除一条记录
delete from areas where area_name = '英国';

-- 检查删除是否成功
select * from areas;

-- 修改一条记录
update areas set area_name = '港澳台' where area_name = '港台';

-- 检查修改是否成功
select * from areas;
