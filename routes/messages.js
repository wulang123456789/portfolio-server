const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json({ message: '留言成功！' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id/read', auth, async (req, res) => {
    try {
        const msg = await Message.findByPk(req.params.id);
        if (!msg) return res.status(404).json({ error: '留言不存在' });
        await msg.update({ read: true });
        res.json({ message: '已标记为已读' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const msg = await Message.findByPk(req.params.id);
        if (!msg) return res.status(404).json({ error: '留言不存在' });
        await msg.destroy();
        res.json({ message: '删除成功' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;