import mongoose from 'mongoose';

async function dbConnect() {
    try {
        const result = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

            dbName: "Shoppers",
        });
        return console.log("Connected to MongoDB");
    } catch (error) {
        return console.error(error);
    }
}

export { dbConnect };