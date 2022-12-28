import React from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

                    fetch('http://localhost:5000/addpost', {
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
                            className="textarea  border-2 border-gray-300 h-full w-full "
                            placeholder="Your message..."
                        ></textarea>
                    </div>

                    {/* images */}
                    <div className=" mt-4">
                        <input
                            name="image"
                            type="file"
                            accept='image/*'
                            className="file-input w-full border-2 border-gray-300"
                        />
                    </div>

                    <button type="submit" class="btn btn-primary mt-4 w-full">
                        Button
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Post;