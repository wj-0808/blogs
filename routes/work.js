const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin')
const validation = require('../verification/work')
const controller = require('../controller/work')

// 获取作品列表
router.get('/', controller.list)
// 获取作品
router.get('/:id',validation.judgeId,controller.getWork)
// 创建作品
router.post('/', admin, validation.create, controller.create)
// 修改作品
router.put('/:id', admin, validation.judgeId, controller.update)
// 删除作品
router.delete('/:id', admin, validation.judgeId, controller.delete)

module.exports = router