require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const app = express()
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const authCtrl = require('./controllers/authController')

app.use(express.json)

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000*60*60*24},
        secret: SESSION_SECRET
    })
)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    const port = SERVER_PORT
    app.set('db', db)
    app.listen(port || 4020, () => console.log(`Server runnning on port: ${port}`))
    console.log('DB Connected')
})