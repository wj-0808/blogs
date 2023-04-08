const { Article } = require('../model')

exports.create = async (req, res, next) => {
    try {
        // 获取请求数据，并创建mongo行数据
        let article = new Article(req.body)
        await article.populate('cate_id1', 'name')
        await article.populate('cate_id2', 'name')
        await article.save();
        article = article.toJSON()
        res.status(201).json({
            article,
            message: "创建成功"
        })
    } catch (err) {
        next(err)
    }
}

exports.list = async (req, res, next) => {
    try {
        // offset : 从第几条起
        // limit : 取多少条
        // keywords : 关键字
        // body : 内容模糊查询
        // description : 描述模糊查询
        // titile : 标题模糊查询
        let search = req.query;
        //筛选条件
        const filter = {};
        let limit = Number.parseInt(search.limit || 10);
        let offset = Number.parseInt(search.offset || 0);
        if (search.cate_id1) filter.cate_id1 = search.cate_id1
        if (search.cate_id2) filter.cate_id2 = search.cate_id2
        const regFn = (arr) => {
            return arr.map(key => {
                let obj = {}
                obj[key] = new RegExp(search.value, 'i')
                return obj
            });
        }
        // 模糊查询
        if (search.value) {
            filter.$or = regFn(['body', 'title', 'description']);
            filter.$or.push({ keyWords: search.value })
        }
        console.log(search);
        let list = await Article.find(filter)
            .skip(offset)
            .limit(limit)
            .populate('cate_id1', 'name')
            .populate('cate_id2', 'name')
            .exec();
        let count = await Article.countDocuments(filter).exec()
        res.status(200).json({
            list,
            count
        })
    } catch (err) {
        next(err)
    }
}

exports.getArticle = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const article = await Article.findById(req.params.id);
        res.status(200).json({
            article,
            message: "请求成功"
        })
    } catch (err) {
        next(err)
    }
}

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        let update = req.body;
        const article = await Article.findByIdAndUpdate(id, update, { new: true });
        console.log(article);
        res.status(200).json({
            article,
            message: "更新成功"
        })
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Article.findByIdAndRemove(id);
        res.status(204).end()
    } catch (err) {
        next(err)
    }
}