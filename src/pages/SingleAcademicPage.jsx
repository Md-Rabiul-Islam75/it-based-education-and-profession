import React from "react";

const SingleAcademicPage = ({ course }) => {

     const {name} = course;

  return (
    <div className="card bg-base-200 w-90 shadow-xl">
      <figure>
        <img
          src="https://i.ibb.co.com/FLfLV21m/picture.jpg"
          alt=""
          className="w-70 h-[160px]"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Tutor Name: {name}</h2>
        <h1 className="font-bold text-xl">Course Name: Data Structure and Algorithm</h1>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Click to See</button>
        </div>
      </div>
    </div>
  );
};

export default SingleAcademicPage;
