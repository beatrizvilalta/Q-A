const Sequelize = require('sequelize');

const connection = new Sequelize('questionnaire', 'root', 'p3dr1t0sql', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;