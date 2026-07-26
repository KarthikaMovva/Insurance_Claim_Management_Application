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