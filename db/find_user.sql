select username, password, id, profile_pic
from users
where username = $1;
