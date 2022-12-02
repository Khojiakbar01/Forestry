const {Sequelize} = require('sequelize')

const vars = process.env

const dbConfig = {
    host: vars.DB_HOST,
    port: vars.DB_PORT,
    database: vars.DB_NAME,
    username: vars.DB_USER,
    password: vars.DB_PASSWORD,
    dialect: vars.DB_DIALECT

}

const db =new Sequelize(dbConfig)

module.exports = db