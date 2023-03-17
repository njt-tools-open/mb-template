## 简介

该项目模板项目创建, 目的在于:

1. 解决中后台功能解耦
2. 远程模块输出规范统一为 systemjs(各类微前端输出的模块难以统一, 十分混乱)
3. 技术栈开发, 即各 主/子 项目间使用技术栈可不一致
4. 尽量公用 js 库, 减少 js 文件大小

## 使用

## 依赖安装

### 全局依赖

```sh
# pm2 开发进程管理
# @njt-tools-open/lang-manage 语言包管理
npm install pm2 @njt-tools-open/lang-manage -g
```

### 项目依赖

```sh
# 安装项目依赖
pnpm install
# 预构建项目依赖
pnpm prebuild
```

### 启动

> 建议提前打开 pm2 监控界面: pm2 monit

```sh
# 启动控制台项目
pnpm start:console
```

访问 pm2 监控界面中 vite 启动地址

### 预构建前端生产资源

```sh
# 启动控制台项目
pnpm preview:console-prod
# 等待上条指令完成后, 打开新命令窗口, 再构建远程模块(避免 dist 目录被清除)
pnpm preview:console-remote
```

远程模块构建完成后, 访问第一条指令打印地址

## 依赖版本

```json
{
  "dependencies": {
    "antd": "4.24.8",
    "mobx": "6.7.0",
    "mobx-react-lite": "3.4.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "systemjs": "6.14.0"
  },
  "devDependencies": {
    "tslib": "2.3.1",
    "typescript": "4.9.3"
  }
}
```

## 项目目录结构

```
.
├── docs # 项目设计文档放置
├── packages # 项目公用依赖目录
├── production # 按单页应用管理产品
│   ├── console # 控制台
│   └── ...
├── production # 按单页应用管理产品
├── remotes # 不同应用远程模块
│   ├── <prod_name> # prod_name 应用远程模块
│   │   ├── <remote_type>-<remote_name>
│   │   └── ...
├── templates # 不同项目模板
│   ├── production # 生成新单页应用模板
│   └── remote # 远程模块模板
└── tools # 项目工具类包(命令工具集合)
    ├── index.html
    ├── assets/**
    ├── <prod_name>-layout-<layout_name>
    │   ├── main.js
    │   └── *.*
    ├── <prod_name>-module-<module_name>
    │   ├── main.js
    │   └── *.*
    └── ...
.
```

## 输出目录结构

```
.
└── <prod_name>
    ├── index.html
    ├── assets/**
    ├── <prod_name>-layout-<layout_name>
    │   ├── main.js
    │   └── *.*
    ├── <prod_name>-module-<module_name>
    │   ├── main.js
    │   └── *.*
    └── ...
.
```
