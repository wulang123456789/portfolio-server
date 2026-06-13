const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SiteSettings = sequelize.define('SiteSettings', {
    key:   { type: DataTypes.STRING, allowNull: false, unique: true },
    value: { type: DataTypes.TEXT },
});

module.exports = SiteSettings;