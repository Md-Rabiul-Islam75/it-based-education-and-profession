import React from "react";
import { Link } from "react-router";

const EntireAcademicTopicListPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-4 mb-24 mt-24 lg:grid-cols-4">
        {/* 1st Card */}
      <div className="card bg-blue-300 w-80 shadow-2xl">
        
        <div className="card-body items-center text-center">
          <h2 className="card-title">Courses</h2>
          
          <div className="card-actions">
            <Link to={'/academic'} className="btn btn-primary">See Now</Link>
          </div>
        </div>
      </div>

       {/* 2nd Card */}
       <div className="card bg-blue-300 w-80 shadow-2xl">
        
        <div className="card-body items-center text-center">
          <h2 className="card-title">Ct Questions</h2>
         
          <div className="card-actions">
            <Link to={"/allCtQuestionPage"} className="btn btn-primary">See Now</Link>
          </div>
        </div>
      </div>

       {/* 3rd Card */}
       <div className="card bg-blue-300 w-80 shadow-2xl">
        
        <div className="card-body items-center text-center">
          <h2 className="card-title">Previous Year Questions</h2>
          
          <div className="card-actions">
            <Link className="btn btn-primary">See Now</Link>
          </div>
        </div>
      </div>

       {/* 4th Card */}
       <div className="card bg-blue-300 w-80 shadow-2xl">
       
        <div className="card-body items-center text-center">
          <h2 className="card-title">Lab Manual</h2>
         
          <div className="card-actions">
            <Link to={"/allLabSubject"} className="btn btn-primary">See Now</Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EntireAcademicTopicListPage;
