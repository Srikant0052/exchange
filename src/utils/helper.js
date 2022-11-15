

const nodemailer = require("nodemailer")
require("dotenv").config()

function random(length, ...ranges) {

    let str = "";

    while (length--) {
        let ind = Math.floor(Math.random() * ranges.length);
        let min = ranges[ind][0].charCodeAt(0),
            max = ranges[ind][1].charCodeAt(0);
        let c = Math.floor(Math.random() * (max - min + 1)) + min;
        str += String.fromCharCode(c);
    }

    return str;

}

//---------------------------------------------------------------------------------------------------------------------------------

function currentTime(date, ianatz) {

    var invdate = new Date(date.toLocaleString('en-US', {
        timeZone: ianatz
    }));

    var diff = date.getTime() - invdate.getTime();

    return new Date(date.getTime() - diff);
}

var here = new Date();
var there = currentTime(here, "Australia/Hobart");


console.log(`OurTimeZone: ${here.toLocaleTimeString()}\nYourTimeZone: ${there.toLocaleTimeString()}`);

const mailer = async () => {

    let mailTransporter = nodemailer.createTransport({
        service: 'relay.mailbaby.net',
        port: 587,
        secure: false,
        requireTls: true,

        auth: {
            user: 'process.env.USER',
            password: 'process.env.PASS'
        }
    });

    let mailDetails = {
        from: 'data.email',
        to: 'rahulkumarkiit94@gmail.com',
        subject: 'Test mail',
        text: 'Node.js testing mail for cryptoExchange'
    };

    mailTransporter.sendMail(mailDetails, (err, data) => {

        err ? console.log('Error Occurs') : console.log('Email sent successfully', data.response)

    });
}


module.exports = {
    random,
    currentTime,
    mailer
}