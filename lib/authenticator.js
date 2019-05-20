const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const login = require('./login')
const authenticate = require('../lib/login')

class Authenticator {
    static initialize(app) {
        app.use(passport.initialize())

        // セッション管理
        app.use(passport.session())
        passport.serializeUser(this._serialize)
        passport.deserializeUser(this._deserialize)
    }

    /**
     * Strategy(認証方式)の設定
     */
    static setStrategy() {
        const strategy = new LocalStrategy(
            {
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true,
                session: false,
            },
            (req, username, password, done) => {
                // 認証処理
                const res = authenticate(username, password)
                if(res){
                    return done(null, username, { message: '成功' })
                }else{
                    return done(null, false, { message: 'ユーザーIDかパスワードが間違っています。' })
                }
            }
        )
        passport.use(strategy)
    }

    /**
     * 認証処理
     */
    static authenticate(req, res, next) {
        passport.authenticate('local', {
            // ログインに成功した時のリダイレクト先
            successRedirect: '/dashboard',
            // ログインに失敗した時のリダイレクト先と表示メッセージ
            failureRedirect: '/'
        })(req, res, next)
    }

    /**
     * ログイン済みかの確認
     * ルーチェング時にミドルウェアとして使用
     */
    static isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            // ログイン画面にリダイレクト
            return res.redirect('/')
        }
    }

    /**
     * シリアライズ処理
     */
    static _serialize(user, done){
        return done(null, user)
    }

    /**
     * デシリアライズ処理
     */
    static _deserialize(serializedUser, done){
        return done(null, serializedUser)
    }

    static _login(username, password){
        return new Promise((resolve,reject) => {
            // ログイン処理
            resolve(true)
        })
    }
}

module.exports = Authenticator
