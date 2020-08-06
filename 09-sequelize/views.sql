use demo;

drop view if exists book_stat_area_views;
create view book_stat_area_views
as
select a.id, a.area_name, an.count
from (
  select area_id, count(id) as count
  from books
  group by area_id) as an
join areas as a
on a.id = an.area_id
order by a.id;

drop view if exists book_views;
create view book_views
as
select
  bk.id,
  bk.unique_id,
  bk.book_name,
  group_concat(bk.author_name separator ', ') as author_name,
  bk.last_time,
  bk.tags,
  bk.summary,
  bk.`end`,
  bk.area_name,
  bk.is_top
from (
  select b.id, unique_id, book_name, last_time, tags, summary, `end`, is_top, ar.area_name, a.author_name
  from books as b
  join author_books as ab
  on b.id = ab.book_id
  join authors as a
  on ab.author_id = a.id
  join areas as ar
  on b.area_id = ar.id) as bk
group by bk.id
order by bk.id;
