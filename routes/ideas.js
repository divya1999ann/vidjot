var express=require('express');
var mongoose = require('mongoose');
var router= express.Router();

//load idea model
require('../models/ideas')
var Idea=mongoose.model('ideas');



//ideas index page 
router.get('/',function(req,res){
    Idea.find({})
    .sort({date:'desc'})
    .then(ideas =>{
        res.render('ideas/index',{
            ideas:ideas
        });
    });

});

//add ideas form
router.get('/add',function(req,res){
   res.render('ideas/add');
});

//edit form
router.get('/edit/:id',function(req,res){
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea=>{
        res.render('./ideas/edit',{
            idea:idea
        });
    });
});

//process
router.post('/', (req, res) => {
    let errors = [];
  
    if(!req.body.title){
      errors.push({text:'Please add a title'});
    }
    
    if(!req.body.details){
      errors.push({text:'Please add some details'});
    }
  
    if(errors.length > 0){
      res.render('./ideas/add', {
        errors: errors,
        title: req.body.title,
        details: req.body.details
      });
    } else {
      var newUser={
          title: req.body.title,
          details: req.body.details
      }
      new Idea(newUser)
      .save()
      .then(idea=>{
        req.flash('success_msg','Video idea added');
          res.redirect('/ideas');
      })
    }
  });

  //edit form process
router.put('/:id',(req,res)=>{
      Idea.findOne({
          _id: req.params.id
      })
      .then(idea=>{
          idea.title=req.body.title;
          idea.details=req.body.details;
          idea.save()
          .then(idea=>{
            req.flash('success_msg','Video idea updated');
              res.redirect('/ideas');
          })
      });
  });

 //delete idea
router.delete('/:id',function(req,res){
       Idea.remove({_id:req.params.id})
       .then(()=>{
        req.flash('success_msg','Video idea removed');    
        res.redirect('/ideas');
       })

 });

 module.exports=router;
