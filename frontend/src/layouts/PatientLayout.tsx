import { Outlet } from "react-router-dom";

const PatientLayout = () => {
    return (
        <div>
            <h2>Patient Portal</h2>
            <Outlet />
        </div>
    );
};

export default PatientLayout;