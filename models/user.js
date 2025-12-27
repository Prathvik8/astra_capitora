const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/capitora");

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    call:String
});

module.exports=mongoose.model('user',userSchema);