const bcrypt = require('bcryptjs');
const express = require('express');
require('dotenv').config();
const router = express.Router();
const users = require('../fakeDB/users');


router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
    }
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = { username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
});

module.exports = router;