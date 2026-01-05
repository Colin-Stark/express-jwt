const router = require('express').Router();
const authenticateToken = require('../middleware/authenticateToken');
const rateLimiter = require('../middleware/rateLimit');

// Apply rate limiting middleware to all routes in this router
router.use(rateLimiter);


router.get('/', authenticateToken, (req, res) => {
    res.status(200).json(
        {
            message: `Welcome ${req.user.username}, you have accessed a protected route!`
        }
    );
});

module.exports = router;