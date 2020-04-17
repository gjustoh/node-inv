const express = require('express');
const router=express.Router();

const pool = require('../database');
 router.get('/add',(req,res)=>{
     res.render('roles/add');
 });
 router.post('/add',async(req,res)=>{
     const {name,estado}= req.body;
     const newRol={
        name,
        estado
     }; 
     await pool.query('INSERT INTO rol set ?',[newRol]);
     res.redirect('/roles');
 })
router.get('/',async(req,res)=>{
    const roles=await pool.query('select * from rol');
    res.render('roles/list',{roles});
});
router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    // await pool.query("update rol set estado='*' where id=?",[id]);
    await pool.query("delete from rol where id=?",[id]);
    res.redirect('/roles');
})

module.exports = router; 