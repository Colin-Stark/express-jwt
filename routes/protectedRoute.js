const router = require('express').Router();
const authenticateToken = require('../middleware/authenticateToken');


router.get('/', authenticateToken, (req, res) => {
    res.status(200).json(
        {
            message: `Welcome ${req.user.username}, you have accessed a protected route!`
        }
    );
});

module.exports = router;