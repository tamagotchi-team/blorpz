const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        console.log('hit register')
        const { username, password } = req.body
        const { session } = req
        const db = req.app.get('db')

        let user = await db.auth.check_user([username])
        user = user[0]
        if (user) {
            return res.status(400).send('Username already exists')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let newUser = await db.auth.register({ username, hash })
        newUser = newUser[0]
        session.user = newUser
        res.status(201).send(session.user)
    },
    login: async (req, res) => {
        const { username, password } = req.body
        const { session } = req
        const db = req.app.get('db')

        let user = await db.auth.check_user([username])
        user = user[0]
        if (!user) {
            return res.status(400).send('Username not found')
        }

        const authenticated = bcrypt.compareSync(password, user.user_password)
        if (authenticated) {
            delete user.user_password
            session.user = user
            console.log(session.user)
            res.status(202).send(session.user)
        } else {
            res.status(401).send('Incorrect username or password')
        }
    },
    logout: (req, res) => {
        if (req.session) {
            req.session.destroy()
        }
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        res.status(200).send(req.session.user)
    }
}