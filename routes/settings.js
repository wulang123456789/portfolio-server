const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const auth = require('../middleware/auth');

// 获取所有设置（公开）
router.get('/', async (req, res) => {
    try {
        const settings = await SiteSettings.findAll();
        const result = {};
        settings.forEach(s => { result[s.key] = s.value; });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 更新设置（需登录）
router.put('/', auth, async (req, res) => {
    try {
        const updates = req.body; // { hero_image: '...', hero_title: '...', ... }
        for (const [key, value] of Object.entries(updates)) {
            await SiteSettings.upsert({ key, value });
        }
        res.json({ message: '更新成功' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;