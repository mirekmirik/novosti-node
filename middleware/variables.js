module.exports = function (req, res, next) {
    res.locals.isAuth = req.session.isAuthenticated
    next()
}

// module.exports = function (req, res, next) {
//     res.locals.isAdmin = req.session.isAuthAdmin
// }