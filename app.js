/**
 * app.js 入门模块
 * 职责：
 *   创建服务
 *   做一些服务相关配置
 *     模板引擎
 *     body-parser 解析表单 post 请求体
 *     提供静态资源服务
 *   挂载路由
 *   监听端口启动服务
 */
var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');

var app = express();

// 提供静态资源  即为.js  .css 文件打开入口
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public'))

// 配置渲染模板
app.engine('html', require('express-art-template'));

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前

// 配置bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 改进用法

app.use(router);

app.listen(3000, function () {
  console.log('running 3000...')
})
