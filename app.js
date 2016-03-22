var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var connect = require('connect');
var routes = require('./routes/index');
var users = require('./routes/users');
var dynamic = require('./routes/dynamic');
var usercenter = require('./routes/center');
var diary = require('./routes/diary');
var setprofile = require('./routes/setprofile');
var admin = require('./routes/admin');
var SessionStore = require("session-mongoose")(connect);
var config = require('config');
var dbConfig = config.get('Customer.dbConfig');
var store = new SessionStore({
    url:dbConfig,
    ttl: 604800  //session 存储一周
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use("/", express.static(path.join(__dirname, "web", "public")))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false ,'limit':'10000000kb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'jimliu',
    store: store,
    cookie:{maxAge:604800}
}));

//路由
app.use('/', routes);
app.get('/login',users);
app.get("/reg",users);
app.get("/logout",users);
app.post('/login',users);
app.post("/reg",users);
app.post("/uploadUser",users);
/*首页路由 */
app.post('/chart',routes);
/*动态*/
app.get('/dynamic',dynamic);
app.post('/pdynamic',dynamic);
/*健身日记*/
app.get("/diary",diary);
app.get("/diarytext",diary);
app.post("/diaryid",diary);
app.get("/publish",diary);
app.post('/dpub',diary);
/*设置资料*/
app.get('/setprofile',setprofile);
app.post('/saveData',setprofile);
app.post('/vPass',setprofile);
app.post('/updatePass',setprofile);
app.post('/updateLogo',setprofile);
/*个人中心*/
app.get('/usercenter',usercenter);
app.post('/deletDiary',usercenter);
app.post('/deletDynamic',usercenter);
/*管理界面*/
app.get('/admin',admin);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
