const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Message = sequelize.define('Message', {
    name:    { type: DataTypes.STRING, allowNull: false },
    email:   { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT,   allowNull: false },
    read:    { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Message;