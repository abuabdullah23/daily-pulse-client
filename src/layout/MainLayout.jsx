import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Container from "../components/Container/Container";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Container>
                <Outlet />
            </Container>
        </div>
    );
};

export default MainLayout;