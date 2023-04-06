const dev = 'http://localhost:3000/upload/'
const pro = 'http://wangj0808.cn/upload/'
const Seven = require('node-7z')
const unzipper = require('unzipper')
const fs = require('fs')
const path = require('path')
exports.img = async (req, res, next) => {
    try {
        let devUrl = dev + 'img/';
        let proUrl = pro + 'img/'
        // const files = req.files.map(file => {
        //     const { mimetype, encoding, originalname, filename } = file;
        //     return { mimetype, encoding, filename: originalname, url: devUrl + filename }
        // })
        if (!req.file) return res.json({ err: '请选择文件' })
        const { mimetype, encoding, originalname, filename } = req.file
        const file = { mimetype, encoding, filename: originalname, url: devUrl + filename }
        res.json({
            file
        })
    } catch (err) {
        next(err)
    }
}

exports.work = async (req, res, next) => {
    try {
        if (!req.file) res.end('为上传文件')
        let devUrl = dev + 'work/';
        let proUrl = pro + 'work/'
        let sourcePath, destPath;
        let { filename, destination, originalname } = req.file;
        // 定义解压文件路径，新文件路径
        sourcePath = destination + '/' + filename
        destPath = destination + '/' + filename.split('.')[0];
        fs.mkdir(destPath, { recursive: true }, () => { })
        // 写入流
        const readStream = fs.createReadStream(sourcePath);
        readStream.pipe(unzipper.Parse()).on('entry', function (entry) {
            const fileName = entry.path;
            entry.pipe(fs.createWriteStream(destPath + '/' + fileName));
        }).promise().then(() => {
            fs.unlink('public/upload/work/' + filename, (e) => { console.log(e); })
        })

        res.status(200).json({
            message: '成功',
            work: {
                url: devUrl + '/' + filename.split('.')[0],
                name: originalname.split('.')[0]
            }
        });
    } catch (err) {
        next(err)
    }

}