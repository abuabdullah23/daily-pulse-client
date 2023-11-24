import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import Error from "../Error";
import AddArticle from "../pages/AddArticle/AddArticle";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
                index: true
            },
            // Private Route
            {
                path: '/add-article',
                element: <PrivateRoute><AddArticle /></PrivateRoute>,
            },

        ]
    },

    // login/register route
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },

    // Error Page
    {
        path: '*',
        element: <Error />,
    }

]);

export default router;