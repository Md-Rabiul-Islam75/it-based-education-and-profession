import React, { useState } from "react";
import { data, Link, useLoaderData } from "react-router";
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
        id: Date.now(), // simple unique ID
        subjectName,
      };

      const newSub = {subjectName};
      console.log(newSub);

      // save new subject info to the database
      fetch('http://localhost:8080/api/ctSubject/post',{
        method: 'POST',
        headers: {
           'content-type': 'application/json'
        },
        body: JSON.stringify(newSub)
      })
      .then(res => res.json())
      .then(data => {
        console.log('user created to db', data);
      })

      // Update the state
      setSubjectsList((prev) => [...prev, newSubject]);

      Swal.fire(`Subject "${subjectName}" added!`);
    }
  };

  return (
    <div className="text-center my-4">
      <h2>Subject count: {subjectsList.length}</h2>

      <div className="flex flex-wrap justify-center gap-4 my-6">
        {subjectsList.map((sub) => (
          <div
            className="card w-96 bg-blue-200 card-sm shadow-sm"
            key={sub.id}
          >
            <div className="card-body">
              <h2 className="card-title">{sub.subjectName}</h2>
              <div className="justify-end card-actions">
                <Link to={'/ctContainerPage'} state={{ subjectName: sub.subjectName }}><button className="btn btn-primary">Enter</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form>
        <h2 className="font-bold my-4">Enter Subject Name here: </h2>
        <button onClick={handleAddSubject} className="btn">
          Add Subject
        </button>
      </form>
    </div>
  );
};

export default AllSubjectCtQuestionsPage;
