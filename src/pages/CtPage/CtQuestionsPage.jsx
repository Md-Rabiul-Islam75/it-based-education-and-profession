import React, { useState } from "react";
import { data, useLocation, useNavigate } from "react-router";

const CtQuestionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subjectName = location.state?.subjectName || "Unknown Subject";

  const [teacher, setTeacher] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacher || !year || !semester || !file) {
      alert("Please fill all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("ctquestionFile", file);
    formData.append("courseTakenBy", teacher);
    formData.append("semester", semester);
    formData.append("year", year);
    formData.append("subjectName", subjectName);

    const formData2 = { file, teacher, semester, year, subjectName };

    // try {
    //   const response = await fetch("http://localhost:8080/api/ctquetion/post", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to upload file");
    //   }

    //   const result = await response.json();
    //   console.log("Upload successful:", result);
    //   alert("CT question uploaded successfully!");
    // } catch (error) {
    //   console.error("Upload error:", error);
    //   alert("Failed to upload CT question.");
    // }

    fetch("http://localhost:8080/api/ctquetion/post", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ct created to db", data);
        alert("CT question uploaded successfully!");
        navigate("/ctContainerPage", {
          state: { subjectName: subjectName },
        });
      });
  };

  return (
    <div className="text-center">
      <h2 className="text-center font-bold">Subject: {subjectName}</h2>

      <form
        onSubmit={handleSubmit}
        className="w-[400px] mx-auto space-y-4 my-4 p-4 border border-green-800 rounded-lg"
      >
        <div>
          <h4>Choose Course Teacher's Name:</h4>
          <select
            className="select select-accent w-full"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            required
          >
            <option disabled value="">
              Teacher's Name
            </option>
            <option>Sir A</option>
            <option>Sir B</option>
            <option>Sir C</option>
            <option>Sir D</option>
          </select>
        </div>

        <div>
          <h4>Choose Year:</h4>
          <select
            className="select select-accent w-full"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            <option disabled value="">
              Choose Year
            </option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
          </select>
        </div>

        <div>
          <h4>Choose Semester:</h4>
          <select
            className="select select-accent w-full"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          >
            <option disabled value="">
              Choose Semester
            </option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
          </select>
        </div>

        <div>
          <h4>Choose file:</h4>
          <input
            type="file"
            className="file-input file-input-info w-full"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-full">
          Upload CT Question
        </button>
      </form>
    </div>
  );
};

export default CtQuestionsPage;
