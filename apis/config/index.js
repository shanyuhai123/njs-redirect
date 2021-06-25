const { merge } = require('../utils/common')
const { custom } = require('./custom')

// 该配置一般情况下勿修改
const stable = {
  port: 8080, // 服务端口
  list: ['中国'] // 不同服务商提供的参数不同，将随着增加服务商接口而追加
}

// 应用设置
const app = merge(stable, custom)

module.exports = {
  AppConfig: app
}
