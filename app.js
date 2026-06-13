require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sequelize = require('./config/db');
const Post      = require('./models/Post');
const Project   = require('./models/Project');
const Message   = require('./models/Message');
const SiteSettings = require('./models/SiteSettings');

const postsRoute    = require('./routes/posts');
const projectsRoute = require('./routes/projects');
const messagesRoute = require('./routes/messages');
const authRoute     = require('./routes/auth');
const settingsRoute = require('./routes/settings');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/posts',    postsRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/messages', messagesRoute);
app.use('/api/auth',     authRoute);
app.use('/api/settings', settingsRoute);

sequelize.sync({ alter: true })
    .then(() => console.log('✅ 数据库同步成功'))
    .catch(err => console.error('❌ 数据库连接失败:', err));

module.exports = app;