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
     res.send('recibido');
 })
router.get('/',async(req,res)=>{
    const roles=await pool.query('select * from rol');
    console.log(roles);
    res.render('roles/list',{roles});
})
module.exports = router; 