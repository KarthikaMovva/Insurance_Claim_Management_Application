import { Outlet } from "react-router-dom";

const InsurerLayout = () => {
    return (
        <div>
            <h2>Insurer Portal</h2>
            <Outlet />
        </div>
    );
};

export default InsurerLayout;