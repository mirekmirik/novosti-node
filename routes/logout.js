const { Router } = require('express')
const router = Router()





router.get('/auth/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })

})







module.exports = router