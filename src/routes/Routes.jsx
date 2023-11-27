import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import Error from "../Error";
import AddArticle from "../pages/AddArticle/AddArticle";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../dashboardLayout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllArticlesAdmin from "../pages/Dashboard/AllArticlesAdmin/AllArticlesAdmin";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import AdminRoute from "./AdminRoute";
import MyArticles from "../pages/MyArticles/MyArticles";

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
            {
                path: '/my-articles',
                element: <PrivateRoute><MyArticles /></PrivateRoute>,
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
    },

    // Dashboard Layout and Routes
    {
        path: "/dashboard",
        element: <AdminRoute><DashboardLayout /></AdminRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
                index: true
            },
            {
                path: '/dashboard/all-users',
                element: <AllUsers />,
            },
            {
                path: '/dashboard/all-articles',
                element: <AllArticlesAdmin />,
            },
            {
                path: '/dashboard/add-publisher',
                element: <AddPublisher />,
            }
        ]
    }

]);

export default router;