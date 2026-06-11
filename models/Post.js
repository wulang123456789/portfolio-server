const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define('Post', {
    title:     { type: DataTypes.STRING, allowNull: false },
    content:   { type: DataTypes.TEXT,   allowNull: false },
    cover_url: { type: DataTypes.STRING },
    tags:      { type: DataTypes.STRING },
    published: { type: DataTypes.BOOLEAN, defaultValue: false },
});
module.exports = Post;