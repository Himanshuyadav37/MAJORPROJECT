const express = require("express");
const app = express();
const session = require("express-session");

app.use(session({secret : "mysupersecretstring"}));


app.get("/test",(req,res)=>{
    res.send("test succcessfully");
})


  // root route
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

app.listen("3000",(req,res)=>{
    console.log("server at 3000");
})