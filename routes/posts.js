const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, published } = req.query;
        const where = {};
        if (published !== undefined) where.published = published === 'true';
        const { count, rows } = await Post.findAndCountAll({
            where,
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit),
        });
        res.json({ total: count, page: parseInt(page), data: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ error: '文章不存在' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ error: '文章不存在' });
        await post.update(req.body);
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ error: '文章不存在' });
        await post.destroy();
        res.json({ message: '删除成功' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;