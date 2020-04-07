
module.exports = {

    createBlorp: (req, res) => {
        const db = req.app.get('db').blorpz

        const { name, picture, hunger, awake, happy, poo, age, alive } = req.body
        const { user_id } = req.params


        db.create_blorp([user_id, name, picture, hunger, awake, happy, poo, age, alive])
            .then(() => {
                res.sendStatus(201)
            })
            .catch((err) => {
                res.sendStatus(500)
            })
    }


}