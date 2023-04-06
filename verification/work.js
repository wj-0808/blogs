const { body, param } = require('express-validator')
// 验证
const validations = require('../util/verification')
const { Work } = require('../model')
const mongoose = require('mongoose')
// 是否为mongooes识别的id
const isMongoId = () => {
    return async id => {
        if (!mongoose.isValidObjectId(id)) return Promise.reject('ID类型不正确')
    }
}

exports.create = validations([
    body("title").notEmpty().withMessage('作品标题不能为空').bail().isString().withMessage("作品标题要为字符串类型"),
    body("description").notEmpty().withMessage('作品描述不能为空').bail().isString().withMessage("作品描述要为字符串类型"),
    body("workUrl").notEmpty().withMessage('作品地址能为空').bail().isString().withMessage("作品地址为字符串类型"),
])

exports.judgeId = validations([
    param("id").notEmpty().withMessage("作品Id不能为空").bail().custom(isMongoId())
])