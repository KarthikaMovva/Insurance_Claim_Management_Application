import dns from "dns";

// Fix MongoDB SRV DNS resolution issue
dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);


import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import app from "./app.js";


dotenv.config();


const PORT = process.env.PORT || 5000;


// MongoDB Client
const client = new MongoClient(
    process.env.MONGO_URI
);


async function connectMongoDB() {

    try {
        await client.connect();
        console.log(
            "Connected to MongoDB successfully"
        );

    } catch (error) {
        console.error(
            "MongoDB connection failed:",
            error.message
        );
        process.exit(1);
    }

}


connectMongoDB();


app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});