const express = require('express');
const router = express.Router();
const bodyReq = require('body-parser').urlencoded({ extended: false })
const passport = require('passport');

module.exports = router;

router.get('/signup', (req, res) => {
    res.render('login/signup');

});
router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));
router.get('/profile', (req, res) => {
    res.send("profile");
})