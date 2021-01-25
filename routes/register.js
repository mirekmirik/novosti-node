const { Router } = require('express')
const User = require('../models/User')
const router = Router()
const bcrypt = require('bcryptjs')



router.get('/auth/register', async (req, res) => {
    res.render('auth/register.hbs', {
        title: 'Регистрация',
        errorRegister: req.flash('errorRegister')
    })
})

router.post('/auth/register', async (req, res) => {
    try {
        const email = req.body.remail
        const username = req.body.username
        const password = req.body.rpassword



        const candidate = await User.findOne({ email })
        if (candidate) {
            req.flash('errorRegister', 'Пользователь с таким email уже существует')
            res.redirect('/auth/register')
        } else {
            const hashPassword = await bcrypt.hash(password, 11)
            const user = new User({
                email,
                username,
                password: hashPassword
            })
            await user.save()
            res.redirect('/auth/login')
        }
    } catch (e) {
        console.log(e)
    }
})


module.exports = router