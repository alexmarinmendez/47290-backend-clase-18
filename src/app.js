import express from 'express'
import session from 'express-session'
import FileStore from 'session-file-store'
import userRouter from './routers/user.router.js'

const app = express()
const fileStore = new FileStore(session)

app.use(session({
    store: new fileStore({
        path: './sessions'
    }),
    secret: 'victoriasecret',
    resave: true,
    saveUninitialized: true
}))

app.use('/', userRouter)

app.listen(8080, () => console.log('Server Up'))