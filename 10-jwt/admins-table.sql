use demo;

drop table if exists `admins`;
create table `admins` (
  `id` int(11) not null auto_increment,
  `user_name` varchar(255) not null,
  `password` varchar(255) not null,
  `last_login_time` int(11) default '0',
  `last_login_ip` varchar(255) default '',
  primary key (`id`),
  unique key `user_name` (`user_name`)
) engine=innodb default charset=utf8mb4;

insert into admins (user_name, password)
values ('admin', 'ddd');
