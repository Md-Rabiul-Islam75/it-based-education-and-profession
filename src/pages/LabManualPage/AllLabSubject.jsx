import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AllLabSubject = () => {
  const labSubjectsPlace = useLoaderData();
  const initialLabSubjects = labSubjectsPlace.responseData.LabSubjectList || [];

  const [subjectsList, setSubjectsList] = useState(initialLabSubjects);

  const handleAddLabSubject = async (e) => {
    e.preventDefault();

    const { value: subjectName } = await Swal.fire({
      title: "Add Lab Title",
      input: "text",
      inputLabel: "Your Lab name",
      inputPlaceholder: "Enter your Lab name",
    });

    if (subjectName) {
      const newSubject = {
        id: Date.now(),
        subjectName,
      };

      const newSub = { subjectName };

      // Save to DB
      fetch("http://localhost:8080/api/lab/labsubject/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newSub),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Subject saved to DB:", data);
        });

      setSubjectsList((prev) => [...prev, newSubject]);

      Swal.fire(`Subject "${subjectName}" added!`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">
        Lab count: {subjectsList.length}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjectsList.map((sub) => (
          <div
            key={sub.id}
            className="rounded-xl p-6 shadow-md hover:shadow-xl
                       bg-gradient-to-br from-purple-100 via-indigo-100 to-white
                       flex flex-col justify-between transition transform hover:-translate-y-1 duration-300"
          >
            <h3 className="text-lg font-semibold text-indigo-800 mb-6 text-center">
              {sub.subjectName}
            </h3>
            <div className="flex justify-center">
              <Link
                to="/labManualDay"
                state={{ subjectName: sub.subjectName }}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold
                           hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Enter
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <h2 className="font-semibold text-lg mb-4">Add New Lab Subject</h2>
        <button
          onClick={handleAddLabSubject}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Add Subject
        </button>
      </div>
    </div>
  );
};

export default AllLabSubject;
