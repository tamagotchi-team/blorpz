UPDATE blorpz
SET hunger = ${hunger},
    awake = ${awake},
    happy = ${happy},
    poo = ${poo},
    age = ${age},
    alive = ${alive}
WHERE blorp_id = ${blorp_id};

SELECT hunger, awake, happy, poo, age, alive 
FROM blorpz 
WHERE blorp_id = ${blorp_id};