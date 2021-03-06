const express = require('express');
const router = express.Router();
const pool = require('../database');


// Productos

router.get('/', async(req, res) => {
    res.render('products/list')
});
router.get('/add', async(req, res) => {
    const productos = await pool.query('select * from producto')
    const departamento = await pool.query('select * from departamento');
    // console.log({ departamento });
    res.render('products/add', { productos, departamento });
});
router.get('/provincia', async(req, res) => {
    console.log('provincia');
    var departamento = req.query.departamento_id;
    let provincia = await pool.query("SELECT * FROM provincia WHERE departamento_id = ?", [departamento]);
    if (provincia.length <= 0) {
        return res.status(500).send(err);
    }
    return res.send(provincia);


});
router.get('/distrito', async(req, res) => {
    console.log('distrito');
    var departamento = req.query.departamento_id;
    var provincia = req.query.provincia_id;
    let distrito = await pool.query("SELECT * FROM distrito WHERE departamento_id = ? and provincia_id=?", [departamento, provincia]);
    if (distrito.length <= 0) {
        return res.status(500).send(err);
    }
    return res.send(distrito);


});
//fin productos


//almacenes
router.get('/storeouse', (req, res) => {
    res.render('products/storehouse/list');
});

router.get('/storeouse/add', (req, res) => {
    res.render('products/storehouse/add');
});
router.post('/storeouse/add', (req, res) => {
    res.render('products/storehouse/add');
});
router.get('/storeouse/delete/:id', (req, res) => {
    res.render('products/storehouse');
});
router.get('/storeouse/edit:id', (req, res) => {
    res.render('products/storehouse/add');
});
router.get('/storeouse/edit:id', (req, res) => {
    res.render('products/storehouse/add');
});


//fin almacenes
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


});
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
});
router.get('/category/edit/:id', async(req, res) => {
    const { id } = req.params;
    const categoria = await pool.query("select * from categoria where id=?", [id]);
    res.render('products/category/edit', { categoria: categoria[0] });
});
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
});
// Fin categorias
module.exports = router;