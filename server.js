require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const path = require('path')
const flash = require('connect-flash')
const exhbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const routeHome = require('./routes/home')
const routeCreateNews = require('./routes/create-news')
const mainNews = require('./routes/main-news')
const routeEditNews = require('./routes/edit-news')
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const varMiddleware = require('./middleware/variables')
const logoutRoute = require('./routes/logout')
const otziviRoute = require('./routes/otzivi')
const otziviEditRoute = require('./routes/edit-otziv')

const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}))




app.use(varMiddleware)


app.use(flash())

app.use(routeHome)
app.use(routeCreateNews)
app.use(routeEditNews)
app.use(mainNews)
app.use(registerRoute)
app.use(loginRoute)
app.use(logoutRoute)
app.use(otziviRoute)
app.use(otziviEditRoute)


async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log(`server has been started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e, 'error')
    }
}

start()