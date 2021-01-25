const { Router } = require('express')
const Create = require('../models/create')
const User = require('../models/User')
const router = Router()

router.get('/main-new/:id/', async (req, res) => {
    try {
        const news = await Create.findById(req.params.id).lean()
        res.render('main-news.hbs', {
            title: news.title,
            news
        })
        console.log(news)
    } catch (e) {
        console.log(e)
    }
})








module.exports = router