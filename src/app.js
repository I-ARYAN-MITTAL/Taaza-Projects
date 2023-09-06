const express = require("express");
const hbs = require("hbs")
const path = require("path");
 require("./db/conn");
 const User = require("./models/UserSchema")
const app = express();
const port = process.env.PORT || 3000;

const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialspath = path.join(__dirname,"../templates/partials");

//middleware
app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jq",express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(`${staticpath}`));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('views', path.join(__dirname,"../views"))

app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialspath)

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/contact",(req,res)=>{
    res.render("contact");
})
app.post("/contact",async (req,res) => {
    try{
       const password = req.body.Password;
       const cpassword = req.body.ConfirmPassword;
       
       if(password == cpassword){
         const UserData = new User({
         username:req.body.username,
         PhoneNumber:req.body.PhoneNumber,
         Mail:req.body.Mail,
         Password:password,
         ConfirmPassword:cpassword
         })
        
         await UserData.save();
        res.status(201).render("index");
         
       }else{
         res.send("Passwords don't match");
       }
     }
      catch(e){
                 res.status(500).send(e);
             }
         
         });



app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})