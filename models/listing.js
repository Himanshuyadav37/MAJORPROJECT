const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const review = require("./review.js");

const listingSchema = new Schema ({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
   image:{
        url: {
            type: String,
            default:
              "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG9vYX",
          },
          filename: String,
        }, 
    price:{
        type: Number,
        required: true,
        min:1,
    },
    location:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}}); 
    } 
});


let Listing = mongoose.model("listing", listingSchema);
module.exports=Listing;

