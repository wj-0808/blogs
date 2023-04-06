const { Work } = require('../model')

exports.create = async (req, res, next) => {
    try {
        console.log(req.body);
        let work = new Work(req.body);
        await work.save()
        work = work.toJSON()
        res.status(201).json({
            work,
            messsage: "上传成功"
        })
    } catch (err) {
        next(err)
    }
}
exports.getWork = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const article = await Work.findById(req.params.id);
        res.status(200).json({
            article,
            message: "请求成功"
        })
    } catch (err) {
        next(err)
    }
}
exports.list = async (req, res, next) => {
    try {
        let search = req.query;
        const filter = {};
        let limit = Number.parseInt(search.limit || 10);
        let offset = Number.parseInt(search.offset || 0);
        const regFn = (arr) => {
            return arr.map(key => {
                let obj = {}
                obj[key] = new RegExp(search.value, 'i')
                return obj
            });
        }
        // 模糊查询
        if (search.value) {
            filter.$or = regFn(['title', 'description']);
            filter.$or.push({ keyWords: search.value })
        }
        let list = await Work.find(filter)
            .skip(offset)
            .limit(limit)
            .exec();
        let count = await Work.countDocuments(filter).exec()
        res.status(200).json({
            list,
            count
        })
    } catch (err) {
        next(err)
    }
}
exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        let update = req.body;
        const work = await Work.findByIdAndUpdate(id, update, { new: true });
        console.log(work);
        res.status(200).json({
            work,
            message: "更新成功"
        })
    } catch (err) {
        next(err)
    }
}
exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Work.findByIdAndRemove(id);
        res.status(204).end()
    } catch (err) {
        next(err)
    }
}