## npm 常用命令

1. npm 安装第三方模块
   npm 有两种方式安装第三方模块：本地安装和全局安装，使用哪种安装方式，取决于我们用 npm 模块来做什么。

- 如果模块作为项目的依赖，需要被引入到指定项目当中，需要本地安装。
  本地安装
  ```bash
  npm install jquery
  ```
- 如果需要模块提供某些命令工具，则需要全局安装。
  例如，`npm install -g http-server`安装一个静态服务器

## npm 项目初始化

npm init

## npm 安装依赖

`npm install XXXX --save`  
加上`--save`参数就可以把安装的依赖记录到 package.json 中
如果把 node_moudules 这个目录删了，可以通过输入`npm install`自动安装 package.json 记录的依赖。
