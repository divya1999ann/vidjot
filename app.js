var express = require('express');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var app = express();

//map global promise
mongoose.Promise=global.Promise;

//connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev',{

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

var port = 5000;

app.listen(port,function(){
console.log("Server started on " + port);

});