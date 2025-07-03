import React from "react";
import { Link } from "react-router-dom";
import ctPic from "../../src/assets/images/CourseMaterials.avif";
import previousYearPic from "../../src/assets/images/FinalYearQuestions.avif";
import courseMaterialPic from "../../src/assets/images/CourseMaterials.avif";
import labManualPic from "../../src/assets/images/LabManual.avif";

const cardData = [
  { title: "Courses", link: "/academic", img: courseMaterialPic },
  { title: "Ct Questions", link: "/allCtQuestionPage", img: ctPic },
  { title: "Previous Year Questions", link: "#", img: previousYearPic }, // Update route if needed
  { title: "Lab Manual", link: "/allLabSubject", img: labManualPic },
];

const EntireAcademicTopicListPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-xl overflow-hidden
                       hover:shadow-2xl hover:-translate-y-1 transform transition duration-300
                       flex flex-col"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover
                           transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                {card.title}
              </h2>
              <div className="flex justify-center mt-auto">
                <Link
                  to={card.link}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold
                             hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  See Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntireAcademicTopicListPage;
