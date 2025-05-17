import React, { useEffect, useState } from "react";
import SingleAcademicPage from "./SingleAcademicPage";
import { AcademicSubjectService } from "../service/AcademicSubjects";
import Swal from "sweetalert2";

const AcademicPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


   const openInputModal = async () => {
      const { value: formValues } = await Swal.fire({
        title: "Submit Course Name",
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Enter Course Name">
          <input id="swal-input2" type="file" class="swal2-file">
          <select id="swal-select1" class="swal2-select">
            <option value="">Select Course Taken By</option>
            <option value="optionA">Option A</option>
            <option value="optionB">Option B</option>
          </select>
          <select id="swal-select2" class="swal2-select">
            <option value="">Course Upload By</option>
            <option value="optionX">Option X</option>
            <option value="optionY">Option Y</option>
          </select>
        `,
        focusConfirm: false,
        confirmButtonText: "Submit",
        preConfirm: () => {
          const indexName = document.getElementById("swal-input1").value;
          const fileInput = document.getElementById("swal-input2");
          const labQuestionFile = fileInput.files[0];
          const labTakenBy = document.getElementById("swal-select1").value;
          const fileUploadBy = document.getElementById("swal-select2").value;
  
          if (!indexName || !labQuestionFile || !labTakenBy || !fileUploadBy) {
            Swal.showValidationMessage("Please fill all fields.");
          }
  
          return {
            indexName,
            labQuestionFile,
            labTakenBy,
            fileUploadBy,
          };
        },
      });
  
      if (formValues) {
        const formData = new FormData();
        formData.append("SubjectName", labName);
        formData.append("NumberOfDay", dayId);
        formData.append("IndexName", formValues.indexName);
        formData.append("LabQuestionFile", formValues.labQuestionFile);
        formData.append("LabTakenBy", formValues.labTakenBy);
        formData.append("FileUploadBy", formValues.fileUploadBy);
  
        try {
          const response = await fetch(
            "http://localhost:8080/api/lab/labdaydetails/post",
            {
              method: "POST",
              body: formData,
            }
          );
  
          const result = await response.json();
          console.log("Response:", result);
  
          if (result.success) {
            const newItem = {
              id: Date.now(),
              indexName: formValues.indexName,
              labTakenBy: formValues.labTakenBy,
              labFileUrl: result.responseData?.labFileUrl || "",
            };
  
            setLabCollection((prev) => [...prev, newItem]);
  
            Swal.fire("Success", "Lab manual uploaded successfully!", "success");
          } else {
            Swal.fire(
              "Upload Failed",
              JSON.stringify(result.errorMessages),
              "error"
            );
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          Swal.fire("Error", "Something went wrong while uploading.", "error");
        }
      }
    };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    // If input is empty, load all subjects again
    if (value.trim() === '') {
      try {
        const response = await AcademicSubjectService();
        if (response?.responseData?.AcademicSubjectList) {
          setSubjects(response.responseData.AcademicSubjectList);
        } else {
          setSubjects([]);
        }
      } catch (err) {
        console.error('Error:', err);
        setSubjects([]);
      }
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:8080/api/academicsubject/getbysubjectname?SubjectName=${value}`);
      const data = await res.json();
  
      console.log("Search response:", data);
  
      //  Check and normalize the structure
      if (Array.isArray(data)) {
        setSubjects(data);
      } else if (Array.isArray(data.responseData?.AcademicSubjectList)) {
        setSubjects(data.responseData.AcademicSubjectList);
      } else {
        setSubjects([]); // fallback
      }
    } catch (err) {
      console.error('Search error:', err);
      setSubjects([]);
    }
  };
  
  

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await AcademicSubjectService();
        if (response && response.responseData?.AcademicSubjectList) {
          setSubjects(response.responseData.AcademicSubjectList);
        }
      } catch (error) {
        console.error("Error fetching academic subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-8">
      <input
        type="text"
        className="w-1/2 my-2 p-4 font-bold text-center h-10 border rounded-xl"
        placeholder="Search by Subject name"
        name="search"
        value={searchTerm}
        onChange={handleSearch}
      />

      {Array.isArray(subjects) && subjects.length === 0 ? (
        <p className="text-center text-gray-500">No subjects found.</p>
      ) : (
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 space-x-2 space-y-2">
          {Array.isArray(subjects) &&
            subjects.map((course) => (
              <SingleAcademicPage key={course.id} course={course} />
            ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={openInputModal}
          className="bg-blue-500 text-white px-5 py-3 rounded hover:bg-blue-600"
        >
          Click to Add Lab Manual
        </button>
      </div>

    </div>
  );
};

export default AcademicPage;
