

// const mongoose = require("mongoose");
// const initdata = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust2";

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }



// const initDB = async () => {
//   try {
   
    

//     console.log("Data to be inserted:", initdata.data);

//     // Insert data into the database
//     await Listing.insertMany(initdata.data);
//     console.log("Data was initialized successfully");
//   } catch (err) {
//     console.error("Error initializing data:", err);
//   }
// };

// initDB();

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust2";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
     
    await Listing.deleteMany({});
    console.log("All existing listings deleted.");

    console.log("Data to be inserted:", initdata.data);


    await Listing.insertMany(initdata.data);
    console.log("Data was initialized successfully");
  } catch (err) {
    console.error("Error initializing data:", err);
  } finally {
    mongoose.connection.close(); 
  }
};
initDB();



