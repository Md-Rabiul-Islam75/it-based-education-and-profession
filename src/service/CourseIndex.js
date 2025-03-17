export const AcademicCourseIndexService = async (subjectName) => {
    try {
      // Construct the URL with the SubjectName parameter
      const url = `http://localhost:8080/api/course/courseindex/getbysubjectname?SubjectName=${encodeURIComponent(subjectName)}`;
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Check if the response is OK (status 200-299)
    //   if (!success) {
    //     throw new Error(`Error: ${response.statusText}`);
    //   }
  
      const data = await response.json();
      console.log("Fetched data:", data?.responseData);  // Check response structure
      return data?.responseData?.CourseIndex[0]?.indexList;  // Return full data to be handled in component
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;  // Propagate error for component to catch
    }
  };
  