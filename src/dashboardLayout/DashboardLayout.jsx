import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="bg-[#161d31] w-full min-h-screen">
            <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all text-[#d0d2d6]">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;