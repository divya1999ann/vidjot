var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();


app.engine('handlebars', exphbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

//HOW Middleware works
app.use(function(req,res,next){
    req.name="Dak1999";
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