UPDATE blorpz
SET hunger = $2,
    awake = $3,
    happy = $4,
    age = $5,
    alive = $6
WHERE blorp_id = $1;
