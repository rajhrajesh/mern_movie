const mongoose = require('mongoose');

const connectDatabase = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Database connection established successfully: Host: ${connect.host} Database: ${connect.name}`);
    }
    catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDatabase;