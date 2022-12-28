import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import About from "../Pages/About/About";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register"
import Home from "../Pages/Home/Home/Home"
import Media from "../Pages/Media/Media";
import PostDetails from "../Pages/PostDetails/PostDetails";


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
        },
        {
            path: '/about',
            element: <About></About>
        },

        {
            path: '/addpost',
            loader: () => fetch('http://localhost:5000/addpost'),
            element: <Media></Media>
        },
        {
            path: '/addpost/:id',
            loader: ({ params }) => fetch(`http://localhost:5000/addpost/${params.id}`),
            element: <PostDetails></PostDetails>
        }
    ]
}])

export default routes;