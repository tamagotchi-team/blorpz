module.exports = {
    getDead: (req, res) => {
        const db = req.app.get('db').blorpz

        const { user_id } = req.params

        db.get_dead_blorp([user_id]).then((blorp) => {
            res.status(200).send(blorp)
        }).catch((err) => {
            res.sendStatus(500)
        })
    }
}