import React, { useEffect, useState } from 'react';
import resTime from '../../Helpers/ResponseTime';

const Blogs = () => {
    const [times, setTime] = useState({});
    const [data, setData] = useState({});
    const [countries, setCountries] = useState({});
    /*
        useEffect(() => {
            let startTime = new Date().getTime();
            fetch(`https://degsking-ass.vercel.app/courses`)
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                    let endTime = new Date().getTime();
                    setTime(resTime(startTime, endTime));
                });
        }, []);
    */
    useEffect(() => {
        const callApi = async () => {
            let startTime = new Date().getTime();
            const apiUrl = 'http://localhost:5000/users';
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setCountries(data);
                let endTime = new Date().getTime();
                setTime(resTime(startTime, endTime));
            } catch (error) {
                console.log(error);
            }
        }
        callApi();

    }, []);

    return (
        <div>
            <p className={times.className}> loading time {times.res}ms </p>

            <p>total blog             {data.length}</p>
            This is Blogs
        </div>
    );
};

export default Blogs;