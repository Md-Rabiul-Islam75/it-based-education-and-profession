import React, { useEffect, useState } from "react";
import SingleAcademicPage from "./SingleAcademicPage";
import { AcademicSubjectService } from "../service/AcademicSubjects";

const AcademicPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    </div>
  );
};

export default AcademicPage;
