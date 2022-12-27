import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';




const Register = () => {

    const { signUp, setuserProfile } = useContext(AuthContext)
    const [error, setError] = useState('')

    const location = useLocation();
    const frome = location.state?.from?.pathname || '/';

    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photourl.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, photoURL, email, password);
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please provide at least two uppercase');
            return;
        }
        if (password.length < 6) {
            setError('Please should be at least 6 characters.');
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please add at least one special character');
            return;
        }
        setError('');
        signUp(email, password)
            .then(result => {
                const user = result.user;
                form.reset()
                handleUserProfile(name, photoURL)
                setTimeout(() => {
                    navigate(frome, { replace: true })

                }, 1000);
                toast.success('Register Success')

            })
            .catch(error => {
                console.log('error', error);
                setError(error.message)
            })

    }


    const handleUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        console.log(profile);
        setuserProfile(profile)
            .then((result) => { console.log(result.user); })
            .catch(error => console.log(error))
    }
    return (
        <div className='flex justify-center mt-10 mb-10 '>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100  border shadow-4xl border-sky-400">
                <h1 className="text-2xl font-bold text-center">Register</h1>
                <form onSubmit={handleSubmit} novalidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label for="username" className="block font-bold dark:text-gray-400">Name</label>
                        <input type="text" name="name" id="name" placeholder="Name" className="w-full px-4 py-3 rounded-md bg-sky-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label for="username" className="block font-bold dark:text-gray-400 ">Photo Url</label>
                        <input type="text" name="photourl" id="photourl" placeholder="Photo Url" className="w-full px-4 py-3 rounded-md bg-sky-200 bg-sky-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label for="username" className="block font-bold dark:text-gray-400">Email</label>
                        <input type="text" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md bg-sky-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label for="password" className="block font-bold dark:text-gray-400">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md bg-sky-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                        <div className="flex justify-end text-xs dark:text-gray-400">
                            <Link to="login" >Forgot Password?</Link>
                        </div>
                    </div>
                    <div>
                        <p className="text-red-500">{error}</p>
                    </div>
                    <button className="block w-full  p-3 text-center rounded-sm dark:text-red-900 bg-violet-400 hover:bg-violet-700">Sign Up</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                </div>

                <p className="text-xs text-center sm:px-6 dark:text-gray-400">Already have an account?
                    <Link to="/login" className="underline dark:text-gray-100">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;