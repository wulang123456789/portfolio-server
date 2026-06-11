const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ADMIN = {
    username: 'wulang',
    password: bcrypt.hashSync('wu200435@', 10),
};

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username !== ADMIN.username)
            return res.status(401).json({ error: '用户名或密码错误' });
        const valid = await bcrypt.compare(password, ADMIN.password);
        if (!valid)
            return res.status(401).json({ error: '用户名或密码错误' });
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;