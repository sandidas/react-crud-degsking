import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import extensionAndSizeValidations from '../../Helpers/FileSizeTypeValidation';
import { redirect } from 'react-router-dom';

import useTitle from '../../Hooks/useTitle';
// import RichTextEditor from 'react-rte';
const ClientsServicesCreate = () => {
    useTitle('Create Services');
    const { user, showAlert, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [thumbnail, setThumbnail] = useState('');
    const [picture, setPicture] = useState('');


    // Converting the uploaded image to base64
    const convet2base64 = e => {
        // check size of
        const imagesSize = e.target.files[0].size;
        const imagesType = e.target.files[0].type;
        // check files extensions ans sizes
        const validation = extensionAndSizeValidations(imagesType, imagesSize)
        if (validation) {
            if (e.target.files[0]) {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = () => {
                    setThumbnail(reader.result.toString());
                };
            };
        } else {
            setThumbnail('');
            e.target.value = null;
            showAlert('danger', 'File Allowed type png, jpeg, jpg, and size up to 500kb')
        }
    };
    // show file thumbnail new input field
    const handleShowFile = e => {
        if (e.target.files[0]) {
            // setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setPicture(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };



    const handleFormSubmit = (event) => {
        event.preventDefault(); //
        const form = event.target;
        const title = form.title.value;
        const service_categories = form.service_categories.value;
        const description = form.description.value;
        const price = form.price.value;
        let slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        slug = slug + '-' + Date.now();
        const uid = user?.uid;
        const service = {
            title: title,
            slug: slug,
            service_categories: service_categories,
            description: description,
            price: price,
            thumbnail: thumbnail,
            uid: uid,
            soft_delete: false,
            deleted_at: '',
            updated_at: '',
            created_at: Date.now(),
        }
        storeService(service);

    };

    const storeService = async (service) => {
        setLoading(true);
        const uri = "http://localhost:5000/service";
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('ds-token')}`
            },
            body: JSON.stringify(service)
        };
        try {
            const fetchResponse = await fetch(uri, settings);
            const data = await fetchResponse.json();
            if (data.success) {
                showAlert('success', data.message)
                // now redirect to editing service page
                const goTourl = `/dashboard/services/edit/${data.insertedId}`;
                setLoading(false);
                navigate(goTourl);
                // navigate(from, { replace: true });

            } else if (data.success === false) {
                setLoading(false);
                showAlert('error', data.message)
            } else {
                setLoading(false);
                showAlert('danger', data.message)
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }

    }




    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelsClass = "block mb-2 text-sm text-slate-400"
    return (
        <div>

            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Create Service</h1>
                <p className="text-sm dark:text-gray-400">Sky is your limit</p>
            </div>
            <form className='grid lg:grid-cols-8 gap-5' onSubmit={() => handleFormSubmit(event)}>
                <div className="rounded-md dark:bg-gray-900 dark:text-gray-100 lg:col-span-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className={labelsClass}>Service Title</label>
                            <input required type="text" name="title" id="title" placeholder="Title" className={inputClasses} />
                        </div>

                        <div>
                            <label htmlFor="service_categories" className={labelsClass}>Category</label>
                            <select name="service_categories" id="service_categories" className={inputClasses} >

                                <option value={'Website Design'}>Website Design</option>
                                <option value={'Website Development'}>Website Development</option>
                                <option value={'Website Development'}>Web App Development</option>
                                <option value={'Website Development'}>Mobile App Development</option>
                            </select>
                        </div>


                        <div>
                            <label htmlFor="description" className={labelsClass}>Description</label>
                            <textarea row="20" className={inputClasses} name="description" ></textarea>
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-2 space-y-4'>
                    <div>
                        <label htmlFor="price" className={labelsClass}>Price</label>
                        <input required type="number" name="price" id="price" placeholder="Price" className={inputClasses} />
                    </div>


                    <div className='relative bg-gray-500 overflow-hidden rounded-md p-2'>
                        {picture && <div>
                            <img src={picture} alt="" />
                        </div>}
                        <input required onChange={(e) => { convet2base64(e), handleShowFile(e) }} type="file" name="thumbnail" className="" />
                    </div>
                    <button className="flex items-center justify-center w-full p-4 my-2 space-x-4  rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400 hover:bg-purple-800 hover:text-white bg-purple-600 text-white">Create Service</button>
                </div>

            </form>
        </div>
    );
};

export default ClientsServicesCreate;