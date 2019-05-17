const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// ルーティング
router.get('/', userController.doGetUser)

module.exports = router
