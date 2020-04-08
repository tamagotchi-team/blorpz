UPDATE blorpz
SET hunger = ${hunger},
    awake = ${anger},
    happy = ${awake},
    poo = ${poo},
    age = ${age},
    alive = ${alive}
WHERE blorp_id = ${blorp_id}
RETURNING hunger, 
    awake, 
    happy, 
    poo, 
    age, 
    alive;
