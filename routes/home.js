const { Router } = require('express')
const router = Router()
const Create = require('../models/create')


router.get('/', async (req, res) => {
    const news = await Create.find().lean()
    res.render('home.hbs', {
        title: 'Новости VALORANT',
        news
    })
})

router.post('/', async (req, res) => {
    try {
        await Create.findByIdAndDelete(req.body.id)
        res.status(200)
        res.redirect('/')
    } catch (e) {
        console.log(e)
        res.json({ message: e.message })
    }

})





module.exports = router