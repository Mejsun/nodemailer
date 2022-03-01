const nodemailer = require('nodemailer');

async function main(){


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
    
    // send mail with defined transport object
    const info = await transporter.sendMail(
        {
            from: '"Our Code World " <apiwebdev@outlook.com>', // sender address (who sends)
            to: 'mejsunalghoul@gmail.com', // list of receivers (who receives)
            subject: 'Hello ', // Subject line
            text: 'Hello world ', // plaintext body
            html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
        }
    );
    
    transporter.verify((error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Ready to Send");
        }
      });
    
    if(error){
            return console.log(error);
        }    
        console.log('Message sent: ' + info.response);
}        

main().catch(console.error)


/*
router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: "mejsunalghoul@gmail.com",
      subject: "Contact Form Submission",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });
  */
  