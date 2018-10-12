const Koa = require('koa')  // koa中间件
const Router = require('koa-router')  // 路由
const bodyParser = require('koa-bodyparser')    // 封装post
const static = require('koa-static')    // 加载静态文件
const cors = require('koa2-cors')    // 设置请求跨域与类型等
const path = require('path')    // 路径
require('./db')
const model = require('./model')
const Fawn = require("fawn")
const task = Fawn.Task()
const app = new Koa()
const router = new Router()
app.use(static((path.join(__dirname,  'images'))))
app.use(bodyParser())
app.use(cors())

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
        // var schema = {
        //     name: {type: String, required: true}
        //     , specials: [{title: String, year: Number}]
        //   };
           
        //   task.initModel("comedians", schema)
        //     .save("comedians", {name: "Kevin Hart", specials: [{title: "What Now", year: 2016}]})
        //     .run({useMongoose: true})
        //     .then(function(results){
        //       console.log(results);
        //     });
        // var doc1 = new MyModel({ size: 'small' });
        // var doc2 = new model({ size: 'big' , namew :'ming' , num: 123})
        // await task
        //     .save(doc2)
        //     .run({useMongoose: true})
        //     .then((results)=>{
        //         console.log(results)
        //         ctx.body = results
        //     });
        // let data = await model.find(function (err,doc) {
        //         console.log(doc) 
        // })
        // let data =await model.update({age:{$gte:20}},{age:40},function(err,raw){
        //     //{ n: 1, nModified: 1, ok: 1 }
        //     console.log(raw);
        // })
        // temp.remove({name:/30/},function(err){})
        // ctx.body = data
        new temp({age:10,name:'save'}).save(function(err,doc){
            //[ { _id: 59720bc0d2b1125cbcd60b3f, age: 10, name: 'save', __v: 0 } ]
            console.log(doc);        
        });  

        // doc2.save(function (err,doc) {
        // //{ __v: 0, size: 'small', _id: 5970daba61162662b45a24a1 }
        //     console.log(doc);
        // })
        
    })

app
    .use(router.routes())
    .use(router.allowedMethods())
 
app.listen(3000, () => {
    console.log('demo2 is run')
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
