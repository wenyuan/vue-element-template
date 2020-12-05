# vue-element-template

## 简介

vue-element-template 是一个小型化 Vue.js 项目模板，它基于 [vue](https://cn.vuejs.org/) 和 [element-ui](https://element.eleme.cn/) 实现。

## 准备

你需要在本地安装 [node](https://nodejs.org/) 和 [git](https://git-scm.com/) 。

本项目通过 `@vue/cli@4.5.9` 脚手架搭建完成，技术栈基于 [ES2015+](http://es6.ruanyifeng.com/) 、[vue](https://cn.vuejs.org/) 、[vuex](https://vuex.vuejs.org/zh/) 、[vue-router](https://router.vuejs.org/zh/) 、[vue-cli](https://cli.vuejs.org/zh/) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://element.eleme.cn/) ，所有的请求数据都使用本地 json 文件进行模拟，力求依赖最少化。

相关依赖的版本参见 `package.json` 文件。

如果初次使用 Vue.js 编写项目，可以先阅读几篇博客文章，关于如何从零构建一个 Vue.js 项目，先看完这些文章后再看本项目代码会清晰很多。

* [Vue CLI 3.x 搭建 Vue 项目](https://www.wenyuanblog.com/blogs/vue-cli3x-to-create-vue-project.html)
* [Vue 封装 Axios 请求和拦截器](https://www.wenyuanblog.com/blogs/vue-axios-interceptors-packaging.html)
* [Vuex 业务模块划分项目实例](https://www.wenyuanblog.com/blogs/vue-vuex-module-division-in-real-project.html)
* [Vue 开发时配置使用 mock 数据](https://www.wenyuanblog.com/blogs/vue-use-mock-data-when-developing.html)
* [WebStorm 配置代码格式化](https://www.wenyuanblog.com/blogs/webstorm-eslint-prettier-reformat-code.html)

**如有问题请先看上述使用文档和文章，若不能满足，欢迎 issue 和 pr**。

## 说明

* 本项目不是一个完整的后台管理系统解决方案，仅是一个项目的基础模板，各功能需要根据需求自行开发。
* 本项目中会尽可能详细注释，可供新手学习，实际开发可删除这些注释文字。
* 本项目中对代码的注释将采用英文形式（帮助女朋友提高英文能力），但会确保通过有道词典（或同类工具）的翻译，最终输出通顺流利的中文句子。

## 代码风格

> 团队关于代码风格必须遵循两个基本原则：少数服从多数、用工具统一风格。

* 本项目使用 [ESLint](https://github.com/eslint/eslint) + [Prettier](https://github.com/prettier/prettier) 来统一代码风格（使用脚手架安装时选择）。
* 适当修改了规则配置，以防止 ESLint 和 Prettier 混合使用时的重复或冲突。
  * 修改 ESLint 的配置文件：`.eslintrc.js`，所有带注释的条目是我自定义添加的规则
  * 创建 Prettier 的配置文件：`prettier.config.js`
  * 创建忽略 ESLint 语法检查的配置文件：`.eslintignore`
* 根据入乡随俗原则，由于是 Vue.js 项目，JavaScript 代码不加分号。
  * [JavaScript 语句后应该加分号么？——尤雨溪的回答](https://www.zhihu.com/question/20298345/answer/49551142)
* 缩进采用两个空格（不是 tab 也不是四个空格）

## 目录结构

（待更新）

## 支持

如果你觉得对你有帮助，可以给我一个小星星 ⭐️

## 版权信息

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2020-present, WenYuan

## 鸣谢

本项目借鉴了 GitHub 上几个不错的项目（取长补短），提炼了典型的目录组织和代码风格，删去了丰富的子功能，仅保留最原始的模型，目的是为了方便快速搭建一个小工程，更适合定制化开发。

以下是我主要参考的仓库：

* [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
* [vue-manage-system](https://github.com/lin-xin/vue-manage-system)
* [vue-awesome-template](https://github.com/BryanAdamss/vue-awesome-template)
* [vue-admin-spa](https://github.com/lss5270/vue-admin-spa)
