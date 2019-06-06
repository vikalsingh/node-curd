var express = require('express');
var routes = require('routes');
var http = require('http');
var url = require('url');
var path = require('path');
var body = require('body-parser');
var aa = body.urlencoded({extended: false});

var testtable = require('./routes/testtable');
var app = express();

var mysql = require('mysql');

app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ourdesignz',
	database: 'curdnode'
});
// this is route
app.get('/', testtable.list);
app.get('/register', function(req, res){
	res.render('register');
});

app.post('/register_action', aa, function(req, res){
	var name = req.body.name;
	var city = req.body.city;
	var email = req.body.email;
	var phone = req.body.phone;

	// con.connect(function(err){
	// 	if(err) throw err;
	// 	console.log("connected");
	// });

	var sql = "insert into user(name, city, email, phone) values('"+name+"', '"+city+"', '"+email+"', '"+phone+"')";
	con.query(sql, function(err, result){
		if(err) throw err;
		if(result){
			res.redirect('/');
			res.end();
		} else {
			res.send("Not Inserted");
			res.end();
		}
	});
});

app.get('/edit/:id', function(req, res){
	var id = req.params.id;
	var sql="select * from user where id="+id+"";

	con.query(sql, function(err, rows, fields){
		if(err) throw err;
		res.render('edit', {data: rows[0]});
	});
});

app.post('/update/:id', aa, function(req, res){
	console.log("update ", req.params.id);
	var id = req.params.id;
	var name = req.body.name;
	var city = req.body.city;
	var email = req.body.email;
	var phone = req.body.phone;

	// con.connect(function(err){
	// 	if(err) throw err;
	// 	console.log("connected");
	// });

	var sql = "update user set name='"+name+"', city='"+city+"', email='"+email+"', phone='"+phone+"' where id="+id+"";
	con.query(sql, function(err, result){
		if(err) throw err;
		if(result){
			res.redirect('/');
			res.end();
		} else {
			res.send("Not Updated");
			res.end();
		}
	});
});

app.get('/delete/:id', function(req, res){
	var sql = "delete from user where id="+req.params.id+"";
	con.query(sql, function(err, rows){
		if(err) throw err;
		res.redirect('/');
	});
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listing on port "+app.get('port'));
});