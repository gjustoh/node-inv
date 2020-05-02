const passport = require('passport');
const strategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
passport.use('local.signin', new strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: 'true'

}, async(req, email, password, done) => {
    const fila = await pool.query('select * from usuario where email = ?', [email]);
    if (fila.length > 0) {
        const user = fila[0];
        const islogin = await helpers.matchPassword(password, user.password);
        console.log(req.body);
        console.log(fila[0].email + " " +
            email + ' ' + password)

        if (islogin) {
            done(null, user, req.flash('guardado',
                'Welcome ' + user.nombre + ' ' + user.apellidos));
        } else {
            done(null, false, req.flash('error', 'password incorrecto'));
        }
    } else {
        return done(null, false, req.flash('error', 'usuario no existe'));
    }


}));
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
    const row = await pool.query('select id,rol_id,nombre,apellidos,direccion,telefono,email,skin_url, estado from usuario where id=?', [id]);
    const rola = await pool.query('select name from rol where id=?', [row[0].rol_id]);
    rols = {
        rol: rola[0]
    }
    row[0].rol = rola[0].name;
    delete row[0].rol_id;
    console.log(row)
    done(null, row[0]);
});