// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const Review = require("./review.js");
// const review = require("./review.js");

// const listingSchema = new Schema ({
//     title:{
//         type: String,
//         required: true,
//     },
//     description:{
//         type: String,
//         required: true,
//     },
//     // image: {
//     //     type: String,
//     //     filename: "listingimage",
//     //     default: "https://images.adsttc.com/media/images/5ea2/1167/b357/6525/4e00/004f/medium_jpg/2._E_PHX6017.jpg?1587679546",
//     //     set: (v) =>
//     //         !v || v === "" || v === " "
//     //             ? "https://images.adsttc.com/media/images/5ea2/1167/b357/6525/4e00/004f/medium_jpg/2._E_PHX6017.jpg?1587679546"
//     //             : v,
//     // },
//     image: {
//         filename:{
        
//             type: String,
//         default:"listingimage"},
//         url:{type:String,
//             default:
//               "https://pixabay.com/photos/coast-landscape-nature-ocean-sea-1867704/",
//             set: (v) =>
//               v === ""
//                 ? "https://pixabay.com/photos/coast-landscape-nature-ocean-sea-1867704/"
//                 : v,
//           }},
//     price:{
//         type: Number,
//         required: true,
//         min:1,
//     },
//     location:{
//         type: String,
//         required: true,
//     },
//     country:{
//         type: String,
//         required: true,
//     },
//     reviews:[
//         {
//             type:Schema.Types.ObjectId,
//             ref:"Review",
//         }
//     ],
//     owner:{
//         type:Schema.Types.ObjectId,
//         ref:"User",
//     }
// });

// listingSchema.post("findOneAndDelete",async(listing)=>{
//     if(listing){
//         await Review.deleteMany({_id: {$in: listing.reviews}}); 
//     } 
// });


// let Listing = mongoose.model("listing", listingSchema);
// module.exports=Listing;


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
    },image: {
filename:{

    type: String,
default:"listingimage"},
url:{type:String,
    default:
      "https://pixabay.com/photos/coast-landscape-nature-ocean-sea-1867704/",
    set: (v) =>
      v === ""
        ? "https://pixabay.com/photos/coast-landscape-nature-ocean-sea-1867704/"
        : v,
  }},

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