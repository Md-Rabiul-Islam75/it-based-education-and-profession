import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import SingleAcademicPage from './SingleAcademicPage';
import { AcademicSubjectService } from '../service/AcademicSubjects';

// const AcademicPage = () => {

//    const courses = useLoaderData();
//    console.log(courses.responseData.AcademicSubjectList);
//    const total_subject = courses.responseData.AcademicSubjectList;

//    const courseList = AcademicSubjectService();
//    console.log(courseList);


   
  

//     return (
//         <div className='mx-auto'>
//             <h3 className='text-center my-2 p-1 text-2xl bg-green-500'>Grow your Academic Career</h3>
//             <h2 className='font-bold text-center text-xl'>Total courses count: {total_subject.length}</h2>

//             <div className='grid md:grid-cols-2 lg:grid-cols-4 space-x-2 space-y-2'>
//             {
//                total_subject.map(course => <SingleAcademicPage key={course.id} course={course}></SingleAcademicPage>) 
//             }
//             </div>
            
//         </div>
//     );
// };
//import { AcademicSubjectService } from '../services/AcademicSubjectService'; // Adjust path if needed

const AcademicPage = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await AcademicSubjectService();
        if (response && response.responseData?.AcademicSubjectList) {
          setSubjects(response.responseData.AcademicSubjectList);
        }
      } catch (error) {
        console.error("Error fetching academic subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className='w-11/12 mx-auto my-8'>
      {/* <h3 className='text-center my-2 p-1 text-2xl bg-green-500'>Grow your Academic Career</h3>
      <h2 className='font-bold text-center text-xl'>Total courses count: {subjects.length}</h2> */}

      <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-4 space-x-2 space-y-2'>
        {subjects.map(course => (
          <SingleAcademicPage key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
export default AcademicPage;