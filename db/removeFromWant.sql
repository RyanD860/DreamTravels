DELETE FROM want WHERE id = $1;
SELECT * FROM want WHERE user_id = $2;