const express=require('express');
const userModel=require('./models/user');
const app=express();
const path=require('path')
app.set("views", "./views");

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.get("/", function(req,res){
    res.render("index");
})
app.post('/create',async function(req,res){
    let {name,email,call}=req.body;
    let user=await userModel.findOne({email});
    if (user) {
  console.log("USER EXISTS — SENDING ERROR");
  return res.render("index", {
    error: "User already registered"
  });
}

    let CreatedUser=await userModel.create({
        name,
        email,
        call
    })
    // console.log("REQ BODY:", req.body);

    return res.render("index", {
    success: "Registration successful! Our team will contact you shortly."
    });
})

// app.listen(3000);
const PORT = process.env.PORT || 3000;
app.listen(PORT);
