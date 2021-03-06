require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const checkUser = require('./middleware/checkUser')
const authCtrl = require('./controllers/authController')
const blorpCtrl = require('./controllers/blorpController')
const deadBlorpCtrl = require('./controllers/deadBlorpzCtrl')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const app = express()
app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: SESSION_SECRET
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('||-----DATABASE IS HERE TO PARTY---||')
    app.listen(SERVER_PORT, () => console.log(`||----SERVER RUNNING ON ${SERVER_PORT}----||`))
})

// Auth Endpoints
app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.post('/api/logout', authCtrl.logout)
app.get('/api/check', checkUser)

// Blorp Endpoints 
app.put('/api/blorp/:blorp_id', blorpCtrl.updateBlorp)

// id is user id
app.post('/api/blorp/:user_id', blorpCtrl.createBlorp)
app.get('/api/blorp/:user_id', blorpCtrl.getBlorp)

//Graveyard Endpoints
app.get('/api/deadBlorpz/:user_id', deadBlorpCtrl.getDead)