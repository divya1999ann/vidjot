var express=require('express');
var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');
var passport = require('passport');
var router= express.Router();


//user model
require('../models/user');
var User=mongoose.model('users');

 //User login route
router.get('/login',(req,res)=>{
    res.render('users/login');
 });

//User register route
router.get('/register',(req,res)=>{
    res.render('users/register');
});

//Login form POST
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/ideas',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);

});

// Register form POST
router.post('/register',(req,res)=>{
   let errors = [];

   if(req.body.password!=req.body.password2){
       errors.push({text:'Passwords do not match'});
       }  
   if (req.body.password.length < 4)
       {
           errors.push({text:'Passwords must be atleast 4 in lenght'});
       }
   if(errors.length > 0){
       res.render('users/register',{
           errors:errors,
           name:req.body.name,
           email: req.body.email,
           password:  req.body.password,
           password2: req.body.password2
       });
   }
   else{

       User.findOne({email:req.body.email})
       .then(user=>{
          if(user){
            req.flash('error_msg','Email already registered');
            res.redirect('/users/register');
          } else{

            var newUser=new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
           bcrypt.genSalt(10,(err,salt)=>{
               bcrypt.hash(newUser.password,salt,(err,hash)=>{
                   if(err) throw err;
                   newUser.password=hash;
                   newUser.save()
                   .then(user =>{
                       req.flash('success_msg','You are now registered');
                       res.redirect('/users/login');
                   })
                   .catch(err=>{
                        console.log(err);
                        return;
                   });
               });
           });
           
          }
       });
       
   }
});

//logout user
router.get('/logout',(req,res)=>{
  req.logout();
  req.flash('success_msg','You are logged out');
  res.redirect('/users/login');
});


module.exports=router;
