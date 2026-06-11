const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    try {
        const projects = await Project.findAll({ order: [['createdAt', 'DESC']] });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ error: '项目不存在' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ error: '项目不存在' });
        await project.update(req.body);
        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) return res.status(404).json({ error: '项目不存在' });
        await project.destroy();
        res.json({ message: '删除成功' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;