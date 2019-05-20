const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const Authenticator = require('./lib/authenticator')
const flash = require("connect-flash");

// router
const router = require('./routes/routes.js')

// express
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// logging setup
app.use(logger('dev'))

// session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
        secure: false,
        maxage: 1000 * 60 * 30
    }
}))

// passport
Authenticator.initialize(app)
Authenticator.setStrategy()

// etc setup
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// app.use(flash())

// routing
app.use('/', router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
