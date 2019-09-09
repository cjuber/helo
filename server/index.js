require('dotenv').config()
const express = require('express')
const cors = require('cors')
const massive = require('massive')
const chalk = require('chalk')
const session = require('express-session')

const ctrl = require('./controller')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 6000000
    }
}))

massive(CONNECTION_STRING)
.then(dbInstance =>{
    app.set('db', dbInstance);
    console.log(chalk.yellow.bgBlue('Database Connected'))
})
.catch(error =>{
    console.log(chalk.black.bgRed('Database Error'))
    console.log(error)
})

app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.delete('/auth/logout', ctrl.logout)

app.get('/api/posts', ctrl.getPosts)
app.get('/api/posts/:id/:search', ctrl.getPostTrueSearch)
app.get('/api/posts/id/:search',ctrl.getPostFalseSearch)
app.get('/api/posts/:id', ctrl.getPostTrueNoSearch)

app.post('/api/post/:id', ctrl.makePost)


app.listen(SERVER_PORT, () =>{
    console.log(chalk.yellow.bgBlue('Server Running'))
})

