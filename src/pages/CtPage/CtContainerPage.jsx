import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import toast from "react-hot-toast";

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
        {ctCollection.map((ct, index) => (
          <div
            key={ct.id || index}
            className="card border border-green-500 bg-base-100 w-[350px] mx-auto shadow-2xl"
          >
            <figure className="p-4">
              {ct.ctquestionFileUrl.endsWith(".pdf") ? (
                // Show PDF preview in an iframe
                <iframe
                  src={ct.ctquestionFileUrl}
                  title="CT PDF"
                  className="w-full h-48 border rounded"
                />
              ) : (
                // Show image preview
                <img
                  src={ct.ctquestionFileUrl}
                  alt="CT Question"
                  className="h-[150px] object-contain"
                />
              )}
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
              <div className="card-actions justify-end space-x-2">
                {ct.ctquestionFileUrl.endsWith(".pdf") ? (
                  <>
                    {/* PDF View */}
                    <a
                      href={`https://docs.google.com/gview?url=${encodeURIComponent(
                        ct.ctquestionFileUrl
                      )}&embedded=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      View
                    </a>
                    {/* PDF Download */}
                    <a
                      href={ct.ctquestionFileUrl}
                      download={`CT_${subjectName}_${ct.year}_${ct.semester}.pdf`}
                      onClick={() => alert("Your file is being downloaded...")}
                      className="btn btn-secondary"
                    >
                      Download
                    </a>
                  </>
                ) : (
                  <>
                    {/* Image View (direct link in new tab) */}
                    <a
                      href={ct.ctquestionFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      View
                    </a>
                    {/* Image Download */}
                    <a
                      href={ct.ctquestionFileUrl}
                      download={`CT_${subjectName}_${ct.year}_${ct.semester}.jpg`}
                      onClick={() => alert("Your file is being downloaded...")}
                      className="btn btn-secondary"
                    >
                      Download
                    </a>
                  </>
                )}

                {/* <a
                  href={ct.ctquestionFileUrl}
                   target="_blank"
                  download
                  onClick={() => toast.success("Download started!")}
                  className="btn btn-secondary"
                >
                  Download
                </a> */}
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
