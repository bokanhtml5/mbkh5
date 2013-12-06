
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

	function getXML (name) {
		var src = basedir + "/models/" + name + ".xml";
		try{
			var a = fs.readFileSync(src, "utf8");
			return a;
		}catch(e){
			console.error("读取出错：", src);
			return "";
		}
		
	}

	app.get("/",function (req, res) {
		var navdata = fs.readFileSync(basedir + "/views/mobile/common-html/nav.config", "utf8");
		navdata = JSON.parse(navdata);

		needle.post(apiurl + "ajaxb.php",'tid=1&datatpl='+getXML("index"),
			function (err,resp,body) {
			
			// 解析
			try{
				var data = JSON.parse(body);

				console.log(data);

				navdata.id = 0;
				data.data.nav = navdata;
				
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
	app.get(/^\/plus\/view\.php/, function (req, res) {
		var navdata = fs.readFileSync(basedir + "/views/mobile/common-html/nav.config", "utf8");
		navdata = JSON.parse(navdata);

		needle.post(apiurl + "ajax_view.php",'aid='+req.query.aid+'&datatpl='+getXML("article"),
			function (err,resp,body) {
			
			// 解析
			try{
				var data = JSON.parse(body);

				console.log(data);

				navdata.id = data.data.typeid;
				data.data.nav = navdata;
				
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

	app.get(/^\/plus\/list\.php/, function (req, res) {
		var navdata = fs.readFileSync(basedir + "/views/mobile/common-html/nav.config", "utf8");
		navdata = JSON.parse(navdata);

		needle.post(apiurl + "ajaxb.php",'tid='+req.query.tid+'&datatpl='+getXML("list_"+req.query.tid),
			function (err,resp,body) {
			
			// 解析
			try{
				var data = JSON.parse(body);

				console.log(data);

				navdata.id = data.data.typeid;
				data.data.nav = navdata;
				
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