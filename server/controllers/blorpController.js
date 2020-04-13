
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
    },

    getBlorp: async (req, res) => {
        const db = req.app.get('db').blorpz
        const { user_id } = req.params

        db.get_blorp([user_id])
            .then((blorp) => {
                res.status(200).send(blorp)
            })
            .catch((err) => {
                res.sendStatus(500)
            })
    },

    updateBlorp: (req, res) => {
        const { blorp_id } = req.params
        const { hunger, awake, happy, age, alive } = req.body
        const dbObj = req.app.get('db').blorpz

        dbObj.update_blorp([blorp_id, hunger, awake, happy, age, alive])
            .then((data) => {
                console.log(data)
                res.status(200).send(data)
            })
            .catch(() => {
                res.sendStatus(500)
            })
    },

}