const { Router } = require('express')
const Create = require('../models/create')
const router = Router()
const auth = require('../middleware/auth')


router.get('/create-news', auth, (req, res) => {
    res.render('create-news.hbs', {
        title: 'Создать новость',
        isCreate: true
    })
})


router.post('/create-news', auth, async (req, res) => {
    const news = new Create({
        img: req.body.img,
        imgDownload: req.body.imgDownload,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
    })

    try {
        await news.save().then(() => console.log('Post has been saved'))
        res.redirect('/')
    } catch (e) {
        console.log(e)
    }
})




module.exports = router