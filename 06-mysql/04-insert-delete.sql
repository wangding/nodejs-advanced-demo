use demo;

select * from books where book_name like '%龙珠%';
delete from books where unique_id = 'long-zhu';

-- 插入操作，数据类型不合法
insert into books
(unique_id, book_name, tags, `end`, area_id, is_top, summary)
values
('long-zhu', '龙珠', '热血', 'abc', 2, 1, '很久很久以前，地球上散落着七颗神奇的龙珠，传说只要聚齐它们，神龙就会出现，并可以为人实现一个愿望。为了寻找龙珠，布尔玛和孙悟空踏上了奇妙的寻珠之旅……');

-- 插入操作，外键字段取值不合法
insert into books
(`unique_id`,`book_name`,`tags`,`end`,`area_id`,`is_top`, `summary`)
values
('long-zhu', '龙珠', '热血', 1, 5, 1, '很久很久以前，地球上散落着七颗神奇的龙珠，传说只要聚齐它们，神龙就会出现，并可以为人实现一个愿望。为了寻找龙珠，布尔玛和孙悟空踏上了奇妙的寻珠之旅……');

-- 插入操作，数据重复
select * from areas;
insert into areas(area_name) values('港台');

-- 级联删除
select count(id) from books;
select count(id) from books where area_id = 4;
select * from areas;

delete from areas where id = 4;
