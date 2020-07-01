use demo;

-- 按地区统计
select area_id, id
from books;

select area_id, count(id) as count
from books
group by area_id;

-- 按进度统计
select `end`, count(id) as count
from books
group by `end`;

-- 按推荐统计
select is_top, count(id) as count
from books
group by is_top;

-- 按题材统计
select 'one tag' as 'tag', count(id) as count
from books
where tags not like '%|%'
union
select 'more tags' as 'tag', count(id) as count
from books
where tags like '%|%';

-- books 表中加上区域名称
-- 多表联合查询，两个表连接
select b.id, unique_id, book_name, area_name
from books as b
join areas as a
on b.area_id = a.id;

--books 表中加上作者 id
-- 多表联合查询，两个表连接
select b.id, unique_id, book_name, a.author_id
from books as b
join author_books as a
on b.id = a.book_id;

-- books 表中加上作者名称
-- 多表联合查询，三个表连接
select b.id, unique_id, book_name, a.author_name
from books as b
join author_books as ab
on b.id = ab.book_id
join authors as a
on ab.author_id = a.id;

-- 按地区统计
-- 多表联合查询 join，子查询
select a.area_name, an.count
from (
	select area_id, count(id) as count
	from books
	group by area_id) as an
join areas as a
on a.id = an.area_id
order by a.id;

-- books 表添加地区字段，添加作者名称汇总字段
-- 多表联合查询，子查询，分组汇总
select bk.id, bk.unique_id, bk.book_name, bk.area_name, group_concat(bk.author_name separator ', ') as author_name
from (
	select b.id, ar.area_name, unique_id, book_name, a.author_name
	from books as b
	join author_books as ab
	on b.id = ab.book_id
	join authors as a
	on ab.author_id = a.id
  join areas as ar
  on b.area_id = ar.id) as bk
group by bk.id;
