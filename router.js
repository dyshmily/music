var fs = require('fs')
// express 提供了一种更好的方式专门用来包装路由
var express = require('express')

var Music = require('./music')

// 创建路由容器
var router = express.Router();

// 把路由都挂载到 router 路由容器中
router.get('/music', function (req, res) {

	Music.find(function (err, musics) {
		if (err) {
			return res.status(500).send('Server error')
		}
		res.render('index.html', {musics: musics})
	})
});

router.get('/', function(req, res) {
	res.render('login.html')
})

// 处理登录页面
router.post('/', function (req, res) {
	// console.log(req.body)
	Music.findLogin(req.body, function (err) {
		if (err) {
			// return
			res.status(500).send('输入账号或者密码错误')
			// alert("输入账号或者密码错误")
			res.redirect('/music/login')
		}
		res.redirect('/music')
	})
})

// 渲染新增页面
router.get('/music/new', function (req, res) {
	// 没有渲染数据，可以不写第二个参数
	res.render('new.html')
})

// 处理新增页面
router.post('/music/new', function (req, res) {
	// console.log(req.body)
	Music.save(req.body, function (err) {
		if (err) {
			return res.status(500).send('Server Error')
		}
		res.redirect('/music')
	})
})


// 渲染编辑页面
router.get('/music/edit', function (req, res) {
	Music.findById(parseInt(req.query.id), function (err, musics) {
		if (err) {
			return res.status(500).send('Server Error')
		}
		res.render('edit.html', {
			musics: musics
		})
	})
})

// 编辑
router.post('/music/edit', function (req, res) {
	// 1.获取表单数据
	// 2.更新 Music.update()
	// 3. 发送响应
	// console.log(req.body);
	Music.updateById(req.body, function (req, res) {
		if (err) {
			return res.status(500).send('Server Error')
		}
		res.redirect('/music')
	})
})

// 删除
router.get('/music/delete', function (req, res) {
	// 获取要删除的id
	// 根据id执行删除操作
	// 更具操作结果发送响应数据
	// console.log(req.query.id);
	Music.deleteById(req.query.id, function (err) {
		if (err) {
			return res.status(500).send('Server Error')
		}
		res.redirect('/music');
	})
})

module.exports = router;
