import { Router } from 'express'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', (req, res) => {
    //despues de hacer la verificacion en la base de datos
    //se identifica al user como 'alexmarinmendez' de rol 'user'
    const user = {
        username: 'alexmarinmendez',
        role: 'admin'
    }
    req.session.user = user
    res.send('ok')
})

router.get('/private', auth, (req, res) => {
    res.send('Bienvenido!')
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send('Logout error')
        return res.send('Logout ok')
    })
})

export default router