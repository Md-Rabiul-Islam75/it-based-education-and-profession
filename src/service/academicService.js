import axios from "axios";

export const fetchSubjects = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/academicsubject/getall");
        return response.data.success ? response.data.responseData.AcademicSubjectList : [];
    } catch (error) {
        console.error("Error fetching subjects", error);
        return [];
    }
};
