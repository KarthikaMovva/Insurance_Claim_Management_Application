import Claim from "../models/claim.model.js";


// Submit claim

export const createClaim = async (req, res) => {

    try {
        const claim =
            await Claim.create({
                patient: req.user._id,
                name: req.body.name,
                email: req.body.email,
                claimAmount: req.body.claimAmount,
                description: req.body.description,
                document: req.file
                    ? req.file.path
                    : null
            });


        res.status(201).json({
            message: "Claim submitted successfully",
            claim
        });


    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};



// Get patient claims

export const getMyClaims = async (req, res) => {

    try {
        const claims =
            await Claim.find({
                patient: req.user._id
            });


        res.status(200).json({
            claims
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};

export const getAllClaims = async (req, res) => {
    try {

        const {
            status,
            minAmount,
            maxAmount,
            startDate,
            endDate
        } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (minAmount || maxAmount) {
            filter.claimAmount = {};

            if (minAmount) {
                filter.claimAmount.$gte = Number(minAmount);
            }

            if (maxAmount) {
                filter.claimAmount.$lte = Number(maxAmount);
            }
        }

        if (startDate || endDate) {
            filter.createdAt = {};

            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }

            if (endDate) {
                filter.createdAt.$lte = new Date(endDate);
            }
        }

        const claims = await Claim.find(filter)
            .populate("patient", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: claims.length,
            claims
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getClaimById = async (req, res) => {

    try {

        const claim = await Claim.findById(req.params.id)
            .populate("patient", "name email");

        if (!claim) {
            return res.status(404).json({
                success: false,
                message: "Claim not found"
            });
        }

        res.status(200).json({
            success: true,
            claim
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updateClaim = async (req, res) => {

    try {

        const {
            status,
            approvedAmount,
            insurerComments
        } = req.body;

        const claim = await Claim.findById(req.params.id);

        const validStatuses = [
            "PENDING",
            "APPROVED",
            "REJECTED"
        ];

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid claim status"
            });
        }

        if (!claim) {
            return res.status(404).json({
                success: false,
                message: "Claim not found"
            });
        }

        if (status) {
            claim.status = status;
        }

        if (approvedAmount !== undefined) {
            claim.approvedAmount = approvedAmount;
        }

        if (insurerComments) {
            claim.insurerComments = insurerComments;
        }
        if (status === "APPROVED") {
            claim.status = "APPROVED";
            claim.approvedAmount = approvedAmount;
        } else if (status === "REJECTED") {
            claim.status = "REJECTED";
            claim.approvedAmount = 0;
        }

        // claim.insurerComments = insurerComments || "";

        await claim.save();

        res.status(200).json({
            success: true,
            message: "Claim updated successfully",
            claim
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};