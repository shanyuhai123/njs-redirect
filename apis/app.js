// 引入依赖, node_modules
const Koa = require('koa')
const Router = require('@koa/router')
const Redis = require('redis')
const axios = require('axios')
const accesslog = require('koa-accesslog')
const { promisify } = require('util')

// 引入依赖，本地
const { AppConfig } = require('./config')
const { isIpv4 } = require('./utils/common')
const { getProviderURL } = require('./utils/provider')

// 阻止启动
if (AppConfig.mode === 'remote' && !AppConfig.token) {
  throw Error('启用第三方服务时需填写对应的 token')
}

// 实例化
const app = new Koa()
const router = new Router()
const redis = Redis.createClient({
  host: 'redis'
})

// redis
const redisGetAsync = promisify(redis.get).bind(redis)
redis.on('error', (err) => {
  console.log(err)
})

// 路由拦截 `/:ip`
router.get('/:ip', async ctx => {
  const { params } = ctx

  // 判断是否为 ipv4
  if (isIpv4(params.ip)) {
    // 从 redis 中获取 country
    const country = await redisGetAsync(params.ip)
    console.log('ip and country: ', params.ip, country)

    // 如果不存在则获取 country
    if (!country) {
      const { status, data } = await axios.get(getProviderURL(AppConfig.token, params.ip))
      if (status === 200) {
        // TODO: 不同服务商解析规则不同，需扩展
        redis.set(params.ip, data.country)
        redis.expire(params.ip, AppConfig.redis.expires)
        ctx.body = {
          code: 200,
          ip: params.ip,
          country: data.country,
          isCN: AppConfig.list.includes(data.country)
        }

        return
      }
    }

    ctx.body = {
      code: 200,
      ip: params.ip,
      country,
      isCN: AppConfig.list.includes(country)
    }
    return
  }

  ctx.body = {
    code: 404,
    ip: params.ip,
    country: 'none'
  }
})
// 其余情况重定向回 `/:ip`
router.redirect('/(.*)', '/0')

// use
app
  .use(accesslog())
  .use(router.routes())
  .use(router.allowedMethods())

// 启动服务并监听端口
app.listen(AppConfig.port, () => {
  console.log(`Server is running at port ${AppConfig.port}`)
})
