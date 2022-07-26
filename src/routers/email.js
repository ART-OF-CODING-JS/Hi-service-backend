const nodeMailer = require("nodemailer");


function mail(email){

    let transporter = nodeMailer.createTransport({
        service: "hotmail",
        auth: {
            user: "hi-service-js@outlook.com", // generated ethereal user
            pass: "hiservice123", // generated ethereal password
        },
    });
    let info = {
        from: 'hi-service-js@outlook.com', // sender address
        to: email, // list of receivers
        subject: "Hi service",
        text: "welcome to our application", 
    };
    transporter.sendMail(info, function (err, infoo) {
        if (err) {
            console.log("errr : ", err);
            return;
        }
        console.log("infoo : ", infoo.response);
    })
}
module.exports = mail;


