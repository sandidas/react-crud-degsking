import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import StarRating from '../../Helpers/StarRating';
import useTitle from '../../Hooks/useTitle';
import './ServiceSingle.css'


const ServiceSingle = () => {
    useTitle('Services');
    const { showAlert, setLoading, user } = useContext(AuthContext);
    const [featchData, setFeatchData] = useState([]);
    const { id } = useParams()

    // PAGINATION
    const [totalNumberOfDocument, setTotalNumberOfDocument] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // current page 
    const [itemsPerPage, setItemsPerPage] = useState(6) // items per page
    // by using Math.ceil we can get upper value. for example. 11.3 conver to 12.
    const [spliceStart, setSpliceStart] = useState(0);
    const [spliceEnd, setSpliceEnd] = useState(5);

    const totalPages = Math.ceil(totalNumberOfDocument / itemsPerPage);

    useEffect(() => {

        const dataFetchByPagination = async () => {
            const delay = (ms = 3000) => new Promise(r => setTimeout(r, ms));

            await setLoading(true);
            const location = `http://localhost:5000/service/${id}`;
            const settings = {
                method: 'GET',
            };


            const apiFetch = await fetch(location, settings)
            const jsonData = await apiFetch.json();
            if (jsonData.success) {
                setFeatchData(jsonData.data);
                setTotalNumberOfDocument(jsonData.data.totalItems);


                await setLoading(false);
            }
        }
        dataFetchByPagination();
    }, [currentPage, itemsPerPage])
    // 

    // console.log(featchData);

    //   // Fetch method: GET
    //   useEffect(() => {
    //     fetch(`http://localhost:5000/service/${id}`)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         if (data.success) {
    //           // Set data to the state
    //           setFeatchData(data.data);
    //           // Set reviews to the state
    //           setTotalNumberOfDocument(data.data.totalItems);
    //         } else {

    //         };
    //       })
    //       .catch(error => {

    //       });
    //   }, []);







    const generalPageClasses = "px-9 py-3 font-bold shadow-md dark:bg-gray-900 dark:text-purple-400 dark:border-purple-400 hover:bg-gray-400 dark:hover:bg-pink-800 rounded-md";
    const selectedPageClasses = "px-9 py-3  font-bold shadow-md dark:bg-pink-700 dark:text-purple-400 dark:border-purple-400 hover:bg-gray-400 dark:hover:bg-pink-800 rounded-md";
    const inputClasses = "w-full text-xl px-3 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
    const labelClasses = "block mb-2 text-sm text-slate-400";

    const [rating, setRating] = useState(5);
    const [review, setreview] = useState('');
    console.log(rating);
    console.log(review);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!rating || !review) {
            showAlert('danger', "Please submit review and rating.");
            return
        }
        const uid = user?.uid;
        const reviewData = {
            rating: rating,
            review: review,
            uid: uid,
            service_id: id,
            soft_delete: false,
            deleted_at: '',
            updated_at: '',
            created_at: Date.now(),
        }
        console.log(reviewData);
    }


    return (
        <div>
            <section>
                <div className="pt-5 rounded-md pb-8 px-5 shadow-md dark:bg-gray-900 dark:text-gray-100">
                    <div className="block py-5">
                        <h3 className="text-2xl font-bold dark:text-purple-400 pb-2">
                            {featchData?.title}
                        </h3>
                        <p className="flex items-center">
                            {featchData?.service_categories}
                        </p>
                    </div>
                    <div className="space-y-6 flex flex-col">
                        <div className="space-y-">
                            <img src={featchData?.thumbnail} alt="" className="block object-cover object-center w-full   rounded-md dark:bg-gray-500" />
                            <div className="flex pt-4 items-center text-xs justify-between">
                                <span>Total Reviews: {featchData?.total_reviews}</span>
                                <span>Average Reviews: {featchData?.total_reviews_average}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="leading-snug dark:text-gray-400">
                                <div className='flex flex-col space-y-4' dangerouslySetInnerHTML={{ __html: featchData?.description }}>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='font-bold text-xl'>
                                ${featchData?.price}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <form onSubmit={(e) => handleReviewSubmit(e)} className="space-y-4 ng-untouched ng-pristine ng-valid">
                    <div className='grid grid-cols-8 gap-5'>
                        <div className='col-span-8'>
                            <label htmlFor="name" className={labelClasses}>
                                Ratings
                            </label>
                            <div>
                                <StarRating rating={rating} setRating={setRating} ></StarRating>
                            </div>
                        </div>

                        <div className='col-span-8'>
                            <label htmlFor="name" className={labelClasses}>
                                Review *
                            </label>
                            <textarea className={inputClasses} name="" id="" cols="30" rows="3" onChange={(e) => { setreview(e.target.value) }}></textarea>
                        </div>
                        <button className="flex items-center justify-center w-full p-4 my-2 space-x-4  rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400 hover:bg-purple-800 hover:text-white bg-purple-600 text-white">Submit Review</button>
                    </div>
                </form>
            </section>
        </div >
    );
};

export default ServiceSingle;