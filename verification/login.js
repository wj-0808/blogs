const { body } = require('express-validator')
// 验证
const validations = require('../util/verification')

exports.login = validations([body('password').notEmpty().withMessage('密码不能为空')])