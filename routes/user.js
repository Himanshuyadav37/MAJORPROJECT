const express = require("express");
const router = express.Router({});
const User = require("../models/user.js");
const user = require("../models/user");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

// router.post("/signup",WrapAsync(async(req,res)=>{
//     try{
//     let { username, email, password } = req.body;  
//     const newUser = new User({ email, username });   
//     const registeredUser = await User.register(newUser, password);
//     // console.log(registeredUser);
//     req.flash("success","welcome to wanderlust ");
//     res.redirect("/listings");
//     }catch(e){
//         req.flash("error",e.message);
//         res.redirect("/signup");
//     }
// })); 
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;  
        const newUser = new User({ email, username });   
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs")
});



// router.post("/login",
//     saveRedirectUrl,
//     passport.authenticate("local",
//         {failureredirect:'/login', failureFlash:true}) ,
//          async(req,res)=>{
    
// req.flash("success","welcome to wanderluast you are loged in! ");
//  res.redirect(res.locals.redirectUrl);
// });
router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",
        {failureredirect:'/login', failureFlash:true}) ,
         async(req,res)=>{
    
req.flash("success","welcome to wanderluast you are loged in! ");
 res.redirect("/listings");
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect("/listings");
    });
});




module.exports = router;