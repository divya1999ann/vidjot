var express = require('express');
var path= require('path');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser=require('body-parser');
var methodOverride = require('method-override')
var flash =require('connect-flash');
var session = require('express-session');
var app = express();


//load routes
var ideas= require('./routes/ideas');
var users=require('./routes/users');

//map global promise
mongoose.Promise=global.Promise;

//connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev',{
    useNewUrlParser: true
})
.then(function(){
    console.log('Mongo DB Connected...');
})
.catch(err=>console.log(err));


app.engine('handlebars', exphbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

//HOW Middleware works
app.use(function(req,res,next){
    
    //console.log(Date.now());
    next();
});

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname,'public')));

//middleware for express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    
  }));

app.use(flash());

//global variables
app.use(function(req,res,next){
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//method override middelware
app.use(methodOverride('_method'));

//index port
app.get('/',function(req,res){
    const title='Welcome1';
    res.render('index',{
        title:title
    });
});

//About Route
app.get('/about',function(req,res){
      res.render('about');
});




//use routes
app.use('/ideas',ideas);
app.use('/users',users);

var port = 5000;

app.listen(port,function(){
console.log("Server started on " + port);

});