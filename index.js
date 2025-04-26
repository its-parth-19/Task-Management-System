const express=require('express')
const path=require("path")
const fs=require("fs");
const app=express();

app.set('view engine','ejs');
// setting the view engine as ejs 
app.use(express.json());
app.use(express.urlencoded({extended:true}))


// line to work and use static files/ serving static files with express 
app.use(express.static(path.join(__dirname,"public")))
// static files are images Audio,vedio js vanilla js, css files etc 

app.get("/",(req,res)=>{
    // res.send("Hello, from Server!");
    // view folder ke items show karne ke liye ham render karte hein naa ki send 
    // res.render('index');

    // iss route pe ham files folder ke andar kitni files hein vo dekhnge using fs module.
    fs.readdir(`./files`,(err,files)=>{
        res.render("index",{files:files})
        // index view ejs mein files name se files wala data bheja hein 
        // ham iske through view page pe kuch bhi bhej sakte hein jo hmara man karein 
    })


})
app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.description,function(err){
        res.redirect("/");
    })
})
app.get("/file/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        res.render('show',{filename:req.params.filename,filedata:filedata});
    })
}
    )
    app.get("/edit/:filename",(req,res)=>{
        res.render('edit',{filename:req.params.filename});
    })
    app.post("/edit",(req,res)=>{
       fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
        res.redirect("/")
       })
    })

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})