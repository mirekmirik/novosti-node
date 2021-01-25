const { Router } = require('express')
const router = Router()
const Otzivi = require('../models/Otzivi')
const User = require('../models/User')
const auth = require('../middleware/auth')

router.get('/otzivi', auth, async (req, res) => {
    const otzivi = await Otzivi.find().sort({ date: -1 }).lean()
    res.render('otzivi.hbs', {
        title: 'Отзывы',
        isOtzivi: true,
        otzivi
    })
    console.log(otzivi)
})


router.post('/otzivi', async (req, res) => {
    try {
        const otzivi = new Otzivi({
            desc: req.body.desc,
            date: req.date,
            name: req.body.name
        })
        await otzivi.save().then(() => console.log('Успешно добавлено в БД'))
        res.redirect('back')
    } catch (e) {
        console.log(e)
        res.status(400)
        res.json({
            message: 'error'
        })
    }

})

router.post('/otzivi-delete', async (req, res) => {
    try {
        await Otzivi.findByIdAndDelete(req.body.id)
        res.redirect('back')
        res.status(200)
    } catch (e) {
        console.log(e)
    }
})




module.exports = router