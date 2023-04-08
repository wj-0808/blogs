const express = require('express');
const router = express.Router();
// 验证
const verification = require('../verification/login')
// 控制器
const controller = require('../controller/login')

router.post('/', verification.login, controller.login)

module.exports = router