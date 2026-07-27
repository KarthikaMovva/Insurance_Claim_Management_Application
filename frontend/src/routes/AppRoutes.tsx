import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PatientLayout from "../layouts/PatientLayout";
import InsurerLayout from "../layouts/InsurerLayout";

import Login from "../pages/auth/Login";
import PatientDashboard from "../pages/patient/Dashboard";
import SubmitClaim from "../pages/patient/SubmitClaim";
import InsurerDashboard from "../pages/insurer/Dashboard";
import ClaimDetails from "../pages/insurer/ClaimDetails";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<MainLayout />}>

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route path="/patient" element={<PatientLayout />}>

                        <Route
                            path="dashboard"
                            element={<PatientDashboard />}
                        />

                        <Route
                            path="new-claim"
                            element={<SubmitClaim />}
                        />

                    </Route>

                    <Route path="/insurer" element={<InsurerLayout />}>

                        <Route
                            path="dashboard"
                            element={<InsurerDashboard />}
                        />

                        <Route
                            path="claims/:id"
                            element={<ClaimDetails />}
                        />

                    </Route>

                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;