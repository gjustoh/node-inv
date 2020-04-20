const express = require('express');
const router=express.Router();
module.exports = router;
router.get('/signup',(req,res)=>{
    res.render('login/signup');

});
router.post('/signup',(req,res)=>{
    console.log(req.body);
    res.send('login/login');

});