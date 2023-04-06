const express = require('express');
const router = express.Router();
router.use('/login', require('./login'))
router.use('/upload', require('./upload'))
router.use('/category', require('./category'))
router.use('/article', require('./article'))
router.use('/work', require('./work'))

module.exports = router