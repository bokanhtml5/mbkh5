
/*
 * GET home page.
 */

module.exports = function(app) {
	var http = require("http");
	var needle = require("needle");
	var fs = require('fs');

	var basedir = app.get("basedir");
	var apiurl = app.get("apiurl");
	var tpldir = basedir + "/views/mobile/";

	function getXML () {
		var src = basedir + "/models/article.xml";
		try{
			var a = fs.readFileSync(src, "utf8");
			return a;
		}catch(e){
			console.error("读取出错：", src);
			return "";
		}
		
	}

	app.get("/",function (req, res) {
		res.send("123");
	});
	app.get(/^\/plus\/view\.php/, function (req, res) {

		needle.post(apiurl + "ajax_view.php",'aid='+req.query.aid+'&datatpl='+getXML(),
			function (err,resp,body) {
			
			// 解析
			try{
				var data = JSON.parse(body);
				console.log(data);
				// 渲染
				res.render("mobile/"+data.data.tplname,data.data);
			}catch(e){
				console.error("JSON解析错误",body);
				res.send(404, '没有指定网页');
				// res.end("数据错误，请报告admin@bokanedu.com"+body);
			}
			

			// 读取模板
			
			// 渲染
		});
		
	});
};