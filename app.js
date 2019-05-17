const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const passport = require('passport')
const passport_local = require('passport-local')
const authenticate = require('./lib/login')

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
app.use(passport.initialize())
const LocalStrategy = passport_local.Strategy
passport.use(new LocalStrategy((username, password, done) => {
    const res = authenticate(username, password)
    if(res){
        return done(true)
    }else{
        return done(false)
    }
}))

passport.use(new LocalStrategy((username, password, done) => {
    authenticate({ username: username }, function(err, user) {
        if (err) { return done(err) }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' })
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
    })}
))

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

app.post('/',
    passport.authenticate(authEnv, { successRedirect: '/' })
)

// etc setup
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

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
