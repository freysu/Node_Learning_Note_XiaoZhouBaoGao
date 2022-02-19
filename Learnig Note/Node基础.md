[toc]

## 模块化开发

模块化的语法，每一个 js 文件都可以当作一个模块：

- `require()`：引入一个外部模块
- `module.exports`：暴露模块接口

例如：
add.js 文件，内容如下：

```js
function add(a, b) {
  return a + b;
}
module.exports = add;
```

主文件 main.js，内容如下：

```JS
// 引入模块
const add = require("./add"); // .js后缀可以省略
// const add = require("./add.js");
let result = add(10, 20);
console.log(result);
```

### ES2015 的模块化语法

在 ES2015 中的模块化语法与 Node 的模块化语法略有差异，如下所示：

- `import` ：引入一个外部模块
- `export`：暴露模块接口

### 外部模块

引入外部模块有三种情况：

1. 核心模块：
   核心模块是 node 自带的模块，可以在 require 引入后直接使用。
2. 自定义模块：
   自定义模块是我们编写的，上面模块化的例子，add.js 就是一个自定义模块。引入自定义模块需要些完整的路径。
3. 第三方模块：
   使用 npm 下载的模块是第三方模块，下载完成后可以使用 require 引入。

## 常用的核心模块

引入核心模块的时候直接写模块名，如 fs

- fs
  fs 模块是 node 文件系统模块，通过此模块的 readFile 方法可以读取文件。
  fs 的 readFile 方法有两个参数。

  - 第一个参数是读取文件的地址
  - 第二个参数是一个回调函数
    - 如果读取文件失败，回调函数的第一个函数 err 会显示错误信息，如果读取文件成功，则 err 为 null.
    - data 是一个 buffer 类型，`data.toString`可以把 buffer 类型转换成字符串。

  ```JS
  const fs = require('fs');
  fs.readFile("rf测试文本.txt", (err, data) => {
     if (err) {
        console.log(err);
     }
     console.log(data) // data是buffer类型，二进制
     console.log(data.toString()); // data.toString()就可以看到内容。
  })
  ```

- path
  path 模块提供了一些用于处理文件路径的小工具，例如可以用 path 的 join 方法链接两个路径。

  ```JS
   const path = require('path');
   let domain = "http://www.xiaozhoubg.com";
   let url = "docs";
   let id = "22";
   let address = path.join(domain, url, id);
   console.log(address); // http:\www.xiaozhoubg.com\docs\22
   let a = "//////";
   let b = "dd";
   console.log(path.join(a, b));// \dd
  ```

  我们首先引入 path 模块，然后定义三个变量，使用 path 的 join 方法传入这三个变量，输出的结果就是三个变量链接在一起的路径。不过要注意当输入`/`正斜杠两个或者以上的，会只显示一个。

- http
  http 模块是可以用来创建 web 服务器。

## 课后练习

1. 定义一个可以完成四则运算的 node 模块。

- 自定义模块 fourCounters.js 文件

  ```JS
  let fourCounters = {}
  // 加法
  fourCounters.add = (a, b) => {
     return a + b;
  }
   // 减法
  fourCounters.sub = (a, b) => {
     return a - b;
  }
   // 乘法
  fourCounters.cheng = (a, b) => {
     return a * b;
  }
   // 除法
  fourCounters.chu = (a, b) => {
     return a / b;
  }

  module.exports = fourCounters;
  ```

- 测试模块功能

```JS
let fourCounters = require('./自定义模块_四则运算模块fourCounters');
let a = 1;
let b = 2;
console.log(fourCounters.add(a, b)); // 2
console.log(fourCounters.sub(a, b));// -1
console.log(fourCounters.cheng(a, b));// 2
console.log(fourCounters.chu(a, b));// 0.5
```

2. 用 fs 模块打开 d 盘 test 目录下的 index.html 文件。（自己手动创建缺失的文件和目录）。

```JS
const fs = require('fs');
const path = require('path');
let url1 = "D:"
let url2 = "test"
let url3 = "index.html"
let url = path.join(url1, url2, url3)
console.log(url);// D:\test\index.html
fs.readFile(url, (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data.toString());
})
```
