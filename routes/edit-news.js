const { Router } = require('express')
const router = Router()
const Create = require('../models/create')
const auth = require('../middleware/auth')



router.get('/edit-news/:id/', auth, async (req, res) => {
    const news = await Create.findById(req.params.id).lean()
    res.render('edit-news.hbs', {
        title: `Редактировать ${news.title}`,
        isEdit: true,
        news
    })
})


router.post('/edit-news', auth, async (req, res) => {
    try {
        await Create.findByIdAndUpdate(req.body.id, req.body)
        res.redirect('/')
    } catch (e) {
        console.log(e)
    }

})




module.exports = router