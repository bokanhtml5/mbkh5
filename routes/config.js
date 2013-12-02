
/*
 * GET home page.
 */

module.exports = function(app) {
  app.get('/', function (req, res) {
  	var user = require("./user");
  	res.send(user.list);
  });
  // app.get('/users', user.list);
};