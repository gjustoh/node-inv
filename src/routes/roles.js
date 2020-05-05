const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
router.get('/add', isLoggedIn, (req, res) => {
    res.render('roles/add');
});
router.post('/add', isLoggedIn, async(req, res) => {
    const { name, estado } = req.body;
    const newRol = {
        name,
        estado
    };
    const roles = await pool.query("select * from rol where name=?", [name]);
    let rolesTotal = roles.length;

    if (rolesTotal > 0) {

        res.render('roles/add');
    } else {
        await pool.query('INSERT INTO rol set ?', [newRol]);
        req.flash('guardado', 'Guardado correctamente');
        res.redirect('/roles');
    }


})
router.get('/', isLoggedIn, async(req, res) => {
    const roles = await pool.query('select * from rol');
    res.render('roles/list', { roles });
});
router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    // await pool.query("update rol set estado='*' where id=?",[id]);
    await pool.query("delete from rol where id=?", [id]);
    req.flash('guardado', 'rol eliminado satisfactoriamente')
    res.redirect('/roles');
})
router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const rol = await pool.query("select * from rol where id=?", [id]);
    res.render('roles/edit', { rol: rol[0] });
})
router.post('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { name, estado } = req.body;
    const rol = {
        name,
        estado
    };

    const roles = await pool.query("select * from rol where name=?", [name]);
    const nameActOld = await pool.query("select * from rol where id=?", [id]);
    let rolesTotal = roles.length;
    if (nameActOld[0].name != name) {
        if (rolesTotal > 0) {
            res.send("rol ya existe");
            // ('rol ya existe')
        } else {
            await pool.query("update rol set ? where id=?", [rol, id]);
            req.flash('guardado', 'rol editado satisfactoriamente')
            res.redirect('/roles');
        }
    } else {
        await pool.query("update rol set ? where id=?", [rol, id]);
        req.flash('guardado', 'rol editado satisfactoriamente')
        res.redirect('/roles');
    }
})
module.exports = router;