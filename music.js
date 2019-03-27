/*
	数据操作文件模块
	只操作数据，不关心业务
*/

var fs = require('fs');

var musicPath = './music.json';

var loginPath = './login.json'

// 获取所有列表
// 如果需要获取一个函数中异步操作的结果，则必须通过回调函数来执行
exports.find = function (callback) {
  fs.readFile(musicPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
      // 不关心业务
    }
    callback(null, JSON.parse(data).musics)
    // console.log(JSON.parse(data).musics)
  })
}

// 查询单条数据
exports.findById = function (id, callback) {
  fs.readFile(musicPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var musics = JSON.parse(data).musics;
    // console.log(musics)
    var res = musics.find(function (item) {
      return item.id === parseInt(id)
    })
    // console.log(res)
    callback(null, res)
  })
}

// 添加数据
exports.save = function (music, callback) {
  fs.readFile(musicPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var musics = JSON.parse(data).musics  //转为对象

    music.id = musics[musics.length -1].id + 1

    // 把用户传递的数句保存到数组中
    musics.push(music)

    var fileData = JSON.stringify({
      musics: musics
    })  //吧对象数据转为字符串

    // 字符串保存到文件中
    fs.writeFile(musicPath, fileData, function(err) {
      if (err) {
        // 错误就是 err
        return callback(err)
      }
      // 成功就没有错误，所以错误对象就是null
      callback(null)
    })
  })
}

//保存登录数据
exports.findLogin= function (login, callback) {

  if (login.email !== "zhang@qq.com" || login.password !== "123456") {
    return callback("error")
  }
  callback(null)
}

// 更新数据
exports.updateById = function (music, callback) {
  fs.readFile(musicPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var musics = JSON.parse(data).musics  //转为对象

    // 注意： 把 id 统一转换为数字
    music.id = parseInt(music.id)

    // es6中的数组方法，需要接受一个数组做参数
    var stu = musics.find(function (item) {
      return item.id === musics.id
    })

    // 更新数据
    for (var key in music) {
      stu[key] = music[key]
    }

    var fileData = JSON.stringify({
      musics: musics
    })  //吧对象数据转为字符串

    // 字符串保存到文件中
    fs.writeFile(musicPath, fileData, function(err) {
      if (err) {
        // 错误就是 err
        return callback(err)
      }
      // 成功就没有错误，所以错误对象就是null
      callback(null)
    })

  })
}

// 删除数据
exports.deleteById = function (id, callback) {
  fs.readFile(musicPath, 'utf8', function (err, data) {
    if (err) {
      return callback(err)
    }
    var musics = JSON.parse(data).musics  //转为对象

    // findIndex 专门用来根据条件查找元素的下标
    var delId = musics.findIndex(function (item) {
      return item.id === parseInt(id)
    })
    // 根据下标从数组中删除对应的对象
    musics.splice(delId, 1);

    var fileData = JSON.stringify({
      musics: musics
    })  //吧对象数据转为字符串

    // 字符串保存到文件中
    fs.writeFile(musicPath, fileData, function(err) {
      if (err) {
        // 错误就是 err
        return callback(err)
      }
      // 成功就没有错误，所以错误对象就是null
      callback(null)
    })
  })
}
