import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register"
import Home from "../Pages/Home/Home/Home"


const routes = createBrowserRouter([{
    path: '/',
    element: <Main></Main>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        }
    ]
}])

export default routes;