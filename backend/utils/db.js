const mongoose = require('mongoose')

const URI = process.env.MONGO_DB_URI;


const connectDb = async () =>{
    try{
        await mongoose.connect(URI);
        console.log('connection successful to DB')
    }catch(err)
    {
        console.error("database connection failed",err);
        process.exit(0);
    }
}

module.exports = connectDb