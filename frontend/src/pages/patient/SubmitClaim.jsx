import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { submitClaim } from "../../services/claim.service";

const SubmitClaim = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        claimAmount: "",
        description: "",
        document: null

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleFileChange = (e) => {

        setFormData({

            ...formData,

            document: e.target.files[0]

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const payload = new FormData();

            payload.append("name", formData.name);
            payload.append("email", formData.email);
            payload.append("claimAmount", formData.claimAmount);
            payload.append("description", formData.description);

            if (formData.document) {
                payload.append("document", formData.document);
            }

            await submitClaim(payload);

            alert("Claim submitted successfully");

            navigate("/patient/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Submission failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-3xl mx-auto p-8">

            <div className="bg-white shadow rounded-lg p-8">

                <div className="flex justify-between items-center mb-6">

                    <div>

                        <h1 className="text-3xl font-bold mb-2">

                            Submit Insurance Claim

                        </h1>

                        <p className="text-gray-500">

                            Fill in the details below to submit your claim.

                        </p>

                    </div>

                    <button

                        type="button"

                        onClick={() => navigate("/patient/dashboard")}

                        className="
        bg-gray-600
        text-white
        px-4
        py-2
        rounded-lg
        hover:bg-gray-700
        transition
        "

                    >

                        ← Back

                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="number"
                        name="claimAmount"
                        placeholder="Claim Amount"
                        value={formData.claimAmount}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-3"
                    />

                    <textarea
                        name="description"
                        rows="5"
                        placeholder="Describe your claim..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full"
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                    >

                        {loading
                            ? "Submitting..."
                            : "Submit Claim"}

                    </button>

                </form>

            </div>

        </div>

    );

};

export default SubmitClaim;