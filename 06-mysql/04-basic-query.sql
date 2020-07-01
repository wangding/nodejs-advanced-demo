use demo;

-- 分页查询
select * from books;
select * from books order by id;
select * from books order by id limit 10;
select * from books order by id limit (3-1)*10, 10;

-- 按名称查询
select * from books where book_name = '龙珠';
select * from books where book_name like '%龙珠%';

-- 按题材查询
select * from books where tags = '热血';
select * from books where tags like '%热血%';
select * from books where tags like '%热血';
select * from books where tags like '热血%';

-- 按地区查询
select * from books where area_id = 3;
select * from books where area_id != 3;
select * from books where area_id != 3 order by id limit 68, 10;

-- 按进度查询
select * from books where `end` = 1;

-- 按字母查询
select * from books where unique_id like 'h%';

-- 按推荐查询
select * from books where is_top = 1;
