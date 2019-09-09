select u.id, p.author_id, p.title, u.username,u.profile_pic
from posts p
join users u on p.author_id = u.id
where p.author_id != $1