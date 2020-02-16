var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Mock = require('mockjs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/mocklist',function(req, res, next) {
	var data = Mock.mock({
	    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	    'list|10': [{
	        // 属性 id 是一个自增数，起始值为 1，每次增 1
	        'id|1-9999999': 1,
	        'name': /([a-zA-Z0-9]){5,10}/,
	        'sex': /[男女]/,
	        'city': /([A-Z]){2}/,
	        'age|20-30': 1
	    }]
	})
	// 输出结果
	res.json(data);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
