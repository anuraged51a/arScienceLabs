var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");

var app = express();
const port = 3000;
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){
    res.sendFile('index.html',{root: __dirname});
});

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'arsciencelab'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});


app.post('/submit', function(req,res){
    console.log(req.body);
    if(req.body.captcha == "qGphJ"){
        var sql = "Insert into registrations (name, email, organization, r_sessions) values ('" + req.body.name + "','" +  req.body.email + "','" + req.body.organization + "','" +  req.body.r_sessions + "');";

        connection.query(sql, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Data entered Succesfully!");
            }
        });
    }
});

app.listen(port, () => console.log("Server running on port 3000"));

