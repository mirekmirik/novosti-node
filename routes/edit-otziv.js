const { Router } = require('express')
const router = Router()
const Otzivi = require('../models/Otzivi')
const User = require('../models/User')
const auth = require('../middleware/auth')


router.get('/edit-otziv/:id', async (req, res) => {
    const otziv = await Otzivi.findById(req.params.id).lean()
    res.render('edit-otziv.hbs', {
        title: `Редактировать ${otziv.desc}`,
        isEditOtziv: true,
        otziv,
    })
})


router.post('/edit-otziv', async (req, res) => {
    try {
        const otzivEdit = await Otzivi.findByIdAndUpdate(req.body.id, req.body)
        res.redirect('/otzivi')
    } catch (e) {
        console.log(e)
    }

})


module.exports = router

