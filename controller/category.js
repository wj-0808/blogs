const { Category } = require('../model')
const { isBoolean, isNumber } = require('../util')

exports.create = async (req, res, next) => {
    try {
        // 获取请求数据，并创建mongo行数据
        let category = new Category(req.body)
        await category.save();
        category = category.toJSON()
        res.status(201).json({
            category,
            message: "创建成功"
        })
    } catch (err) {
        next(err)
    }
}

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        let update = req.body;
        const category = await Category.findByIdAndUpdate(id, update, { new: true });
        console.log(category);
        res.status(200).json({
            category,
            message: "更新成功"
        })
    } catch (err) {
        next(err)
    }
}

exports.list = (type, status) => {
    return async (req, res, next) => {
        try {
            const filter = {};
            // type => 0: 一级 , 1: 二级
            if (isNumber(type)) filter.parent = type ? req.params.id : null
            // status => ture: 显示 , false: 隐藏
            if (isBoolean(status)) filter.status = status;
            // 获取目录
            const list = await Category.find(filter).sort({ parent: 1 }).exec();
            // 获取目录的总数
            const count = await Category.countDocuments(filter).exec();
            res.status(200).json({
                list,
                count
            })
        } catch (err) {
            next(err)
        }
    }
}
