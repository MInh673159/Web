const Sequelize = require("sequelize");
const db = require('./databases');

const Data = db.sequelize.define('datas', {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Tem: {
            type: Sequelize.CHAR

        },
        Hum: {
            type: Sequelize.CHAR

        }
    }
);


module.exports = {Data: Data};