var express=require('express');
var mongoose = require('mongoose');
var router= express.Router();


 //User login route
router.get('/login',(req,res)=>{
    res.send('login');
 });

//User register route
router.get('/register',(req,res)=>{
    res.send('register');
});


module.exports=router;
