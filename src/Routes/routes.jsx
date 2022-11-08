import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Main from "../Layouts/Main";
import Blogs from "../Pages/Blogs/Blogs";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import UserCreate from "../Pages/Users/UserCreate";
import UserEdit from "../Pages/Users/UserEdit";
import Users from "../Pages/Users/Users";
import ClientsServices from "../PagesClients/ClientsServices/ClientsServices";
import ClientsServicesCreate from "../PagesClients/ClientsServices/ClientsServicesCreate";
import NotForLoggedInUser from "../PrivateRoute/NotForLoggedInUser";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: '/home',
                element: <Home></Home>,
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>,
            },
            {
                path: '/users/create',
                element: <UserCreate></UserCreate>,
            },
            {
                path: '/users/edt/:id',
                element: <UserEdit></UserEdit>,
            },

            {
                path: '/users/',
                element: <PrivateRoute><Users></Users></PrivateRoute>,
            },
            {
                path: '/login/',
                element: <NotForLoggedInUser><Login></Login></NotForLoggedInUser>,
            },
            {
                path: '/registration/',
                element: <Registration></Registration>,
            },
            //
            // Routes for client type of users
            //
            //


            {
                path: '/dashboard/',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
            }, {
                path: '/dashboard/services',
                element: <PrivateRoute><ClientsServices></ClientsServices></PrivateRoute>,
            },
            {
                path: '/dashboard/services/create',
                element: <PrivateRoute><ClientsServicesCreate></ClientsServicesCreate></PrivateRoute>,
            },
        ]

    },
]);