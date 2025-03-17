import React from 'react';
import CourseIndex from '../../Components/Course/CourseIndex';
import CourseDetails from '../../Components/Course/CourseDetails';
import { useParams } from 'react-router';

const Course = () => {

    const { subjectName } = useParams();
    return (
        <div className='w-11/12 mx-auto my-2'>
            <h2 className='text-center'>Course Name: {subjectName}</h2>


            <section className='grid md:grid-cols-12'>

                <div className='left col-span-3 bg-green-500'>
                       <CourseIndex subjectName={subjectName}></CourseIndex>

                </div>

                <div className='right col-span-9 bg-red-500'>
                      <CourseDetails></CourseDetails>
                </div>
            </section>

        </div>
    );
};

export default Course;