const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin')
const validation = require('../verification/article')
const controller = require('../controller/article')

// 获取文章列表
router.get('/', controller.list)
// 获取文章
router.get('/:id', validation.judgeId, controller.getArticle)
// 创建文章
router.post('/', admin, validation.create, controller.create)
// 修改文章
router.put('/:id', admin, validation.judgeId, controller.update)
// 删除文章
router.delete('/:id', admin, validation.judgeId, controller.delete)

module.exports = router