import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';


const UserEdit = () => {
    const { showAlert } = useContext(AuthContext);
    const navigate = useNavigate();
    let router = useParams();
    const { id } = router;


    const [userInfo, setUserInfo] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [genPassword, setGenPassword] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // get user data by id 
    useEffect(() => {

        const uri = `http://localhost:5000/user/${id}`;
        const settings = {
            method: 'GET'
        };
        const fetchData = async () => {
            try {
                const fetchResponse = await fetch(uri, settings);
                const data = await fetchResponse.json();
                if (data.success) {
                    // console.log(data);
                    setUserInfo(data.data);
                    setPassword(data.data.password);
                    setName(data.data.name);
                    setEmail(data.data.email);
                    // const { userId } = data;
                    // const goTourl = `/users/edt/${userId}`;
                    // navigate(goTourl)
                } else {
                    showAlert('danger', 'Data Not Found');
                    console.log(error);
                    navigate('/users/');
                }
            } catch (error) {
                showAlert('danger', 'Data Fetch Fail');
                console.log(error);
                navigate('/users/');
            }
        }
        fetchData();
    }, []);
    // console.log(userInfo);


    // event fire of form
    const handleUpdateuser = (event) => {
        event.preventDefault();
        // const form = event.target;
        // const names = form.name.value;
        const userName = name;
        const userEmail = email;
        const userPassword = password;
        const user = {
            name: userName,
            email: userEmail,
            password: userPassword,
        }
        console.log(user);
        handleUpdateUser(user, id);// send to server helper 
        showAlert('success', 'data Updated');
    }

    // function to updated data
    const handleUpdateUser = async (user, id) => {
        const uri = `http://localhost:5000/user/${id}`;
        const settings = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        };
        try {
            const fetchResponse = await fetch(uri, settings);
            const data = await fetchResponse.json();

            if (data.success) {
                const { userId } = data;
                console.log(data);
                // const goTourl = `/users/edt/${userId}`;
                // navigate(goTourl)
            } else {

                return error;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }




    const handleGeneratePassword = (event) => {
        let characters = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

        const randomPassword = Math.random().toString(36).slice(10) + characters[Math.floor(Math.random() * characters.length)] + Math.random().toString(36).slice(5) + characters[Math.floor(Math.random() * characters.length)] + Math.random().toString(36).slice(5);

        setGenPassword(randomPassword);
        setPassword(randomPassword);
    }

    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelClasses = "block mb-2 text-sm text-slate-400";
    return (
        <div className='max-w-xl mx-auto'>
            <h1 className='text-center text-3xl pt-5 mb-20 font-bold'>Edit User</h1>
            <form onSubmit={handleUpdateuser} className="space-y-4 ng-untouched ng-pristine ng-valid">
                <div className='grid grid-cols-8 gap-5'>

                    <div className='col-span-8'>
                        <label htmlFor="name" className={labelClasses}>
                            Name *
                        </label>

                        <input defaultValue={userInfo.name} type="text" required name="name" id="name" placeholder="Name" className={inputClasses} onChange={(e) => { setName(e.target.value) }} />
                    </div>


                    <div className='col-span-8'>
                        <label htmlFor="email" className={labelClasses}>
                            Email Address *
                        </label>

                        <input defaultValue={userInfo.email} type="email" required name="email" id="email" placeholder="hello@sandipandas.net" className={inputClasses} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>



                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className=" text-gray-800 dark:text-gray-200 flex items-center justify-between">Password

                        </label>
                        <Link to="#" className="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</Link>
                    </div>
                    <div className='relative'>
                        <input required type={!showPassword ? "password" : "text"} name='password' className="block w-full px-4 py-3 mt-2  bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" defaultValue={password} onChange={(e) => { setGenPassword(e.target.value); setPassword(e.target.value) }} placeholder="* * * * * * * *" />

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
                <button className="flex items-center justify-center w-full p-4 my-2 space-x-4  rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400 hover:bg-purple-800 hover:text-white bg-purple-600 text-white">Update User</button>
            </form>
        </div>
    );
};

export default UserEdit;