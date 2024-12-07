const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

const connectDb = async () => {
        try {
            const connection = await mongoose.connect(process.env.mongo_url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Connected to MongoDB successfully");
            return; 
        } catch (error) {
            if (error.name === "MongoNetworkError") {
                console.error("Error connecting to the database: No internet connection.");
            }
            console.error("Error connecting to the database:", error);
        }
    }


module.exports = connectDb;