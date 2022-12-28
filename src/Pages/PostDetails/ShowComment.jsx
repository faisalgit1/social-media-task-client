import React from 'react';

const ShowComment = ({ data }) => {
    const { commenter, commenterName, comment } = data;
    return (
        <div>
            <div className="flex space-x-5">
                <img alt="" className="w-12 h-12 rounded-full " src={commenter} />
                <div className='bg-slate-200 ml-12 rounded-lg px-3'>
                    <h1 className='text-xl text-gray-800 font-semibold'>{commenterName}</h1>
                    <p className='my-0 w-60 md:w-80 py-2  text-gray-700'>{comment}</p>
                </div>
            </div>
        </div>
    );
};

export default ShowComment;