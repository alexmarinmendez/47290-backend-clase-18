import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser())

app.get('/', (req, res) => {
    //despues de hacer la verificacion en la base de datos
    //se identifica al user como 'alexmarinmendez' de rol 'user'
    const user = {
        username: 'alexmarinmendez',
        role: 'user'
    }
    res.cookie('user', user).send('ok')
})

app.get('/private', (req, res) => {
    if (req.cookies.user?.role === 'admin') {
        res.send('Bienvenido!')
    } else {
        res.send('Not allowed!')
    }
})

app.get('/logout', (req, res) => {
    res.clearCookie('user').send('ok')
})

app.listen(8080, () => console.log('Server Up'))