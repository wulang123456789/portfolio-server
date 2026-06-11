const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
    name:       { type: DataTypes.STRING, allowNull: false },
    desc:       { type: DataTypes.TEXT },
    image_url:  { type: DataTypes.STRING },
    tech_stack: { type: DataTypes.STRING },
    demo_url:   { type: DataTypes.STRING },
    github_url: { type: DataTypes.STRING },
});

module.exports = Project;