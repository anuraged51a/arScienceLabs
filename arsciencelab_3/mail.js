const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: '',
        domain: ''
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email,subject,text,cb) =>{
    const mailOptions = {
        from: email,
        to: 'sanjana2070@gmail.com',
        subject: subject,
        text: text    
    };
    
    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            cb(err,null);
            //console.log('Error occurs');
        }else{
            cb(null,data);
            //console.log('Message Sent!');
        }
    });
};

module.exports= sendMail;



