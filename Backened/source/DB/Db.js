const mongoose= require('mongoose');
const dotenv = require('dotenv') ;
dotenv.config();


const Connection = async (req,res)=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL, {
        });
        console.log("MongoDB is connected");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
    }
}
module.exports = Connection ;

