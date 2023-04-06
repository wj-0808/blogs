const { verify } = require('../util/jwt.js');
const { jwtSecret } = require('../config/config.default.js')

module.exports = async (req, res, next) => {
    let token = req.headers['authorization'];
    token = token ? token.split('Bearer ')[1] : null;
    if (!token) res.status(401).json({ message: '没有token' });
    try {
        // 验证token
        await verify(token, jwtSecret);
        next()
    } catch (err) {
        return res.status(401).json({ message: "token已过期", ...err })
    }
}