import React from 'react';
import useTitle from '../../Hooks/useTitle';
const ClientsServicesCreate = () => {
    useTitle('Create Services');




    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelsClass = "block mb-2 text-sm text-slate-400"
    return (
        <div>

            <div className="p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 bg-gray-100">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Create Service</h1>
                    <p className="text-sm dark:text-gray-400">Sky is your limit</p>
                </div>
                <form
                    className="space-y-12 ng-untouched ng-pristine ng-valid">

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className={labelsClass}>Service Title</label>
                            <input required type="text" name="title" id="title" placeholder="Title" className={inputClasses} />
                        </div>

                        <div>
                            <label htmlFor="description" className={labelsClass}>Description</label>
                            <textarea row="20" className={inputClasses} name="description"  ></textarea>
                        </div>


                    </div>

                </form>

            </div>








        </div>
    );
};

export default ClientsServicesCreate;