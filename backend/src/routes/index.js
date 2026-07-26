import express from "express";
import authRoutes from "./auth.routes.js";
import claimRoutes from "./claim.routes.js";


const router = express.Router();


router.use(
    "/auth",
    authRoutes
);
router.use(
    "/claims",
    claimRoutes
);


export default router;