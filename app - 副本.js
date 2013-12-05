
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

 

 var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname+"/public/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());

}

// development only
app.configure('development', function(){
    app.set('apiurl', 'http://a.bokanh5.com/plus/');
})

// production only
app.configure('production', function(){
    app.set('apiurl', 'http://www.bkh5.com/plus/');
})

app.set('basedir', __dirname);

routes(app);

http.createServer(app).listen(app.get('port'), function(){

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var day = d.getDay();
    var Hours = d.getHours();
    var Minutes = d.getMinutes();
    var Seconds = d.getSeconds();
    console.log('服务器('+ app.get('port') +')重新启动于 ' +
             year + "年" + month + "月" + day + "日" + Hours + 
             "时" + Minutes + "分" + Seconds + "秒");
});

// 修复路径
app.locals.addHost = function(url) {
  return "http://www.bkh5.com" + url;
}