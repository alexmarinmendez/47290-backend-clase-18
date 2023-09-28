import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import userRouter from './routers/user.router.js'

const app = express()

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017',
        dbName: 'sessions'
    }),
    secret: 'victoriasecret',
    resave: true,
    saveUninitialized: true
}))

app.use('/', userRouter)

app.listen(8080, () => console.log('Server Up'))