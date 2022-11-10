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
                <div className='space-y-10'>
                    <div className='space-y-2'>
                        <h2 className='text-lg font-bold'> What is the differences between SQL and NoSQL </h2>
                        <p>When choosing a modern database, one of the biggest decisions is picking a relational (SQL) or non-relational (NoSQL) data structure. While both are viable options, there are key differences between the two that users must keep in mind when making a decision.

                            Here, we break down the most important distinctions and discuss the best SQL and NoSQL database systems available.
                        </p>
                        <p>


                            SQL databases are relational, NoSQL databases are non-relational. <br />
                            SQL databases use structured query language and have a predefined schema. NoSQL databases have dynamic schemas for unstructured data. <br />
                            SQL databases are vertically scalable, while NoSQL databases are horizontally scalable. <br />
                            SQL databases are table-based, while NoSQL databases are document, key-value, graph, or wide-column stores. <br />
                            SQL databases are better for multi-row transactions, while NoSQL is better for unstructured data like documents or JSON.

                        </p>
                    </div>


                    <div className='space-y-2'>
                        <h2 className='text-lg font-bold'> What is JWT, and how does it works?</h2>
                        <p> JSON Web Token is an open industry standard used to share information between two entities, usually a client (like your app’s frontend) and a server (your app’s backend).
                            <br />
                            They contain JSON objects which have the information that needs to be shared. Each JWT is also signed using cryptography (hashing) to ensure that the JSON contents (also known as JWT claims) cannot be altered by the client or a malicious party.  </p>
                        <p><strong>How do they work</strong></p>
                        <p>
                            1) Create a JSON <br />
                            2) Create a JWT signing key and decide the signing algorithm 3) Creating the “Header” <br />
                            4) Create a signature <br />
                            5) Creating the JWT <br />
                            6) Verifying the JWT  <br />

                        </p>
                    </div>




                    <div className='space-y-2'>
                        <h2 className='text-lg font-bold'> What is the difference between javascript and NodeJS? </h2>
                        <p> JavaScript is a simple programming language that can be used with any browser that has the JavaScript Engine installed. Node. js, on the other hand, is an interpreter or execution environment for the JavaScript programming language  </p>
                        <p>
                            1. JavaScript is a client-side scripting language that is lightweight, cross-platform, and interpreted. Both Java and HTML include it. Node.js, on the other hand, is a V8-based server-side programming language.
                            <br />
                            As a result, it is used to create network-centric applications. It's a networked system made for data-intensive real-time applications. If we compare node js vs. python, it is clear that node js will always be the preferred option.
                            <br />
                            2. JavaScript is a simple programming language that can be used with any browser that has the JavaScript Engine installed. Node.js, on the other hand, is an interpreter or execution environment for the JavaScript programming language. It requires libraries that can be conveniently accessed from JavaScript programming to be more helpful.
                            <br />
                            3. Any engine may run JavaScript. As a result, writing JavaScript is incredibly easy, and any working environment is similar to a complete browser. Node.js, on the other hand, only enables the V8 engine. Written JavaScript code, on the other hand, can run in any context, regardless of whether the V8 engine is supported.
                            <br />
                            4. A specific non-blocking operation is required to access any operating system. There are a few essential objects in JavaScript, but they are entirely OS-specific.
                            <br />
                            Node.js, on the other hand, can now operate non-blocking software tasks out of any JavaScript programming. It contains no OS-specific constants. Node.js establishes a strong relationship with the system files, allowing companies to read and write to the hard drive.
                            <br />
                            5. The critical benefits of JavaScript include a wide choice of interfaces and interactions and just the proper amount of server contact and direct visitor input.
                            <br />
                            Node.js, on the other hand, offers node package management with over 500 modules and the capacity to handle many requests at the same time. It also offers the unique ability to enable microservice architecture and the Internet of Things. Even when comparing node js vs. react js, node js always wins.
                        </p>


                    </div>



                    <div className='space-y-2'>
                        <h2 className='text-lg font-bold'> How does NodeJS handle multiple requests at the same time? </h2>
                        <p> How does node handle multiple requests at the same time?
How NodeJS handle multiple client requests? NodeJS receives multiple client requests and places them into EventQueue. NodeJS is built with the concept of event-driven architecture. NodeJS has its own EventLoop which is an infinite loop that receives requests and processes them </p>
                    </div>



                </div>
            </section>
        </div>
    );
};

export default Blogs;