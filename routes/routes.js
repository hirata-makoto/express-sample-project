const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const Authenticator = require("../lib/authenticator")

/**
 * 各ルーティング
 */

// ログインページ
router.get('/', UserController.topPage)

// ログイン
router.post('/login', (req, res, next) => {
    Authenticator.authenticate(req, res, next)
})

// ログアウト
router.get('/logout', (req, res, next) => {
    req.logout()
    delete req.session.user
    res.redirect('/')
})

// ダッシュボード
// ミドルウェアでログイン済みかどうかチェック
router.get('/dashboard', Authenticator.isAuthenticated, UserController.dashboard)

module.exports = router
