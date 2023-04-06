const express = require('express');
const router = express.Router();
const verification = require('../verification/category');
const controller = require('../controller/category');
const admin = require('../middleware/admin')
// 获取所有目录
router.get('/all', controller.list())
// 获取所有一级目录列表
router.get('/', controller.list(0))
// 获取该id下所有二级目录列表
router.get('/:id', verification.subset, controller.list(1))
// 添加类目
router.post('/', admin, verification.create, controller.create);
// 修改类目
router.put('/:id', admin, verification.update, controller.update)

module.exports = router