const express = require('express');
const router = express.Router();
const verification = require('../verification/login')
// 获取登录控制器
const controller = require('../controller/login')

router.post('/', verification.login, controller.login)

module.exports = router