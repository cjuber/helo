select u.id, p.author_id, p.title, u.username,u.profile_pic
from posts p
join users u on p.author_id = u.id
where title like '%$2%' and author_id != $1