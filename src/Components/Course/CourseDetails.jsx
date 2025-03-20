import React, { useEffect, useState } from "react";
import { CourseDetailsService } from "../../service/CourseDetails";
import { useLoaderData, useParams } from "react-router";

const CourseDetails = () => {

  const details = useLoaderData();
  console.log(details);

  console.log(details.responseData.CourseIndex[0]);

  const course = details.responseData.CourseIndex[0];

  //  const [topicDetails, setTopicDetails] = useState([]);

  //   useEffect(() => {
  //     const fetchTopicDetails = async () => {
  //       try {
  //         const response = await CourseDetailsService();
  //         if (response && response.responseData?.AcademicSubjectList) {
  //             setTopicDetails(response.responseData.AcademicSubjectList);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching academic subjects:", error);
  //       }
  //     };

  //     fetchTopicDetails();
  //   }, []);

  return (
    <div className="space-y-2">
      <h2 className="font-bold text-2xl">{course.topicName}</h2>
      <p className="text-xl">{course.topicAnswer}</p>
      <div>
        <video className="w-full" controls>
          {course.topicVideoLink ? (
            <source src={course.topicVideoLink} type="video/mp4" />
          ) : (
            <p>No video available</p>
          )}
        </video>
      </div>
    </div>
  );
};

export default CourseDetails;
