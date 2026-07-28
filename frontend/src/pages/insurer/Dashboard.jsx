import { useEffect, useState } from "react";
import { getAllClaims } from "../../services/claim.service";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {


    const [claims, setClaims] = useState([]);
    const [filteredClaims, setFilteredClaims] = useState([]);

    const [status, setStatus] = useState("ALL");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState("");

    const navigate = useNavigate();



    useEffect(() => {

        fetchClaims();

    }, []);



    const fetchClaims = async (filters = {}) => {

        try {

            // Strip out empty string values so backend doesn't receive blank params
            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(([, v]) => v !== undefined && v !== "")
            );

            const data = await getAllClaims(cleanFilters);

            setClaims(data);
            setFilteredClaims(data);

        } catch (error) {

            console.log(error);

        }

    };



    // LOGOUT FUNCTION

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };



    // FILTER LOGIC

    const handleFilter = (value) => {

        setStatus(value);

        fetchClaims({
            status: value === "ALL" ? undefined : value,
            startDate,
            endDate,
            minAmount,
            maxAmount
        });

    };

    const applyFilters = () => {

        fetchClaims({

            status: status === "ALL" ? undefined : status,

            startDate,

            endDate,

            minAmount,

            maxAmount

        });

    };

    const clearFilters = () => {

        setStatus("ALL");
        setStartDate("");
        setEndDate("");
        setMinAmount("");
        setMaxAmount("");

        // Pass reset values directly — don't rely on setState being sync
        fetchClaims({});

    };

    return (

        <div className="p-8">


            {/* HEADER */}

            <div className="flex justify-between items-center mb-6">


                <h1 className="text-3xl font-bold">
                    Insurer Dashboard
                </h1>



                <button

                    onClick={handleLogout}

                    className="
                    bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded
                    hover:bg-red-700
                    "

                >

                    Logout

                </button>


            </div>





            {/* FILTER BUTTONS */}

            <div className="flex gap-4 mb-6">


                {
                    [
                        "ALL",
                        "PENDING",
                        "APPROVED",
                        "REJECTED"
                    ]
                        .map(item => (

                            <button

                                key={item}

                                onClick={() => handleFilter(item)}

                                className={`px-4 py-2 rounded 
                            ${status === item
                                        ?
                                        "bg-blue-600 text-white"
                                        :
                                        "bg-gray-200"
                                    }`}

                            >

                                {item}

                            </button>


                        ))

                }


            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">

                <h2 className="font-semibold mb-4">
                    Filter Claims
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    <div>
                        <label className="block text-sm mb-1">
                            Start Date
                        </label>

                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            End Date
                        </label>

                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Minimum Amount
                        </label>

                        <input
                            type="number"
                            placeholder="0"
                            value={minAmount}
                            onChange={(e) => setMinAmount(e.target.value)}
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Maximum Amount
                        </label>

                        <input
                            type="number"
                            placeholder="10000"
                            value={maxAmount}
                            onChange={(e) => setMaxAmount(e.target.value)}
                            className="border rounded p-2 w-full"
                        />
                    </div>

                </div>

                <div className="flex gap-4 mt-4">

                    <button
                        onClick={applyFilters}
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                        Apply Filters
                    </button>

                    <button
                        onClick={clearFilters}
                        className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
                    >
                        Clear Filters
                    </button>

                </div>

            </div>
            {/* CLAIM TABLE */}


            <div className="overflow-x-auto">


                <table className="w-full border">


                    <thead>

                        <tr className="bg-gray-100">


                            <th className="p-3 border">
                                Name
                            </th>


                            <th className="p-3 border">
                                Amount
                            </th>


                            <th className="p-3 border">
                                Status
                            </th>


                            <th className="p-3 border">
                                Date
                            </th>


                            <th className="p-3 border">
                                Action
                            </th>


                        </tr>

                    </thead>




                    <tbody>


                        {
                            filteredClaims.map(
                                claim => (


                                    <tr key={claim._id}>


                                        <td className="border p-3">
                                            {claim.name}
                                        </td>


                                        <td className="border p-3">
                                            ${claim.claimAmount}
                                        </td>


                                        <td className="border p-3">

                                            <span
                                                className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium

        ${claim.status === "PENDING"
                                                    &&
                                                    "bg-yellow-100 text-yellow-700"
                                                    }

        ${claim.status === "APPROVED"
                                                    &&
                                                    "bg-green-100 text-green-700"
                                                    }

        ${claim.status === "REJECTED"
                                                    &&
                                                    "bg-red-100 text-red-700"
                                                    }
    `}
                                            >

                                                {claim.status}

                                            </span>

                                        </td>



                                        <td className="border p-3">

                                            {
                                                new Date(
                                                    claim.createdAt
                                                )
                                                    .toLocaleDateString()
                                            }

                                        </td>




                                        <td className="border p-3">


                                            <button

                                                onClick={() =>
                                                    navigate(
                                                        `/insurer/claims/${claim._id}`
                                                    )
                                                }

                                                className="
                                            bg-blue-500
                                            text-white
                                            px-3
                                            py-1
                                            rounded
                                            "

                                            >

                                                Review

                                            </button>


                                        </td>



                                    </tr>


                                ))

                        }


                    </tbody>



                </table>


            </div>


        </div>

    );

};


export default Dashboard;