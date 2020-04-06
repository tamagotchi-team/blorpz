UPDATE blorpz
SET hunger = ${hunger} - 1 AND happy = ${happy} + 1
WHERE blorp_id = ${blorp_id} AND hunger >=0;
