const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.sequelize.define('user', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    First_Name: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    Last_Name: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING(35),
        unique: true,
        allowNull: false,
        validate: {
            notNull: { args: true, msg: "You must enter a Email" }
        },
    },
    Password: {
        type: Sequelize.STRING(220),
        allowNull: false
    },
    Image: {
        type: Sequelize.TEXT,
        defaultValue: "https://static.thenounproject.com/png/2349575-200.png",
        timestamps: true
    }
}, {
    freezeTableName: true,
    tableName: 'user',
    timestamps: false
});