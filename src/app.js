import express from 'express'
import session from 'express-session'

const app = express()
app.use(session({
    secret: 'victoriasecret',
    resave: true,
    saveUninitialized: true
}))

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

app.get('/private', (req, res) => {
    if (req.session.user?.role === 'admin') {
        res.send('Bienvenido!')
    } else {
        res.send('Not allowed!')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Logout error')
        return res.send('Logout ok')
    })
})

app.listen(8080, () => console.log('Server Up'))