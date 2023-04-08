const express = require('express');
const router = express.Router();
const { uploadImg, uploadWork } = require('../middleware/upload')
const { img, work } = require('../controller/upload')
// 管理员验证
const admin = require('../middleware/admin')

// 上传图片
router.post('/img', admin, uploadImg.single('file'), img)
// 上传作品
router.post('/work', admin, uploadWork.single('file'), work)

module.exports = router