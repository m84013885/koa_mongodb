const {
    request,
    summary,
    body,
    tags,
    middlewares,
    path,
    query,
    description
} = require('../swagger')
const model = require('../model')

const tag = tags(['AppResource'])

module.exports = class AppRouter {
    @request('get', '/s')
    @summary("获取某个应用详情")
    @tag
    @path({
        teamId: { type: 'string' },
        id: { type: 'string', description: '应用id' }
    })
    static async getAppDetail(ctx, next) {
        let data = await model.find(function (err,doc) {
            console.log(doc) 
        })
        console.log(data)
        ctx.body = responseWrapper(data)
    }
}

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