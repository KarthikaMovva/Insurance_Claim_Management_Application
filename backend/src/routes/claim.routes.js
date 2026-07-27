import express from "express";
import {
    createClaim,
    getMyClaims,
    getAllClaims
} from "../controllers/claim.controller.js";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import authorizeRole from "../middleware/role.middleware.js";


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

router.get(
    "/",
    protect,
    authorizeRole("INSURER"),
    getAllClaims
);



export default router;