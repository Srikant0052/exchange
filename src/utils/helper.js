

const nodemailer = require("nodemailer")
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

const mailer = async (email, otp)=>{

let mailTransporter = nodemailer.createTransport({
    service: 'relay.mailbaby.net',
    port:587,
    secure:false,
    requireTls:true,

    auth: {
        user: 'kumarRahul@siamaq.live',
        password: 'kumar123456'
    }
});
 
let mailDetails = {
    from: 'kumarRahul@siamaq.live',
    to: 'rahulkumarkiit94@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for cryptoExchange'
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully', data.response);
    }
});
}

mailer("rahulkumarkiit94@gmail.com", "2188")
module.exports = {
    random,
    currentTime,
    mailer
}