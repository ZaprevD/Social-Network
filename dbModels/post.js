const Sequelize = require("sequelize");
const db = require("../database");
const user = require("./user");

module.exports = db.sequelize.define("post", {

    PostId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    Created_On: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: new Date()
    },
    Likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user, // 'post' refers to table name
            key: 'Id', // 'id' refers to column name in user table
        }
    }

}, {
    freezeTableName: true,
    tableName: 'post',
    timestamps: false
});