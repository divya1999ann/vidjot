var localStrategy = require('passport-local')
.Strategy;
var passport = require('passport');
var mongoose=require('mongoose');
var bcrypt= require('bcryptjs');

//load user model
var User= mongoose.model('users');

module.exports = function(passport){
    passport.use(new localStrategy({usernameField:'email'},(email,password,done)=>{
        //match user
        User.findOne({
            email:email
        }).then(user=>{
            if(!user){
                return done(null, false,{message:'No user found'});
            }

            //Match password
           bcrypt.compare(password,user.password,(err,isMatch)=>{
               if(err) throw err;
               if(isMatch){
                    return done(null,user);
               }else{
                return done(null, false,{message:'Passowrd incorrect'});
               }
           })
        })
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}