const express = require('express');
const router = express.Router();
// 管理员验证
const admin = require('../middleware/admin')
// 验证
const validation = require('../verification/article')
// 控制器
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