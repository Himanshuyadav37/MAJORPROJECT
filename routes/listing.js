const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");


const validateListing=(req,res,next)=>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
   throw new ExpressError(400,errMsg); 
  }else{
    next();
  }
}


//  index router here we call all listening here all listening are saved--->
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// NEW router
router.get("/new", (req, res) => {
  console.log(req.user);
  
  res.render("listings/new.ejs");
});

// show router 
router.get("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if(!listing){
    req.flash("error","Listing you requested for does not exist!");
    res.redirect("/listings")
  }
  res.render("listings/show.ejs", { listing });
}));


// create router
router.post("/",validateListing,isLoggedIn,  wrapAsync(async (req, res) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  req.flash("success","New Listing Created");
  res.redirect("/listings");
}));

// edit router
// router.get("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   if(!listing){
//     req.flash("error","Listing you requested for does not exist!");
//     res.redirect("/listings")
//   }
  
//   res.render("listings/edit.ejs", { listing });
// }));

router.get("/:id/edit", isLoggedIn, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
}));
// router.get("/:id/edit", isLoggedIn,  wrapAsync(async (req, res) => {
//   const { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/edit.ejs", { listing });
// }));

// update router
router.put("/:id", validateListing, isLoggedIn,  wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(!req.isAuthenticated()){
    req.flash("error","you must be logged in to create new route");
    return res.redirect("/login");
  }
  req.flash("success"," Listing Updated");
  res.redirect("/listings");
}));

// delete request
router.delete("/:id",isLoggedIn,  wrapAsync(async (req, res) => {
  const { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success"," Listing Deleted");
  res.redirect("/listings");
})); 



module.exports = router;