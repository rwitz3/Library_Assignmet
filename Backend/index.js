const express=require('express');
const cors =require('cors');
const app=new express();
const path = require('path');
app.use(express.static('./dist/front-end'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


const userInfo=require('./src/userModel')
const bookInfo=require('./src/bookModel')

app.post('/api/signup',function(req,res){
    var user={
        name:req.body.user.name,
        email:req.body.user.email,
        mob_number:req.body.user.mob_number,
        password:req.body.user.password
    };
    const new_user=new userInfo(user);
    new_user.save();
})

app.post('/api/addbooks',function(req,res){
    var book={
        name:req.body.book.name,
        authour:req.body.book.authour,
        genre:req.body.book.genre
    }
    const new_book=new bookInfo(book);
    new_book.save();
})

app.get('/api/books',function(req,res){
    // res.header("Access-Control-Allow-Origin","*")
    // res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS")
    bookInfo.find()
    .then(function(item){
        res.json(item);
    })
}) 

app.get('/api/:id', (req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS")
    const id=req.params.id;
    bookInfo.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    })
}) 

app.delete('/api/remove/:id',(req,res)=>{
    id=req.params.id;
    bookInfo.findByIdAndDelete({'_id':id})
    .then(()=>{
        console.log('success')
        res.send();
})
})

app.put('/api/update',(req,res)=>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
    // console.log("hi")
    id=req.body._id,
    name=req.body.name,
    authour=req.body.authour,
    genre=req.body.genre
    
    bookInfo.findOneAndUpdate({"_id":id},
                                {$set:{"name":name,
                                "authour":authour,
                                "genre":genre,
                                
                               }})
   .then(function(){
       res.send();
   })
 })

app.put("/api/login",(req,res)=>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-method:GET,POST,PUT,DELETE");
    
try {
       userInfo.findOne({email: req.body.email,password:req.body.password})
        .then((data) => {
            if (data) {
                res.status(200);
                res.json(data);
            } else {
                res.status(404).send('User not found')
               
            }
        })
        .catch((err) => {
            console.log("Error:", err);
            res.json(err);
        });
}
catch (err)
{
    console.log("error", err)
    res.status(500)
    res.json(err);
}
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/front-end//index.html'));
    });


var port=process.env.PORT||3333;
app.listen(port);