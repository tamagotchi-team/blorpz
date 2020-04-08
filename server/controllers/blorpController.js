
module.exports = {

    createBlorp: (req, res) => {
        const db = req.app.get('db').blorpz

        const { name, picture, hunger, awake, happy, poo, age, alive } = req.body
        const { user_id } = req.params

        console.log("hit create", req.body)

        db.create_blorp([user_id, name, picture, hunger, awake, happy, poo, age, alive])
            .then(() => {
                res.sendStatus(201)
            })
            .catch((err) => {
                res.sendStatus(500)
            })
    },

    feedBlorp: (req, res) => {
        const dbObj = req.app.get('db')
        const { blorp_id } = req.params

        console.log('hit feed blorp')

        dbObj.blorpz.feed_blorp({blorp_id})
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(() => {
            res.sendStatus(500)
        })
    },

    scoopPoop: (req, res) => {
        const dbObj = req.app.get('db')
        const { blorp_id } = req.params
        
        console.log('hit scoop poop')
        
        dbObj.blorpz.scoop_poop({blorp_id})
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(() => {
            res.sendStatus(500)
        })
    }
}