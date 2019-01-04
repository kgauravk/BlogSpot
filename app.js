var express     = require('express'),
app             = express(),
mongoose        = require('mongoose'),
bodyParser      = require('body-parser'),
methodOverride  = require('method-override');


mongoose.connect('mongodb://localhost/blog_spot',{useNewUrlParser:true});
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride('_method'));


var blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    body  : String,
    created :{type:Date , default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);

// Blog.create({
//     title : "The Mythbuster’s Guide to Saving Money on Energy Bills",
//     image : "https://www.miss-thrifty.co.uk/wp-content/uploads/2018/09/38154357964_63da2f548e_z-150x150.jpg",
//     body : "Once you get past the beginner-level energy-saving stuff, a whole new world of thrifty nerdery opens up. Here are some secrets to copping a load of money off your utilities bills",
// },(err,blog)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('ADDED');
//         console.log(blog);
//     }
// });

app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/blogs',(req,res)=>{

    Blog.find({},(err,blogs)=>{
        if(err){
            console.log(err);
        }else{
            res.render('index',{blogs:blogs});
        }
    });

});

app.get('/blogs/new',(req,res)=>{
    res.render('new');
});

app.get('/blogs/:id',(req,res)=>{
    var id = req.params.id;
    Blog.findById(id,(err,blog)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('show',{blog:blog});
        }
    });
});

app.get('/blogs/:id/edit',(req,res)=>{
    var id= req.params.id;
    Blog.findById(id,(err,blog)=>{
        if(err){
            console.log(err);
        }else{

            res.render('edit',{blog:blog});
        }
    });
});


app.post('/blogs',(req,res)=>{

    var title = req.body.title;
    var img = req.body.image;
    var body = req.body.body;

    Blog.create({
        title: title,
        image : img,
        body :body
    },(err,blog)=>{
        if(err){
            console.log(err);
        }else{
            console.log('ADDED');
            console.log(blog);
            res.redirect('/blogs');
        }
    });
});


app.put('/blogs/:id',(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id,req.body.blog, (err,updatedBlog)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/blogs/'+req.params.id);
        }

    });
});

app.delete('/blogs/:id',(req,res)=>{

    Blog.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            res.redirect('/blogs');
        }else{
            res.redirect('/blogs');
        }
    });

});

app.listen(3000,()=>{
    console.log("SERVER STARTED!!!");
});