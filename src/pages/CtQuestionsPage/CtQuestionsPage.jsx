import React from "react";
import Swal from 'sweetalert2';

const CtQuestionsPage = () => {
  const handleAddSubject = async (e) => {
    e.preventDefault();

    const { value: subject } = await Swal.fire({
      title: "Add Subject",
      input: "text",
      inputLabel: "Your subject name",
      inputPlaceholder: "Enter your Subject name"
    });

    if (subject) {
      Swal.fire(`Entered Subject: ${subject}`);
    }
  };

  return (
    <div className="text-center my-4">
      <form>
        <h2 className="font-bold my-4">Enter Subject Name here: </h2>
        <button onClick={handleAddSubject} className="btn">Add Subject</button>
      </form>
    </div>
  );
};

export default CtQuestionsPage;
