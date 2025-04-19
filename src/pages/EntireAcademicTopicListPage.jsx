import React from "react";
import { Link } from "react-router";

const EntireAcademicTopicListPage = () => {
  return (
    <div className="flex gap-2 m-4 mb-24 mt-24 justify-evenly">
        {/* 1st Card */}
      <div className="card bg-blue-300 w-80 shadow-2xl">
        
        <div className="card-body items-center text-center">
          <h2 className="card-title">Academic</h2>
          
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
            <Link to={"/ctQuestionPage"} className="btn btn-primary">See Now</Link>
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
            <Link className="btn btn-primary">See Now</Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EntireAcademicTopicListPage;
