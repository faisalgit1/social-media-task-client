import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';


const Login = () => {

    const [error, setError] = useState(null)
    const { signIn, auth, googleSignIn } = useContext(AuthContext)
    const [usermail, setUsermail] = useState('')

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const navigate = useNavigate()
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset()
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('socialToken', data.token)
                        toast.success('Login Success')
                        setTimeout(() => {
                            navigate(from, { replace: true })

                        }, 500);
                    })


            })
            .catch(error => {
                if (error.message === 'Firebase: Error (auth/wrong-password).') {
                    setError('Wrong Password')
                }
                else if (error.message === 'Firebase: Error (auth/user-not-found).') {
                    setError('User Not Found.Please Register')
                }
                else {
                    setError(error.message)
                }
                console.log('error', error);
            })
    }
    const handleGoogleSignIN = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem('socialToken', data.token)
                        toast.success('Logined SuccessFully')
                        setTimeout(() => {
                            navigate(from, { replace: true })

                        }, 500);
                    })
            })
            .catch(error => {
                console.log('error', error);
            })
    }

    const handleEmailInput = e => {
        e.preventDefault()
        const email = e.target.value

        setUsermail(email)
    }
    const resetPasswrd = () => {

        sendPasswordResetEmail(auth, usermail)
            .then(() => {
                toast.success('Please Check Your Email box to reset your Email Password')
            })
            .catch(error => {
                console.log('error', error);
                setError(error.message)
            })
    }



    return (
        <div className='flex justify-center mt-10 mb-10  '>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100  border shadow-4xl border-sky-400">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form onSubmit={handleSubmit} novalidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-1 text-sm">
                        <label for="username" className="block dark:text-gray-400">Email</label>
                        <input onBlur={handleEmailInput} type="text" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md dark:border-gray-700 bg-sky-200 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label for="password" className="block dark:text-gray-400">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md bg-sky-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                        <div className="flex justify-end text-xs dark:text-gray-400">
                            <Link onClick={resetPasswrd} >Forgot Password?</Link>
                        </div>
                    </div>
                    <button className="block w-full  p-3 text-center rounded-sm dark:text-red-900 bg-violet-400 hover:bg-violet-700">Sign In</button>
                </form>
                <div>
                    <p className="text-red-500">{error}</p>
                </div>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                    <p className="px-3 text-sm dark:text-gray-400">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={handleGoogleSignIN} aria-label="Log in with Google" className="p-3 rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>


                </div>
                <p className="text-xs text-center sm:px-6 dark:text-gray-400">Don't have an account?
                    <Link to="/register" className="underline dark:text-gray-100">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;