import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import ShowComment from './ShowComment';

const PostDetails = () => {
    const { user } = useContext(AuthContext)
    const data = useLoaderData()
    const { _id, img, write } = data
    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target;
        const message = form.message.value
        const comment = {
            commenterID: _id,
            commenterName: user?.displayName,
            commenterEmail: user?.email,
            commenter: user?.photoURL,
            comment: message,
        }
        fetch('http://localhost:5000/comment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
            .then(result => {

                toast.success('Comment Added')
                form.reset()
            })
            .catch(err => console.log(err))
    }

    const [allComments, setComments] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allcomments')
            .then(res => res.json())
            .then(data => {

                const showComment = data.filter(d => d.commenterID === _id)

                setComments(showComment)

            })
    }, [allComments, _id])
    console.log(allComments)
    return (
        <div className='p-4'>
            <div className=' flex justify-center '>
                <div className='grid grid-cols-1 md:grid-cols-2mb-5 mt-10'>

                    <div className="card card-side bg-base-100 shadow-xl">
                        <figure><img className='w-60' src={img} alt="" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{write}</h2>
                            <div className="card-actions ">
                                <div className='flex justify-center'>
                                    {
                                        user?.uid ?
                                            <>
                                                <form onSubmit={handleSubmit} className='flex  gap-3 my-10 items-center'>
                                                    <img className='w-12 rounded-full' src={user?.photoURL} alt="" />
                                                    <input name='message' type="text" placeholder="Type Your Comment" className="input p-2 input-bordered w-60 md:w-60" />
                                                    <button type='submit'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 hover:text-gray-700 text-gray-900 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                                        </svg>
                                                    </button>

                                                </form>
                                            </>
                                            :
                                            <>
                                                <p className="h-screen font-semibold my-10 ">

                                                    Please <Link className='underline' to='/login'>Login</Link> to add a comment
                                                </p>

                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='text-center text-3xl font-bold mt-10'>All Commentes</h1>
            <div className='flex flex-col items-center justify-center'>
                {
                    allComments.map(data => <ShowComment
                        key={data._id}
                        data={data}
                    ></ShowComment>)
                }
            </div>
        </div>
    );
};

export default PostDetails;