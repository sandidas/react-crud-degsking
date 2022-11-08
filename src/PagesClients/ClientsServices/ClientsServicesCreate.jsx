import React from 'react';
import useTitle from '../../Hooks/useTitle';
// import RichTextEditor from 'react-rte';
const ClientsServicesCreate = () => {
    useTitle('Create Services');




    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelsClass = "block mb-2 text-sm text-slate-400"
    return (
        <div>

            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Create Service</h1>
                <p className="text-sm dark:text-gray-400">Sky is your limit</p>
            </div>
            <form className='grid lg:grid-cols-8 gap-5'>
                <div className="rounded-md dark:bg-gray-900 dark:text-gray-100 bg-gray-100 lg:col-span-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className={labelsClass}>Service Title</label>
                            <input required type="text" name="title" id="title" placeholder="Title" className={inputClasses} />
                        </div>

                        <div>
                            <label htmlFor="service_categories" className={labelsClass}>Category</label>
                            <select name="service_categories" id="service_categories" className={inputClasses}>

                                <option value={'Website Design'}>Website Design</option>
                                <option value={'Website Development'}>Website Development</option>
                                <option value={'Website Development'}>Web App Development</option>
                                <option value={'Website Development'}>Mobile App Development</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="description" className={labelsClass}>Description</label>
                            <textarea row="20" className={inputClasses} name="description"  ></textarea>
                        </div>
                    </div>
                </div>
                <div className='lg:col-span-2 space-y-4'>
                    <div>
                        <label htmlFor="price" className={labelsClass}>Price</label>
                        <input required type="text" name="price" id="price" placeholder="Price" className={inputClasses} />
                    </div>


                    <div>
                        <label htmlFor="photo" className={labelsClass}>Photo</label>
                        <input required type="file" name="photo" id="photo" placeholder="photo" className={inputClasses} />
                    </div>
                </div>

            </form>
        </div>
    );
};

export default ClientsServicesCreate;