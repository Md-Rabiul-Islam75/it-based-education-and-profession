import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // fixed import
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
  }, [subjectName]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-8 text-center text-indigo-700">
        Total CT Collection: {ctCollection.length}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {ctCollection.map((ct, index) => {
          const isPdf = ct.ctquestionFileUrl.toLowerCase().endsWith(".pdf");

          return (
            <div
              key={ct.id || index}
              className="bg-white rounded-xl shadow-md overflow-hidden
                         hover:shadow-xl hover:-translate-y-1 transform transition duration-300
                         flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                {isPdf ? (
                  <iframe
                    src={ct.ctquestionFileUrl}
                    title={`CT PDF - ${subjectName}`}
                    className="w-full h-full border-none transform transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <img
                    src={ct.ctquestionFileUrl}
                    alt={`CT Question - ${subjectName}`}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-indigo-700 mb-2 text-center">
                  {subjectName}
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Course Taken By: <span className="font-semibold">{ct.courseTakenBy}</span>
                </p>

                <div className="flex justify-between mb-2 text-sm font-semibold text-gray-700">
                  <span>Year: {ct.year}</span>
                  <span>Semester: {ct.semester}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4 text-center">
                  Creation Date: {ct.creationDate}
                </p>

                <div className="mt-auto flex justify-center gap-3">
                  {isPdf ? (
                    <>
                      <a
                        href={`https://docs.google.com/gview?url=${encodeURIComponent(
                          ct.ctquestionFileUrl
                        )}&embedded=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary px-5 py-2 rounded-md font-semibold
                                   hover:bg-indigo-700 transition"
                      >
                        View
                      </a>
                      <a
                        href={ct.ctquestionFileUrl}
                        download={`CT_${subjectName}_${ct.year}_${ct.semester}.pdf`}
                        onClick={() => toast.success("Your download started!")}
                        className="btn btn-secondary px-5 py-2 rounded-md font-semibold
                                   hover:bg-gray-700 transition"
                      >
                        Download
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        href={ct.ctquestionFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary px-5 py-2 rounded-md font-semibold
                                   hover:bg-indigo-700 transition"
                      >
                        View
                      </a>
                      <a
                        href={ct.ctquestionFileUrl}
                        download={`CT_${subjectName}_${ct.year}_${ct.semester}.jpg`}
                        onClick={() => toast.success("Your download started!")}
                        className="btn btn-secondary px-5 py-2 rounded-md font-semibold
                                   hover:bg-gray-700 transition"
                      >
                        Download
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-md mx-auto mt-12">
        <div className="bg-blue-300 rounded-xl shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">{subjectName}</h2>
          <p className="mb-6">Go to Add CT Information Page</p>
          <Link to={"/ctFormPage"} state={{ subjectName }}>
            <button className="btn btn-primary px-8 py-2 rounded-md font-semibold hover:bg-indigo-700 transition">
              Enter
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CtContainerPage;
