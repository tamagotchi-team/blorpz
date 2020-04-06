CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    hash VARCHAR(255)
);

CREATE TABLE blorpz (
    blorp_id SERIAL PRIMARY KEY,
    blorp_name VARCHAR(20),
    hunger INT,
    awake BOOLEAN,
    happy INT,
    poo INT,
    age INT,
    alive BOOLEAN,
    picture VARCHAR(250),
    user_id INT REFERENCES users(user_id)
);