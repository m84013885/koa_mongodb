const Router = require('koa-router')  // 路由
const model = require('./model')
const router = new Router()

router
    .get('/', (ctx, next) => {
        let html = `
        <h2>This is demo2</h2>
        <form method="POST" action="/">
            <p>username:</p>
            <input name="username">
            <p>age:</p>
            <input name="age">
            <p>website</p>
            <input name="website">
            <button type="submit">submit</button>                 
        </form>
        `
        ctx.body = html
    })
    .post('/',(ctx, next) => {
        let postData = ctx.request.body
        ctx.body = postData
    })
    .get('/s',async(ctx, next) => {
        
        let data = await model.find(function (err,doc) {
                console.log(doc) 
        })

        console.log(data)
        ctx.body = responseWrapper(data)
        
    })

const responseWrapper = function wrapper(success, message, data) {
    if (arguments.length === 3) {
        return { 'success': success, 'message': message, 'data': data };
    }
    //只传2个参数,必须传是否成功 和 返回的提示信息
    if (arguments.length === 2) {
        return { 'success': success, 'message': message };
    };
    //如果只传一个参数 则默认当作请求成功 返回正常数据
    if (arguments.length === 1) {
        return { 'success': true, 'data': arguments[0] };
    }
    return {}
}

module.exports = router