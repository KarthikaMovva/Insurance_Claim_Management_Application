import {
    useEffect,
    useState
}
    from "react";

import {
    useParams,
    useNavigate
}
    from "react-router-dom";


import {
    getClaimById,
    updateClaim
}
    from "../../services/claim.service";



const ClaimReview = () => {


    const { id } = useParams();

    const navigate = useNavigate();


    const [claim, setClaim] = useState(null);

    const [comments, setComments] = useState("");

    const [approvedAmount, setApprovedAmount]
        = useState("");





    useEffect(() => {

        fetchClaim();

    }, []);




    const fetchClaim = async () => {


        try {

            const data =
                await getClaimById(id);


            setClaim(data);


        }
        catch (error) {

            console.log(error);

        }


    };





    // APPROVE


    const approveClaim = async () => {


        await updateClaim(

            id,

            {

                status: "APPROVED",

                approvedAmount:

                    Number(approvedAmount),

                comments

            }

        );


        alert(
            "Claim Approved"
        );


        navigate(
            "/insurer/dashboard"
        );


    };





    // REJECT


    const rejectClaim = async () => {


        await updateClaim(

            id,

            {

                status: "REJECTED",

                comments

            }

        );



        alert(
            "Claim Rejected"
        );



        navigate(
            "/insurer/dashboard"
        );


    };






    if (!claim)

        return <h1>Loading...</h1>;





    return (

        <div className="p-8">


            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Claim Review
                </h1>

                <button

                    onClick={() => navigate("/insurer/dashboard")}

                    className="
        bg-gray-600
        text-white
        px-4
        py-2
        rounded
        hover:bg-gray-700
        transition
        "

                >

                    ← Back

                </button>

            </div>



            <div className="border rounded p-6 space-y-4">


                <p>
                    <b>Name:</b>
                    {claim.name}
                </p>


                <p>
                    <b>Email:</b>
                    {claim.email}
                </p>


                <p>
                    <b>Amount:</b>
                    ${claim.claimAmount}
                </p>


                <p>
                    <b>Description:</b>

                    {claim.description}

                </p>



                <p>

                    <b>Status:</b>

                    {claim.status}

                </p>




                <div className="space-y-2">

                    <h3 className="font-semibold">
                        Uploaded Document
                    </h3>

                    {
                        claim.documentUrl ? (

                            <a

                                href={claim.documentUrl}

                                target="_blank"

                                rel="noopener noreferrer"

                                className="
                text-blue-600
                underline
                "

                            >

                                View Uploaded Document

                            </a>

                        ) : (

                            <p className="text-gray-500">
                                No document uploaded.
                            </p>

                        )
                    }

                </div>





                <hr />





                <h2 className="text-xl font-bold">

                    Decision

                </h2>




                <input

                    type="number"

                    placeholder="Approved Amount"

                    value={approvedAmount}

                    onChange={
                        e => setApprovedAmount(
                            e.target.value
                        )
                    }

                    className="
border p-2 w-full
"

                />





                <textarea

                    placeholder="Comments"

                    value={comments}

                    onChange={
                        e => setComments(
                            e.target.value
                        )
                    }

                    className="
border p-2 w-full
"

                />





                <div className="flex gap-4">


                    <button

                        onClick={approveClaim}

                        className="
bg-green-600
text-white
px-5 py-2 rounded
"

                    >

                        Approve

                    </button>





                    <button

                        onClick={rejectClaim}

                        className="
bg-red-600
text-white
px-5 py-2 rounded
"

                    >

                        Reject

                    </button>



                </div>



            </div>


        </div>

    );


};


export default ClaimReview;