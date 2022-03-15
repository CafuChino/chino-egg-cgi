# chino-egg-cgi

基于Egg构建的TypeScript后端模板

[![Test and Build](https://github.com/CafuChino/chino-egg-cgi/actions/workflows/testAndBuild.yml/badge.svg)](https://github.com/CafuChino/chino-egg-cgi/actions/workflows/testAndBuild.yml)

## 最低要求

- Node.js 8.x
- Typescript 2.8+

## 内置插件

1. Sequelize (MySql, PostgreSQL, SQLite, MSSQL)
2. Redis (以及rejson插件支持)

## Tips

1. 使用`app.makeCommonResponse`构建标准返回体
2. 如果开发环境的Redis没有装载rejson插件不要调用相关命令、或在`app.ts`中删除挂载的功能函数
3. 使用`sequelize migrate`跟踪和构建数据库，本地和单元测试环境下回自动同步migrate更改，以下是一些实用命令
    - `yarn sequelize db:create` 自动创建当前环境的数据库（根据`database/config.json`中的配置）
    - `yarn sequelize db:migrate` 同步migrate
    - `yarn sequelize migration:generate` 创建数据库migrate
    - `yarn sequelize model:generate` 创建新表和他的migrate
4. 使用`yarn plop`快速创建新的Controller和Service
5. 配置开发环境很复杂，使用chino-dev-box可以一键构建所需环境


## TODO

- 接入自动化CI
- 接入内置Sentry支持
- 接入内置MongoDB支持
