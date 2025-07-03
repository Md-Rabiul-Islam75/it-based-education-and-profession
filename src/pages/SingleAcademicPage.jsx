import React from "react";
import { Link } from "react-router-dom";

const SingleAcademicPage = ({ course }) => {
  const { subjectName, imageLink } = course;

  const handleCourseName = (subjectName) => {
    console.log(subjectName);
  };

  return (
    <Link
      to={`/academic/course/${subjectName}`}
      onClick={() => handleCourseName(subjectName)}
      className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-md
                 hover:shadow-xl hover:-translate-y-1 transform transition duration-300
                 flex flex-col"
    >
      <div className="h-48 overflow-hidden rounded-t-xl">
        <img
          src={imageLink}
          alt={subjectName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col justify-between flex-grow">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
          {subjectName}
        </h2>
        <div className="mt-auto text-center">
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium 
                       hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Click to See
          </button>
        </div>
      </div>
    </Link>
  );
};

export default SingleAcademicPage;
