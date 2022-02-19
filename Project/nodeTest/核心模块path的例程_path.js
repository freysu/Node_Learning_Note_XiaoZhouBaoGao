const path = require('path');
let domain = "http://www.xiaozhoubg.com";
let url = "docs";
let id = "22";
let address = path.join(domain, url, id);
console.log(address); // http:\www.xiaozhoubg.com\docs\22
let a = "//////";
let b = "dd";
console.log(path.join(a, b));// \dd