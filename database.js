let mySql = require("mysql");
let connection = mySql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((error) => {
    if(error) throw error;
    console.log(`DB Connected!`);
});
module.exports  = connection;