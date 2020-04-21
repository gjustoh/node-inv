const passport = require('passport');
const strategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
passport.use('local.signup',
    new strategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async(req, email, password, done) => {
        const { apellidos } = req.body;
        const { rol_id } = req.body;
        const { nombre } = req.body;
        const { direccion } = req.body;
        const { telefono } = req.body;
        const { skin_url } = req.body;
        const { estado } = req.body;
        const User = {
            rol_id,
            nombre,
            apellidos,
            direccion,
            telefono,
            email,
            password,
            skin_url,
            estado
        };
        User.password = await helpers.encryptPassword(password);
        const result = await pool.query('insert into usuario set ?', [User]);

        User.id = result.insertId;
        console.log(User.id);
        return done(null, User);
    })
);
passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
});
passport.deserializeUser(async(id, done) => {
    console.log(id);
    const row = await pool.query('select * from usuario where id=?', [id]);
    done(null, row[0]);
});