import React, { useEffect, useState } from 'react';
import { AcademicCourseIndexService } from '../../service/CourseIndex';
import { NavLink } from 'react-router';


const CourseIndex = ({subjectName}) => {
  const [categories, setCategories] = useState([]);

  console.log(subjectName);

  //console.log(categories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await AcademicCourseIndexService(subjectName);
        console.log(response);
        if (response) {
          setCategories(response); 
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Overview: {categories.length}</h1>
      <div className="flex flex-col gap-3">
        {categories.map((category, index) => (
          <NavLink
            key={index} // Using the index as a unique key
            className="btn hover:bg-blue-300 border-none"
          >
            {category} {/* Display the category name */}
          </NavLink>
        ))}
      </div>
    </div>
  );
  
};

export default CourseIndex;
