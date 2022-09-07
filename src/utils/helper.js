
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

function changeTimezone(date, ianatz) {

    var invdate = new Date(date.toLocaleString('en-US', {
        timeZone: ianatz
    }));

    var diff = date.getTime() - invdate.getTime();

    return new Date(date.getTime() - diff);
}

var here = new Date();
var there = changeTimezone(here, "Asia/Calcutta");

//console.log(`GMT: ${here.toString()}\nDayTimeDate: ${there.toString()}`);


module.exports = {
    random,
    changeTimezone
}