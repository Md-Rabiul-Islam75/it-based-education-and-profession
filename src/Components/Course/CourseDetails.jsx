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


  function extractYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
  


  return (
    <div className="space-y-2">
      <h2 className="font-bold text-2xl">{course.topicName}</h2>
      <p className="text-xl">{course.topicAnswer}</p>
      <div>
        {/* <video className="w-full" controls> */}
        {course.topicVideoLink ? (
          <div className="mt-4">
            <a
              href={course.topicVideoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Watch Video
            </a>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No video available</p>
        )}

        {course.topicVideoLink ? (
          <div className="mt-4">
            <iframe
              src={`https://www.youtube.com/embed/${extractYouTubeVideoId(
                course.topicVideoLink
              )}`}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full max-w-2xl mx-auto rounded-md"
              style={{ height: "360px" }}
            />
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No video available</p>
        )}

        {/*   {item.videoUrl && (
                  <div className="mt-4">
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Watch Video
                    </a>
                  </div>
                )} */}
        {/* </video> */}
        {/* <video controls width="100%" className="rounded-md">
          <source src={course.topicVideoLink} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>
    </div>
  );
};

export default CourseDetails;
