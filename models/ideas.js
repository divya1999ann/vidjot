var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//craete Schema
var IdeaSchema = new Schema({
  title:{
      type:String,
      required:true
  },
  details:{
      type:String,
      required:true
  },
  date:{
      type:Date,
      dafault:Date.now
  }
});

mongoose.model('ideas',IdeaSchema);