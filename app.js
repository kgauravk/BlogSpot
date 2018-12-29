var express = require('express'),
app         = express(),
mongoose    = require('mongoose'),
bodyParser  = require('body-parser');


mongoose.connect('mongodb://localhost/blog_spot');
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


var blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    body  : String,
    created :{type:Date , default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);

app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/blogs',(req,res)=>{
    res.render('index');
})

app.listen(3000,()=>{
    console.log("SERVER STARTED!!!");
});