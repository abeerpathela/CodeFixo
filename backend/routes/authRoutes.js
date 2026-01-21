const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    googleCallback
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const passport = require('passport');

// Email/Password Routes
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// Google OAuth Routes
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    (req, res, next) => {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        passport.authenticate('google', { 
            failureRedirect: `${frontendUrl}/login?error=auth_failed`, 
            session: false 
        })(req, res, next);
    },
    googleCallback
);

module.exports = router;
