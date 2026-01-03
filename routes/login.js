const bcrypt = require('bcryptjs');
const express = require('express');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');
const users = require('../fakeDB/users');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = users.find(u => u.username === username);
    if (!existingUser) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
        { username: existingUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });

});

module.exports = router;