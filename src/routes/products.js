const express = require('express');
const router = express.Router();
const pool = require('../database');
router.get('/', async(req, res) => {
    const productos = pool.query('select * from producto')
    res.render('products/list', { productos })
});


// Categorias
router.get('/category/add', (req, res) => {
    res.render('products/category/add');
});
router.post('/category/add', async(req, res) => {
    const { name, estado } = req.body;
    const newCat = {
        name,
        estado
    };
    const categorias = await pool.query("select * from categoria where name=?", [name]);
    let categoriasTotal = categorias.length;

    if (categoriasTotal > 0) {

        res.render('products/category/add');
    } else {
        await pool.query('INSERT INTO categoria set ?', [newCat]);
        req.flash('guardado', 'Guardado correctamente');
        res.redirect('/products/category');
    }


})
router.get('/category', async(req, res) => {
    const categorias = await pool.query('select * from categoria');
    res.render('products/category/list', { categorias });
});
router.get('/category/delete/:id', async(req, res) => {
    const { id } = req.params;
    // await pool.query("update categoria set estado='*' where id=?",[id]);
    await pool.query("delete from categoria where id=?", [id]);
    req.flash('guardado', 'categoria eliminado satisfactoriamente')
    res.redirect('/products/category');
})
router.get('/category/edit/:id', async(req, res) => {
    const { id } = req.params;
    const categoria = await pool.query("select * from categoria where id=?", [id]);
    res.render('products/category/edit', { categoria: categoria[0] });
})
router.post('/category/edit/:id', async(req, res) => {
        const { id } = req.params;
        const { name, estado } = req.body;
        const categoria = {
            name,
            estado
        };

        const categorias = await pool.query("select * from categoria where name=?", [name]);
        const nameActOld = await pool.query("select * from categoria where id=?", [id]);
        let categoriasTotal = categorias.length;
        if (nameActOld[0].name != name) {
            if (categoriasTotal > 0) {
                res.send("categoria ya existe");
                // ('categoria ya existe')
            } else {
                await pool.query("update categoria set ? where id=?", [categoria, id]);
                req.flash('guardado', 'categoria editado satisfactoriamente')
                res.redirect('/products/category');
            }
        } else {
            await pool.query("update categoria set ? where id=?", [categoria, id]);
            req.flash('guardado', 'categoria editado satisfactoriamente')
            res.redirect('/products/category');
        }
    })
    // Fin categorias
module.exports = router;