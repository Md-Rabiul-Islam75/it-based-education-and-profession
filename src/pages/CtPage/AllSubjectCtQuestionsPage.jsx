import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AllSubjectCtQuestionsPage = () => {
  const subjectsPlace = useLoaderData();
  const initialSubjects = subjectsPlace.responseData.CTSubjectList || [];

  const [subjectsList, setSubjectsList] = useState(initialSubjects);

  const handleAddSubject = async (e) => {
    e.preventDefault();

    const { value: subjectName } = await Swal.fire({
      title: "Add Subject",
      input: "text",
      inputLabel: "Your subject name",
      inputPlaceholder: "Enter your Subject name",
    });

    if (subjectName) {
      const newSubject = {
        id: Date.now(),
        subjectName,
      };

      const newSub = { subjectName };

      // Save new subject info to the database
      fetch("http://localhost:8080/api/ctSubject/post", {
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

      // Update UI
      setSubjectsList((prev) => [...prev, newSubject]);

      Swal.fire(`Subject "${subjectName}" added!`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-6">
        Subject Count: {subjectsList.length}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectsList.map((sub) => (
          <div
            key={sub.id}
            className="rounded-xl p-6 flex flex-col justify-between
                       shadow-md hover:shadow-xl hover:-translate-y-1 transform transition duration-300
                       bg-gradient-to-br from-purple-100 via-indigo-100 to-white"
          >
            <h3 className="text-lg font-semibold text-indigo-800 mb-4 text-center">
              {sub.subjectName}
            </h3>
            <div className="flex justify-center mt-auto">
              <Link
                to="/ctContainerPage"
                state={{ subjectName: sub.subjectName }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium
                           hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Enter
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <h2 className="font-semibold text-lg mb-2">Add New Subject</h2>
        <button
          onClick={handleAddSubject}
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
        >
          Add Subject
        </button>
      </div>
    </div>
  );
};

export default AllSubjectCtQuestionsPage;
