// 引入核心模块的时候直接写模块名，如fs
const fs = require('fs');
fs.readFile("rf测试文本.txt", (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data) // data是buffer类型，二进制
    console.log(data.toString()); // data.toString()就可以看到内容。
})