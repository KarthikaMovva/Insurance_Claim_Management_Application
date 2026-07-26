import mongoose from "mongoose";


const claimSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        claimAmount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        document: {
            type: String
        },
        status: {
            type: String,
            enum: [
                "PENDING",
                "APPROVED",
                "REJECTED"
            ],
            default: "PENDING"
        },
        approvedAmount: {
            type: Number,
            default: 0
        },
        insurerComments: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);


const Claim = mongoose.model(
    "Claim",
    claimSchema
);


export default Claim;