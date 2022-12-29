import React from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";

const Post = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target;
        const write = form.writing.value;
        // Image Upload
        const image = e.target.image.files[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=2ba274e8d6dc233e619705a994de69e4`

        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => {

                if (imgData.success) {

                    const addpost = {
                        write: write,
                        img: imgData.data.url,
                        author: user?.displayName,
                        authorimg: user?.photoURL
                    }

                    fetch('https://social-media-task-server.vercel.app/addpost', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(addpost)
                    })
                        .then(result => {
                            console.log(result);
                            form.reset()
                            toast.success('You Added a new Post')
                        })

                        .then(err => console.log(err, "error"))
                }
            })
        console.log(write, image)



    }
    return (
        <div>
            <div className="post-wrapper mx-auto max-w-[90%]">
                <form onSubmit={handleSubmit} className="md:max-w-[50%] max-w-[90%] mx-auto">
                    {/* message */}
                    <div className="h-48 mt-4">
                        <textarea
                            name="writing"
                            className="textarea bg-sky-200 border-2 border-gray-300 h-full w-full "
                            placeholder="Your message..."
                            required
                        ></textarea>
                    </div>

                    {/* images */}
                    <div className=" mt-4">
                        <input
                            name="image"
                            type="file"
                            accept='image/*'
                            className="file-input bg-sky-200 w-full border-2 border-gray-300"
                            required
                        />
                    </div>
                    {
                        user?.uid ?
                            <>
                                <button type="submit" class="btn btn-primary mt-4 mb-20 w-full">
                                    Button
                                </button>
                            </>
                            :
                            <>
                                <Link to='/login' class="btn btn-ghost text-white bg-rose-700 hover:bg-primary mt-4 mb-20 w-full">
                                    Please  Login to add a Post
                                </Link>
                            </>
                    }

                </form>
            </div>
        </div>
    );
};

export default Post;