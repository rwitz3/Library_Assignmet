const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://Rwitz6:Q1QehrxLjXzhRibS@cluster0.zvtir7v.mongodb.net/libraryApp');


const Schema=mongoose.Schema;
var bookSchema=new Schema({
    name:String,
    authour:String,
    genre:String
});

var bookInfo=mongoose.model('bookinfo',bookSchema);

module.exports=bookInfo