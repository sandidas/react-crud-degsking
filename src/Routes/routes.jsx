import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Main from "../Layouts/Main";
import Blogs from "../Pages/Blogs/Blogs";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Services from "../Pages/Services/Services";
import ServiceSingle from "../Pages/Services/ServiceSingle";
import UserCreate from "../Pages/Users/UserCreate";
import UserEdit from "../Pages/Users/UserEdit";
import Users from "../Pages/Users/Users";
import ClientReviews from "../PagesClients/ClientReviews/ClientReviews";
import ClientsServices from "../PagesClients/ClientsServices/ClientsServices";
import ClientsServicesCreate from "../PagesClients/ClientsServices/ClientsServicesCreate";
import ClientsServicesUpdate from "../PagesClients/ClientsServices/ClientsServicesUpdate";
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
                loader: async () => {
                    return fetch('https://server-side-xi.vercel.app/servicespublic?page=1&size=3')
                },
                element: <Home></Home>,
            },
            {
                path: '/home',
                loader: async () => {
                    return fetch('https://server-side-xi.vercel.app/servicespublic?page=1&size=3')
                },
                element: <Home></Home>,
            },
            {
                path: '/services',
                element: <Services></Services>,
            },
            {
                path: '/services/single/:id',
                element: <ServiceSingle></ServiceSingle>,
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
            {
                path: '/dashboard/services/edit/:id',
                element: <PrivateRoute><ClientsServicesUpdate></ClientsServicesUpdate></PrivateRoute>,
            }, {
                path: '/dashboard/reviews',
                element: <PrivateRoute><ClientReviews></ClientReviews></PrivateRoute>,
            },
        ]

    },
]);