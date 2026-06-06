const express = require('express');
const passport = require('passport');
const router = express.Router();

// Kickstart Google Authentication redirect pipeline
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback redirect link target
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login-failed' }),
    (req, res) => {
        // Successful authentication, redirect to dashboard or home page
        res.redirect('/api-docs');
    }
);    

// Session logout route
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

module.exports = router;    