const express = require('express');
const app = express();
const sendMail = require('./mail'); 
const PORT = 8080;
const path = require('path');

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//Data Parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.post('/email',(req,res) => {
    const {email, subject, t} = req.body;
    var text = makeid(5);
    console.log('Data', req.body);
    sendMail(email,subject,text,function(err,data){
        if(err){
            res.status(500).json({message: 'Internal Error'});
        }else{
            res.json({message: 'Email Sent!'});
        }
    });
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'views','index.html'));
});

app.listen(PORT, () => {
    console.log('Server is starting on PORT',8080); 
});