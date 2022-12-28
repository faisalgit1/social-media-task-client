import React, { useState } from 'react';
import { Link, NavLink, } from 'react-router-dom';
import { useContext } from 'react';
import { FaUser } from "react-icons/fa";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import ReactTooltip from 'react-tooltip';
import { AuthContext } from '../../../Context/AuthProvider';


const Header = () => {
    const [open, setOpen] = useState(false)

    const { user, logOut } = useContext(AuthContext)


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => { console.log('error', error); })
    }


    return (
        <div className=' bg-white text-gray-900 bg-gray-900 dark:text-white text-white  dark:bg-gray-800 z-50 drop-shadow-xl sticky top-0       items-center md:px-10 px-4 py-3 flex justify-between w-full'>

            <div className='flex items-center'>
                <img className='h-10 border z-10 dark:border-2  shadow-2xl rounded-full mr-2' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuQxnoQZV5MjK2EeVEC19KEr9wyXKVNZzZKg&usqp=CAU' alt="" />
                <h1 className='md:text-3xl text-white  text-2xl z-50 font-bold'>Social Media</h1>

            </div>
            <div>
                <ul className={`md:flex rounded-lg bg-gray-900 items-center right-0 z-0 bg-white dark:bg-gray-800 w-full  text-center text-white justify-center ease-in  md:static  absolute ${open ? 'top-14' : 'top-[-800px]'}`}>
                    <li className='font-semibold my-2 mr-4'>
                        <NavLink className={({ isActive }) =>
                            isActive ? 'text-green-500 ' : undefined
                        }

                            to='/'>Home</NavLink >
                    </li>

                    <li className='font-semibold my-2 mr-4'>
                        <NavLink className={({ isActive }) =>
                            isActive ? ' text-green-500' : undefined
                        } to='/addpost'>Media</NavLink >
                    </li>

                    {/* User  */}
                    {
                        user?.uid ?
                            <>
                                <li className='font-semibold my-2 mr-4'>
                                    <NavLink className={({ isActive }) =>
                                        isActive ? ' text-green-500' : undefined
                                    } to='/about'>About Me</NavLink >
                                </li>

                                <li className='font-semibold my-2 ' >
                                    <Link to='#'>

                                        <span>{user.displayName ?
                                            <span className='flex justify-center items-center mr-2'>

                                                <ReactTooltip place="bottom" type="dark" effect="solid"></ReactTooltip>

                                                <img data-tip={user.displayName} className='rounded-full mx-2' style={{ height: '30px' }} src={user.photoURL} alt="" />
                                            </span>
                                            :
                                            <div className='flex justify-center items-center gap-2 mr-3'>
                                                <ReactTooltip place="bottom" type="dark" effect="solid"></ReactTooltip>
                                                <FaUser data-tip="Anonymus"></FaUser>
                                            </div>
                                        }</span>
                                    </Link>
                                </li>
                                <li className='font-semibold mr-4'>
                                    <Link to='/'><button onClick={handleLogOut} className="px-2 py-1 md:my-0 my-2 font-semibold rounded-full z-10 bg-red-600 ">Log Out</button></Link>

                                </li>

                            </>
                            :
                            <>
                                <li>
                                    <Link to='/login'><button className="px-3 py-1 md:my-0 mt-2 font-semibold rounded-full  text-white bg-sky-500 mr-2">Sign In</button></Link>
                                </li>
                                <li>
                                    <Link to='/register'><button className="px-3 py-1 md:my-0 my-2 font-semibold rounded-full text-white  bg-red-700">Sign Up</button></Link>
                                </li>
                            </>
                    }


                </ul>
                <div onClick={() => setOpen(!open)} className="h-6 ease-in duration-300 transition   text-teal-600 w-6 md:hidden" >
                    {open ? <XMarkIcon />
                        : <Bars3Icon />
                    }
                </div>
            </div>
        </div >
    );
};

//  
//
export default Header;