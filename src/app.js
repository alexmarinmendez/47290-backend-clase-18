import express from 'express'
import session from 'express-session'
import FileStore from 'session-file-store'

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

const auth = (req, res, next) => {
    if (req.session.user?.role === 'admin') {
        next()
    } else {
        res.send('Not allowed!')
    }
}

app.get('/', (req, res) => {
    //despues de hacer la verificacion en la base de datos
    //se identifica al user como 'alexmarinmendez' de rol 'user'
    const user = {
        username: 'alexmarinmendez',
        role: 'admin'
    }
    req.session.user = user
    res.send('ok')
})

app.get('/private', auth, (req, res) => {
    res.send('Bienvenido!')
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Logout error')
        return res.send('Logout ok')
    })
})

app.listen(8080, () => console.log('Server Up'))