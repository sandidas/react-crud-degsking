import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserCreate = () => {
    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelClasses = "block mb-2 text-sm text-slate-400";
    const formFields = [
        {
            _id: 1,
            title: "Name *",
            placeholder: "Name",
            type: "text",
            name: "name",
            htmlFor: "name",
            id: "name",
            className: inputClasses,
            labelClassName: labelClasses,
            widthClass: "col-span-8 lg:col-span-4",
            required: true,
            useStateName: 'setName'
        },
        {
            _id: 2,
            title: "Phone Number",
            placeholder: "Phone Number",
            type: "text",
            name: "phone",
            htmlFor: "phone",
            id: "phone",
            className: inputClasses,
            labelClassName: labelClasses,
            widthClass: "col-span-8 lg:col-span-4",
            required: false,
            useStateName: 'setPhone'
        },
        {
            _id: 3,
            title: "Email Address *",
            placeholder: "hello@sandipandas.net",
            type: "email",
            name: "email",
            htmlFor: "email",
            id: "email",
            className: inputClasses,
            widthClass: "col-span-8",
            labelClassName: labelClasses,
            required: true,
            useStateName: 'setEmail'
        },
    ]
    const formFieldsShorted = [...formFields].sort((a, b) => a._id - b._id);

    const [showPassword, setShowPassword] = useState(false);
    const [genPassword, setGenPassword] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

   // console.log(name);
    const handleAdduser = (event) => {
        event.preventDefault();
        const form = event.target;
        const names = form.name.value;


        const userName = form.name.value;
        const userEmail = form.email.value;
        const userPassword = form.password.value;
        const userPhone = form.phone.value;
        const user = {
            name: userName,
            email: userEmail,
            password: userPassword,
            phone: userPhone,
        }
        // handleStoreUser(user);// send to server by utitilites 
        //console.log(user);
    }


    const handleGeneratePassword = (event) => {
        let characters = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

        const randomPassword = Math.random().toString(36).slice(10) + characters[Math.floor(Math.random() * characters.length)] + Math.random().toString(36).slice(5) + characters[Math.floor(Math.random() * characters.length)] + Math.random().toString(36).slice(5);

        setGenPassword(randomPassword);
        setPassword(randomPassword);
    }
    return (
        <div className='max-w-xl mx-auto'>
            <h1 className='text-center text-3xl pt-5 mb-20 font-bold'>Create User</h1>
            <form onSubmit={handleAdduser} className="space-y-4 ng-untouched ng-pristine ng-valid">
                <div className='grid grid-cols-8 gap-5'>
                    { formFieldsShorted &&
                        formFieldsShorted.map(field =>
                            <div key={field._id} className={field?.widthClass}>

                                <label htmlFor={field?.htmlFor} className={field?.labelClassName}>
                                    {field?.title}
                                </label>

                                <input type={field?.type} required={field?.required && "required"} name={field?.name} id={field?.id} placeholder={field?.placeholder} className={field?.className} onChange={(e) => { { field?.useStateName } (e.target.value) }} />

                            </div>
                        )
                    }
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
                <button className="flex items-center justify-center w-full p-4 my-2 space-x-4  rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400 hover:bg-purple-800 hover:text-white bg-purple-600 text-white">Create User</button>
            </form>
        </div>
    );
};

export default UserCreate;