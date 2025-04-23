import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const CtContainerPage = () => {
  const location = useLocation();
  const subjectName = location.state?.subjectName || "Unknown Subject";
  console.log(subjectName);

  const [ctCollection, setCollection] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/ctquetion/getbysubjectname?SubjectName=${subjectName}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCollection(data.responseData.CTQuetionList); // Set the data to state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Total ctcollection here: {ctCollection.length}</h2>

      <div className="grid grid-cols-1 my-2 mx-2  md:grid-cols-2 gap-2 lg:grid-cols-4 space-x-2">
        {ctCollection.map((ct) => (
          <div className="card border border-green-500 bg-base-100 w-[350px] mx-auto shadow-2xl">
            <figure>
              <img
                src={ct.ctquestionFileUrl}
                alt="CtQuestions"
                className="h-[150px]"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{subjectName}</h2>
              <h2 className="card-title2">
                Course Taken By: {ct.courseTakenBy}
              </h2>

              <div className="flex gap-2">
                <h2 className="font-bold">Year: {ct.year}</h2>
                <h2 className="font-bold">Semester: {ct.semester}</h2>
              </div>
              <h3 className="font-bold">Creation Date: {ct.creationDate}</h3>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Click to See</button>
              </div>
            </div>
          </div>

        ))}
      </div>

      <div className="w-[400px] mx-auto my-4 space-y-2">
        <div className="card bg-blue-300 w-96 shadow-sm items-center text-center">
          <div className="card-body items-center text-center">
            <h2 className="card-title">{subjectName}</h2>
            <p>Go to Add CT Information Page</p>
            <div className="card-actions justify-center mt-4 space-x-2">
              <Link to={"/ctFormPage"} state={{ subjectName: subjectName }}>
                <button className="btn btn-primary">Enter</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtContainerPage;
