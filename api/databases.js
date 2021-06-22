const Sequelize = require("sequelize");


log = console.log
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'TaaH.db',
    logging: false
});

function authenticate() {
    let connection = setInterval(() => {
        authenticate();
    }, 1000 * 60 * 1);
    sequelize.authenticate()
        .then(function (conn) {
            clearInterval(connection);
            log(`Database connected!`.yellow);
        })
        .catch(e => {
            console.log(`ERROR: NOT CONNECTED TO DATABASE | ${e}`);
        });
    sequelize.sync()
        .then((res) => {
            log(`Đã đồng bộ model.`);
        })
        .catch(err => {
            log(`error`)
        });
}

authenticate();
module.exports = {
    sequelize
};