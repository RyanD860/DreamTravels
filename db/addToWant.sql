INSERT INTO want (user_id, long, lat, name) VALUES ($1, $2, $3, $4);
SELECT * FROM want WHERE user_id = $1;