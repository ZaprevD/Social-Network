const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})
sequelize.authenticate().then(() =>{
    console.log("DB Connected!");
})
.catch((error) =>{
    console.log("Unable to connect to the database" , error);
})
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
