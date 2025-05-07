// import React from 'react';
// import CourseIndex from '../../Components/Course/CourseIndex';
// import CourseDetails from '../../Components/Course/CourseDetails';
// import { useParams } from 'react-router';

// const Course = () => {

//     const { subjectName } = useParams();
//     return (
//         <div className='w-11/12 mx-auto my-2'>
//             <h2 className='text-center'>Course Name: {subjectName}</h2>


//             <section className='grid md:grid-cols-12'>

//                 <div className='left col-span-3 px-2'>
//                        <CourseIndex subjectName={subjectName}></CourseIndex>

//                 </div>

//                 <div className='right col-span-9 bg-red-500'>
//                       <CourseDetails></CourseDetails>
//                 </div>
//             </section>

//         </div>
//     );
// };

// export default Course;

import React from 'react';
import CourseIndex from '../../Components/Course/CourseIndex';
import { useParams, Outlet } from 'react-router';
import ChatBot from "../../assets/ChatBot.png"

const Course = () => {
    const { subjectName } = useParams();

    return (
        <div className='w-11/12 mx-auto my-2'>
            <h1 className='text-center font-bold'>Course Name: {subjectName}</h1>

            <section className='grid md:grid-cols-12'>
                <div className='left col-span-2 px-2'>
                    <CourseIndex subjectName={subjectName} />
                </div>

                <div className='right col-span-8 mt-10 ml-5'>
                    <Outlet /> {/* This will render CourseDetails when the route matches */}
                </div>

                <div className='col-span-2 my-2 relative'>
                    <h2 className='font-bold'>Resources given by Course Teacher</h2>
                    <button className='btn btn-primary my-2'>Add Resources</button>

                    <div className="sticky top-40 right-4">
                        <button><img src={ChatBot} alt="" /></button>
                    </div>
                   
                </div>
            </section>
        </div>
    );
};

export default Course;
