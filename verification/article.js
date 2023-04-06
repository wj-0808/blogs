const { body, param } = require('express-validator')
// 验证
const validations = require('../util/verification')
const mongoose = require('mongoose')
// 是否为mongooes识别的id
const isMongoId = () => {
    return async id => {
        if (!mongoose.isValidObjectId(id)) return Promise.reject('ID类型不正确')
    }
}

exports.create = validations([
    body("title").notEmpty().withMessage('文章标题不能为空').bail().isString().withMessage("文章标题要为字符串类型"),
    body("body").notEmpty().withMessage('文章内容不能为空').bail().isString().withMessage("文章内容要为字符串类型"),
    body("description").notEmpty().withMessage('文章描述不能为空').bail().isString().withMessage("文章描述要为字符串类型"),
    body("cate_id1").notEmpty().withMessage('一级目录不能为空').bail().custom(isMongoId()),
    body("cate_id2").notEmpty().withMessage('二级目录不能为空').bail().custom(isMongoId()),
])

exports.judgeId = validations([
    param("id").notEmpty().withMessage("文章Id不能为空").bail().custom(isMongoId())
])