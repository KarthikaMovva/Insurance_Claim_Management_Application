import { useAuth } from "../../context/AuthContext";

const PatientDashboard = () => {

    const { logout } = useAuth();

    return (

        <>
            <h1>
                Patient Dashboard
            </h1>
            <button onClick={logout}>
                Logout
            </button>
        </>
    );

};

export default PatientDashboard;