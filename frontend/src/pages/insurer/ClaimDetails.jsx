import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getClaimById,
    updateClaim
} from "../../services/claim.service";

const ClaimDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [claim, setClaim] = useState(null);

    const [approvedAmount, setApprovedAmount] = useState("");

    const [insurerComments, setInsurerComments] = useState("");

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchClaim();

    }, []);


    const fetchClaim = async () => {

        try {

            const data = await getClaimById(id);

            setClaim(data);

            setApprovedAmount(data.approvedAmount || "");

            setInsurerComments(data.insurerComments || "");

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    const handleApprove = async () => {

        try {

            await updateClaim(id, {

                status: "APPROVED",

                approvedAmount: Number(approvedAmount),

                insurerComments

            });

            alert("Claim approved successfully.");

            navigate("/insurer/dashboard");

        } catch (error) {

            console.log(error);

            alert("Unable to approve claim.");

        }

    };


    const handleReject = async () => {

        try {

            await updateClaim(id, {

                status: "REJECTED",

                approvedAmount: 0,

                insurerComments

            });

            alert("Claim rejected.");

            navigate("/insurer/dashboard");

        } catch (error) {

            console.log(error);

            alert("Unable to reject claim.");

        }

    };


    if (loading) {

        return <div className="p-8">Loading...</div>;

    }


    if (!claim) {

        return <div className="p-8">Claim not found.</div>;

    }


    return (

        <div className="max-w-4xl mx-auto p-8">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Claim Details
                </h1>

                <button

                    onClick={() => navigate("/insurer/dashboard")}

                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"

                >

                    ← Back

                </button>

            </div>


            <div className="bg-white shadow rounded-lg p-6 space-y-4">

                <p>
                    <strong>Claim ID:</strong> {claim._id}
                </p>

                <p>
                    <strong>Patient Name:</strong> {claim.name}
                </p>

                <p>
                    <strong>Email:</strong> {claim.email}
                </p>

                <p>
                    <strong>Claim Amount:</strong> ${claim.claimAmount}
                </p>

                <p>
                    <strong>Description:</strong> {claim.description}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    <span className="font-semibold">
                        {claim.status}
                    </span>
                </p>

                <p>
                    <strong>Submitted On:</strong>{" "}
                    {new Date(claim.createdAt).toLocaleString()}
                </p>

                <p>
                    <strong>Approved Amount:</strong>{" "}
                    ${claim.approvedAmount}
                </p>

                <p>
                    <strong>Previous Comments:</strong>{" "}
                    {claim.insurerComments || "-"}
                </p>


                <div>

                    <strong>Uploaded Document:</strong>

                    <br />

                    {claim.documentUrl ? (

                        <a

                            href={claim.documentUrl}

                            target="_blank"

                            rel="noopener noreferrer"

                            className="text-blue-600 underline"

                        >

                            View Uploaded Document

                        </a>

                    ) : (

                        <span>No document uploaded.</span>

                    )}

                </div>

            </div>


            <div className="bg-white shadow rounded-lg p-6 mt-8">

                <h2 className="text-2xl font-semibold mb-4">

                    Review Claim

                </h2>


                <div className="mb-4">

                    <label className="block font-medium mb-2">

                        Approved Amount

                    </label>

                    <input

                        type="number"

                        value={approvedAmount}

                        onChange={(e) =>
                            setApprovedAmount(e.target.value)
                        }

                        className="border rounded w-full p-2"

                    />

                </div>


                <div className="mb-6">

                    <label className="block font-medium mb-2">

                        Insurer Comments

                    </label>

                    <textarea

                        rows="4"

                        value={insurerComments}

                        onChange={(e) =>
                            setInsurerComments(e.target.value)
                        }

                        className="border rounded w-full p-2"

                    />

                </div>


                <div className="flex gap-4">

                    <button

                        onClick={handleApprove}

                        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"

                    >

                        Approve

                    </button>


                    <button

                        onClick={handleReject}

                        className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"

                    >

                        Reject

                    </button>

                </div>

            </div>

        </div>

    );

};

export default ClaimDetails;