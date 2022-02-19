const fs = require('fs');
const path = require('path');
let url1 = "D:"
let url2 = "test"
let url3 = "index.html"
let url = path.join(url1, url2, url3)
console.log(url);
fs.readFile(url, (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data.toString());
})