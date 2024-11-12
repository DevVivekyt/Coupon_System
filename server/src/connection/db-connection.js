const mongoose = require("mongoose")

const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://vivekmishra8009:vivek123@cluster0.juvfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("db connected!");
    } catch (error) {
        console.log(`error ${error}`);
    }
}

module.exports = dbConnection