import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const images = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
const About = () => {
    const { user } = useContext(AuthContext)
    console.log(user);
    return (
        <div className=' h-full md:h-screen'>

            <div className='my-10 bg-white p-10 rounded-lg shadow-lg'>
                <img className='w-40 mx-auto rounded-full' src={user?.photoURL ? user?.photoURL : images
                } alt="" />
                <h1 className='text-xl font-semibold text-center my-2'>{user?.displayName}</h1>
                <h1 className='text-center font-semibold my-2'>{user?.email}</h1>
                {/* <p className='text-center font-semibold'>University/College: Not set</p>
                <p className='text-center font-semibold'>Address: Not set</p> */}
            </div>


        </div>
    );
};

export default About;