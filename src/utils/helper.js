
function random (length, ...ranges) {
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
const urlCode = random(4, ["0", "9"]);
console.log(urlCode)

module.exports = {
    random
}