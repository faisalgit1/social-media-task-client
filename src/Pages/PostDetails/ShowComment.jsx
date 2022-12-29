import React from 'react';

const ShowComment = ({ data }) => {
    const { commenter, commenterName, comment } = data;
    return (
        <div>
            <div className="flex space-x-5">
                <img alt="" className="w-12 h-12 rounded-full " src={commenter} />
                <div className="chat chat-start">
                    <div className='chat-bubble chat-bubble-primary  px-3'>
                        <h1 className='text-xl text-white font-semibold'>{commenterName}</h1>
                        <p className='my-0 w-60 md:w-80 py-2 text-white'>{comment}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShowComment;