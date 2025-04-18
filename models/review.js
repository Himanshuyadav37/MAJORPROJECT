const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: [1, "Rating must be at least 1"],  
        max: [5, "Rating must be at most 5"]
    },
    comment: String,
    createdAt:{
                type:Date,
                default:Date.now(),
            },
});


module.exports = mongoose.model("Review",reviewSchema);