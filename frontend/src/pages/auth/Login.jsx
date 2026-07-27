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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }

    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
            />
            <button>
                Login
            </button>
        </form>
    );

};

export default Login;