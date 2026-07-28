import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getMyClaims } from "../../services/claim.service";

const Dashboard = () => {

    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchClaims();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const fetchClaims = async () => {

        try {

            const data = await getMyClaims();

            setClaims(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const pending = claims.filter(
        claim => claim.status === "PENDING"
    ).length;

    const approved = claims.filter(
        claim => claim.status === "APPROVED"
    ).length;

    const rejected = claims.filter(
        claim => claim.status === "REJECTED"
    ).length;

    if (loading) {
        return (
            <div className="p-8 text-center">
                Loading claims...
            </div>
        );
    }

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="flex justify-between items-center mb-8">


                <div>

                    <h1 className="text-3xl font-bold">
                        Patient Dashboard
                    </h1>

                    <p className="text-gray-500">
                        Track and manage your insurance claims
                    </p>

                </div>



                <div className="flex gap-4">


                    <Link
                        to="/patient/new-claim"
                        className="
                            bg-blue-600 
                            text-white 
                            px-5 
                            py-2 
                            rounded-lg 
                            hover:bg-blue-700
            "
                    >

                        + Submit Claim

                    </Link>



                    <button

                        onClick={handleLogout}

                        className="
            bg-red-600
            text-white
            px-5
            py-2
            rounded-lg
            hover:bg-red-700
            "

                    >

                        Logout

                    </button>


                </div>


            </div>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">

                <div className="bg-white shadow rounded-lg p-5">

                    <p className="text-gray-500">
                        Total Claims
                    </p>

                    <h2 className="text-3xl font-bold">
                        {claims.length}
                    </h2>

                </div>

                <div className="bg-yellow-100 rounded-lg p-5">

                    <p>Pending</p>

                    <h2 className="text-3xl font-bold">
                        {pending}
                    </h2>

                </div>

                <div className="bg-green-100 rounded-lg p-5">

                    <p>Approved</p>

                    <h2 className="text-3xl font-bold">
                        {approved}
                    </h2>

                </div>

                <div className="bg-red-100 rounded-lg p-5">

                    <p>Rejected</p>

                    <h2 className="text-3xl font-bold">
                        {rejected}
                    </h2>

                </div>

            </div>

            {/* Claims Table */}

            <div className="bg-white rounded-lg shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Claim Amount
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Submitted
                            </th>

                            <th className="p-4 text-left">
                                Approved Amount
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {claims.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center p-10 text-gray-500"
                                >

                                    No claims submitted yet.

                                </td>

                            </tr>

                        ) : (

                            claims.map((claim) => (

                                <tr
                                    key={claim._id}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        ${claim.claimAmount}

                                    </td>

                                    <td className="p-4">

                                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${claim.status === "PENDING" && "bg-yellow-100 text-yellow-700"}
                                            ${claim.status === "APPROVED" && "bg-green-100 text-green-700"}
                                            ${claim.status === "REJECTED" && "bg-red-100 text-red-700"}
                                        `}>

                                            {claim.status}

                                        </span>

                                    </td>

                                    <td className="p-4">

                                        {new Date(
                                            claim.createdAt
                                        ).toLocaleDateString()}

                                    </td>

                                    <td className="p-4">

                                        {claim.approvedAmount
                                            ? `$${claim.approvedAmount}`
                                            : "-"}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default Dashboard;