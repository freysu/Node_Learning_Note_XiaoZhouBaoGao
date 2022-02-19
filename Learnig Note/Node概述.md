## 什么是 Node？

之前了解到的 JavaScript 一直作为一门前端开发语言运行在浏览器内部（浏览器引擎负责解释 JavaScript 语言）。Node 同样也是 JavaScript 这门语言的运行环境。通过 Node，我们可以让 JavaScript 具备后台开发的能力。

- 安装 Node
- 测试 Node
  安装完成之后，打开命令行工具，输入以下命令：
  ```bash
  node -v
  ```
  // v14.16.0  
  如果可以显示 Node 的版本号，说明 Node 已经安装成功。
- 简单的控制台
  ```bash
  node
  ```
  就可以输入代码了。
- 简单地用 node 执行 JS 文件

  ```JS
  let a = 10;
  let b = 20;
  let c = a + b;
  console.log(c);
  }
  ```

  ```bash
  node test.js
  ```

## npm 概述

npm 是 Node 的包管理器，我们可以通过 npm 下载第三方模块，也可以通过 npm 管理一整个 Node 项目或前端开发项目的所有依赖。
在安装 Node 的时候，npm 也已经被成功安装了，这里直接打开命令行即可，输入以下命令，如果可以看到 npm 的版本号，说明 npm 安装成功。

```bash
npm -v
```

// 8.3.1

- npm 安装第三方模块

  ```bash
  npm install bootstrap
  ```

## cnpm

cnpm 是淘宝为国内用户提供的，它是 npm 的镜像，下载第三方包时，可以使用 cnpm 代替 npm。

- cnpm 安装
  安装 npm 之后，执行下面的命令，可以下载 cnpm

  ```bash
  npm install -g cnpm -- registry=https://registry.npm.taobao.org/
  ```

  下载完成之后，输入下面的命令，检测是否安装成功

  ```bash
  cnpm -v
  ```

  cnpm@7.1.0 (D:\Program Files\nodejs\node_global\node_modules\cnpm\lib\parse_argv.js)
  npm@6.14.15 (D:\Program Files\nodejs\node_global\node_modules\cnpm\node_modules\npm\lib\npm.js)
  node@14.16.0 (D:\Program Files\nodejs\node.exe)
  npminstall@5.4.0 (D:\Program Files\nodejs\node_global\node_modules\cnpm\node_modules\npminstall\lib\index.js)
  prefix=D:\Program Files\nodejs\node_global
  win32 x64 10.0.18363
  registry=https://registry.npmmirror.com

- cnpm 安装第三方模块

  ```bash
  cnpm install bootstrap
  ```
