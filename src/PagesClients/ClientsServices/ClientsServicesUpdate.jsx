import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import extensionAndSizeValidations from '../../Helpers/FileSizeTypeValidation';

import useTitle from '../../Hooks/useTitle';
// import RichTextEditor from 'react-rte';
const ClientsServicesUpdate = () => {

    useTitle('Update Services');
    const { id } = useParams()
    const { user, showAlert, setLoading } = useContext(AuthContext);
    const [thumbnail, setThumbnail] = useState('');
    const [picture, setPicture] = useState('');
    const [singleData, setSingleData] = useState('');
    const navigate = useNavigate()

    // get user data by id 
    useEffect(() => {
        setLoading(true);
        const uri = `https://server-side-xi.vercel.app/service/${id}`;
        const settings = {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('ds-token')}`
            }
        };
        const fetchData = async () => {
            try {
                const fetchResponse = await fetch(uri, settings);
                const data = await fetchResponse.json();
                // console.log(data);
                if (data.success) {
                    // console.log(data);
                    setSingleData(data.data);
                    setThumbnail(data.data.thumbnail);

                } else {

                    showAlert('danger', 'Data Not Found');
                    navigate('/dashboard/services/');
                    // console.log(error);
                }
            } catch (error) {

                showAlert('danger', 'Data Fetch Fail');
            }

        }
        fetchData();
        setLoading(false);
    }, []);
    // console.log(userInfo);




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
            service_categories: service_categories,
            description: description,
            price: price,
            thumbnail: thumbnail,
            soft_delete: false,
            deleted_at: '',
            updated_at: Date.now(),
        }
       // console.log(service);

        patchService(service);
    };



    const patchService = async (service) => {
        setLoading(true);
        const uri = `https://server-side-xi.vercel.app/service/${id}`;
        const settings = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('ds-token')}`
            },
            body: JSON.stringify(service)
        };
        try {
            const fetchResponse = await fetch(uri, settings);
            const data = await fetchResponse.json();
            if (data.success === true) {
                showAlert('success', data.message)
                // now redirect to editing service page

            } else if (data.success === false) {
                showAlert('error', data.message)
            } else {
                showAlert('danger', data.message)
            }
        } catch (error) {
          //  console.log(error);
        }
        setLoading(false);
    }



    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelsClass = "block mb-2 text-sm text-slate-400"
    return (
        <div>

            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Update Service</h1>
                <p className="text-sm dark:text-gray-400">You have no limit</p>
            </div>
            <form className='grid lg:grid-cols-8 gap-5' onSubmit={() => handleFormSubmit(event)}>
                <div className="rounded-md dark:bg-gray-900 dark:text-gray-100 lg:col-span-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className={labelsClass}>Service Title</label>
                            <input required type="text" name="title" id="title" placeholder="Title" className={inputClasses} defaultValue={singleData?.title} />
                        </div>

                        <div>
                            <label htmlFor="service_categories" className={labelsClass}>Category</label>
                            <select name="service_categories" id="service_categories" className={inputClasses} >
                                <option defaultValue={singleData?.service_categories}>{singleData?.service_categories}</option>

                                <option value={'Traditional Wedding Photography'}>Traditional Wedding Photography</option>
                                <option value={'Artistic Wedding Photography'}>Artistic Wedding Photography</option>
                                <option value={'Natural Wedding Photography'}>Natural Wedding Photography</option>
                                <option value={'Editorial Wedding Photography'}>Editorial Wedding Photography</option>
                                <option value={'Documentary Wedding Photography'}>Documentary Wedding Photography</option>
                                <option value={'Portrait Wedding Photography'}>Portrait Wedding Photography</option>
                                <option value={'Vintage Wedding Photography'}>Vintage Wedding Photography</option>
                            </select>
                        </div>


                        <div>
                            <label htmlFor="description" className={labelsClass}>Description</label>
                            <textarea defaultValue={singleData?.description} row="20" color='20' className={inputClasses} name="description" ></textarea>
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-2 space-y-4'>
                    <div>
                        <label htmlFor="price" className={labelsClass}>Price</label>
                        <input defaultValue={singleData?.price} required type="number" name="price" id="price" placeholder="Price" className={inputClasses} />
                    </div>


                    <div className='relative bg-gray-500 overflow-hidden rounded-md p-2'>
                        {picture ? <div>
                            <img src={picture} alt="" />
                        </div>
                            :
                            <img src={singleData?.thumbnail} alt="" />
                        }
                        <input onChange={(e) => { convet2base64(e), handleShowFile(e) }} type="file" name="thumbnail" className="" />
                    </div>
                    <button className="flex items-center justify-center w-full p-4 my-2 space-x-4  rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400 hover:bg-purple-800 hover:text-white bg-purple-600 text-white">Update Service</button>
                </div>

            </form>
        </div>
    );
};

export default ClientsServicesUpdate;