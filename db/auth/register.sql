INSERT INTO users (
    username,
    hash
)

VALUES (
    ${username},
    ${hash}
)

RETURNING username;