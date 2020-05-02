const express = require('express');
const router = express.Router();
const bodyReq = require('body-parser').urlencoded({ extended: false })
const passport = require('passport');
const {
    isLoggedIn
} = require('../lib/auth');


router.get('/signup', (req, res) => {
    res.render('login/signup');

});

router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

router.get('/profile', isLoggedIn, (req, res) => {
    res.render("perfil");
});
router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: 'true'
    })(req, res, next);

});
router.get('/signin', (req, res) => {
    res.render('login/signin')
});
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;