import React from "react";
import { Link } from "react-router";

const SingleAcademicPage = ({ course }) => {
  const { subjectName, imageLink, id } = course;

  const hanldeCourseName = (subjectName) => {
        console.log(subjectName);
  }

  return (
    <Link onClick={() =>hanldeCourseName(subjectName)}  to={`/academic/course/${subjectName}`} className="card bg-base-200 hover:bg-green-500 w-90 shadow-xl my-2">
      <figure>
        <img src={imageLink} alt="" className="w-70 h-[160px]" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold">{subjectName}</h2>
        
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Click to See</button>
        </div>
      </div>
    </Link>
  );
};

export default SingleAcademicPage;
