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
import UpdateArticle from "../pages/UpdateArticle/UpdateArticle";
import MyArticleDetails from "../pages/MyArticles/MyArticleDetails";
import ViewArticleDetails from "../pages/Dashboard/AllArticlesAdmin/ViewArticleDetails";

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
            {
                path: '/update-article/:id',
                element: <PrivateRoute><UpdateArticle /></PrivateRoute>,
            },
            {
                path: '/author-article-details/:id',
                element: <PrivateRoute><MyArticleDetails /></PrivateRoute>,
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
                path: '/dashboard/author-article-details/:id',
                element: <ViewArticleDetails />,
            },
            {
                path: '/dashboard/add-publisher',
                element: <AddPublisher />,
            }
        ]
    }

]);

export default router;