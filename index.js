
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config()
app.use(cors());
app.use(express.json());

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
        subject: `Message from: ${req.body.contact.name}`, // Subject line
        text:  `${req.body.contact.email}, ${req.body.contact.message}`, // plaintext body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            res.json({status: "fail"})
            return console.log(error);}
        console.log('Message sent: ' + info.response);
        res.json({status: "success"})
    });
});

