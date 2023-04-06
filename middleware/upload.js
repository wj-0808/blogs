const multer = require('multer');

// 存储配置
const storage = (path) => {
    return multer.diskStorage({
        // 存储路径
        destination: function (req, file, cb) {
            cb(null, 'public/upload/' + path)
        },
        // 修改上传名称
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
}

exports.uploadImg = multer({ storage: storage('img') })
exports.uploadWork = multer({ storage: storage('work') })