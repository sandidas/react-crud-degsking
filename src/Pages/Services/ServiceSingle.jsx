import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import StarRating from '../../Helpers/StarRating';
import useTitle from '../../Hooks/useTitle';
import ReviewCard from './ReviewCard';
import './ServiceSingle.css'


const ServiceSingle = () => {
    useTitle('Services');
    const { showAlert, setLoading, user } = useContext(AuthContext);
    const [featchData, setFeatchData] = useState([]);
    const [featchReviews, setFeatchReviews] = useState([]);
    const { id } = useParams();
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {

        const dataFetchByPagination = async () => {
            const delay = (ms = 3000) => new Promise(r => setTimeout(r, ms));

            
            const location = `http://localhost:5000/serviceandreview/${id}`;
            const settings = {
                method: 'GET',
            };

            const apiFetch = await fetch(location, settings)
            const jsonData = await apiFetch.json();
            if (jsonData.success) {
                setFeatchData(jsonData.data.service);
                setFeatchReviews(jsonData.data.reviews);
                
            }
        }
        dataFetchByPagination();
    }, [refresh])

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


    const handleReviewSubmit = (e) => {
        e.preventDefault();

        const review = e.target.reviewText.value;

        if (!rating || !review) {
            showAlert('danger', "Please submit review and rating.");
            return
        }

        const uid = user?.uid;
        const name = user?.displayName;
        const serviceTitle = featchData?.title;
        const reviewData = {
            rating: rating,
            review: review,
            name: name,
            uid: uid,
            serviceId: id,
            serviceTitle: serviceTitle,
            soft_delete: false,
            deleted_at: '',
            updated_at: '',
            created_at: Date.now(),
        }
        storeSingleRating(reviewData);
        e.target.reset();
        // console.log(reviewData);
    }
    const storeSingleRating = async (reviewData) => {

        const uri = "http://localhost:5000/storereview";
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('ds-token')}`
            },
            body: JSON.stringify(reviewData)
        };
        try {
            const fetchResponse = await fetch(uri, settings);
            const data = await fetchResponse.json();
            if (data.success) {
                setRefresh(!refresh);
                showAlert('success', 'Thanks for your feedback');
            } else if (data.success === false) {
                showAlert('error', 'Failed to get feedback 001');
            } else {
                showAlert('error', 'Failed to get feedback');
            }

        } catch (error) {
            console.log(error);
            showAlert('error', 'Failed to get feedback');
        }

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
                                <span className='text-2xl'>Total Reviews: {featchData?.reviewsCount}</span>
                                <span className='text-2xl'>Average Reviews: {featchData?.ratingsAverage}</span>
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


            <section className='pt-5 rounded-md pb-8 px-5 shadow-md dark:bg-gray-900 dark:text-gray-100 mt-5 flex flex-col'>
                {
                    user && user?.uid ?

                        <form onSubmit={(e) => handleReviewSubmit(e)} className="space-y-4 ng-untouched ng-pristine ng-valid">
                            <div className='gap-5'>
                                <div className=''>
                                    <label htmlFor="name" className={labelClasses}>
                                        Ratings
                                    </label>
                                    <div>
                                        <StarRating rating={rating} setRating={setRating} ></StarRating>
                                    </div>
                                </div>

                                <div className=''>
                                    <label htmlFor="name" className={labelClasses}>
                                        Review *
                                    </label>
                                    <textarea className={inputClasses} name="reviewText" id="" cols="30" rows="3" ></textarea>
                                </div>
                                <button className="flex items-center justify-center w-full p-4 my-2 space-x-4  rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400 hover:bg-purple-800 hover:text-white bg-purple-600 text-white">Submit Review</button>
                            </div>
                        </form>
                        :
                        <div className='flex flex-col text-center items-center'>
                            <h2 className='text-lg'>
                                Please login to add a review.

                            </h2>
                            <Link className="p-4 my-2 rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400 hover:bg-purple-800 hover:text-white bg-purple-600 text-white" to='/login'>Login Now</Link>
                        </div>



                }

            </section>




            <section className='pt-5 rounded-md pb-8 px-5 shadow-md dark:bg-gray-900 dark:text-gray-100 mt-5'>
                {
                    featchReviews.map((review) => <ReviewCard key={review?._id} review={review}>


                    </ReviewCard>)
                }

            </section>
        </div >
    );
};

export default ServiceSingle;