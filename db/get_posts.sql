select u.id, p.author_id, p.title, u.username,
from posts p
join users u on p.author_id = u.id