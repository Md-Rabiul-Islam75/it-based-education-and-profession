import React from 'react';
import { useLoaderData } from 'react-router';
import SingleAcademicPage from './SingleAcademicPage';

const AcademicPage = () => {

   const courses = useLoaderData();
  

    return (
        <div className='mx-auto'>
            <h3 className='text-center my-2 p-1 text-2xl bg-green-500'>Grow your Academic Career</h3>
            <h2 className='font-bold text-center text-xl'>Total courses count: {courses.length}</h2>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 space-x-2 space-y-2'>
            {
               courses.map(course => <SingleAcademicPage key={course.id} course={course}></SingleAcademicPage>) 
            }
            </div>
            
        </div>
    );
};

export default AcademicPage;