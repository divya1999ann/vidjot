var express = require('express');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser=require('body-parser');
var app = express();

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

//load idea model
require('./models/ideas')
var Idea=mongoose.model('ideas');

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.get('/ideas/add',function(req,res){
    res.render('./ideas/add');
  });

//process
app.post('/ideas', (req, res) => {
    let errors = [];
  
    if(!req.body.title){
      errors.push({text:'Please add a title'});
    }
    
    if(!req.body.details){
        console.log('hello');
      errors.push({text:'Please add some details'});
    }
  
    if(errors.length > 0){
      res.render('./ideas/add', {
        errors: errors,
        title: req.body.title,
        details: req.body.details
      });
    } else {
      res.send('passed');
    }
  });

var port = 5000;

app.listen(port,function(){
console.log("Server started on " + port);

});