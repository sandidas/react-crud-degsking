import React, { useEffect, useState } from 'react';
import resTime from '../../Helpers/ResponseTime';
import useTitle from '../../Hooks/useTitle';
const Blogs = () => {
    useTitle('Blogs')
    const [times, setTime] = useState({});
    const [data, setData] = useState({});
    const [countries, setCountries] = useState({});



    return (
        <div>
            <section className='flex flex-col space-y-8 py-20'>
                <div className='py-12 text-center'>
                    <h1 className='text-7xl font-bold'> BLOGS </h1>
                    <p>Read! or write, your will learn something new......tooth tooth tooth</p>
                </div>
                <div className='space-y-5 text-center'>
                    <div>
                        <h2> </h2>
                        <p> </p>
                    </div>




                </div>
            </section>
        </div>
    );
};

export default Blogs;