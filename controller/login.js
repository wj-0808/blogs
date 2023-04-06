const { sign } = require('../util/jwt');
const { jwtSecret } = require('../config/config.default')

exports.login = (async (req, res, next) => {
    try {
        // 1.获取密码
        const password = req.body.password;
        if (password != '123456') return res.json({ message: "密码错误" })
        // 设置token
        const token = await sign({
            time: Date.now(),
        }, jwtSecret, {
            expiresIn: '24h'
        })
        // 成功
        res.status(200).json({
            message: '登录成功',
            token
        })
    } catch (err) {
        next(err)
    }
})