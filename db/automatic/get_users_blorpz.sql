SELECT * FROM blorpz b
JOIN user_id u ON b.user_id = u.user_id
WHERE user_id = ${user_id} AND b.alive = true;