const { body, param } = require('express-validator')
// 验证
const validations = require('../util/verification')
const { Category } = require('../model')
const mongoose = require('mongoose')
// 是否为mongooes识别的id
const isMongoId = () => {
    return async id => {
        if (!mongoose.isValidObjectId(id)) return Promise.reject('ID类型不正确')
    }
}
// 是否存在该类目
const isHas = async (req, res, next) => {
    const id = req.params.id
    const category = await Category.findById(id)
    if (!category) return res.status(404).end('该类目不存在');
    next()
}

exports.create = validations([
    body("name").notEmpty().withMessage('类目名不能为空').bail().isString().withMessage("类目名要为字符串类型")
])

exports.update = [validations([
    body("name").notEmpty().withMessage('类目名不能为空').bail().isString().withMessage("类目名要为字符串类型"),
    param("id").notEmpty().withMessage("ID不能为空").bail().custom(isMongoId())
]), isHas]

exports.subset = [validations([
    param("id").notEmpty().withMessage("ID不能为空").bail().custom(isMongoId())
]), isHas]