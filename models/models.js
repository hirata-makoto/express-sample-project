const tables = require('./tables')
const Sequelize = require('sequelize')

// DB接続
const sequelize = new Sequelize('company', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

// モデルを定義
const client = {}
Object.keys(tables).forEach(key => {
    client[key] = tables[key].init(sequelize, Sequelize)
})

// Sequelizeの格納
client.Sequelize = Sequelize
client.sequelize = sequelize

module.exports = client
