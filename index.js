//const path = require('path')
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
//const buildPath = path.join(__dirname, '..', 'build')
app.use(express.json());
//app.use(express.static(buildPath));
require('dotenv').config()
const cors = require('cors');
app.use(cors());


// Create the transporter with the required configuration for Outlook
const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3',
       rejectUnauthorized: false
    },
    auth: {
        user: process.env.A1,
        pass: process.env.A2
    }
})

transporter.verify((error) => {
    if (error) {console.log(error);} 
    else {console.log("Ready to Send");}
  });

app.post("/contact", function (req, res) {
    const mailOptions = {
        from: process.env.A1, // sender address (who sends)
        to: process.env.A3,
        subject: 'Portfolio submission', // Subject line
        text:  `${req.body.name}; ${req.body.email}: ${req.body.message}`, // plaintext body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.json({status: "fail"})
            return console.log(error);}
        console.log('Message sent: ' + info.response);
        res.json({status: "success"})
        window.alert('Thank you!')
    });
});


const PORT = 3002;

app.listen(PORT, ()=>{

    console.log('server running ')
})

