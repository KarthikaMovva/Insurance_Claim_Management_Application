import express from "express";
import {
    createClaim,
    getMyClaims,
    getAllClaims,
    updateClaim,
    getClaimById
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

router.get(
    "/:id",
    protect,
    authorizeRole("INSURER"),
    getClaimById
);

router.patch(
    "/:id",
    protect,
    authorizeRole("INSURER"),
    updateClaim
);


export default router;