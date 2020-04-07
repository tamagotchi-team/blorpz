INSERT INTO users (
    username,
    password
)

VALUES (
    ${username},
    ${hash}
)

RETURNING user_id, username;