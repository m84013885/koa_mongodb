import router from './controller';

const Koa = require('koa')  // koa中间件
const bodyParser = require('koa-bodyparser')    // 封装post
const statics = require('koa-static')    // 加载静态文件
const cors = require('koa2-cors')    // 设置请求跨域与类型等
const path = require('path')    // 路径
require('./db')

const Fawn = require("fawn")
// const task = Fawn.Task()
const app = new Koa()

app.use(statics((path.join(__dirname,  'images'))))
app.use(bodyParser())
app.use(cors())

// const router = require('./router')

app
    .use(router.routes())
    .use(router.allowedMethods())
 
app.listen(3000, () => {
    console.log('server run')
})



