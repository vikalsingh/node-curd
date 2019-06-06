var mysql = require('mysql');
exports.list = function(req, res){
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'ourdesignz',
		database: 'curdnode'
	});

	var sql = "select * from user";
	con.query(sql, function(err, rows){
		if(err) throw err;
		res.render('testtable', {data: rows});
	});
}