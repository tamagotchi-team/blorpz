const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        // console.log(chalk.red("hit register", req.body));
        const db = req.app.get("db").auth;
        const { username, password } = req.body;

        let user = await db.check_user(username);
        user = user[0];
        if (user) {
            return res.status(400).send("User already exists");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        try {
            let newUser = await db.register({ hash, username });
            newUser = newUser[0];
            req.session.user = newUser;
            return res.status(201).send(req.session.user);
        } catch (err) {
            return res.sendStatus(500);
        }
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

        const authenticated = bcrypt.compareSync(password, user.password)
        if (authenticated) {
            delete user.password
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