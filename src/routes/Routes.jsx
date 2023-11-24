import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
                index: true
            }
        ]
    },
]);

export default router;