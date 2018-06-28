INSERT INTO have (user_id, long, lat, name) VALUES ($1, $2, $3, $4);
SELECT * FROM have WHERE user_id = $1;