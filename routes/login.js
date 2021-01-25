const { Router } = require('express')
const User = require('../models/User')
const router = Router()
const bcrypt = require('bcryptjs')


router.get('/auth/login', async (req, res) => {
    res.render('auth/login.hbs', {
        title: 'Авторизация',
        errorLogin: req.flash('errorLogin')
    })
})


router.post('/auth/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        // if (req.body.email == 'benya.senya.16@gmail.com') {
        //     const admin = await User.findOne({ email })
        //     if (admin) {
        //         const areSame = await bcrypt.compare(password, admin.password)
        //         if (areSame) {
        //             const user = admin
        //             req.session.user = user
        //             req.session.isAuthenticated = true
        //             req.session.save(err => {
        //                 if (err) {
        //                     throw err
        //                 }
        //                 res.redirect('/')
        //             })
        //         }
        //     }
        // }









        const candidate = await User.findOne({ email })
        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)
            if (areSame) {
                const user = candidate
                req.session.user = user
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    res.redirect('/')
                })
            } else {
                req.flash('errorLogin', 'Неверный пароль')
                res.redirect('/auth/login')
            }
        } else {
            req.flash('errorLogin', 'Такого пользователя не существует')
            res.redirect('/auth/login')
        }
    } catch (e) {
        console.log(e)
    }

}
)

module.exports = router