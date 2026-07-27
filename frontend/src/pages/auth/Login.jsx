import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const data = await loginUser(formData);
            login(data.user, data.token);
            if (data.user.role === "PATIENT") {
                navigate("/patient/dashboard");
            }
            else {
                navigate("/insurer/dashboard");
            }

        }
        catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
        finally {
            setLoading(false);
        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Insurance Claims Management
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Sign in to continue
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg px-4 py-3 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Login"}
                    </button>
                </form>

                <div className="mt-8 border-t pt-5 text-sm text-slate-500 text-center">
                    <p>
                        Insurance Claims Management Platform
                    </p>
                </div>
            </div>
        </div>

    );

};

export default Login;