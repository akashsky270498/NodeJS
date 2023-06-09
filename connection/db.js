const Mongoose = require("mongoose");

const connectDB = async () => {
    await Mongoose.connect(process.env.DB_CONNECT,
        { useNewUrlparser: true },
        { useUnifiedtopology: true },
        { useCreateIndex: true },
        { useFindAndModify: false }
    )
    console.log("MongoDB Connected")
}
module.exports = connectDB;