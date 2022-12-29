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
            loader: () => fetch('https://social-media-task-server.vercel.app/users'),
            element: <About></About>
        },

        {
            path: '/media',
            loader: () => fetch('https://social-media-task-server.vercel.app/addpost'),
            element: <Media></Media>
        },
        {
            path: '/media/:id',
            loader: ({ params }) => fetch(`https://social-media-task-server.vercel.app/media/${params.id}`),
            element: <PostDetails></PostDetails>
        }
    ]
}])

export default routes;