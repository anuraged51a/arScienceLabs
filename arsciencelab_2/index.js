var crypto = require('crypto');
var express = require('express');
var uuid = require('uuid');
var mysql = require('mysql');
var bodyParser = require('body-parser');

//Connection to MySQL
var con  = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'arsciencelab'
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/login/',(req,res,next)=>{
	var post_data = req.body;
	var email = post_data.email;
	var u_password = post_data.password;
	
	con.query('SELECT  * FROM registrations WHERE email=?',[email],function(err,result,fields){
		con.on('error',function(err){
			console.log('[MySQL ERROR]',err);
		});
	});
	if(result && result.length){
		if(u_password == result[0].password){
			res.end(JSON.stringify(result[0]));
		}
		else{
			res.end(JSON.stringify('Wrong Result'));
		}
	}
	else{
		res.json('User does not exist!!');	
	}
});		

//Server Start
app.listen(3000,()=>{
	console.log('Restful running on port 3000');
});