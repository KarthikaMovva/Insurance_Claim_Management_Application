import express from "express";
import {
    createClaim,
    getMyClaims
} from "../controllers/claim.controller.js";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";


const router = express.Router();



router.post(
    "/",
    protect,
    upload.single("document"),
    createClaim
);



router.get(
    "/my",
    protect,
    getMyClaims
);



export default router;