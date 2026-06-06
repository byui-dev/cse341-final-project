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