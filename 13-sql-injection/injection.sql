drop database if exists si;
create database si;

use si;

create table users (
  id int primary key auto_increment,
  name char(10) not null,
  pwd char(10) not null
);

insert into users(name, pwd) values('wd', '123');
