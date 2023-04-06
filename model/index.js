const { dbUrl } = require('../config/config.default');
const mongoose = require('mongoose');
main().catch(err => console.log('MongoDB 数据库链接失败', err));
async function main() {
    await mongoose.connect(dbUrl, { autoCreate: true });
    console.log("MongoDB 数据库链接成功!");
}

module.exports = {
    Category: mongoose.model('Category', require('./category')),
    Article: mongoose.model('Article', require('./article')),
    Work: mongoose.model('work', require('./work'))
}