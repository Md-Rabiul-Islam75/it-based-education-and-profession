export const AcademicSubjectService = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/academicsubject/getall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
        
      });
  
      const data = await response.json();
      
      if (data.success) {
        console.log("i am from service")
          return data;
      } else {
        console.log("i am from else  ")
         console.log(data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return { success: false, message: "An error occurred during registration." };
    }
  };