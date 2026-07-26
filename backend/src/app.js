import express from "express";
import cors from "cors";
import routes from "./routes/index.js";


const app = express();


// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use("/api", routes);


// Health check
app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Claims Management API Running"
    });

});


// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});


export default app;