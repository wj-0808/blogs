const express = require('express');
// 路由
const router = require('./routes')
// 日志
const morgan = require('morgan')
// 拦截错误中间件
const errHandler = require('./middleware/error-handler')
// 路径模块
const path = require('path');
// 允许跨域
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;
// 解析json格式请求参数
app.use(express.json());
// 记录开发日志
app.use(morgan('dev'))
// 静态资源托管
app.use('/assets', express.static(path.join(__dirname, './public/assets')))
app.use('/upload', express.static(path.join(__dirname, './public/upload')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, './public/admin.html'))
})
app.use(cors())
app.use('/api', router)

app.use(errHandler)

app.listen(PORT, () => {
    console.log('运行成功，正在监听端口：' + PORT);
})