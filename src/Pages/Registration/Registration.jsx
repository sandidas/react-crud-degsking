import { async } from '@firebase/util';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import generatePassword from '../../Helpers/GeneratePassword';
import { storeSingleUser } from '../../Helpers/StoreSingleUser';

const Registration = () => {
    const { user, showAlert, createNewUser, updateUserProfile, verifyEmail, setLoading, loading, loginBySocailAccounts } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [genPassword, setGenPassword] = useState('');
    const [password, setPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [log, setLog] = useState([]);
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();


    const from = location.state?.from?.pathname || '/'; // if old history location not found then default get home route
    let userLog = [];

    useEffect(() => {
        if (log.length == 3) {
            storeLog();
        }
    }, [log]);

    const handleGeneratePassword = (event) => {
        setGenPassword(generatePassword());
        setPassword(generatePassword());

    }


    const handleAdduser = (event) => {
        // setLog([]);
        event.preventDefault();
        // const form = event.target;
        // const names = form.name.value;
        const photoURL = event.target.photourl.value;
        if (!name || !email || !password || !photoURL) {
            showAlert('danger', "Please do not leave any empty fields.");
            return
        }


        // console.log(userInfo);
        // call g.firebase by context to store in firebase
        createNewUser(email, password)
            .then(result => {
                setLoading(true);
                // console.log(result);
                handleUpdateUserProfile(name, photoURL);// update user name and photo
                // handleEmailVerification(); // send mail verification
                // after data added to firebase will add into mongo

                // store log to mongo db
                const user = result.user;
                //
                storeSingleUser(user, password); // store user to mongo db
                showAlert('success', "Successfully Registered! Redirecting...");
                // console.log(user);
                setLoading(false);
                const timer = setTimeout(() => {
                    navigate('/')
                    navigate(from, { replace: true });
                }, 4000)
                return () => clearTimeout(timer);


            })
            .catch(error => {
                // console.log(error);
                const errors = error.message + ' | ' + error.code;
                showAlert('danger', errors);
            })
        // if (log.length == 3) {  }
    }

    // fire with firebase
    const handleUpdateUserProfile = async (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }
        await updateUserProfile(profile)
            .then(() => {
                // userLog = [...userLog, { FirebaseUserUpdate: { 'status': true, 'Message': 'User Name/Photo Updated' } }];

                setLog(log => [...log, { 'FirebaseUserUpdate': { 'status': true, 'Message': 'User Name/Photo Updated' } }]);
            })
            .catch(error => {
                const errors = error.message + ' | ' + error.code;
                // userLog = [...userLog, { FirebaseUserUpdate: { 'status': false, 'Message': 'Error' } }];
                setLog(log => [...log, { 'FirebaseUserUpdate': { 'status': false, 'Message': errors } }]);
            }
            );
    }
    const handleEmailVerification = async () => {
        await verifyEmail()
            .then(() => {
                // console.log("FireBase Email verification send completed");
                // userLog = [...userLog, { FirebaseSendEmail: { 'status': true, 'Message': 'Email Send Done' } }];
                setLog(log => [...log, { 'FirebaseSendEmail': { 'status': true, 'Message': 'Email Send Done' } }]);
            })
            .catch(error => {
                const errors = error.message + ' | ' + error.code;
                // userLog = [...userLog, { FirebaseSendEmail: { 'status': false, 'Message': 'errors' } }];
                setLog(log => [...log, { 'FirebaseSendEmail': { 'status': false, 'Message': errors } }]);

            });
    }
    // # end fire with firebase


    // store in local / mongo




    const storeLog = () => {
        console.log({ log });
        // store log into data base
        const uri = "http://localhost:5000/log";
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ log })
        };
        try {
            const fetchResponse = fetch(uri, settings);
            const data = fetchResponse.json();
            if (data.success === true) {
                console.log('local', data.message);
            } else if (data.success === false) {
                console.log('local', data.message);

            } else {
                console.log('local', data.message);
            }
        } catch (error) {
            console.log('Local store fail: ', error);
        }
    }


    const socialLogin = event => {
        console.log(event);
        loginBySocailAccounts(event)
            .then((result) => {
                const user = result.user;
                console.log(user);
                storeSingleUser(user, password); // store user to mongo db
                showAlert('success', "Logged in successfully.");
               // navigate(from, { replace: true });
            })
            .catch((error) => {
                setLoading(false);
                const errors = error.message + ' | ' + error.code;
                showAlert('danger', errors);
            });
    }

    /*
    useEffect(() => {
        let seconds = 0;
        const counterF = setInterval(async () => {
            console.log(++seconds);
            if (seconds === 5) {
                await clearInterval(counterF); // stop interval
                if (user && user?.uid) {
                    await navigate('/');
                }
            }
            await setCount((current) => current - 1);

        }, 1000);
        // clean useEffect
        return () => clearInterval(counterF);
    }, [])
*/


    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelClasses = "block mb-2 text-sm text-slate-400";
    // check user logged in or not. if logged in then redirect to dashoboard
    if (user && user?.uid) {
        return (
            <div className='flex flex-col space-y-4 items-center justify-center h-[60vh]'>
                <div className='text-2xl text-pink-400'>Logged-in users are not needed to register again.</div>
                <p>You will redirect in</p>
                <div className='text-7xl font-bold text-gray-700'> {count}</div>
            </div>
        )
    } else {

        return (
            <div className='max-w-xl mx-auto'>
                <h1 className='text-center text-3xl pt-5 mb-20 font-bold'>Register Now</h1>
                <form onSubmit={handleAdduser} className="space-y-4 ng-untouched ng-pristine ng-valid">
                    <div className='grid grid-cols-8 gap-5'>

                        <div className='col-span-8'>
                            <label htmlFor="name" className={labelClasses}>
                                Name *
                            </label>

                            <input type="text" required name="name" id="name" placeholder="Name" className={inputClasses} onChange={(e) => { setName(e.target.value) }} />
                        </div>


                        <div className='col-span-8'>
                            <label htmlFor="email" className={labelClasses}>
                                Email Address *
                            </label>

                            <input type="email" required name="email" id="email" placeholder="hello@sandipandas.net" className={inputClasses} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>



                    </div>
                    <div className="mt-4">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className=" text-gray-800 dark:text-gray-200 flex items-center justify-between">Password

                            </label>
                            <Link to="#" className="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</Link>
                        </div>
                        <div className='relative'>
                            <input required type={!showPassword ? "password" : "text"} name='password' className="block w-full px-4 py-3 mt-2  bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" value={genPassword && genPassword} onChange={(e) => { setGenPassword(e.target.value); setPassword(e.target.value) }} placeholder="* * * * * * * *" />

                            <div className='pl-2 pr-2 hover:cursor-pointer absolute right-0 top-0' onClick={() => setShowPassword(!showPassword)}>
                                {/* Password seen or not  */}
                                {
                                    showPassword ?

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-12">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        :


                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-12 text-purple-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>

                                }
                            </div>
                        </div>


                        <div className="text-xs text-gray-600 dark:text-gray-400 hover:underline flex justify-end">
                            <div className='hover:cursor-pointer' onClick={(e) => { handleGeneratePassword() }}> Generate password </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm text-slate-400">Photo URL</label>
                        <input required type="url" name="photourl" id="photourl" placeholder="Photo URL" className="w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                    </div>
                    <button className="flex items-center justify-center w-full p-4 my-2 space-x-4  rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400 hover:bg-purple-800 hover:text-white bg-purple-600 text-white">Register</button>
                </form>

                {/* Social Login */}

                <div className='my-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    <button onClick={() => socialLogin('google')} aria-label="Login with Google" className="flex items-center justify-center w-full p-4 my-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400 hover:bg-purple-500 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                        <p>Login with Google</p>
                    </button>
                    <button onClick={() => socialLogin('github')} aria-label="Login with GitHub" className="flex items-center justify-center w-full p-4 my-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400 hover:bg-purple-500 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                        <p>Login with GitHub</p>
                    </button>
                </div>
                {/* # Social Login */}


            </div>
        );
    }
};

export default Registration;