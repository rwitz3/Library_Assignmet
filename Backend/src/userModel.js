const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://Rwitz6:Q1QehrxLjXzhRibS@cluster0.zvtir7v.mongodb.net/libraryApp')

const Schema=mongoose.Schema;
var userSchema=new Schema({
    name:String,
    email:String,
    mob_number:Number,
    password:String
});

var userInfo=mongoose.model('userinfo',userSchema);

module.exports=userInfo